# HotelPro — MERN Hotel Management System

A starter full-stack hotel booking and management application built with MongoDB, Express, React, and Node.js.

## Features
- Guest registration and login using bcrypt + JWT
- Role-based authorization (`guest`, `staff`, `admin`)
- Room search and category filtering
- Room availability checks and booking creation/cancellation
- Guest booking history
- Admin room CRUD and booking overview
- Stripe Checkout integration scaffold (requires valid Stripe keys)
- Seed script with demo rooms
- Responsive React interface

## Requirements
- Node.js 18+
- MongoDB local instance or Atlas connection
- npm

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
# Set MONGO_URI and JWT_SECRET in .env
npm run seed
npm run dev
```
API defaults to `http://localhost:5000`.

### 2. Frontend
In another terminal:
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Vite prints the local URL, usually `http://localhost:5173`.

## Demo data
The seed script creates rooms only. Register a user through the UI. To use admin features, change that user's `role` to `admin` in MongoDB after registering.

## Important
- This is a development starter, not a production-certified hotel system.
- Configure HTTPS, secure secrets, rate limiting, monitoring, backups, and email verification before production.
- Stripe Checkout requires valid `STRIPE_SECRET_KEY` and a configured success/cancel URL. Do not store raw card data.
- For reliable availability under concurrent bookings, use transactions or atomic inventory reservations and test against your MongoDB deployment.
