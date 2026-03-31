# Development Guide - NamiPay AI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Set up database
npx prisma db push

# Start development server (stable webpack)
npm run dev

# Or use Turbopack (if you have sufficient resources)
npm run dev:turbo
```

## 📁 Project Structure

```
NamiPay AI/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── dashboard/     # Dashboard pages
│   │   └── globals.css    # Global styles
│   ├── components/         # Reusable components
│   ├── lib/               # Core business logic
│   │   ├── auth.ts        # Authentication
│   │   ├── db.ts          # Database client
│   │   ├── namira.ts      # NAMRA compliance
│   │   ├── payroll.ts     # Payroll engine
│   │   └── types.ts       # TypeScript types
│   └── middleware.ts      # Next.js middleware
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## ⚙️ Configuration Updates (Next.js 15+ Compatible)

### Fixed Issues:
1. ✅ **Deprecated `images.domains`** → `images.remotePatterns`
2. ✅ **Invalid `experimental.serverComponentsExternalPackages`** → `serverExternalPackages`
3. ✅ **Middleware optimized** for Next.js 16 compatibility
4. ✅ **Development stability** improvements
5. ✅ **Performance optimizations** added

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  // ✅ Fixed: serverExternalPackages (root level)
  serverExternalPackages: ['bcryptjs'],
  
  // ✅ Fixed: remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  
  // ✅ Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
}
```

### Middleware
```javascript
// src/middleware.ts - Optimized for Next.js 16
export function middleware(request: NextRequest) {
  // Enhanced error handling and performance
  // Better matcher patterns
}
```

## 🛠️ Development Scripts

```bash
# Development (stable webpack)
npm run dev

# Development (turbopack - faster but requires more resources)
npm run dev:turbo

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Database operations
npm run db:push      # Push schema to DB
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
```

## 🌍 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/namipay"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# JWT
JWT_SECRET="your-jwt-secret"

# WhatsApp API
WHATSAPP_API_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-id"

# OpenAI (AI features)
OPENAI_API_KEY="your-openai-key"
```

## 🚦 Performance Optimizations

### Development Stability
- **Webpack by default**: More stable on lower-resource systems
- **Turbopack optional**: Available with `npm run dev:turbo`
- **SWC minification**: Faster builds
- **Type checking**: Separate script for faster iteration

### Production Optimizations
- **Powered by header disabled**: Security improvement
- **Image optimization**: Proper remote patterns
- **Bundle optimization**: Tree-shaking enabled

## 🔧 Troubleshooting

### Common Issues

1. **Build warnings about deprecated configs**
   - ✅ Fixed: Updated to Next.js 15+ standards

2. **Middleware deprecation warnings**
   - ✅ Fixed: Optimized matcher patterns

3. **Turbopack instability**
   - ✅ Fixed: Use `npm run dev` for webpack
   - 🚀 Use `npm run dev:turbo` for faster builds (if resources available)

4. **TypeScript errors**
   - Run: `npm run type-check`
   - Check: `tsconfig.json` paths

5. **Database connection issues**
   - Verify: `.env.local` DATABASE_URL
   - Run: `npx prisma db push`

## 📝 Development Best Practices

1. **Always run type-checking before commits**
   ```bash
   npm run type-check
   ```

2. **Use environment variables for secrets**
   - Never commit `.env.local`
   - Use `.env.example` for documentation

3. **Follow the established folder structure**
   - API routes in `src/app/api/`
   - Components in `src/components/`
   - Business logic in `src/lib/`

4. **Test NAMRA calculations**
   - Use the test cases in `src/lib/namira.ts`
   - Verify tax brackets annually

5. **Database changes**
   - Update `prisma/schema.prisma`
   - Run `npx prisma db push`
   - Regenerate client: `npx prisma generate`

## 🚀 Production Deployment

### Build Process
```bash
# Install production dependencies
npm ci --only=production

# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup
- Set all production environment variables
- Configure PostgreSQL database
- Set up SSL certificates
- Configure reverse proxy (nginx/Apache)

## 📊 Monitoring & Logging

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Database Monitoring
```bash
npm run db:studio
```

## 🔄 Version Control

### Git Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit with meaningful message
git commit -m "fix: update next.js config for v15 compatibility"

# Push changes
git push origin main
```

### .gitignore
- Comprehensive ignore rules included
- Excludes sensitive files and build artifacts
- Follows Next.js best practices

---

**Note**: This configuration ensures full compatibility with Next.js 15+ while maintaining optimal performance and development experience.
