#Stage 1 is the frontend
FROM node:20-slim AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ENV REACT_APP_API_URL=https://ecommercewebapp-gbmr.onrender.com/
RUN npm run build

#Stage 2 is the backend
FROM node:20-slim AS backend
WORKDIR /backend
COPY backend/package*.json ./
RUN apt-get update -y && apt-get install -y openssl
RUN npm install
COPY backend/ ./

#This copies the frontend build from the first stage
COPY --from=frontend /frontend/build ./public
#Have to run npx prisma generate after copying the schema file
RUN npx prisma generate 
EXPOSE 3010
CMD ["npm", "start"]