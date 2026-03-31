#!/bin/bash

# 🚀 NamiPay AI Quick Deployment Script
# This script automates the production deployment process

set -e  # Exit on any error

echo "🚀 Starting NamiPay AI Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "This script must be run as root (use sudo)"
    exit 1
fi

# Get domain name
read -p "Enter your domain name (e.g., namipay.ai): " DOMAIN
if [ -z "$DOMAIN" ]; then
    print_error "Domain name is required"
    exit 1
fi

# Get database password
read -s -p "Enter PostgreSQL password for namipay user: " DB_PASSWORD
echo
if [ -z "$DB_PASSWORD" ]; then
    print_error "Database password is required"
    exit 1
fi

print_status "Starting deployment for domain: $DOMAIN"

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install Node.js
print_status "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PostgreSQL
print_status "Installing PostgreSQL..."
apt install postgresql postgresql-contrib -y
systemctl start postgresql
systemctl enable postgresql

# Setup database
print_status "Setting up database..."
sudo -u postgres psql << EOF
CREATE USER namipay WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE namipay_prod OWNER namipay;
GRANT ALL PRIVILEGES ON DATABASE namipay_prod TO namipay;
\q
EOF

# Install Nginx
print_status "Installing Nginx..."
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# Install PM2
print_status "Installing PM2..."
npm install -g pm2

# Setup firewall
print_status "Configuring firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Install SSL certificate
print_status "Setting up SSL certificate..."
apt install certbot python3-certbot-nginx -y
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Create application directory
print_status "Setting up application directory..."
mkdir -p /var/www/namipay
chown $SUDO_USER:$SUDO_USER /var/www/namipay

# Clone repository (assuming it's already cloned locally)
print_status "Deploying application files..."
cp -r /home/$SUDO_USER/NamiPay_AI/* /var/www/namipay/
chown -R $SUDO_USER:$SUDO_USER /var/www/namipay

# Install dependencies
print_status "Installing Node.js dependencies..."
cd /var/www/namipay
sudo -u $SUDO_USER npm install --production

# Setup environment file
print_status "Configuring environment..."
sudo -u $SUDO_USER cp .env.example .env.production

# Update environment file with actual values
sudo -u $SUDO_USER sed -i "s|DATABASE_URL=\".*\"|DATABASE_URL=\"postgresql://namipay:$DB_PASSWORD@localhost:5432/namipay_prod\"|g" .env.production
sudo -u $SUDO_USER sed -i "s|NEXTAUTH_URL=\".*\"|NEXTAUTH_URL=\"https://$DOMAIN\"|g" .env.production

# Generate Prisma client
print_status "Setting up database schema..."
sudo -u $SUDO_USER npx prisma generate
sudo -u $SUDO_USER npx prisma db push

# Build application
print_status "Building application..."
sudo -u $SUDO_USER npm run build

# Create Nginx configuration
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/namipay << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
EOF

# Enable Nginx site
ln -s /etc/nginx/sites-available/namipay /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Create PM2 ecosystem file
print_status "Setting up process manager..."
cat > /var/www/namipay/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'namipay-ai',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/namipay',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/namipay/error.log',
    out_file: '/var/log/namipay/out.log',
    log_file: '/var/log/namipay/combined.log',
    time: true,
    max_memory_restart: '1G'
  }]
};
EOF

# Setup logging
mkdir -p /var/log/namipay
chown $SUDO_USER:$SUDO_USER /var/log/namipay

# Start application
print_status "Starting application..."
cd /var/www/namipay
sudo -u $SUDO_USER pm2 start ecosystem.config.js
sudo -u $SUDO_USER pm2 save
pm2 startup

# Setup logrotate
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/namipay << EOF
/var/log/namipay/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $SUDO_USER $SUDO_USER
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Setup monitoring script
print_status "Setting up monitoring..."
mkdir -p /var/www/namipay/scripts
cat > /var/www/namipay/scripts/health-check.sh << 'EOF'
#!/bin/bash

# Check if application is running
if ! pm2 list | grep -q "namipay-ai.*online"; then
    echo "$(date): Application is down, restarting..." >> /var/log/namipay/health-check.log
    pm2 restart namipay-ai
fi

# Check database connection
if ! pg_isready -h localhost -p 5432 -U namipay; then
    echo "$(date): Database is down" >> /var/log/namipay/health-check.log
    systemctl restart postgresql
fi
EOF

chmod +x /var/www/namipay/scripts/health-check.sh
chown $SUDO_USER:$SUDO_USER /var/www/namipay/scripts/health-check.sh

# Setup cron jobs
print_status "Setting up automated tasks..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/namipay/scripts/health-check.sh") | crontab -

# Test deployment
print_status "Testing deployment..."
sleep 10

if curl -f -s https://$DOMAIN/api/health > /dev/null; then
    print_status "✅ Deployment successful!"
    echo ""
    echo "🎉 NamiPay AI is now live at: https://$DOMAIN"
    echo "📊 Admin Dashboard: https://$DOMAIN/dashboard"
    echo "📱 Self-Service Portal: https://$DOMAIN/self-service"
    echo ""
    echo "🔧 Useful commands:"
    echo "  pm2 list                    # View application status"
    echo "  pm2 logs namipay-ai         # View application logs"
    echo "  pm2 restart namipay-ai      # Restart application"
    echo "  nginx -t                    # Test Nginx configuration"
    echo "  systemctl status nginx      # Check Nginx status"
    echo ""
    echo "📁 Important files:"
    echo "  /var/www/namipay/.env.production    # Environment configuration"
    echo "  /etc/nginx/sites-available/namipay  # Nginx configuration"
    echo "  /var/log/namipay/                   # Application logs"
    echo ""
    echo "🔐 Next steps:"
    echo "  1. Configure WhatsApp Business API"
    echo "  2. Setup OpenAI API key"
    echo "  3. Configure email service"
    echo "  4. Test all features"
    echo "  5. Deploy mobile apps to app stores"
else
    print_error "❌ Deployment failed! Check logs at /var/log/namipay/"
    exit 1
fi

print_status "Deployment completed successfully! 🎉"
