### Event Planner

Full-stack application for event creation and management, enabling users to share invitation links and collect RSVPs without requiring guest registration.

The system is designed to provide a frictionless experience for both organizers and guests, using a fully link-based interaction model.

## Features
* Authentication
* User registration and login
* Managed with Neon Auth
* Events
* Event creation and management
* Generation of unique shareable links
* Public access to event pages without requiring an account
* RSVP
  
## Tech Stack
* Frontend
* Next.js
* React
* TailwindCSS
* shadcn/ui
* Radix UI
  
## Backend
* Next.js (Server Actions / API Routes)
* Prisma ORM
* PostgreSQL (Neon)
  
## Other
* Neon Auth
* TypeScript
  
## Installation
```bash
git clone git@github.com:Rafhael-Augusto/event-planner.git

cd event-planner

npm install
```


## Configuration

* Create a .env file in the root of the project:

```bash
DATABASE_URL="your-database-url"

NEON_AUTH_BASE_URL="your-neon-auth-url"
NEON_AUTH_COOKIE_SECRET="your-cookie-secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database
```bash
npx prisma generate
npx prisma migrate dev
```

## Running the project
```bash
npm run dev
```

* Access the application at:
  http://localhost:3000/

## Deployment

https://event-planner-omega-liard.vercel.app/
