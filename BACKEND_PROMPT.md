# Backend Development Prompt for PulseTunez E-Commerce Platform

Copy and paste this prompt when starting a new backend project for PulseTunez:

---

## PROMPT START

I need you to build a complete backend API for an e-commerce platform called "PulseTunez" that sells audio equipment, musical instruments, and studio gear. The frontend is already built with Nuxt.js/Vue 3, and I need a backend that matches all the frontend functionality.

## Tech Stack Requirements

- **Backend Framework**: Node.js with Express (TypeScript recommended)
- **Database**: PostgreSQL (recommended) or MongoDB
- **ORM**: Prisma for database management and migrations
- **Containerization**: Docker for development and production deployment
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **File Storage**: Cloudinary for product images
- **Payment Gateway**: Paystack integration (optimized for Nigerian market)
- **Email Service**: SendGrid or Mailgun
- **Cache**: Redis for session management and caching

## Database Schema Requirements

Create the following database tables with the exact structure specified:

### Core Tables:
1. **users** - User accounts with authentication, roles (user/admin/moderator), profile info
2. **products** - Product catalog with categories, pricing, inventory, flags (hotSale, trending)
3. **categories** - Product categories with hierarchy support
4. **orders** - Order management with status workflow (pending → processing → shipped → delivered)
5. **order_items** - Order line items
6. **order_status_history** - Track order status changes
7. **cart_items** - Persistent shopping cart
8. **wishlist_items** - User wishlist
9. **recently_viewed** - Recently viewed products tracking
10. **shipping_addresses** - User shipping addresses with default selection
11. **payment_methods** - Saved payment methods (Paystack integration)
12. **ads** - Promotional banners/ads management

**IMPORTANT**: Use Prisma ORM for database operations. The complete Prisma schema with all models, relationships, and enums is provided in BACKEND_SPECIFICATION.md. Use the exact field names, data types, and relationships specified. The frontend expects these exact field names.

## API Endpoints Requirements

Implement ALL the following API endpoints with exact request/response formats:

### Authentication Endpoints:
- POST /api/auth/register - User registration
- POST /api/auth/login - User login (returns JWT)
- POST /api/auth/logout - User logout
- POST /api/auth/forgot-password - Password reset request
- POST /api/auth/reset-password - Password reset with token
- POST /api/auth/verify-email - Email verification
- POST /api/auth/google - Google OAuth
- POST /api/auth/facebook - Facebook OAuth

### User Profile Endpoints:
- GET /api/users/me - Get current user profile
- PUT /api/users/me - Update user profile
- PUT /api/users/me/avatar - Update avatar (multipart/form-data)
- PUT /api/users/me/password - Change password

### Product Endpoints:
- GET /api/products - Get all products with filtering, pagination, search
- GET /api/products/:id - Get single product by ID or slug
- GET /api/products/featured - Get featured products
- GET /api/products/trending - Get trending products
- GET /api/products/hot-sale - Get hot sale products

### Category Endpoints:
- GET /api/categories - Get all categories
- GET /api/categories/:slug - Get category with products

### Cart Endpoints:
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:itemId - Update cart item quantity
- DELETE /api/cart/:itemId - Remove item from cart
- DELETE /api/cart - Clear cart

### Wishlist Endpoints:
- GET /api/wishlist - Get user's wishlist
- POST /api/wishlist - Add item to wishlist
- DELETE /api/wishlist/:productId - Remove item from wishlist
- DELETE /api/wishlist - Clear wishlist

### Order Endpoints:
- POST /api/orders - Create new order (with Paystack transaction)
- GET /api/orders - Get user's orders with pagination
- GET /api/orders/:id - Get single order details
- POST /api/orders/:id/cancel - Cancel order
- GET /api/orders/track/:orderNumber - Public order tracking

### Shipping Address Endpoints:
- GET /api/shipping-addresses - Get user's addresses
- POST /api/shipping-addresses - Add new address
- PUT /api/shipping-addresses/:id - Update address
- DELETE /api/shipping-addresses/:id - Delete address
- PUT /api/shipping-addresses/:id/default - Set as default

### Payment Method Endpoints:
- GET /api/payment-methods - Get saved payment methods
- POST /api/payment-methods - Add payment method (Paystack authorization code)
- DELETE /api/payment-methods/:id - Delete payment method
- PUT /api/payment-methods/:id/default - Set as default

### Recently Viewed Endpoints:
- GET /api/recently-viewed - Get recently viewed products
- POST /api/recently-viewed - Add to recently viewed
- DELETE /api/recently-viewed - Clear history

### Ads Endpoints:
- GET /api/ads - Get active ads
- POST /api/ads/:id/view - Increment ad view count

