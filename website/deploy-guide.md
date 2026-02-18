# Azure VM Deployment Guide - Portfolio Website

## Overview
Deploy your React + Express portfolio website to an Azure Virtual Machine with Nginx reverse proxy and PM2 process management.

---

## Phase 1: Create Azure VM

### 1. Create VM on Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → **"Virtual Machine"**
3. Configuration:
   - **Resource Group**: Create new (e.g., `portfolio-rg`)
   - **VM Name**: `portfolio-vm`
   - **Region**: Choose closest to your users (e.g., Southeast Asia, East US)
   - **Image**: **Ubuntu 22.04 LTS** (recommended)
   - **Size**: **B1s** (1 vCPU, 1GB RAM) - Free tier eligible, or **B2s** for better performance
   - **Authentication**: SSH public key (recommended) or password
   - **Inbound Ports**: Select **HTTP (80)**, **HTTPS (443)**, **SSH (22)**

4. Click **Review + Create** → **Create**
5. **Download the SSH key** (.pem file) if using SSH authentication
6. Wait 2-3 minutes for deployment

### 2. Note Your VM's Public IP
- After deployment, go to the VM resource
- Copy the **Public IP address** (e.g., `20.123.45.67`)

---

## Phase 2: Connect to VM

### From macOS/Linux Terminal:

```bash
# Set correct permissions for SSH key (if using .pem)
chmod 400 ~/Downloads/portfolio-vm_key.pem

# Connect to VM
ssh -i ~/Downloads/portfolio-vm_key.pem azureuser@YOUR_VM_IP

# Or if using password:
ssh azureuser@YOUR_VM_IP
```

---

## Phase 3: Setup Server Environment

### 1. Update System & Install Dependencies

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Verify installations
node --version  # Should show v20.x.x
npm --version
nginx -v
pm2 --version
```

---

## Phase 4: Deploy Your Application

### 1. Clone Your Repository

```bash
# Navigate to web directory
cd /var/www

# Clone your repo (replace with your actual repo URL)
sudo git clone https://github.com/jeeth-kataria/Portfolio.git portfolio

# Set ownership
sudo chown -R $USER:$USER /var/www/portfolio
cd /var/www/portfolio/website
```

### 2. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Verify build output exists
ls -la dist/
```

You should see:
- `dist/index.cjs` (server bundle)
- `dist/public/` (client files)

### 3. Start with PM2

```bash
# Start the app
pm2 start ecosystem.config.cjs

# Check status
pm2 status

# View logs
pm2 logs portfolio

# Save PM2 process list (auto-restart on reboot)
pm2 save
pm2 startup
# Run the command that PM2 outputs
```

Your app is now running on `http://localhost:3000` on the VM.

---

## Phase 5: Configure Nginx Reverse Proxy

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

### 2. Paste This Configuration:

```nginx
server {
    listen 80;
    server_name YOUR_VM_IP;  # Replace with your VM IP or domain

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Proxy to Node.js app
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
    }
}
```

### 3. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Phase 6: Access Your Website

1. Open browser and go to: `http://YOUR_VM_IP`
2. Your portfolio should be live! 🎉

---

## Phase 7: (Optional) Setup Custom Domain & HTTPS

### If you have a domain (e.g., jeethkataria.com):

1. **Point Domain to VM:**
   - In your domain registrar (GoDaddy, Namecheap, etc.)
   - Add an **A record** pointing to your VM's public IP

2. **Install SSL Certificate (Free with Let's Encrypt):**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

3. **Update Nginx config:**
   - Replace `server_name YOUR_VM_IP;` with `server_name yourdomain.com www.yourdomain.com;`
   - Certbot will automatically configure HTTPS

---

## Maintenance Commands

### Update Application:
```bash
cd /var/www/portfolio/website
git pull origin main
npm install
npm run build
pm2 restart portfolio
```

### View Logs:
```bash
pm2 logs portfolio
pm2 logs portfolio --lines 100
```

### Monitor Resources:
```bash
pm2 monit
htop  # Install with: sudo apt install htop
```

### Restart Everything:
```bash
pm2 restart portfolio
sudo systemctl restart nginx
```

---

## Troubleshooting

### Port 3000 already in use:
```bash
pm2 delete portfolio
pm2 start ecosystem.config.cjs
```

### Nginx not serving the site:
```bash
sudo nginx -t  # Check config
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Build fails:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## Cost Estimate (Azure)

- **B1s VM**: ~$7.59/month (or free with Azure credits)
- **B2s VM**: ~$30/month (better performance)
- **Public IP**: ~$3.65/month
- **Storage**: Minimal cost (~$1-2/month)

**Total**: ~$10-35/month depending on VM size

---

## Alternative: Cheaper/Free Options

1. **Azure App Service Free Tier** (F1): Free but has limitations
2. **Vercel/Netlify**: Free for frontend (need separate backend hosting)
3. **Railway.app**: Free $5/month credits
4. **Render.com**: Free tier available
5. **Oracle Cloud**: Free tier with generous limits

---

## Security Checklist

- [ ] Change default SSH port (from 22 to custom)
- [ ] Set up firewall: `sudo ufw enable && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 22/tcp`
- [ ] Disable root login: Edit `/etc/ssh/sshd_config` → `PermitRootLogin no`
- [ ] Keep system updated: `sudo apt update && sudo apt upgrade -y`
- [ ] Setup automatic security updates
- [ ] Regular backups of the application

---

**Need help with any step? Let me know!**
