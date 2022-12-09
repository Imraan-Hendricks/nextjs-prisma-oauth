# Next.js v12 Closure

A conclusion to Next.js v12 that intends to consolidate the best ideas and practices up to this point regarding the development of modern full stack web applications.

These concepts will be the foundation for the newly released version of Next.js and will be required to adapt, change or be completely rebuilt based on the new concepts and features provided by Next.js.

<br/>

### Features:

- Authentication
- Authorization
- Access control
- Cookie-based sessions
- Data validation
- File uploads
- Image optimization
- Error handling

<br />

### Key Technologies:

- MongoDB: Document-oriented database classified as NoSql.
- Next.js: An open-source React front-end development web framework.
- React Query: Performant and powerful data synchronization for React.
- Tailwindcss: A utility-first CSS framework.

<br/>

### Requirements:

- MongoDB Version 4.x
- Node.js Version 16.x

<br/>

### NPM Scripts:

In the root directory, you can run:

- npm run build: builds the application for production.
- npm run dev: starts the application in development mode.
- npm start: starts the application in production mode.

<br/>

## Usage:

### Environment Variables:

Setup environment variables by creating .env.development.local file in the root directory. An example of this file is provided called .env.local.example. Note that in production you would want to set up environment variables on the host server.

<br />

### Setup:

In the root directory use `npm ci` to install dependencies.

<br/>

### Development:

Use `npm run dev` to run the application in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br/>

### Production:

Use `npm run build` to build the app for production. Then use `npm start` to start the application in production mode.