### Admin Endpoints (Admin Role Required):
- GET /api/admin/products - Get all products (admin view)
- POST /api/admin/products - Create product (with image upload)
- PUT /api/admin/products/:id - Update product
- DELETE /api/admin/products/:id - Delete product
- GET /api/admin/orders - Get all orders (admin view with filters)
- PUT /api/admin/orders/:id/status - Update order status
- DELETE /api/admin/orders/:id - Delete order
- GET /api/admin/users - Get all users (admin view)
- PUT /api/admin/users/:id/status - Update user status
- DELETE /api/admin/users/:id - Delete user
- GET /api/admin/analytics - Get analytics data
- GET /api/admin/ads - Get all ads
- POST /api/admin/ads - Create ad
- PUT /api/admin/ads/:id - Update ad
- DELETE /api/admin/ads/:id - Delete ad

**CRITICAL**: The response formats must match exactly what the frontend expects. See BACKEND_SPECIFICATION.md for detailed request/response examples.

## Key Implementation Requirements

### 1. Authentication & Authorization
- Implement JWT authentication with access tokens
- Token should include: userId, email, role, iat, exp
- Implement role-based access control (user, moderator, admin)
- All protected routes must verify JWT and check roles
- Password hashing with bcrypt (cost factor 12)
- Password validation: min 8 chars, uppercase, lowercase, number, special char

### 2. Order Status Workflow
Orders must follow this exact status flow:
- pending → processing → shipped → delivered
- Orders can be cancelled from pending or processing
- Track all status changes in order_status_history table
- Generate order numbers in format: PT-{YEAR}-{RANDOM}

### 3. Database Management (Prisma)
- Use Prisma ORM for all database operations
- Set up Prisma with PostgreSQL provider
- Define all models in prisma/schema.prisma file
- Use Prisma Client for queries (generated from schema)
- Run migrations with `npx prisma migrate dev`
- Use Prisma Studio for database GUI (`npx prisma studio`)
- Implement database seeding with `npx prisma db seed`
- Use Prisma's type-safe queries throughout the application

### 4. Payment Integration (Paystack)
- Initialize Paystack transaction on order creation
- Return reference, accessCode, and authorizationUrl to frontend
- Handle Paystack webhooks for payment confirmation
- Support card type detection: Visa, Mastercard, Verve
- Support bank transfer, USSD, and other Paystack payment methods
- Update order status to "processing" on successful payment
- Store authorization code in payment_methods table

### 5. Product Features
- Products have flags: hotSale, trending, status (active/inactive/out-of-stock)
- Calculate salePrice automatically if discount > 0 and salePrice not provided
- Track product views
- Support product search by name and description
- Filter by category, price range, hotSale, trending, status
- Pagination support on all list endpoints

### 6. File Upload
- Accept images: JPG, PNG, GIF
- Max file size: 5MB
- Upload to Cloudinary
- Return CDN URL
- Validate file type and size before upload

### 7. Email Notifications
Implement these email types:
- Welcome email after registration
- Email verification with link
- Password reset with link
- Order confirmation after successful payment
- Order status updates
- Shipping notification with tracking number

### 8. Error Handling
Use this standard error response format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

Common error codes: AUTH_REQUIRED, INVALID_TOKEN, INSUFFICIENT_PERMISSIONS, VALIDATION_ERROR, NOT_FOUND, CONFLICT, INTERNAL_ERROR

### 9. Rate Limiting
- Public endpoints: 100 requests/15min per IP
- Authenticated endpoints: 1000 requests/15min per user
- Admin endpoints: 5000 requests/15min per admin
- Return rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

### 10. Caching (Redis)
- Cache product lists: 5 minutes
- Cache single products: 10 minutes
- Cache categories: 1 hour
- Cache user cart: 1 minute
- Cache analytics: 5 minutes
- Invalidate cache on create/update/delete operations

### 11. Security Requirements
- Implement security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, CSP
- Validate all input using Joi or Zod schemas
- Sanitize user input to prevent XSS
- Use parameterized queries to prevent SQL injection
- Implement file upload validation

### 12. Response Format Standards
All successful responses should follow this format:
```json
{
  "success": true,
  "message": "Optional success message",
  "data": { ... }
}
```

All list endpoints with pagination should return:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### 13. Docker Setup
- Create Dockerfile for the application (development and production)
- Create docker-compose.yml with PostgreSQL, Redis, and app services
- Use health checks for database and Redis dependencies
- Use volumes for data persistence (postgres_data, redis_data)
- Set proper environment variables in docker-compose.yml
- Create .dockerignore file to exclude unnecessary files
- Use multi-stage build for production Dockerfile
- Provide docker-compose commands for development workflow

