# ShopHub E-Commerce Platform

A full-stack e-commerce platform built with Node.js, Express, MongoDB, and EJS that provides a complete shopping experience with product listings, user authentication, cart management, and payment processing.

## Features

### Core E-Commerce Features
- **Product Management**: Add, edit, delete, and browse products with categories
- **User Authentication**: Secure registration and login with Passport.js
- **Shopping Cart**: Persistent wishlist functionality with MongoDB storage
- **Product Reviews**: Star rating system with user reviews
- **Search & Filter**: Advanced search by name, description, brand, and category
- **Image Upload**: Cloudinary integration for product images
- **Responsive Design**: Mobile-friendly interface

### Advanced Features
- **Session Management**: Secure session handling with MongoDB store
- **Flash Messages**: User-friendly notifications
- **Validation**: Input validation with Joi
- **Error Handling**: Comprehensive error handling and logging
- **Security**: CSRF protection and input sanitization
- **Admin Controls**: Product ownership and review management
- **Category System**: 12 predefined product categories
- **Stock Management**: Real-time inventory tracking
- **Discount System**: Original vs current price display
- **Wishlist Count**: Real-time cart item count display

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Cloudinary** - Image storage and CDN
- **Multer** - File upload handling
- **Joi** - Input validation
- **Connect-Mongo** - Session store
- **Method-Override** - HTTP method override support

### Frontend
- **EJS** - Template engine
- **Bootstrap** - CSS framework
- **Custom CSS** - Responsive design and animations
- **Font Awesome** - Icons
- **JavaScript** - Client-side interactions

### Security & Utilities
- **Helmet** - Security headers
- **Express Session** - Session management
- **Connect Flash** - Flash messages
- **Dotenv** - Environment variables
- **Express-Validator** - Input sanitization

## Project Structure

```
shophub-ecommerce/
├── app.js                 # Main application file
├── controllers/           # Route controllers
│   ├── listings.js        # Product management
│   ├── reviews.js         # Review system
│   └── user.js            # User authentication
├── models/                # MongoDB schemas
│   ├── listing.js         # Product model
│   ├── user.js            # User model
│   └── reviews.js         # Review model
├── routes/                # Express routes
│   ├── listings.js        # Product routes
│   ├── users.js           # User routes
│   ├── cart.js            # Cart routes
│   ├── orders.js          # Order routes
│   ├── payment.js         # Payment routes
│   └── reviews.js         # Review routes
├── views/                 # EJS templates
│   ├── listing/           # Product views
│   ├── cart/              # Cart views
│   ├── orders/            # Order views
│   ├── payment/           # Payment views
│   └── includes/          # Reusable components
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   └── js/                # Client-side JavaScript
├── utils/                 # Utility functions
│   ├── cartManager.js     # Cart operations
│   ├── AppError.js        # Custom error class
│   └── wrapAsync.js       # Async error handling
├── data/                  # Data files
│   └── cart.json          # Cart data storage
├── schemas/               # Validation schemas
├── uploads/               # Temporary file uploads
├── middleware.js          # Custom middleware
├── cloudinary.js          # Cloudinary configuration
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
└── package.json          # Dependencies and scripts
```

## Quick Start (5-Minute Setup)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/shophub-ecommerce.git
cd shophub-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
MONGOATLAS=mongodb://localhost:27017/shophub
SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Database Schema

### Product Schema
```javascript
{
  name: { type: String, required: true },
  description: String,
  images: [{ url: String, filename: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  brand: String,
  seller: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  category: {
    type: String,
    enum: [
      "Electronics", "Clothing", "Home & Garden", "Sports", "Books",
      "Beauty & Health", "Toys & Games", "Automotive", "Jewelry",
      "Pet Supplies", "Office Supplies", "Baby Products"
    ]
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

### User Schema
```javascript
{
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true }
}
```

### Review Schema
```javascript
{
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User" }
}
```

## API Endpoints

### Products
- `GET /listings` - Browse all products
- `GET /listings/category/:category` - Filter by category
- `GET /listings/search?q=query` - Search products
- `POST /listings` - Add new product (authenticated)
- `GET /listings/:id` - View product details
- `PUT /listings/:id` - Update product (owner only)
- `DELETE /listings/:id` - Delete product (owner only)

### Authentication
- `GET /signup` - Registration form
- `POST /signup` - Register new user
- `GET /login` - Login form
- `POST /login` - User login
- `POST /logout` - User logout

### Cart/Wishlist
- `GET /cart` - View wishlist (authenticated)
- `POST /cart/add/:productId` - Add to wishlist
- `DELETE /cart/remove/:productId` - Remove from wishlist
- `DELETE /cart/clear` - Clear entire wishlist
- `GET /cart/count` - Get wishlist item count (AJAX)

### Reviews
- `POST /listings/:id/reviews` - Add review (authenticated)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author only)

## Development Environment Setup

### Prerequisites Installation

#### Node.js & npm
```bash
# macOS (using Homebrew)
brew install node

# Windows (using Chocolatey)
choco install nodejs

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install nodejs npm
```

#### MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from: https://www.mongodb.com/try/download/community

# Linux (Ubuntu/Debian)
sudo apt install mongodb
sudo systemctl start mongod
```

### Development Tools

### Recommended VS Code Extensions
- MongoDB for VS Code
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- Prettier - Code formatter

### Debugging Setup

1. **VS Code launch configuration** (`.vscode/launch.json`)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch ShopHub",
      "program": "${workspaceFolder}/app.js",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "type": "node",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## Testing Strategy

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product CRUD operations
- [ ] Image upload functionality
- [ ] Review system
- [ ] Cart operations
- [ ] Search functionality
- [ ] Responsive design on mobile
- [ ] Error handling
- [ ] Session management
- [ ] Flash messages

### Test User Credentials
For development testing:
- **Username**: testuser
- **Email**: test@example.com
- **Password**: password123

## Troubleshooting Guide

### Common Issues & Fixes

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

#### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

#### Missing Dependencies
```bash
npm install --force
```

#### Environment Variables Missing
```bash
# Check if .env file exists
ls -la .env

# Create if missing
touch .env
```

#### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Issues
```bash
# Reset database
mongo
use shophub
db.dropDatabase()
exit
```

## Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Session Security**: Secure session configuration with MongoDB store
- **Input Validation**: Joi validation for all forms
- **CSRF Protection**: Token-based protection
- **File Upload Security**: Image type and size validation (5MB limit)
- **XSS Protection**: HTML escaping in templates
- **SQL Injection Prevention**: MongoDB parameterized queries
- **Rate Limiting**: Can be implemented with express-rate-limit

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGOATLAS=your-production-mongodb-uri
SECRET=your-production-secret-key
CLOUDINARY_CLOUD_NAME=your-production-cloudinary
CLOUDINARY_API_KEY=your-production-api-key
CLOUDINARY_API_SECRET=your-production-api-secret
```

### Deployment Options
- **Heroku**: Easy deployment with MongoDB Atlas
- **AWS EC2**: Full control over server configuration
- **DigitalOcean**: Simple droplet setup
- **Vercel**: Serverless deployment option
- **Railway**: Modern deployment platform

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]
```

### Production Checklist
Before deploying to production:
- [ ] Set production environment variables
- [ ] Configure MongoDB Atlas
- [ ] Set up Cloudinary production account
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring
- [ ] Configure error tracking
- [ ] Set up backups
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, email support@shophub.com or create an issue in the GitHub repository.

## Acknowledgments

- Express.js community for the robust framework
- MongoDB team for the excellent database
- Cloudinary for image hosting
- Bootstrap team for the responsive components
- All contributors and testers
