# Production Deployment Guide - Donuteria

## Project Overview

**Donuteria** is a modern full-stack web application built with Next.js (React 19.2.3) for managing a donut shop. The project features:

- **Frontend**: React 19 with Redux Toolkit for state management
- **Backend**: Next.js API routes with JWT authentication
- **Database**: MySQL 2 for data persistence
- **Security**: JWT tokens with Argon2 password hashing
- **UI Features**: PDF generation with jsPDF, accessibility testing
- **Testing**: Comprehensive test suite (unit, integration, and usability tests)

### Key Features
- User authentication with secure JWT tokens
- User profile management with middleware protection
- PDF report generation for transactions
- Accessibility compliance (pa11y testing)
- Redux-based state management
- Responsive design with CSS

---

## Environment Setup

### Prerequisites

Before deploying to production, ensure you have:

- **Node.js**: v18+ (recommended v20 LTS)
- **npm**: v10+
- **MySQL**: v8.0+
- **Server**: Linux-based OS (Ubuntu 22.04+ recommended)
- **Memory**: Minimum 2GB RAM
- **Disk**: Minimum 5GB free space

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=donuteria_user
DB_PASSWORD=your-secure-password
DB_NAME=donuteria_db

# JWT Configuration
JWT_SECRET=your-very-secure-jwt-secret-min-32-chars
JWT_EXPIRATION=7d

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com

# Google Cloud Storage (for images)
NEXT_PUBLIC_GCS_BUCKET=your-gcs-bucket-name
GCS_PROJECT_ID=your-gcp-project-id
GCS_PRIVATE_KEY=your-gcp-private-key
GCS_CLIENT_EMAIL=your-gcp-service-account-email

# Optional: Sentry for error tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Application Settings
LOG_LEVEL=info
COOKIE_SECURE=true
COOKIE_SAME_SITE=strict
```

### Database Preparation

1. **Create Database and User**:

```sql
CREATE DATABASE donuteria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'donuteria_user'@'localhost' IDENTIFIED BY 'your-secure-password';
GRANT ALL PRIVILEGES ON donuteria_db.* TO 'donuteria_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Initialize Schema**: Run your database migrations:

```bash
npm run migrate
# or if migrations are in database/schema.sql
mysql -u donuteria_user -p donuteria_db < database/schema.sql
```

---

## Building for Production

### 1. Install Dependencies

```bash
npm ci --only=production
```

### 2. Build the Application

```bash
npm run build
```

This command:
- Compiles all Next.js pages and components
- Optimizes React with the React Compiler (enabled in next.config.mjs)
- Generates static assets
- Creates `.next` build directory

### 3. Verify Build

```bash
# Check for build errors
ls -la .next/

# Test the build locally (optional)
npm start
```

---

## Production Deployment

### Option 1: Traditional Server Deployment (VPS/Dedicated)

#### Setup Node.js Application Server

1. **Install PM2** for process management:

```bash
npm install -g pm2
```