### 14. Nigerian Context
The frontend is designed for Nigerian users, so:
- Default country: Nigeria
- Address fields include: localGovernment, state
- Support Verve card detection (Nigerian debit cards)
- Phone format: +234 XXX XXX XXXX

## Project Structure

Organize the backend with this structure:
```
backend/
├── src/
│   ├── config/          # Database, Paystack, email, Redis config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation, rate limiting
│   ├── prisma/          # Prisma schema and migrations
│   │   └── schema.prisma
│   ├── models/          # Prisma models (optional, if using custom model layer)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic (Paystack, email, upload)
│   ├── utils/           # Helper functions
│   ├── validators/      # Input validation schemas
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── prisma/
│   └── schema.prisma   # Prisma schema file
├── tests/               # Unit and integration tests
├── .env.example         # Environment variables template
├── .dockerignore        # Docker ignore file
├── Dockerfile           # Development Dockerfile
├── Dockerfile.prod      # Production Dockerfile
├── docker-compose.yml   # Docker Compose configuration
├── package.json
└── tsconfig.json
```

## Environment Variables Required

Create a .env.example file with:
```
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SENDGRID_API_KEY=
REDIS_URL=
NODE_ENV=development
PORT=3000
```

## Testing Requirements

- Unit tests for all business logic
- Integration tests for all API endpoints
- Test authentication flow
- Test order creation and status updates
- Test payment integration (mock Paystack)
- Test file upload
- Test rate limiting
- Test validation
- Test Prisma queries and migrations
- Test Docker container setup

## Important Notes

1. **Field Names**: Use EXACT field names from the specification. The frontend expects camelCase for JSON responses (e.g., firstName, lastName, imageUrl, salePrice).

2. **Date Format**: Use ISO 8601 format for all dates (e.g., "2024-01-15T10:30:00Z").

3. **UUID**: Use UUID for all primary keys and foreign keys.

4. **Decimal Values**: Use DECIMAL(10,2) for all monetary values in database, return as numbers in JSON.

5. **Boolean Values**: Return true/false in JSON, not strings.

6. **Null Handling**: Return null for missing optional fields, not undefined.

7. **Validation**: Validate all inputs server-side, don't rely on frontend validation.

8. **Error Messages**: Provide clear, actionable error messages for users.

9. **API Versioning**: Start with /api/v1/ to allow for future versioning.

10. **Documentation**: Use Swagger/OpenAPI for API documentation.

## Frontend Integration Points

The frontend expects these specific behaviors:
- Login/Register: Returns JWT token and user object
- Product search: Supports search, category filter, price range filter
- Cart: Persists cart items for authenticated users
- Checkout: Creates order, returns Paystack transaction details
- Order tracking: Public endpoint accessible by order number
- Admin dashboard: Aggregated analytics data with period filters

## Deliverables

1. Complete backend API with all endpoints implemented
2. Prisma schema file with all models and relationships
3. Prisma migration files
4. Database seed file for initial data
5. Docker configuration (Dockerfile, docker-compose.yml)
6. Environment configuration template
7. API documentation (Swagger)
8. Test suite with >80% coverage
9. Deployment instructions
10. Postman collection for testing

## Reference Document

All detailed specifications including:
- Complete Prisma schema with all models, relationships, and enums
- Docker configuration files (Dockerfile, docker-compose.yml)
- Exact field names, data types, and response formats
- API endpoint specifications

Refer to BACKEND_SPECIFICATION.md for all implementation details.

---

## PROMPT END

## How to Use This Prompt

1. **For AI Development**: Copy the entire prompt above and paste it when starting a new conversation with an AI assistant to build the backend.

2. **For Manual Development**: Use this as your requirements document and checklist when building the backend yourself.

3. **For Team Development**: Share this prompt with your development team to ensure everyone understands the requirements.

## Additional Notes

- The frontend is located in the same repository (Nuxt.js/Vue 3)
- The frontend uses Pinia stores for state management
- The frontend currently uses localStorage for data persistence (to be replaced with API calls)
- The frontend has an admin dashboard at /admin that requires the admin endpoints
- The frontend supports dark mode and responsive design
- The frontend uses Tailwind CSS for styling

## Next Steps After Backend is Complete

1. Update frontend Pinia stores to call API endpoints instead of using localStorage
2. Implement proper error handling in frontend for API responses
3. Add loading states for all API calls
4. Update authentication to use JWT tokens
5. Integrate Paystack Inline for payment processing
6. Test the complete user flow from registration to order completion
7. Deploy backend to production (Heroku, AWS, DigitalOcean, etc.)
8. Configure production environment variables
9. Set up monitoring and logging
10. Implement webhook handlers for Paystack events
