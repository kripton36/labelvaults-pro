# LabelVaults - Premium Label Printing Platform

A modern web application for professional label printing services with a comprehensive backend API.

## Features

### Frontend
- **Landing Page**: Marketing site with service showcase
- **User Dashboard**: Order management, file uploads, wallet management
- **Authentication**: Login/signup with JWT tokens
- **Responsive Design**: Modern UI with Tailwind CSS and Radix UI components

### Backend API

#### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- JWT-based authentication with 7-day token expiration

#### User Management
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile

#### Order Management
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order
- `PATCH /api/orders/[id]` - Update order

#### Wallet & Payments
- `GET /api/wallet` - Get wallet balance and transactions
- `POST /api/wallet` - Top up wallet

#### File Upload
- `POST /api/upload` - Upload files for orders
- Supports: JPEG, PNG, GIF, PDF, Illustrator files
- Max file size: 10MB

## API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Corp"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "Product Labels",
  "quantity": 1000,
  "specifications": {
    "size": "2x1 inches",
    "material": "Vinyl",
    "finish": "Matte",
    "colors": ["Red", "Blue"]
  },
  "files": ["/uploads/file1.pdf"],
  "rushOrder": false,
  "specialInstructions": "Handle with care"
}
```

#### Get Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

### Wallet

#### Top Up Wallet
```http
POST /api/wallet
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100.00,
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardNumber": "**** **** **** 1234"
  }
}
```

### File Upload

#### Upload Files
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: [file1, file2, ...]
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# Create .env.local file
JWT_SECRET=your-secret-key-here
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── orders/            # Order management
│   │   ├── wallet/            # Payment processing
│   │   ├── upload/            # File upload
│   │   └── user/              # User profile
│   ├── dashboard/             # User dashboard
│   ├── login/                 # Authentication pages
│   └── page.tsx              # Landing page
├── components/                # UI components
├── lib/                      # Utilities and shared code
│   ├── auth.ts              # JWT authentication
│   ├── auth-context.tsx     # React auth context
│   ├── api-client.ts        # API client
│   └── data-store.ts        # Shared data store
└── styles/                   # Global styles
```

## Data Models

### User
```typescript
interface User {
  id: string
  email: string
  password: string // hashed
  firstName: string
  lastName: string
  company?: string
  walletBalance: number
  createdAt: string
  updatedAt?: string
}
```

### Order
```typescript
interface Order {
  id: string
  userId: string
  type: string
  quantity: number
  specifications?: {
    size?: string
    material?: string
    finish?: string
    colors?: string[]
  }
  status: 'Pending' | 'In Production' | 'Completed' | 'Cancelled'
  progress: number
  createdAt: string
  updatedAt: string
  estimatedDelivery: string
}
```

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Zod schema validation
- **File Upload Security**: Type and size validation
- **CORS Protection**: Built-in Next.js protection

## Development Notes

- **In-Memory Storage**: Currently uses in-memory arrays for demonstration
- **Production Ready**: Can be easily migrated to PostgreSQL, MongoDB, etc.
- **File Storage**: Currently simulates file uploads (ready for AWS S3, etc.)
- **Payment Processing**: Simulated payment processing (ready for Stripe, etc.)

## Next Steps

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **File Storage**: Integrate with AWS S3 or similar
3. **Payment Gateway**: Integrate with Stripe or PayPal
4. **Email Service**: Add email notifications
5. **Admin Panel**: Create admin dashboard for order management
6. **Analytics**: Add order tracking and analytics
7. **Testing**: Add comprehensive test suite

## License

MIT License - see LICENSE file for details.