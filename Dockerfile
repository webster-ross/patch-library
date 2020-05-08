FROM node:10

# Create directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle source
COPY . .

# Start
CMD ["npm", "start"]
