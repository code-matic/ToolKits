FROM node:18-alpine

# The /src directory should act as the main application directory
WORKDIR /src

# Copy all files
COPY . .

# RUN npm install
RUN npm install

#RUN npm build
RUN npm run build

EXPOSE 3000

# Start the app using serve command
CMD ["npm", "run", "dev"]