# 🔧 FIX: Render Deployment Database Error

## ❌ The Problem You Encountered

```
ERROR: Unknown database 'cms-db'
```

This error means:
1. Your application tried to connect to the database
2. The database doesn't exist on Render
3. The credentials or database name is wrong

---

## ✅ The Solution

You need to do ONE of the following:

### OPTION A: Create Database on Render (Recommended) ⭐

1. **Go to Render Dashboard**
   - https://dashboard.render.com

2. **Create a PostgreSQL Database** (Render's preferred)
   - Click: **New +** → **PostgreSQL**
   - Give it a name: `complaint_db`
   - Click: **Create Database**

3. **Copy Connection Details**
   Render will show you:
   ```
   - Host: [something].render.com
   - Port: 5432
   - Database: complaint_db
   - User: [username]
   - Password: [password]
   ```

4. **Update Your Web Service Environment Variables**
   Go back to your Web Service → Environment and update:
   ```
   DB_URL=postgresql://[host]:5432/complaint_db
   DB_USERNAME=[username]
   DB_PASSWORD=[password]
   ```

5. **Update application.properties** (Optional - auto-detected)
   Or add this for PostgreSQL:
   ```
   spring.datasource.driver-class-name=org.postgresql.Driver
   ```

6. **Add PostgreSQL Driver to pom.xml** (if using PostgreSQL)
   Add this dependency:
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

---

### OPTION B: Use External MySQL Database

If you want to keep MySQL, use an external provider:

**Providers:**
- AWS RDS (https://aws.amazon.com)
- TiDB Cloud (https://cloud.tidb.com)
- PlanetScale (https://planetscale.com)
- Azure Database (https://azure.microsoft.com)
- DigitalOcean (https://digitalocean.com)

**Steps:**
1. Create MySQL database on the provider
2. Get connection string (looks like: `mysql://user:pass@host:3306/database`)
3. Set in Render environment:
   ```
   DB_URL=jdbc:mysql://[host]:3306/[database]
   DB_USERNAME=[user]
   DB_PASSWORD=[password]
   ```

---

### OPTION C: Quick Fix (For Testing)

If you just want to test locally or temporarily:

1. Ensure MySQL is running locally
2. Create database manually:
   ```sql
   CREATE DATABASE cms_db;
   ```
3. Set environment variables:
   ```
   DB_URL=jdbc:mysql://localhost:3306/cms_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
4. Run locally:
   ```bash
   ./mvnw clean package -DskipTests
   java -jar target/complaint-mng-sys-0.0.1-SNAPSHOT.jar
   ```

---

## 🔍 What Was Fixed in Your Code

### Fixed in application.properties:
1. ✅ Removed deprecated `spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect`
   - This was causing the HHH90000025 warning
   - Spring Boot auto-detects the dialect now

2. ✅ Database URL remains correct: `jdbc:mysql://localhost:3306/cms_db`
   - Using underscore (cms_db) not hyphen (cms-db)

---

## 📋 Render Environment Variables (Complete)

Set these in **Render Dashboard → Environment**:

```
# Database Connection
DB_URL=postgresql://[host]:5432/complaint_db
(or jdbc:mysql://[host]:3306/cms_db for MySQL)

DB_USERNAME=[your_database_user]
DB_PASSWORD=[your_strong_password]

# JWT Secret
JWT_SECRET=[your_generated_32+_char_secret]

# Spring Boot Settings
SPRING_JPA_HIBERNATE_DDL_AUTO=update
(use 'validate' for production)
```

---

## ✅ Step-by-Step Fix for Your Current Deployment

### Step 1: Fix Code (Already Done ✓)
- `application.properties` has been updated
- Removed deprecated dialect warning
- Ready to redeploy

### Step 2: Create Database on Render
1. Go to Render Dashboard
2. Create PostgreSQL database
3. Get connection details

### Step 3: Update Environment Variables
Set in Render (Web Service → Environment):
```
DB_URL=postgresql://[render_host]:5432/complaint_db
DB_USERNAME=[username]
DB_PASSWORD=[password]
JWT_SECRET=[your_generated_secret]
```

### Step 4: Redeploy
1. Commit your code:
   ```bash
   git add .
   git commit -m "Fix: Remove deprecated MySQL dialect warning"
   git push
   ```

2. Render auto-deploys on push
3. Watch logs for success

### Step 5: Verify
```bash
# Check if it's running
curl https://your-service.onrender.com/actuator/health

# You should see: {"status":"UP"}
```

---

## 🔨 Troubleshooting

### Still getting "Unknown database" error?
1. Check environment variables are set correctly
2. Verify database exists on Render
3. Test connection locally first
4. Check Render logs for specific error

### Connection timeout?
1. Check firewall rules on database
2. Verify network/VPC settings
3. Ensure database is in same region as Render service

### Authentication failed?
1. Verify username/password are correct
2. Check for special characters (need URL encoding)
3. Test locally with same credentials

---

## 📚 Reference

**MySQL Connection String Format:**
```
jdbc:mysql://[host]:[port]/[database]
```

**PostgreSQL Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Render PostgreSQL Auto-Connection:**
Render provides: `DB_URL=postgresql://...`
Use this directly!

---

## ✨ After Deployment Success

Once your app is running:

1. **Test Register Endpoint:**
   ```bash
   curl -X POST https://your-service.onrender.com/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"Password123"}'
   ```

2. **Expected Response:**
   ```json
   {
     "token": "eyJhbGc..."
   }
   ```

3. **Test Login Endpoint:**
   ```bash
   curl -X POST https://your-service.onrender.com/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Password123"}'
   ```

4. **Use JWT Token for Protected Endpoints:**
   ```bash
   curl https://your-service.onrender.com/api/complaints \
     -H "Authorization: Bearer eyJhbGc..."
   ```

---

## 🎯 Quick Checklist

- [ ] Database created on Render (or external provider)
- [ ] DB_URL environment variable set correctly
- [ ] DB_USERNAME environment variable set
- [ ] DB_PASSWORD environment variable set
- [ ] Code committed and pushed to Git
- [ ] Render shows "Build succeeded"
- [ ] Render logs show "Complaint Management System is running..."
- [ ] Health check passes: `/actuator/health` returns UP
- [ ] Can register user: POST /auth/register works
- [ ] Can login: POST /auth/login returns token

---

**Status:** ✅ Code fixed - Ready for Render deployment
**Next Step:** Create database and redeploy