2. **Create PM2 Ecosystem File** (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'donuteria',
    script: './.next/standalone/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    restart_delay: 4000
  }]
};
```

3. **Start the Application**:

```bash
pm2 start ecosystem.config.js --env production
pm2 startup
pm2 save
```

4. **Setup Nginx Reverse Proxy**:

```nginx
upstream donuteria {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Certificate (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css text/js text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
    gzip_disable "msie6";
    gzip_comp_level 6;
    gzip_min_length 1000;

    # Proxy Configuration
    location / {
        proxy_pass http://donuteria;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }

    # Static assets caching
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

5. **Install SSL Certificate** (Let's Encrypt):

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com
```

#### Setup Systemd Service

Create `/etc/systemd/system/donuteria.service`:

```ini
[Unit]
Description=Donuteria Next.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/app/donuteria
ExecStart=/usr/local/bin/pm2 start ecosystem.config.js --no-daemon
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable donuteria
sudo systemctl start donuteria
sudo systemctl status donuteria
```

---

### Option 2: Docker Deployment

#### Create Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mysql
    restart: unless-stopped
    networks:
      - donuteria-network

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    restart: unless-stopped
    networks:
      - donuteria-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - donuteria-network

volumes:
  mysql-data:

networks:
  donuteria-network:
    driver: bridge
```

#### Deploy with Docker

```bash
# Create .env file with production variables
cp .env.example .env.production

# Build and start services
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

---

### Option 3: Cloud Platform Deployment

#### Vercel Deployment

1. **Push to GitHub** (if not already)
2. **Connect to Vercel**:
   - Go to https://vercel.com/import
   - Select your GitHub repository
   - Add environment variables

3. **Configure Production Settings**:

```
Build Command: npm run build
Start Command: npm start
Install Command: npm ci
```

#### Heroku Deployment

```bash
# Install Heroku CLI
# Create Procfile
echo "web: npm start" > Procfile

# Create app and deploy
heroku create donuteria
git push heroku main

# Set environment variables
heroku config:set DB_HOST=your-db-host
heroku config:set JWT_SECRET=your-secret
```

---

## Performance Optimization

### 1. Enable Next.js Optimizations

Already configured in `next.config.mjs`:
- React Compiler is enabled (`reactCompiler: true`)
- Remote image optimization from Google Cloud Storage

### 2. Database Optimization

```sql
-- Create indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Enable query cache
SET SESSION query_cache_type = ON;
```

### 3. Caching Strategy

```javascript
// Set cache headers in Next.js middleware
export async function middleware(request) {
  const response = NextResponse.next();
  
  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=60');
  }
  
  return response;
}
```

---

## Monitoring & Maintenance

### 1. Application Monitoring

```bash
# Install PM2 Monitoring
npm install -g pm2-auto-pull
pm2 install pm2-auto-pull

# Setup PM2 Plus (optional)
pm2 link
```

### 2. Log Management

```bash
# Rotate logs to prevent disk space issues
npm install -g pm2-logrotate
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 10
```

### 3. Database Backups

```bash
# Automated daily backups
0 2 * * * mysqldump -u donuteria_user -p donuteria_db | gzip > /backups/donuteria_$(date +\%Y\%m\%d).sql.gz
```

### 4. Health Checks

Create `/api/health` endpoint:

```javascript
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}
```

---

## Security Checklist

- [ ] Environment variables are secure and not committed
- [ ] Database user has limited privileges
- [ ] SSL/TLS certificate installed
- [ ] Security headers configured (Nginx)
- [ ] JWT secret is strong (minimum 32 characters)
- [ ] Argon2 password hashing enabled
- [ ] Cookie security flags enabled (Secure, HttpOnly, SameSite)
- [ ] Rate limiting configured
- [ ] CSRF protection enabled
- [ ] Input validation on all endpoints
- [ ] Regular security updates applied
- [ ] WAF (Web Application Firewall) configured

---

## Testing Before Production

### 1. Run Full Test Suite

```bash
npm run test
```

### 2. Build Verification

```bash
npm run build
npm start
# Test locally on http://localhost:3000
```

### 3. Performance Testing

```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-staging-domain.com --view
```

### 4. Accessibility Compliance

```bash
npm run test:usability
```

---

## Deployment Checklist

- [ ] All environment variables set
- [ ] Database initialized and migrated
- [ ] SSL certificate installed
- [ ] Nginx/reverse proxy configured
- [ ] PM2 or Docker configured
- [ ] Backups automated
- [ ] Monitoring enabled
- [ ] Error tracking setup (Sentry)
- [ ] DNS records updated
- [ ] CDN configured (optional)
- [ ] Load testing completed
- [ ] Security headers verified
- [ ] Team trained on deployment procedures

---

## Rollback Procedure

If issues occur post-deployment:

```bash
# With PM2
pm2 revert  # Reverts to previous working version

# With Docker
docker-compose down
docker-compose up -d  # Previous version still in registry
```

---

## Support & Maintenance

- Monitor logs: `pm2 logs donuteria`
- Check database: `mysql -u donuteria_user -p donuteria_db`
- Update dependencies: `npm audit fix`
- Performance tuning: Monitor CPU, memory, and response times
- Regular security updates: `npm update && npm audit`

For more information, refer to:
- [Next.js Production Deployment](https://nextjs.org/docs/going-to-production)
- [MySQL Administration](https://dev.mysql.com/doc/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
