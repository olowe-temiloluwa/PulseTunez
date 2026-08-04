# PulseTunez E-Commerce Backend Specification

## Project Overview
PulseTunez is a full-featured e-commerce platform for audio equipment, musical instruments, and studio gear. This document provides a complete specification for building a backend API that matches the frontend functionality.

## Tech Stack Recommendations
- **Backend Framework**: Node.js with Express (TypeScript recommended)
- **Database**: PostgreSQL (recommended) or MongoDB
- **ORM**: Prisma for database management and migrations
- **Containerization**: Docker for development and production deployment
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **File Storage**: Cloudinary for product images
- **Payment Gateway**: Paystack integration (optimized for Nigerian market)
- **Email Service**: SendGrid, Mailgun, or AWS SES
- **Cache**: Redis for session management and caching

---

## Prisma Schema

### Prisma Setup
Use Prisma ORM for database management with the following schema structure:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  passwordHash    String
  name            String
  username        String?   @unique
  phone           String?
  bio             String?
  avatarUrl       String?
  emailVerified   Boolean   @default(false)
  phoneVerified   Boolean   @default(false)
  role            UserRole  @default(USER)
  status          UserStatus @default(ACTIVE)
  totalOrders     Int       @default(0)
  totalSpent      Decimal   @default(0) @db.Decimal(10, 2)
  lastActive      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  orders          Order[]
  cartItems       CartItem[]
  wishlistItems   WishlistItem[]
  recentlyViewed  RecentlyViewed[]
  shippingAddresses ShippingAddress[]
  paymentMethods  PaymentMethod[]
  statusHistory   OrderStatusHistory[] @relation("StatusChangedBy")
}

model Product {
  id              String    @id @default(uuid())
  sku             String    @unique
  name            String
  slug            String    @unique
  categoryId      String?
  category        Category? @relation(fields: [categoryId], references: [id])
  description     String?
  price           Decimal   @db.Decimal(10, 2)
  discount        Int       @default(0)
  salePrice       Decimal?  @db.Decimal(10, 2)
  imageUrl        String
  additionalImages Json?
  features        Json?
  stock           Int       @default(0)
  status          ProductStatus @default(ACTIVE)
  hotSale         Boolean   @default(false)
  trending        Boolean   @default(false)
  views           Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  orderItems      OrderItem[]
  cartItems       CartItem[]
  wishlistItems   WishlistItem[]
  recentlyViewed  RecentlyViewed[]
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  icon        String?
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Order {
  id                  String    @id @default(uuid())
  orderNumber         String    @unique
  userId              String?
  user                User?     @relation(fields: [userId], references: [id])
  guestEmail          String?
  status              OrderStatus @default(PENDING)
  isGift              Boolean   @default(false)
  recipientName       String?
  contactFirstName    String?
  contactLastName     String?
  contactEmail        String?
  contactPhone        String?
  addressStreet       String?
  addressCity         String?
  addressLocalGovernment String?
  addressState        String?
  addressPostalCode   String?
  addressCountry      String    @default("Nigeria")
  paymentMethod       String?
  paymentStatus       PaymentStatus @default(PENDING)
  paymentId           String?
  subtotal            Decimal   @db.Decimal(10, 2)
  shipping            Decimal   @default(0) @db.Decimal(10, 2)
  tax                 Decimal   @default(0) @db.Decimal(10, 2)
  total               Decimal   @db.Decimal(10, 2)
  trackingNumber      String?
  shippedAt           DateTime?
  deliveredAt         DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  items               OrderItem[]
  statusHistory       OrderStatusHistory[]
}

model OrderItem {
  id           String  @id @default(uuid())
  orderId      String
  order        Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId    String?
  product      Product? @relation(fields: [productId], references: [id])
  productName  String
  productImage String?
  quantity     Int
  price        Decimal @db.Decimal(10, 2)
  total        Decimal @db.Decimal(10, 2)
}

model OrderStatusHistory {
  id          String   @id @default(uuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  status      String
  changedBy   String?
  changedByUser User?  @relation("StatusChangedBy", fields: [changedBy], references: [id])
  notes       String?
  createdAt   DateTime @default(now())
}

model CartItem {
  id        String  @id @default(uuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String?
  product   Product? @relation(fields: [productId], references: [id])
  quantity  Int     @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, productId])
}

model WishlistItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String?
  product   Product? @relation(fields: [productId], references: [id])
  addedAt   DateTime @default(now())

  @@unique([userId, productId])
}

