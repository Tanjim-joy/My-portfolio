# Use official Node.js v22.17.1 Alpine image for smaller size
FROM node:22.17.1-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# install dependencies 
RUN npm ci 

# Copy source code
COPY . . 

# Expose port (default vite port is 5173)
EXPOSE 5173

# Development Command - এটা ঠিক করুন
CMD ["npm", "run", "dev", "--", "--host"]

# ============================================

# Production build stage
FROM node:22.17.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ============================================
# Production server stage
FROM node:22.17.1-alpine AS production
WORKDIR /app

# Install serve for static files
RUN npm install -g serve

# Copy built files from builder stage 
COPY --from=builder /app/dist ./dist

# Expose port 3000 for serve
EXPOSE 3000

# Start the server 
CMD ["serve", "-s", "dist", "-l", "3000"]