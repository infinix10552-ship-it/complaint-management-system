# Render Deployment Fix - Schema Validation Error

## Problem Summary
The deployment failed with the error:
```
Schema-validation: missing table [complaint]
org.hibernate.tool.schema.spi.SchemaManagementException: Schema-validation: missing table [complaint]
```

## Root Cause
The `render.yaml` was configured with `SPRING_JPA_HIBERNATE_DDL_AUTO=validate`, which tells Hibernate to **only validate** that tables exist, but **NOT create them**. Since the TiDB Cloud database was newly created, the tables didn't exist yet.

## Solution Implemented

### 1. **Updated `application.properties`** ✅
```ini
spring.jpa.hibernate.ddl-auto=${DDL_AUTO:update}
spring.sql.init.mode=always
spring.sql.init.data-locations=classpath:data.sql
```

- Uses environment variable `DDL_AUTO` so it can be changed per environment
- Falls back to `update` if not set
- **Enabled SQL initialization** to load `data.sql` after tables are created

### 2. **Updated `render.yaml`** ✅
```yaml
- key: DDL_AUTO
  value: "create" # Creates tables on first deployment
```

Changed from `validate` to `create` to ensure tables are created on first deployment.

## Deployment Steps

### First Time Deployment (Initial Setup):
1. **Ensure TiDB Cloud credentials are configured in Render**:
   - `DB_URL`: Connection string from TiDB Cloud
   - `DB_USERNAME`: TiDB username
   - `DB_PASSWORD`: TiDB password
   - `JWT_SECRET`: Your JWT secret key

2. **Deploy with `render.yaml` DDL_AUTO=create**:
   - This will create the `user` and `complaint` tables
   - It will also load sample data from `data.sql`

3. **Verify the deployment**:
   - Check logs for "BUILD SUCCESS"
   - Check for table creation logs
   - The app should start on port 10000

### Subsequent Deployments (Safe Updates):
After the first successful deployment, update `render.yaml`:
```yaml
- key: DDL_AUTO
  value: "update" # Safely updates schema without dropping data
```

This allows schema changes without losing existing data.

## Key Files Modified
1. **`src/main/resources/application.properties`**
   - Added `spring.sql.init.mode=always`
   - Added `spring.sql.init.data-locations=classpath:data.sql`
   - Made `DDL_AUTO` configurable via environment variable

2. **`render.yaml`**
   - Changed `SPRING_JPA_HIBERNATE_DDL_AUTO` → `DDL_AUTO`
   - Changed `validate` → `create` for initial deployment

3. **`src/main/resources/data.sql`**
   - Already contains sample data for users and complaints
   - Will be automatically inserted after tables are created

## Verification Checklist
- [ ] TiDB Cloud database is created
- [ ] Connection credentials are added to Render environment variables
- [ ] `render.yaml` has `DDL_AUTO: create`
- [ ] Deployment builds successfully
- [ ] Check Render logs show table creation
- [ ] Verify tables exist in TiDB Cloud console
- [ ] Sample data is populated
- [ ] API endpoints respond correctly

## Environment Variables Required in Render
```
DB_URL=mysql://[region].cn-beijing.db.tidbcloud.com:4000/complaint_db
DB_USERNAME=your_tidb_username
DB_PASSWORD=your_tidb_password
JWT_SECRET=your_jwt_secret
DDL_AUTO=create  # First deployment only
```

## Troubleshooting

### If "missing table" error appears again:
1. Check Render environment variables are set correctly
2. Verify TiDB Cloud connection string format
3. Ensure `DDL_AUTO=create` is set
4. Check Render logs for connection errors
5. Verify database credentials on TiDB Cloud

### After successful first deployment:
1. **Change `render.yaml` to use `DDL_AUTO=update`** to prevent data loss
2. Redeploy with the new setting
3. Future deployments will safely update the schema

## Database Initialization Flow
1. Spring Boot starts
2. Loads `application.properties` with `DDL_AUTO=create`
3. Creates `user` table via Hibernate
4. Creates `complaint` table via Hibernate
5. Loads `data.sql` into both tables
6. Application is ready to serve requests

## Notes
- TiDB Cloud uses MySQL-compatible protocol
- The connection string should include region (e.g., `.cn-beijing.db.tidbcloud.com`)
- Sample data will be re-inserted on every deployment with `DDL_AUTO=create` (so data gets reset)
- For production, once stable, consider using `DDL_AUTO=validate` to prevent accidental schema changes
