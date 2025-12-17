FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Use legacy peer deps to accommodate React 19 with react-simple-maps peer range (<=18)
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