model RecentlyViewed {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String?
  product   Product? @relation(fields: [productId], references: [id])
  viewedAt  DateTime @default(now())
}

model ShippingAddress {
  id              String  @id @default(uuid())
  userId          String
  user            User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  label           String?
  firstName       String
  lastName        String
  phone           String?
  street          String
  city            String
  localGovernment String?
  state           String
  postalCode      String?
  country         String  @default("Nigeria")
  isDefault       Boolean @default(false)
  createdAt       DateTime @default(now())
}

model PaymentMethod {
  id                String  @id @default(uuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String
  cardLastFour      String?
  cardBrand         String?
  cardExpiryMonth   Int?
  cardExpiryYear    Int?
  isDefault         Boolean @default(false)
  paymentGatewayId  String?
  createdAt         DateTime @default(now())
}

model Ad {
  id          String   @id @default(uuid())
  title       String
  description String?
  imageUrl    String
  link        String?
  active      Boolean  @default(true)
  views       Int      @default(0)
  clicks      Int      @default(0)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id               String   @id @default(uuid())
  userId           String
  productId        String?
  orderId          String?
  rating           Int
  title            String?
  comment          String?
  verifiedPurchase Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@unique([userId, productId, orderId])
}

// Enums
enum UserRole {
  USER
  MODERATOR
  ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BANNED
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  OUT_OF_STOCK
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

### Prisma Commands
```bash
# Initialize Prisma
npx prisma init

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio (GUI)
npx prisma studio

# Seed database
npx prisma db seed
```

---

## Docker Setup

### Docker Compose for Development
Use Docker Compose to run PostgreSQL, Redis, and the application in development:

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: pulsetunez_postgres
    environment:
      POSTGRES_USER: pulsetunez
      POSTGRES_PASSWORD: pulsetunez_password
      POSTGRES_DB: pulsetunez_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pulsetunez"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: pulsetunez_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: pulsetunez_app
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://pulsetunez:pulsetunez_password@postgres:5432/pulsetunez_db
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your_jwt_secret_here
      PAYSTACK_SECRET_KEY: ${PAYSTACK_SECRET_KEY}
      PAYSTACK_PUBLIC_KEY: ${PAYSTACK_PUBLIC_KEY}
      PAYSTACK_WEBHOOK_SECRET: ${PAYSTACK_WEBHOOK_SECRET}
      CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME}
      CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY}
      CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET}
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}
      NODE_ENV: development
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
```

### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "run", "dev"]
```

### Production Dockerfile
```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Docker Commands
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild and restart
docker-compose up -d --build app

# Execute commands in container
docker-compose exec app npm run prisma migrate dev

# Remove all volumes
docker-compose down -v
```

### .dockerignore
```
node_modules
dist
.git
.env
.env.local
*.log
coverage
.vscode
.idea
```

---

## Database Schema (Legacy SQL Reference)

The following SQL schema is provided for reference. Use the Prisma schema above for actual implementation.

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  bio TEXT,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  last_active TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount INTEGER DEFAULT 0,
  sale_price DECIMAL(10,2),
  image_url TEXT NOT NULL,
  additional_images JSONB,
  features JSONB,
  stock INTEGER DEFAULT 0,
  status ENUM('active', 'inactive', 'out-of-stock') DEFAULT 'active',
  hot_sale BOOLEAN DEFAULT FALSE,
  trending BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  guest_email VARCHAR(255),
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  is_gift BOOLEAN DEFAULT FALSE,
  recipient_name VARCHAR(255),
  
  -- Contact Info
  contact_first_name VARCHAR(255),
  contact_last_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  
  -- Address
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_local_government VARCHAR(100),
  address_state VARCHAR(100),
  address_postal_code VARCHAR(20),
  address_country VARCHAR(100) DEFAULT 'Nigeria',
  
  -- Payment
  payment_method VARCHAR(50),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  payment_id VARCHAR(255),
  
  -- Totals
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0.00,
  tax DECIMAL(10,2) DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL,
  
  -- Tracking
  tracking_number VARCHAR(100),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL
);
```

### Order Status History Table
```sql
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  changed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cart Table (for persistent cart)
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

