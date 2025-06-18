# Community Platform - Replit Development Guide

## Overview

This is a full-stack community platform built with a modern React frontend and Express.js backend. The application features an onboarding flow where users can join communities, provide contact information, and receive follow-up emails. The system uses a multi-step onboarding process with animated transitions and form validation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions and interactions
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Validation**: Zod for runtime type checking and validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Environment**: Node.js 20 with ES modules

### Project Structure
```
├── client/          Frontend React application
├── server/          Backend Express.js API
├── shared/          Shared TypeScript types and schemas
├── migrations/      Database migration files
└── dist/           Production build output
```

## Key Components

### Database Schema (shared/schema.ts)
- **onboarding_entries**: Stores user onboarding data including user type, community preferences, social media handles, and contact information
- Uses JSON columns for flexible data storage (communities array, social media object)
- Includes Zod validation schemas for type safety

### Frontend Components
- **LandingSection**: Hero page with animated background elements and call-to-action
- **OnboardingSection**: Multi-step form with progress tracking, user type selection, community selection, social media input, and email collection
- **SuccessSection**: Confirmation page with email resend functionality
- **UI Components**: Complete Shadcn/ui component library for consistent design

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for PostgreSQL integration)
- **API Routes**: RESTful endpoints for onboarding submission and email management
- **Validation**: Server-side validation using shared Zod schemas

## Data Flow

1. **User Landing**: User arrives at animated landing page
2. **Onboarding Flow**: Multi-step form collection with client-side validation
3. **Data Submission**: Form data validated and stored via API
4. **Email Simulation**: System generates unique form links and simulates email sending
5. **Success Confirmation**: User receives confirmation with option to resend email

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Neon database driver
- **framer-motion**: Animation library
- **wouter**: Lightweight routing
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development Environment
- Uses Replit's integrated development environment
- PostgreSQL 16 module configured
- Hot reloading with Vite dev server on port 5000
- TSX for TypeScript execution in development

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Database: Drizzle migrations applied via `npm run db:push`
- Deployment: Configured for Replit's autoscale deployment target

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **REPLIT_DOMAINS**: Used for generating form links in emails

## Changelog

- June 18, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.