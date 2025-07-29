# LabelVaults Backend API

A comprehensive backend API for LabelVaults - a premium label printing business platform built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Profile management, password changes, account settings
- **Product Catalog**: Comprehensive product management with pricing calculations
- **Order Management**: Full order lifecycle from creation to delivery tracking
- **File Upload**: Secure file upload with image optimization for label designs
- **Wallet System**: Digital wallet with Stripe and crypto payment integration
- **Support System**: Contact forms and support ticket management
- **Email Notifications**: Automated emails for orders, registration, and support
- **Admin Dashboard**: Complete admin interface for managing users, orders, and products

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Payment Processing**: Stripe integration
- **File Upload**: Multer with Sharp image optimization
- **Email**: Nodemailer with HTML templates
- **Logging**: Winston logger
- **Validation**: Joi schema validation
- **Security**: Helmet, CORS, rate limiting

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Stripe account (for payments)
- SMTP server (for emails)

## 🔧 Installation

1. **Clone and setup**:
```bash
cd backend
npm install
```

2. **Environment setup**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database setup**:
```bash
# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# (Optional) Seed the database
npm run seed
```

4. **Create required directories**:
```bash
mkdir -p uploads logs
```

## 🚀 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Database Management
```bash
# View database in Prisma Studio
npm run studio

# Reset database
npx prisma migrate reset

# Deploy migrations in production
npx prisma migrate deploy
```

## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require a Bearer token:
```bash
Authorization: Bearer <jwt-token>
```

### API Endpoints

#### 🔐 Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset
- `GET /auth/verify-email/:token` - Email verification
- `POST /auth/resend-verification` - Resend verification email

#### 👤 User Management
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `PATCH /users/change-password` - Change password
- `DELETE /users/account` - Delete account
- `GET /users` - Get all users (Admin only)

#### 🏷️ Products
- `GET /products` - Get products (paginated, filterable)
- `GET /products/:id` - Get single product
- `POST /products/calculate-price` - Calculate pricing
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

#### 📦 Orders
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get single order
- `PATCH /orders/:id/cancel` - Cancel order
- `GET /orders/admin/all` - Get all orders (Admin only)
- `PATCH /orders/:id/status` - Update order status (Admin only)

#### 💰 Payments & Wallet
- `GET /payments/wallet` - Get wallet balance
- `POST /payments/add-funds` - Add funds to wallet
- `GET /payments/transactions` - Get transaction history
- `POST /payments/create-payment-intent` - Create Stripe payment intent
- `POST /payments/webhook` - Stripe webhook handler

#### 📁 File Management
- `POST /files/upload` - Upload files
- `GET /files` - Get user's files
- `GET /files/:id` - Get single file
- `DELETE /files/:id` - Delete file

#### 🎫 Support
- `POST /support/contact` - Send contact message
- `POST /support/tickets` - Create support ticket
- `GET /support/tickets` - Get user's tickets
- `GET /support/tickets/:id` - Get single ticket
- `GET /support/admin/tickets` - Get all tickets (Admin only)
- `PATCH /support/tickets/:id` - Update ticket status (Admin only)

### 📝 Example API Calls

#### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "password": "securepassword",
    "company": "Acme Corp"
  }'
```

#### Calculate pricing
```bash
curl -X POST http://localhost:5000/api/products/calculate-price \
  -H "Content-Type: application/json" \
  -d '{
    "category": "PRODUCT_LABELS",
    "quantity": 1000,
    "material": "vinyl",
    "finish": "gloss"
  }'
```

#### Create an order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "items": [{
      "productId": "product-id",
      "quantity": 500,
      "material": "vinyl",
      "finish": "matte"
    }],
    "notes": "Rush order needed",
    "shippingAddress": "123 Main St, City, State 12345"
  }'
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configurable cross-origin requests  
- **Input Validation**: Joi schema validation
- **SQL Injection Prevention**: Prisma ORM protection
- **File Upload Security**: Type validation and size limits
- **Helmet**: Security headers
- **Error Handling**: Sanitized error responses

## 💳 Payment Integration

The API supports multiple payment methods:

### Stripe Integration
- Secure card payments
- Payment intents for wallet top-ups
- Webhook handling for payment confirmations
- Automatic wallet balance updates

### Cryptocurrency Support
- Bitcoin, Ethereum, USDT payment addresses
- Manual confirmation workflow
- Payment verification system

## 📧 Email System

Automated email notifications for:
- User registration and verification
- Password reset requests
- Order confirmations and updates
- Support ticket notifications
- Payment confirmations

Email templates are responsive and branded for LabelVaults.

## 🗄️ Database Schema

The database includes the following main entities:
- **Users**: Customer accounts with roles and profiles
- **Products**: Label types with pricing and specifications
- **Orders**: Order management with items and tracking
- **Wallets**: Digital wallet system for payments
- **Transactions**: Payment and wallet transaction history
- **Files**: Uploaded design files with metadata
- **Support Tickets**: Customer support system

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- Database connection string
- JWT secret key
- Stripe API keys
- SMTP configuration
- File upload settings

### Production Considerations
- Use a process manager (PM2, Docker)
- Set up database backups
- Configure reverse proxy (Nginx)
- Enable SSL/TLS
- Set up monitoring and logging
- Configure file storage (AWS S3, etc.)

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 📈 Monitoring

The API includes comprehensive logging:
- Request/response logging
- Error tracking
- Database query logging
- Performance metrics
- Security event logging

Logs are stored in `/logs` directory with rotation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

---

Built with ❤️ for LabelVaults - Premium Label Printing Solutions