### Wishlist Table
```sql
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

### Recently Viewed Table
```sql
CREATE TABLE recently_viewed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shipping Addresses Table
```sql
CREATE TABLE shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  local_government VARCHAR(100),
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Nigeria',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Payment Methods Table
```sql
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'card', 'bank_transfer'
  card_last_four VARCHAR(4),
  card_brand VARCHAR(20), -- 'visa', 'mastercard', 'verve', etc.
  card_expiry_month INTEGER,
  card_expiry_year INTEGER,
  is_default BOOLEAN DEFAULT FALSE,
  payment_gateway_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Ads/Promotions Table
```sql
CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link VARCHAR(500),
  active BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reviews Table (Future Feature)
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  order_id UUID REFERENCES orders(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id, order_id)
);
```

---

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
**Description**: Register a new user account
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
**Description**: Authenticate user and return JWT token
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "avatar_url",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/logout
**Description**: Logout user (invalidate token)
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### POST /api/auth/forgot-password
**Description**: Request password reset email
**Request Body**:
```json
{
  "email": "user@example.com"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### POST /api/auth/reset-password
**Description**: Reset password with token
**Request Body**:
```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123!"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### POST /api/auth/verify-email
**Description**: Verify user email
**Request Body**:
```json
{
  "token": "verification_token"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### POST /api/auth/google
**Description**: Google OAuth authentication
**Request Body**:
```json
{
  "idToken": "google_id_token"
}
```
**Response**: Same as /api/auth/login

#### POST /api/auth/facebook
**Description**: Facebook OAuth authentication
**Request Body**:
```json
{
  "accessToken": "facebook_access_token"
}
```
**Response**: Same as /api/auth/login

---

### User Profile Endpoints

#### GET /api/users/me
**Description**: Get current user profile
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "username": "johndoe",
    "phone": "+1234567890",
    "bio": "Music enthusiast",
    "avatar": "avatar_url",
    "emailVerified": true,
    "phoneVerified": false,
    "role": "user",
    "status": "active",
    "totalOrders": 5,
    "totalSpent": 1299.99,
    "joinedDate": "2024-01-15T00:00:00Z",
    "lastActive": "2024-01-20T12:30:00Z"
  }
}
```

#### PUT /api/users/me
**Description**: Update current user profile
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "phone": "+1234567890",
  "bio": "Updated bio"
}
```
**Response**: Same as GET /api/users/me with updated data

#### PUT /api/users/me/avatar
**Description**: Update user avatar image
**Headers**: `Authorization: Bearer {token}`, `Content-Type: multipart/form-data`
**Request Body**: Form data with `avatar` file
**Response**:
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "data": {
    "avatarUrl": "new_avatar_url"
  }
}
```

#### PUT /api/users/me/password
**Description**: Change user password
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Product Endpoints

#### GET /api/products
**Description**: Get all products with filtering and pagination
**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 20)
- `category` (optional)
- `search` (optional)
- `minPrice` (optional)
- `maxPrice` (optional)
- `hotSale` (optional, boolean)
- `trending` (optional, boolean)
- `status` (default: active)

**Response**:
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "sku": "PRD001",
        "name": "Premium Wireless Headphones",
        "slug": "premium-wireless-headphones",
        "category": {
          "id": "uuid",
          "name": "Audio Gadgets",
          "slug": "audio-gadgets"
        },
        "description": "Product description...",
        "price": 299.99,
        "discount": 15,
        "salePrice": 254.99,
        "imageUrl": "image_url",
        "features": ["Bluetooth 5.0", "Active Noise Cancellation"],
        "stock": 15,
        "status": "active",
        "hotSale": true,
        "trending": true,
        "views": 1250
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### GET /api/products/:id
**Description**: Get single product by ID or slug
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sku": "PRD001",
    "name": "Premium Wireless Headphones",
    "slug": "premium-wireless-headphones",
    "category": {
      "id": "uuid",
      "name": "Audio Gadgets",
      "slug": "audio-gadgets",
      "description": "Headphones, speakers, audio equipment"
    },
    "description": "Full product description...",
    "price": 299.99,
    "discount": 15,
    "salePrice": 254.99,
    "imageUrl": "image_url",
    "additionalImages": ["url1", "url2"],
    "features": ["Bluetooth 5.0", "Active Noise Cancellation", "30-hour battery"],
    "stock": 15,
    "status": "active",
    "hotSale": true,
    "trending": true,
    "views": 1250,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /api/products/featured
