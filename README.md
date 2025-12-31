# Admin Dashboard - MEAN Stack Application

A full-featured Admin Dashboard built with the MEAN stack (MongoDB, Express, Angular, Node.js), featuring user management, analytics visualization, and role-based access control.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features Implemented](#features-implemented)
- [System Requirements](#system-requirements)
- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Project Overview

This is a professional admin dashboard application designed for managing users and analyzing business metrics. The application provides:

- **User Authentication** - Email/password and Google OAuth 2.0 login
- **User Management** - CRUD operations with role-based access control
- **Analytics Dashboard** - Real-time data visualization with multiple chart types
- **Responsive Design** - Mobile-friendly interface with Material Design
- **Dark Theme Support** - Toggle between light and dark modes

### Key Use Cases
- Admin users can log in and access the dashboard
- Manage application users (create, read, update, delete)
- View analytics metrics and trends with interactive charts
- Export data to CSV format
- Filter analytics by date range

---

## Tech Stack

### Frontend
- **Framework**: Angular 16.0.0
- **Language**: TypeScript 5.0.2
- **UI Library**: Angular Material Design
- **Data Visualization**: D3.js 7.8.0
- **State Management**: RxJS 7.8.0
- **HTTP Client**: Angular HttpClient
- **Styling**: SCSS with CSS Grid & Flexbox
- **Build Tool**: Angular CLI 16

### Backend
- **Runtime**: Node.js (v16 or v18 recommended)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 5.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Database ORM**: Mongoose 7.0.0

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **API Testing**: REST endpoints via HTTP/HTTPS

---

## Features Implemented

### Authentication
- ✅ Email/Password login with JWT tokens
- ✅ Google OAuth 2.0 integration
- ✅ 7-day token expiry
- ✅ Admin email whitelist for Google login
- ✅ Token storage in localStorage
- ✅ Role-based access control (Admin/User)

### User Management
- ✅ View all users with pagination and sorting
- ✅ Search users by name/email
- ✅ Create new users (admin only)
- ✅ Edit user information
- ✅ Delete users
- ✅ Activate/deactivate users
- ✅ Export user data to CSV
- ✅ Material Data Table integration

### Analytics Dashboard
- ✅ Real-time metric cards (Active Users, New Signups, Revenue, Conversion Rate, User Engagement)
- ✅ Interactive charts:
  - Line chart: Active Users trend
  - Bar chart: Revenue by day
  - Pie chart: User distribution
- ✅ Date range filtering
- ✅ Reset filters functionality
- ✅ CSV export for analytics data
- ✅ D3.js data visualization

### UI/UX Features
- ✅ Responsive sidebar navigation
- ✅ Top navigation bar with user menu
- ✅ Dark/Light theme toggle
- ✅ Loading states and spinners
- ✅ Error message handling
- ✅ Success notifications
- ✅ Material Design components

### Security
- ✅ JWT token verification on protected routes
- ✅ Password hashing with bcryptjs
- ✅ Admin authorization middleware
- ✅ Protected API endpoints
- ✅ Route guards for authentication

---

## System Requirements

### Minimum Requirements
- **Node.js**: v16.0.0 or higher (v18+ recommended)
- **npm**: v8.0.0 or higher
- **MongoDB**: v5.0 or higher (local or cloud)
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for dependencies and database

### Recommended Setup
- **Node.js**: v18.17.0 LTS or later
- **npm**: v9.0.0 or later
- **MongoDB**: v6.0 or later
- **Angular CLI**: v16.0.0

---

## Setup Instructions

### 1. Prerequisites Installation

#### Install Node.js and npm
- Download from [nodejs.org](https://nodejs.org/)
- Verify installation:
  ```bash
  node --version    # Should be v16.0.0 or higher
  npm --version     # Should be v8.0.0 or higher
  ```

#### Install MongoDB
- **Option A - Local Installation**:
  - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Install and start MongoDB service
  - Verify: MongoDB runs on `mongodb://localhost:27017`

- **Option B - MongoDB Atlas (Cloud)**:
  - Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
  - Create a cluster and get connection string
  - Update `.env` file with Atlas connection string

#### Install Angular CLI
```bash
npm install -g @angular/cli@16
```

### 2. Clone/Extract Project

```bash
# Navigate to project directory
cd path/to/smartwinnr
```

### 3. Environment Configuration

#### Create Backend Environment File
Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/smartwinnr
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartwinnr

PORT=5000
NODE_ENV=development

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=698935738598-lc2pbvqrds4dq0nv83m0q995evb7qup5.apps.googleusercontent.com

# JWT Secret
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Admin Email for Google Login
ADMIN_EMAIL=admin@example.com
```

#### Create Frontend Environment File
Create `client/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

### 4. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

---

## Running Locally

### Start MongoDB
```bash
# If MongoDB is installed locally
mongod

# Or if using MongoDB Atlas, it runs in the cloud
```

### Terminal 1: Start Backend Server
```bash
cd server
npm start
# or
node server.js

# Server will run on http://localhost:5000
```

### Terminal 2: Seed Database (First Time Only)
```bash
cd server
node seed.js

# This creates sample users and analytics data
```

### Terminal 3: Start Frontend Development Server
```bash
cd client
npm start
# or
ng serve

# Angular app will run on http://localhost:4200
```

### Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000/api
- **Default Login**: 
  - Email: `john@example.com`
  - Password: `password123`
  - Or use Google Sign-In

---

## API Endpoints

### Authentication Routes
```
POST   /api/auth/login           - Email/password login
POST   /api/auth/google          - Google OAuth login
GET    /api/auth/current         - Get current user (protected)
```

### User Routes (Protected)
```
GET    /api/users                - Get all users
GET    /api/users/:id            - Get user by ID
POST   /api/users                - Create new user
PUT    /api/users/:id            - Update user
DELETE /api/users/:id            - Delete user
PATCH  /api/users/:id/status     - Toggle user status
```

### Analytics Routes (Protected)
```
GET    /api/analytics            - Get analytics data
GET    /api/analytics/summary    - Get summary statistics
```

### Query Parameters
```
Analytics filtering:
?startDate=2025-12-01&endDate=2025-12-31
```

---

## Environment Variables

### Backend (.env file in `server/`)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/smartwinnr |
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| GOOGLE_CLIENT_ID | Google OAuth client ID | 698935... |
| JWT_SECRET | JWT signing secret | your_secret_key |
| JWT_EXPIRE | Token expiration | 7d |
| ADMIN_EMAIL | Admin email for Google login | admin@example.com |

### Frontend (environment.ts)

| Variable | Description | Example |
|----------|-------------|---------|
| apiUrl | Backend API base URL | http://localhost:5000/api |
| production | Production flag | false (for development) |

---

## Project Structure

```
smartwinnr/
├── client/                          # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/       # Analytics dashboard
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   └── dashboard.component.scss
│   │   │   │   ├── login/           # Login page
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.scss
│   │   │   │   ├── users/           # User management
│   │   │   │   │   ├── users.component.ts
│   │   │   │   │   ├── users.component.html
│   │   │   │   │   └── users.component.scss
│   │   │   │   └── layout/          # Main layout
│   │   │   │       ├── layout.component.ts
│   │   │   │       ├── layout.component.html
│   │   │   │       └── layout.component.scss
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── analytics.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── app.module.ts
│   │   │   └── app.component.ts
│   │   ├── assets/                  # Images and assets
│   │   ├── styles.scss              # Global styles
│   │   ├── index.html
│   │   └── main.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── server/                          # Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── analyticsController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── analyticsRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── README.md                        # This file
├── QUICKSTART.md
├── SETUP.md
└── package.json
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 4200 (frontend)
lsof -ti:4200 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Verify MongoDB is running: `mongod` command
- Check connection string in `.env` file
- Ensure MongoDB service is started
- For MongoDB Atlas, verify network access and connection string

### CORS Issues
- Backend should allow requests from `http://localhost:4200`
- Check `server/server.js` CORS configuration
- Verify backend is running on correct port

### Module Not Found
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Cannot Find Module @angular/core
```bash
cd client
npm install --legacy-peer-deps
```

### Google Sign-In Not Working
- Verify Google Client ID in `client/src/index.html`
- Check admin email whitelist in backend `.env`
- Ensure Google OAuth credentials are correct

### Database Already Seeded
```bash
# Re-seed the database (deletes existing data)
cd server
node seed.js
```

---

## Default Test Credentials

| Field | Value |
|-------|-------|
| Email | john@example.com |
| Password | password123 |
| Role | Admin |

**Note**: Change these credentials in production!

### Other Test Users
- jane@example.com
- bob@example.com
- alice@example.com
- charlie@example.com
- diana@example.com
- eve@example.com
- frank@example.com

All test users have password: `password123`

---

## Building for Production

### Build Frontend
```bash
cd client
ng build --configuration production

# Output in: client/dist/admin-dashboard/
```

### Prepare Backend
```bash
cd server
# Ensure all dependencies are installed
npm install

# Update .env file with production values
```

### Deploy
- Deploy frontend dist folder to CDN or static hosting
- Deploy server to Node.js hosting (Heroku, DigitalOcean, AWS, etc.)
- Update API URLs in frontend for production backend

---

## Performance Optimization

### Frontend
- Lazy loading for feature modules
- OnPush change detection strategy
- Tree shaking with production builds
- Compression of assets

### Backend
- Database indexing on frequently queried fields
- Request logging and monitoring
- Error handling and validation
- Rate limiting for API endpoints

---

## Security Best Practices

### Implementation
- ✅ JWT tokens with expiration
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Protected API endpoints
- ✅ Admin authorization checks
- ✅ Input validation and sanitization
- ✅ HTTPS ready

### Recommendations for Production
- Use HTTPS/SSL certificates
- Implement rate limiting
- Add CORS whitelist
- Use secure session cookies
- Implement CSRF protection
- Add request validation middleware
- Monitor and log security events
- Regular security audits

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

---

## Support & Documentation

- [Angular Documentation](https://angular.io/docs)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material Design](https://material.angular.io/)
- [D3.js Documentation](https://d3js.org/)
- [RxJS Documentation](https://rxjs.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

## License

This project is proprietary and confidential.

---

## Version History

- **v1.0.0** (2025-12-31) - Initial release
  - User authentication with JWT and Google OAuth
  - User management interface
  - Analytics dashboard with charts
  - Dark/Light theme toggle
  - CSV export functionality
  - Responsive Material Design UI

---

## Changelog

### Latest Changes
- Removed retention rate metric from analytics
- Streamlined dashboard to 5 core metrics
- Fixed sidebar navigation (removed Settings, Account, Logout buttons)
- Updated seed data generation
- Enhanced authentication flow

---

**Last Updated**: December 31, 2025

**Maintained By**: Admin Dashboard Team

**Status**: ✅ Production Ready
│   ├── package.json       # Dependencies
│   └── .env.example       # Environment template
│
└── client/                # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── services/
    │   │   │   ├── auth.service.ts
    │   │   │   ├── user.service.ts
    │   │   │   └── analytics.service.ts
    │   │   ├── components/
    │   │   │   ├── login/
    │   │   │   ├── dashboard/
    │   │   │   ├── users/
    │   │   │   └── layout/
    │   │   ├── guards/
    │   │   │   └── auth.guard.ts
    │   │   ├── app.module.ts
    │   │   ├── app-routing.module.ts
    │   │   └── app.component.ts
    │   ├── main.ts
    │   ├── index.html
    │   └── styles.scss
    ├── package.json
    ├── angular.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (v4.4+ or MongoDB Atlas)
- **npm** or **yarn**
- **Angular CLI** (optional): `npm install -g @angular/cli`

### 1. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Update .env with your values:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Any random string for JWT signing
# - GOOGLE_CLIENT_ID: Your Google OAuth Client ID
# - GOOGLE_CLIENT_SECRET: Your Google OAuth Secret
# - PORT: (default 5000)

# Start server
npm start
# Or for development with auto-reload
npm run dev
```

### 2. Setup Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Update Google Client ID
# In src/app/components/login/login.component.ts
# Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google Client ID

# Start development server
npm start

# Open browser at http://localhost:4200
```

## 🔑 Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:4200` (development)
   - Your production domain
6. Copy Client ID and Client Secret

## 📊 Sample Data

The backend automatically seeds the database with sample data on first run:
- **5 Sample Users** (1 Admin, 4 Regular Users)
- **30 Days of Analytics Data** (simulated metrics)

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/google-login` - Google SSO login
- `GET /api/auth/me` - Get current user

### Users (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/status` - Toggle user status

### Analytics (Admin only)
- `GET /api/analytics` - Get analytics data (with date range filtering)
- `GET /api/analytics/summary` - Get analytics summary

## 🎯 Usage Guide

### Login
1. Click "Sign in with Google"
2. Only Admin users can access the dashboard
3. After login, you'll be redirected to the dashboard

### Dashboard
- View key metrics (Active Users, Sign-ups, Revenue, etc.)
- Filter by custom date range
- Export data as CSV or Excel
- View interactive D3.js charts

### User Management
- View all users in a sortable/filterable table
- Edit user details
- Activate/Deactivate users
- Delete users
- Search by name or email
- Export user list to CSV

### Theme
- Toggle between Light and Dark mode
- Preference is stored in browser

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Google Auth Library** - SSO

### Frontend
- **Angular 16** - Web framework
- **Angular Material** - UI Component library
- **D3.js** - Data visualization
- **RxJS** - Reactive programming
- **TypeScript** - Language

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

### Frontend
```json
{
  "@angular/core": "^16.0.0",
  "@angular/material": "^16.0.0",
  "d3": "^7.8.0",
  "rxjs": "^7.8.0"
}
```

## 🔒 Security Features

- ✅ Google SSO authentication
- ✅ JWT token-based API authentication
- ✅ Role-based access control (RBAC)
- ✅ CORS enabled for secure API access
- ✅ Environment variables for sensitive data
- ✅ Input validation on server

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, whitelist your IP

### Google Login Not Working
- Verify `GOOGLE_CLIENT_ID` is correct
- Check Google Cloud Console settings
- Ensure authorized redirect URIs are configured

### Charts Not Displaying
- Check browser console for errors
- Ensure D3.js is loaded
- Verify container elements exist

### CORS Errors
- Check backend CORS configuration
- Ensure frontend URL is allowed
- Verify API URL in services

## 📈 Performance Optimization

- Lazy loading of modules
- Efficient D3.js rendering
- MongoDB indexes on frequently queried fields
- Client-side pagination

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
cd server
heroku login
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Netlify Example)
```bash
cd client
npm run build
# Deploy dist/admin-dashboard folder to Netlify
```

## 📝 Environment Variables

Create `.env` in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your_super_secret_jwt_key_123456
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
```

## 💡 Future Enhancements

- [ ] Email notifications
- [ ] Advanced reporting (PDF generation)
- [ ] Data caching (Redis)
- [ ] Real-time updates (WebSocket)
- [ ] Advanced search filters
- [ ] Custom dashboard widgets
- [ ] Two-factor authentication (2FA)
- [ ] Activity audit logs
- [ ] API rate limiting

## 📄 License

MIT License - Feel free to use for commercial or personal projects

## 🤝 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using MEAN Stack**
