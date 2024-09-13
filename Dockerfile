# Stage 1: Builder Stage
# Use a specific version of node to ensure compatibility across environments
FROM node:18-alpine AS builder

# setting up env variables to consume from the build
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Install dependencies for native build tools
RUN apk add --no-cache python3 make g++

# Set the working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json files first to leverage Docker cache
COPY package*.json ./

# Copy the rest of the application
COPY . .

# Install dependencies for production and development
# The '--frozen-lockfile' ensures no changes to the lock file
# Ci stands for clean install it will install exactly whats in the package-lock.json
RUN npm ci --frozen-lockfile

# Build the application (Useful for production builds, even for Next.js)
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

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

# Define the default command to run the application
CMD ["npm", "run", "start"]

# running docker run command docker run --env-file .env.production -p 3000:3000 your-docker-image