**Description**: Get featured products (price > 200)
**Response**: Same structure as GET /api/products

#### GET /api/products/trending
**Description**: Get trending products
**Response**: Same structure as GET /api/products

#### GET /api/products/hot-sale
**Description**: Get hot sale products
**Response**: Same structure as GET /api/products

---

### Category Endpoints

#### GET /api/categories
**Description**: Get all categories
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Audio Gadgets",
      "slug": "audio-gadgets",
      "description": "Headphones, speakers, audio equipment",
      "icon": "heroicons:microphone",
      "productCount": 25
    }
  ]
}
```

#### GET /api/categories/:slug
**Description**: Get category by slug with products
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Audio Gadgets",
    "slug": "audio-gadgets",
    "description": "Headphones, speakers, audio equipment",
    "icon": "heroicons:microphone",
    "products": [...] // Same structure as product list
  }
}
```

---

### Cart Endpoints

#### GET /api/cart
**Description**: Get user's cart
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "Premium Headphones",
          "price": 299.99,
          "imageUrl": "image_url",
          "stock": 15
        },
        "quantity": 2,
        "total": 599.98
      }
    ],
    "totalItems": 2,
    "totalPrice": 599.98
  }
}
```

#### POST /api/cart
**Description**: Add item to cart
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "productId": "uuid",
  "quantity": 1
}
```
**Response**:
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "item": {
      "id": "uuid",
      "productId": "uuid",
      "quantity": 1
    }
  }
}
```

#### PUT /api/cart/:itemId
**Description**: Update cart item quantity
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "quantity": 3
}
```
**Response**: Same as GET /api/cart

#### DELETE /api/cart/:itemId
**Description**: Remove item from cart
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

#### DELETE /api/cart
**Description**: Clear entire cart
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

### Wishlist Endpoints

#### GET /api/wishlist
**Description**: Get user's wishlist
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "Premium Headphones",
          "price": 299.99,
          "imageUrl": "image_url"
        },
        "addedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "itemCount": 5,
    "totalPrice": 1499.95
  }
}
```

#### POST /api/wishlist
**Description**: Add item to wishlist
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "productId": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Item added to wishlist"
}
```

#### DELETE /api/wishlist/:productId
**Description**: Remove item from wishlist
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Item removed from wishlist"
}
```

#### DELETE /api/wishlist
**Description**: Clear wishlist
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Wishlist cleared"
}
```

---

### Order Endpoints

#### POST /api/orders
**Description**: Create new order
**Headers**: `Authorization: Bearer {token}` (optional for guest checkout)
**Request Body**:
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "price": 299.99
    }
  ],
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "address": {
    "street": "123 Main St",
    "city": "Lagos",
    "localGovernment": "Ikeja",
    "state": "Lagos",
    "postalCode": "100001",
    "country": "Nigeria"
  },
  "isGift": false,
  "recipientName": null,
  "paymentMethod": "card",
  "shipping": 10.00,
  "tax": 25.00
}
```
**Response**:
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "order": {
      "id": "uuid",
      "orderNumber": "PT-2024-ABC123",
      "status": "pending",
      "subtotal": 599.98,
      "shipping": 10.00,
      "tax": 25.00,
      "total": 634.98,
      "items": [...],
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "paymentTransaction": {
      "reference": "paystack_reference",
      "accessCode": "access_code",
      "authorizationUrl": "https://checkout.paystack.com/..."
    }
  }
}
```

#### GET /api/orders
**Description**: Get user's orders
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 20)
- `status` (optional)

