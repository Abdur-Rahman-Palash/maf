# Masjid Management Backend API

FastAPI + MySQL backend for Mosque Management System

## 🚀 Features

- **User Management**: Registration, authentication, role-based access
- **Event Management**: CRUD operations for mosque events
- **Donation Management**: Track donations with different types (zakat, sadaqa, etc.)
- **Content Management**: Manage sermons, announcements, blogs
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Clean REST API design
- **Database**: MySQL with SQLAlchemy ORM

## 📋 Requirements

- Python 3.8+
- MySQL 8.0+
- pip (Python package manager)

## 🛠️ Installation

### 1. Clone and Setup
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Database Setup
```sql
-- Create database
CREATE DATABASE masjid_db;

-- Create user (optional)
CREATE USER 'masjid_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON masjid_db.* TO 'masjid_user'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/masjid_db
SECRET_KEY=your-secret-key-here
```

### 6. Initialize Database
```bash
python database.py
```

## 🚀 Running the Server

### Development
```bash
python main.py
```

### Production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 API Endpoints

### Authentication
- `POST /auth/login` - User login and get JWT token

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/{id}` - Get specific user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Events
- `GET /events` - Get all events
- `POST /events` - Create new event
- `GET /events/search?q=query` - Search events
- `GET /events/{id}` - Get specific event
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event

### Donations
- `GET /donations` - Get all donations
- `POST /donations` - Create new donation
- `GET /donations/search?q=query` - Search donations
- `GET /donations/{id}` - Get specific donation
- `PUT /donations/{id}` - Update donation
- `DELETE /donations/{id}` - Delete donation

### Content
- `GET /content` - Get all content
- `POST /content` - Create new content
- `GET /content/search?q=query` - Search content
- `GET /content/{id}` - Get specific content
- `PUT /content/{id}` - Update content
- `DELETE /content/{id}` - Delete content

### Statistics
- `GET /stats` - Get dashboard statistics

## 🔒 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Schema

### Users Table
- id, name, email, password (hashed), role, phone, address, status, skills, notes

### Events Table
- id, title, description, date, time, location, category, max_attendees, current_attendees, status

### Donations Table
- id, donor_name, email, amount, type, purpose, status, payment_method, date, recurring

### Content Table
- id, title, type, content, author, status, publish_date, tags

## 🧪 Testing

### Test with curl
```bash
# Login and get token
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=admin@example.com&password=password"

# Create event with token
curl -X POST "http://localhost:8000/events" \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Friday Prayer","date":"2024-01-20T13:00:00","location":"Main Hall","category":"Prayer"}'
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL` - MySQL connection string
- `SECRET_KEY` - JWT secret key
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiry time
- `ALLOWED_ORIGINS` - CORS allowed origins

## 🚨 Common Issues

1. **Database Connection Error**
   - Check MySQL service is running
   - Verify DATABASE_URL in .env file
   - Ensure database exists

2. **Module Import Error**
   - Activate virtual environment
   - Install requirements: `pip install -r requirements.txt`

3. **CORS Error**
   - Add frontend URL to ALLOWED_ORIGINS
   - Check .env configuration

## 📝 Development

### Add New Endpoint
1. Define schema in `schemas.py`
2. Add CRUD functions in `crud.py`
3. Create endpoint in `main.py`
4. Update documentation

### Database Migration
```bash
# For schema changes
python database.py  # This will create/update tables
```

## 🌟 Production Deployment

### Docker (Recommended)
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Setup
- Use environment variables for configuration
- Set strong SECRET_KEY
- Configure proper database credentials
- Enable HTTPS in production

## 📞 Support

For issues and questions:
1. Check API documentation at `/docs`
2. Review logs for error details
3. Verify database connection
4. Test with provided curl examples
