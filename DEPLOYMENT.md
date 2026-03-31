# 🚀 NamiPay AI Production Deployment Guide

## 📋 Prerequisites

### **Infrastructure Requirements:**
- **Server:** Ubuntu 20.04+ or CentOS 8+
- **RAM:** Minimum 4GB, Recommended 8GB+
- **Storage:** Minimum 50GB SSD
- **CPU:** Minimum 2 cores, Recommended 4 cores+
- **Network:** Stable internet connection with SSL certificate

### **Software Requirements:**
- **Node.js:** 18.x LTS or higher
- **PostgreSQL:** 14.x or higher
- **Nginx:** Latest stable version
- **PM2:** Process Manager
- **SSL Certificate:** Let's Encrypt or commercial

---

## 🔧 Step 1: Server Setup

### **1.1 Update System Packages**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### **1.2 Install Node.js**
```bash
# Install Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18.x.x
npm --version   # Should be 9.x.x
```

### **1.3 Install PostgreSQL**
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database user
sudo -u postgres psql
CREATE USER namipay WITH PASSWORD 'your_secure_password';
CREATE DATABASE namipay_prod OWNER namipay;
GRANT ALL PRIVILEGES ON DATABASE namipay_prod TO namipay;
\q
```

### **1.4 Install Nginx**
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **1.5 Install PM2**
```bash
sudo npm install -g pm2
```

---

## 🔐 Step 2: Security Setup

### **2.1 Configure Firewall**
```bash
# Ubuntu (UFW)
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### **2.2 Setup SSL Certificate**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace yourdomain.com)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Setup auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📦 Step 3: Application Deployment

### **3.1 Clone Repository**
```bash
# Create application directory
sudo mkdir -p /var/www/namipay
sudo chown $USER:$USER /var/www/namipay

# Clone repository
cd /var/www/namipay
git clone https://github.com/your-username/namipay-ai.git .
```

### **3.2 Install Dependencies**
```bash
# Install Node.js dependencies
npm install --production

# Generate Prisma client
npx prisma generate
```

### **3.3 Environment Configuration**
```bash
# Create production environment file
cp .env.example .env.production

# Edit production environment
nano .env.production
```

**Production Environment Variables:**
```env
# Database
DATABASE_URL="postgresql://namipay:your_secure_password@localhost:5432/namipay_prod"

# Next.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your_very_long_random_secret_here"

# JWT
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"

# WhatsApp Business API
WHATSAPP_API_TOKEN="your_whatsapp_token"
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="your_webhook_token"

# OpenAI API
OPENAI_API_KEY="your_openai_api_key"

# Email Service
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_app_password"

# Production
NODE_ENV="production"
PORT="3000"
```

### **3.4 Database Setup**
```bash
# Run database migrations
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### **3.5 Build Application**
```bash
# Build for production
npm run build
```

---

## ⚙️ Step 4: Nginx Configuration

### **4.1 Create Nginx Config**
```bash
sudo nano /etc/nginx/sites-available/namipay
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Login rate limiting
    location /api/auth/login {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }

    # Health check
    location /health {
        access_log off;
        proxy_pass http://localhost:3000/api/health;
    }
}
```

### **4.2 Enable Site**
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/namipay /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🚀 Step 5: Process Management

### **5.1 Create PM2 Ecosystem File**
```bash
nano ecosystem.config.js
```

**PM2 Ecosystem Configuration:**
```javascript
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
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

### **5.2 Setup Logging**
```bash
# Create log directory
sudo mkdir -p /var/log/namipay
sudo chown $USER:$USER /var/log/namipay

# Create logrotate config
sudo nano /etc/logrotate.d/namipay
```

**Logrotate Configuration:**
```
/var/log/namipay/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
```

### **5.3 Start Application**
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

---

## 🔍 Step 6: Monitoring & Maintenance

### **6.1 Setup Basic Monitoring**
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Create monitoring script
nano /var/www/namipay/scripts/health-check.sh
```

**Health Check Script:**
```bash
#!/bin/bash

# Check if application is running
if ! pm2 list | grep -q "namipay-ai.*online"; then
    echo "$(date): Application is down, restarting..." >> /var/log/namipay/health-check.log
    pm2 restart namipay-ai
fi

# Check database connection
if ! pg_isready -h localhost -p 5432 -U namipay; then
    echo "$(date): Database is down" >> /var/log/namipay/health-check.log
    sudo systemctl restart postgresql
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date): Disk usage is ${DISK_USAGE}%" >> /var/log/namipay/health-check.log
fi

# Check memory usage
MEM_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $MEM_USAGE -gt 85 ]; then
    echo "$(date): Memory usage is ${MEM_USAGE}%" >> /var/log/namipay/health-check.log
fi
```

### **6.2 Setup Cron Jobs**
```bash
# Edit crontab
crontab -e

# Add monitoring cron (every 5 minutes)
*/5 * * * * /var/www/namipay/scripts/health-check.sh

# Add backup cron (daily at 2 AM)
0 2 * * * /var/www/namipay/scripts/backup.sh