**Response**:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "PT-2024-ABC123",
        "status": "processing",
        "total": 634.98,
        "items": [
          {
            "id": "uuid",
            "productName": "Premium Headphones",
            "quantity": 2,
            "price": 299.99,
            "total": 599.98,
            "imageUrl": "image_url"
          }
        ],
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  }
}
```

#### GET /api/orders/:id
**Description**: Get single order by ID
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "PT-2024-ABC123",
    "status": "processing",
    "statusHistory": [
      {
        "status": "pending",
        "date": "2024-01-15T10:30:00Z"
      },
      {
        "status": "processing",
        "date": "2024-01-15T14:00:00Z"
      }
    ],
    "contact": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "address": {
      "street": "123 Main St",
      "city": "Lagos",
      "localGovernment": "Ikeja",
      "state": "Lagos",
      "postalCode": "100001",
      "country": "Nigeria"
    },
    "isGift": false,
    "paymentMethod": "card",
    "paymentStatus": "paid",
    "subtotal": 599.98,
    "shipping": 10.00,
    "tax": 25.00,
    "total": 634.98,
    "trackingNumber": "TN123456789",
    "items": [...],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:00:00Z"
  }
}
```

#### POST /api/orders/:id/cancel
**Description**: Cancel an order
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

#### GET /api/orders/track/:orderNumber
**Description**: Track order by order number (public endpoint)
**Response**:
```json
{
  "success": true,
  "data": {
    "orderNumber": "PT-2024-ABC123",
    "status": "shipped",
    "trackingNumber": "TN123456789",
    "estimatedDelivery": "2024-01-20T00:00:00Z",
    "statusHistory": [...]
  }
}
```

---

### Shipping Address Endpoints

#### GET /api/shipping-addresses
**Description**: Get user's shipping addresses
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "label": "Home",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "street": "123 Main St",
      "city": "Lagos",
      "localGovernment": "Ikeja",
      "state": "Lagos",
      "postalCode": "100001",
      "country": "Nigeria",
      "isDefault": true
    }
  ]
}
```

#### POST /api/shipping-addresses
**Description**: Add new shipping address
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "label": "Home",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "street": "123 Main St",
  "city": "Lagos",
  "localGovernment": "Ikeja",
  "state": "Lagos",
  "postalCode": "100001",
  "country": "Nigeria",
  "isDefault": false
}
```
**Response**: Same as GET with new address

#### PUT /api/shipping-addresses/:id
**Description**: Update shipping address
**Headers**: `Authorization: Bearer {token}`
**Request Body**: Same as POST
**Response**: Same as GET with updated address

#### DELETE /api/shipping-addresses/:id
**Description**: Delete shipping address
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

#### PUT /api/shipping-addresses/:id/default
**Description**: Set address as default
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Default address updated"
}
```

---

### Payment Method Endpoints

#### GET /api/payment-methods
**Description**: Get user's saved payment methods
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "card",
      "cardLastFour": "4242",
      "cardBrand": "visa",
      "cardExpiryMonth": 12,
      "cardExpiryYear": 2025,
      "isDefault": true
    }
  ]
}
```

#### POST /api/payment-methods
**Description**: Add new payment method
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "authorizationCode": "AUTH_code", // Paystack authorization code
  "isDefault": false
}
```
**Response**: Same as GET with new method

#### DELETE /api/payment-methods/:id
**Description**: Delete payment method
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Payment method deleted"
}
```

#### PUT /api/payment-methods/:id/default
**Description**: Set payment method as default
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Default payment method updated"
}
```

---

### Recently Viewed Endpoints

#### GET /api/recently-viewed
**Description**: Get user's recently viewed products
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "Premium Headphones",
          "price": 299.99,
          "imageUrl": "image_url",
          "category": "audio-gadgets"
        },
        "viewedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "itemCount": 8
  }
}
```

#### POST /api/recently-viewed
**Description**: Add product to recently viewed
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "productId": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Product added to recently viewed"
}
```

#### DELETE /api/recently-viewed
**Description**: Clear recently viewed history
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "message": "Recently viewed cleared"
}
```

---

### Ads Endpoints

