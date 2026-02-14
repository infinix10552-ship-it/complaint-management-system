# Quick Start Guide - Deploy to Render in 5 Minutes

## 🚀 Ultra-Quick Deployment

### Prerequisites (5 min)
1. GitHub account with your code pushed
2. Render account (sign up at [render.com](https://render.com))
3. Database ready (MySQL or PostgreSQL)

### 1. Generate JWT Secret (1 min)
```bash
# Generate a secure secret
openssl rand -base64 32

# Save the output for later
```

### 2. Create Render Web Service (2 min)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Keep defaults, click **Create Web Service**

### 3. Set Environment Variables (1 min)
In Render dashboard, go to **Environment** and add:
```
DB_URL=jdbc:mysql://your-host:3306/cms_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=paste_your_generated_secret_here
```

### 4. Wait for Deployment (1 min)
Watch the **Logs** tab. You should see:
```
Complaint Management System is running...
```

### 5. Test Your API (Optional)
```bash
# Test the application
curl https://your-service.onrender.com/auth/register

# Register a user
curl -X POST https://your-service.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## ⚠️ CRITICAL: Don't Forget!

- [ ] Update CORS in `SecurityConfig.java` for your frontend domain
- [ ] Set JWT_SECRET in Render (use generated value, not default)
- [ ] Verify database credentials are correct
- [ ] Test endpoints after deployment

---

## 🎯 That's It!

Your application is now live on Render! 🎉

### Common URLs:
- **API Base**: `https://your-service.onrender.com`
- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`
- **Health**: `https://your-service.onrender.com/actuator/health`

### For More Details:
See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.
