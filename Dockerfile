# Use Node.js 20 with Alpine
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]