#### GET /api/ads
**Description**: Get all active ads
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Summer Sale - 50% Off",
      "description": "Get amazing discounts",
      "imageUrl": "image_url",
      "link": "/shop",
      "active": true,
      "views": 1250,
      "startDate": "2024-06-01T00:00:00Z",
      "endDate": "2024-06-30T23:59:59Z"
    }
  ]
}
```

#### POST /api/ads/:id/view
**Description**: Increment ad view count (public endpoint)
**Response**:
```json
{
  "success": true,
  "message": "View counted"
}
```

---

### Admin Endpoints (Admin Role Required)

#### GET /api/admin/products
**Description**: Get all products (admin view)
**Headers**: `Authorization: Bearer {admin_token}`
**Query Parameters**: Same as public GET /api/products plus `status` filter

#### POST /api/admin/products
**Description**: Create new product
**Headers**: `Authorization: Bearer {admin_token}`, `Content-Type: multipart/form-data`
**Request Body**:
```json
{
  "sku": "PRD001",
  "name": "Premium Headphones",
  "slug": "premium-headphones",
  "categoryId": "uuid",
  "description": "Product description",
  "price": 299.99,
  "discount": 15,
  "salePrice": 254.99,
  "image": "file",
  "features": ["Feature 1", "Feature 2"],
  "stock": 15,
  "status": "active",
  "hotSale": true,
  "trending": true
}
```

#### PUT /api/admin/products/:id
**Description**: Update product
**Headers**: `Authorization: Bearer {admin_token}`
**Request Body**: Same as POST (partial update allowed)

#### DELETE /api/admin/products/:id
**Description**: Delete product
**Headers**: `Authorization: Bearer {admin_token}`

#### GET /api/admin/orders
**Description**: Get all orders (admin view)
**Headers**: `Authorization: Bearer {admin_token}`
**Query Parameters**:
- `page`, `limit`
- `status`
- `search` (by order ID or product name)
- `period` (today, week, month)
- `sort` (newest, oldest)

#### PUT /api/admin/orders/:id/status
**Description**: Update order status
**Headers**: `Authorization: Bearer {admin_token}`
**Request Body**:
```json
{
  "status": "shipped",
  "trackingNumber": "TN123456789",
  "notes": "Order shipped via DHL"
}
```

#### DELETE /api/admin/orders/:id
**Description**: Delete order (admin only)
**Headers**: `Authorization: Bearer {admin_token}`

#### GET /api/admin/users
**Description**: Get all users (admin view)
**Headers**: `Authorization: Bearer {admin_token}`
**Query Parameters**:
- `page`, `limit`
- `status`
- `role`
- `search`

#### PUT /api/admin/users/:id/status
**Description**: Update user status
**Headers**: `Authorization: Bearer {admin_token}`
**Request Body**:
```json
{
  "status": "banned"
}
```

#### DELETE /api/admin/users/:id
**Description**: Delete user (admin only)
**Headers**: `Authorization: Bearer {admin_token}`

#### GET /api/admin/analytics
**Description**: Get analytics data
**Headers**: `Authorization: Bearer {admin_token}`
**Query Parameters**:
- `period` (7, 30, 90, 365 days)

**Response**:
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalRevenue": 45678.00,
      "totalOrders": 892,
      "activeUsers": 1247,
      "conversionRate": 3.2
    },
    "revenueTrend": [
      { "date": "2024-01-01", "revenue": 5000 },
      { "date": "2024-01-02", "revenue": 6500 }
    ],
    "salesByCategory": [
      { "name": "Audio Gadgets", "sales": 12345, "percentage": 75 },
      { "name": "Musical Instruments", "sales": 8900, "percentage": 55 }
    ],
    "traffic": {
      "visitors": 8976,
      "pageViews": 45678,
      "avgSession": 3.5,
      "bounceRate": 32.5
    },
    "topProducts": [...]
  }
}
```

#### GET /api/admin/ads
**Description**: Get all ads (admin view)
**Headers**: `Authorization: Bearer {admin_token}`

#### POST /api/admin/ads
**Description**: Create new ad
**Headers**: `Authorization: Bearer {admin_token}`, `Content-Type: multipart/form-data`

#### PUT /api/admin/ads/:id
**Description**: Update ad
**Headers**: `Authorization: Bearer {admin_token}`

#### DELETE /api/admin/ads/:id
**Description**: Delete ad
**Headers**: `Authorization: Bearer {admin_token}`

---

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-Based Access Control (RBAC)
- **user**: Can access all customer-facing endpoints
- **moderator**: Can manage orders and moderate content
- **admin**: Full access to all endpoints including admin dashboard

