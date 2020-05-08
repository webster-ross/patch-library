FROM node:10

# Create directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle source
COPY . .

# Start
EXPOSE 3000
CMD ["npm", "start"]
