# Complaint Management System - Render Deployment Guide

## ✅ Deployment Readiness Checklist

Your application is **READY FOR DEPLOYMENT** on Render with the following setup:

### Pre-Deployment Requirements

- [x] Java 21 compatible code
- [x] Spring Boot 3.3.0 configured
- [x] Maven build system with wrapper
- [x] Dockerfile for containerized deployment
- [x] Environment variables configured
- [x] Security vulnerabilities fixed (JJWT updated, JWT secret externalized)
- [x] render.yaml configuration file

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository
1. Push your code to GitHub (or GitLab)
2. Ensure `.gitignore` includes:
   - `target/`
   - `.env`
   - `.idea/`
   - `.DS_Store`

### Step 2: Create Render Account & Web Service
1. Go to [https://render.com](https://render.com)
2. Sign in with GitHub
3. Click **New +** → **Web Service**
4. Select your repository
5. Configure as follows:
   - **Name**: `complaint-mng-sys`
   - **Environment**: `Docker`
   - **Build Command**: Leave blank (uses Dockerfile)
   - **Start Command**: Leave blank (uses Dockerfile)

### Step 3: Add Environment Variables in Render Dashboard

Go to **Environment** section and add:

```
DB_URL=jdbc:mysql://[your-mysql-host]:3306/cms_db
DB_USERNAME=root
DB_PASSWORD=your_secure_password
JWT_SECRET=your_long_random_secret_key_here
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
```

### Step 4: Recommended Database Setup

#### Option A: Render PostgreSQL (Recommended for Free Tier)
1. Click **New +** → **PostgreSQL**
2. Configure as needed
3. Render will provide connection string automatically
4. Update `application.properties` to use PostgreSQL driver:

```properties
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

#### Option B: External MySQL (TiDB Cloud, AWS RDS, etc.)
1. Create MySQL database on external provider
2. Get connection credentials
3. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` in Render dashboard

#### Option C: Render MySQL (Limited Support)
- Render recommends PostgreSQL
- For MySQL, use external providers

### Step 5: Deploy
1. Click **Create Web Service**
2. Render will automatically build and deploy
3. Monitor the deployment in **Logs**
4. Once successful, your app will be available at: `https://complaint-mng-sys.onrender.com`

---

## 🔒 Security Configuration for Production

### Essential Environment Variables to Set:

```bash
# Generate a secure JWT secret (use this in production):
# Option 1: Use openssl
openssl rand -base64 32

# Option 2: Use Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Set in Render Dashboard:
JWT_SECRET=your_generated_secret_here
```

### Database Security:
- Use strong passwords (min 16 characters)
- Don't commit credentials to Git
- Use Render's managed PostgreSQL for better security
- Enable SSL/TLS for database connections

### API Security:
- CORS is configured for `http://localhost:5173`
- **Update for production frontend URL:**

Edit `src/main/java/com/ip/complaint_mng_sys/config/SecurityConfig.java`:
```java
configuration.setAllowedOrigins(List.of("https://your-frontend-domain.com"));
```

---

## 📋 Application Configuration

### Current Settings:

| Setting | Value | Notes |
|---------|-------|-------|
| Java Version | 21 | ✅ Verified compatible |
| Spring Boot | 3.3.0 | ✅ Latest stable |
| Build Tool | Maven 3.9+ | ✅ Using wrapper |
| Database | MySQL/PostgreSQL | 🔧 Configure via env vars |
| Authentication | JWT | ✅ Secure token-based |
| Server Port | 8080 (auto from $PORT) | ✅ Render compatible |

### Environment Variables:

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `DB_URL` | Yes | `jdbc:mysql://localhost:3306/cms_db` | Update for production |
| `DB_USERNAME` | Yes | `root` | Use secure credentials |
| `DB_PASSWORD` | Yes | `Aman1010` | Change immediately |
| `JWT_SECRET` | Yes | Hardcoded default | MUST set in production |
| `JWT_EXPIRATION` | No | `86400000` (24 hours) | Token validity period |
| `PORT` | Auto | `8080` | Set by Render automatically |

---

## 🧪 Testing Before Deployment

### Local Testing:
```bash
# Build the JAR
./mvnw clean package -DskipTests

# Run the application
java -jar target/complaint-mng-sys-0.0.1-SNAPSHOT.jar

# Test the API
curl http://localhost:8080/auth/register
```

### Docker Testing (Local):
```bash
# Build Docker image
docker build -t complaint-mng-sys:latest .

# Run container
docker run -p 8080:8080 \
  -e DB_URL=jdbc:mysql://host.docker.internal:3306/cms_db \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=password \
  -e JWT_SECRET=your_secret \
  complaint-mng-sys:latest
```

---

## 🐛 Troubleshooting

### Issue: Build fails with "mvnw: command not found"
**Solution**: Ensure `mvnw` and `mvnw.cmd` are in the root directory and committed to Git.

### Issue: Database connection fails
**Solution**: 
- Verify `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` are set correctly
- Check database is running and accessible
- Verify firewall rules allow Render IP range

### Issue: Port binding error
**Solution**: 
- The app automatically uses `${PORT}` environment variable
- Render sets this automatically
- Don't hardcode port 8080 in configuration

### Issue: JWT token errors in production
**Solution**: 
- Ensure `JWT_SECRET` is set in Render dashboard
- Use a strong, random secret (min 32 characters)
- Don't use the hardcoded default

### Issue: CORS errors
**Solution**: 
- Update `allowedOrigins` in `SecurityConfig.java` with your frontend domain
- Rebuild and redeploy

---

## 📊 Monitoring & Logs

### View Logs in Render:
1. Go to your Web Service
2. Click **Logs** tab
3. View real-time application logs

### Check Application Health:
```bash
curl https://complaint-mng-sys.onrender.com/actuator/health
```

### Common Log Messages:
- ✅ `Complaint Management System is running...` - Application started successfully
- ⚠️ `Unable to connect to database` - Check DB credentials and connectivity

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to your repository:

1. Commits to main branch trigger automatic builds
2. Deployment logs available in Render dashboard
3. Rollback to previous deploy if needed

---

## 🎯 Next Steps

1. **Set up your database** (PostgreSQL or MySQL)
2. **Generate a strong JWT_SECRET**
3. **Update CORS configuration** for your frontend domain
4. **Test the application locally** first
5. **Deploy to Render** following the steps above
6. **Monitor logs** after deployment
7. **Test API endpoints** on production

---

## 📞 Support Resources

- [Render Docs](https://render.com/docs)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot/)
- [Docker Documentation](https://docs.docker.com/)
- [JWT Security Best Practices](https://tools.ietf.org/html/rfc8949)

---

## ✨ Additional Notes

- **Render Free Tier**: Services spin down after 15 minutes of inactivity
- **Production Recommendation**: Upgrade to paid plans for continuous availability
- **Database**: Consider managed PostgreSQL on Render for better integration
- **Monitoring**: Enable Render's monitoring and alerting features
- **Backups**: Configure automatic database backups before going live

---

**Last Updated**: February 2026
**Status**: ✅ Ready for Deployment