### Protected Routes Middleware
All protected routes should:
1. Verify JWT token signature
2. Check token expiration
3. Validate user role for admin endpoints
4. Attach user info to request object

---

## Payment Integration

### Paystack Integration
- Use Paystack Inline for secure card input
- Initialize transaction on order creation
- Handle webhook events for payment confirmation
- Support card type detection (Visa, Mastercard, Verve)
- Support bank transfer, USSD, and other Paystack payment methods

### Payment Flow
1. User enters card details in checkout
2. Frontend initializes Paystack transaction via backend
3. User completes payment with Paystack
4. Backend receives webhook confirmation
5. Order status updated to "processing"
6. Confirmation email sent to user

---

## Email Notifications

### Email Types
- **Welcome Email**: Sent after registration
- **Email Verification**: Sent with verification link
- **Password Reset**: Sent with reset link
- **Order Confirmation**: Sent after successful order
- **Order Status Update**: Sent when order status changes
- **Shipping Notification**: Sent with tracking number

### Email Templates
Use HTML templates with:
- Company branding
- Order details
- Action buttons
- Contact information

---

## Search Functionality

### Product Search
- Full-text search on product name and description
- Filter by category, price range, features
- Sort by relevance, price, newest, popularity
- Pagination support

### Search Implementation
- Use database full-text search (PostgreSQL tsvector)
- Or integrate with Elasticsearch/Algolia for advanced search

---

## File Upload

### Image Upload
- Accept: JPG, PNG, GIF
- Max size: 5MB
- Auto-resize and optimize images
- Store in cloud storage ( Cloudinary)
- Return CDN URL

### Upload Flow
1. Frontend uploads to backend
2. Backend validates file
3. Backend uploads to cloud storage
4. Backend returns CDN URL
5. URL saved to database

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Additional error context
  }
}
```

### Common Error Codes
- `AUTH_REQUIRED`: No authentication token provided
- `INVALID_TOKEN`: Token is invalid or expired
- `INSUFFICIENT_PERMISSIONS`: User lacks required role
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `INTERNAL_ERROR`: Server error

---

## Rate Limiting

### Rate Limit Strategy
- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 1000 requests per 15 minutes per user
- **Admin endpoints**: 5000 requests per 15 minutes per admin

### Headers
- `X-RateLimit-Limit`: Request limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time (Unix timestamp)

---

## Caching Strategy

### Redis Cache Keys
- `products:list:{filters_hash}`: Cached product lists (5 min)
- `product:{id}`: Cached single product (10 min)
- `categories:list`: Cached categories (1 hour)
- `user:{id}:cart`: Cached user cart (1 min)
- `analytics:{period}`: Cached analytics data (5 min)

### Cache Invalidation
- Invalidate on create/update/delete operations
- Use cache tags for bulk invalidation
- Implement cache warming for popular products

---

## Security Considerations

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy`: Configure appropriately

### Input Validation
- Validate all input using schemas (Joi, Zod)
- Sanitize user input to prevent XSS
- Use parameterized queries to prevent SQL injection
- Implement file upload validation

### Password Security
- Minimum 8 characters
- Require uppercase, lowercase, number, special character
- Hash passwords using bcrypt (cost factor 12)
- Implement rate limiting on auth endpoints

---

## Testing Strategy

### Unit Tests
- Test all business logic
- Test validation functions
- Test utility functions

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flow

### End-to-End Tests
- Test complete user flows
- Test checkout process
- Test admin operations

---

## Deployment Considerations

### Environment Variables
```
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SENDGRID_API_KEY=
REDIS_URL=
NODE_ENV=
```

### Scaling
- Use load balancer for horizontal scaling
- Implement database connection pooling
- Use CDN for static assets
- Implement database read replicas for read-heavy operations

---

## Monitoring & Logging

### Logging
- Log all API requests
- Log errors with stack traces
- Log authentication events
- Log payment transactions

### Monitoring
- Monitor API response times
- Monitor error rates
- Monitor database performance
- Set up alerts for critical issues

---

## Future Enhancements

### Potential Features
- Product reviews and ratings
- Product comparison
- Live chat support
- Abandoned cart recovery
- Loyalty program
- Gift cards
- Multi-currency support
- Multi-language support
- Subscription products
- Digital downloads
