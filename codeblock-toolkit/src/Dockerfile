FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /

# Copy all files
COPY . .

# Before running npm install, clear the NPM cache
RUN npm cache clean --force

# RUN npm install
RUN npm install

#RUN npm build
RUN npm run build

EXPOSE 3000

# Start the app using serve command
CMD ["npm", "run", "dev"]
