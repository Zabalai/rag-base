# RAG Base Archetype

This repository provides a base architecture for a Retrieval-Augmented Generation (RAG) web application using Next.js (frontend) and FastAPI (backend).

## Features
- Next.js frontend with Tailwind CSS
- FastAPI backend with Keycloak authentication
- Dockerized setup for both frontend and backend
- Example mock page and endpoints

## Setup

### 1. Environment Variables
- Copy `.env.example` files in both `backend` and `frontend` to `.env`/`.env.local` and fill in your values.

### 2. Local Development
- Start backend:
  ```sh
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip install fastapi uvicorn python-keycloak
  uvicorn main:app --reload
  ```
- Start frontend:
  ```sh
  cd frontend
  npm install
  npm run dev
  ```

### 3. Docker Compose
- Run both services:
  ```sh
  docker-compose up --build
  ```

## Usage
- Visit `/mock` on the frontend to see login status and mock RAG result.
- Backend endpoints:
  - `/api/check-login` (Keycloak login check)
  - `/api/rag/mock` (Mock RAG response)

## Keycloak Integration
- Configure Keycloak server, realm, and client in environment variables.
- The backend checks user login via Keycloak; frontend displays login status.

## Subdomain & Landing Page
- This app is designed to be exposed on a subdomain and accessed from a separate landing page.

---

Feel free to extend the RAG logic and authentication as needed for your use case.
