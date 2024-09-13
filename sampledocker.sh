# Stage 1: Builder Stage
# Use a specific version of node to ensure compatibility across environments
FROM node:18-alpine AS builder

# Set environment variables
# ENV variables help in configuring your app dynamically
# ENV NODE_ENV=development

# Install dependencies for native build tools
RUN apk add --no-cache python3 make g++

# Set the working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json files first to leverage Docker cache
COPY package*.json ./

# Install dependencies for production and development
# The '--frozen-lockfile' ensures no changes to the lock file
# Ci stands for clean install it will install exactly whats in the package-lock.json
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application (Useful for production builds, even for Next.js)
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

# ENV variables can be set for production in the second stage
# ENV NODE_ENV=production

# Define a volume for persistent data storage
# VOLUME can be used to mount data into the container from the host system
# Persistent Storage:
# Shared Data Across Containers:
VOLUME /app/node_modules

# Set working directory
WORKDIR /app

# Copy only the built code from the builder stage
# copy files from app in the builder staage to here
COPY --from=builder /app ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port 3000 for Next.js
EXPOSE 3000

# Define a health check to ensure that the container is running properly
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# MongoDB setup
# Use an official MongoDB image, showcasing multi-container setups
FROM mongo:5.0 as mongodb

# Expose MongoDB default port
EXPOSE 27017

# Set up Prisma migrations (shows multi-stage and Prisma integration)
FROM builder as prisma

RUN npx prisma generate && npx prisma migrate deploy

# Define the default command to run the application
CMD ["npm", "run", "dev"]

# running docker run command docker run --env-file .env.production -p 3000:3000 your-docker-image
