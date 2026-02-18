from setuptools import setup, find_packages

setup(
    name="masjid-backend",
    version="1.0.0",
    description="Backend API for Mosque Management System",
    author="Your Name",
    author_email="your.email@example.com",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.104.1",
        "uvicorn==0.24.0",
        "sqlalchemy==2.0.23",
        "pymysql==1.1.0",
        "python-dotenv==1.0.0",
        "pydantic==2.5.0",
        "python-multipart==0.0.6",
        "bcrypt==4.1.2",
        "python-jose[cryptography]==3.3.0",
        "passlib[bcrypt]==1.7.4",
        "email-validator==2.1.0",
    ],
    python_requires=">=3.8",
)