# Add log cleanup cron (weekly)
0 3 * * 0 find /var/log/namipay -name "*.log" -mtime +30 -delete
```

---

## 💾 Step 7: Backup Strategy

### **7.1 Create Backup Script**
```bash
nano /var/www/namipay/scripts/backup.sh
```

**Backup Script:**
```bash
#!/bin/bash

BACKUP_DIR="/var/backups/namipay"
DATE=$(date +%Y%m%d_%H%M%S)
DB_BACKUP_FILE="$BACKUP_DIR/db_backup_$DATE.sql"
APP_BACKUP_FILE="$BACKUP_DIR/app_backup_$DATE.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U namipay -d namipay_prod > $DB_BACKUP_FILE
gzip $DB_BACKUP_FILE

# Application backup
tar -czf $APP_BACKUP_FILE \
    /var/www/namipay/.env.production \
    /var/www/namipay/prisma/schema.prisma \
    /var/www/namipay/build \
    /var/www/namipay/public \
    --exclude=node_modules \
    --exclude=.git

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "$(date): Backup completed" >> /var/log/namipay/backup.log
```

### **7.2 Make Script Executable**
```bash
chmod +x /var/www/namipay/scripts/backup.sh
chmod +x /var/www/namipay/scripts/health-check.sh
```

---

## 🧪 Step 8: Testing & Verification

### **8.1 Test Application**
```bash
# Test health endpoint
curl -f https://yourdomain.com/api/health

# Test main application
curl -f https://yourdomain.com/

# Test API endpoints
curl -f https://yourdomain.com/api/reports?type=payroll-summary
```

### **8.2 Test SSL Certificate**
```bash
# Check SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Test SSL renewal
sudo certbot renew --dry-run
```

### **8.3 Performance Test**
```bash
# Install Apache Bench
sudo apt install apache2-utils -y

# Test application performance
ab -n 100 -c 10 https://yourdomain.com/
```

---

## 📊 Step 9: Performance Optimization

### **9.1 Enable HTTP/2**
```nginx
# Add to nginx config
listen 443 ssl http2;
```

### **9.2 Enable Brotli Compression**
```bash
# Install Brotli
sudo apt install brotli -y

# Add to nginx config
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### **9.3 Database Optimization**
```sql
-- Create indexes for performance
CREATE INDEX CONCURRENTLY idx_payroll_entries_employee_id ON payroll_entries(employee_id);
CREATE INDEX CONCURRENTLY idx_payroll_entries_period ON payroll_entries(period);
CREATE INDEX CONCURRENTLY idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX CONCURRENTLY idx_users_tenant_id ON users(tenant_id);
```

---

## 🚨 Step 10: Security Hardening

### **10.1 Application Security**
```bash
# Install fail2ban
sudo apt install fail2ban -y

# Configure fail2ban
sudo nano /etc/fail2ban/jail.local
```

**Fail2Ban Configuration:**
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
```

### **10.2 Database Security**
```sql
-- Secure PostgreSQL
-- Remove public schema access
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE namipay_prod FROM PUBLIC;

-- Create read-only user for reporting
CREATE USER namipay_readonly WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE namipay_prod TO namipay_readonly;
GRANT USAGE ON SCHEMA public TO namipay_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO namipay_readonly;
```

---

## 📱 Step 11: Mobile App Deployment

### **11.1 Android Deployment**
```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Android build
cd android
./gradlew assembleRelease

# Upload to Google Play Store
# Use Google Play Console
```

### **11.2 iOS Deployment**
```bash
# iOS build
cd mobile/ios
xcodebuild -workspace NamiPay.xcworkspace -scheme NamiPay -configuration Release archive

# Upload to App Store
# Use Xcode Organizer or Application Loader
```

---

## 🔄 Step 12: CI/CD Pipeline (Optional)

### **12.1 GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/namipay
            git pull origin main
            npm ci --production
            npm run build
            pm2 restart namipay-ai
```

---

## ✅ Deployment Checklist

### **Pre-Deployment:**
- [ ] All environment variables configured
- [ ] SSL certificate installed
- [ ] Database created and migrated
- [ ] Security measures implemented
- [ ] Backup strategy in place

### **Post-Deployment:**
- [ ] Application responding to requests
- [ ] All API endpoints functional
- [ ] Database connections working
- [ ] SSL certificate valid
- [ ] Monitoring systems active
- [ ] Backup processes working
- [ ] Performance optimized
- [ ] Security hardening complete

---

## 🎯 Production URLs

### **Main Application:**
- **Web App:** `https://yourdomain.com`
- **API:** `https://yourdomain.com/api/`
- **Health Check:** `https://yourdomain.com/api/health`
- **Admin Dashboard:** `https://yourdomain.com/dashboard`

### **Mobile Apps:**
- **Android:** Google Play Store link
- **iOS:** App Store link

---

## 📞 Support & Monitoring

### **Monitoring Dashboard:**
- Application metrics
- Database performance
- Server resources
- Error tracking

### **Alert System:**
- Application downtime
- Database issues
- Security threats
- Performance degradation

### **Support Channels:**
- Email: support@namipay.ai
- Phone: +264 123 456 789
- WhatsApp: +264 123 456 789

---

**🎉 NamiPay AI is now ready for production deployment!**

**Follow this guide step-by-step for a successful production launch.**
