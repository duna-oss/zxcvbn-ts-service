# Use Node.js runtime from the ARG provided during the build
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy the production build, dependencies, and package files
COPY dist ./dist
COPY package.json package-lock.json ./
COPY node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/index.js"]
