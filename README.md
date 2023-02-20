# Next.js Prisma OAuth

The focus of this project is to showcase the implementation of authentication using Next.js and Prisma. It utilizes OAuth2 authentication providers such as Google and Facebook, alongside a local provider. The authentication process is implemented through Passport.js, making use of its robust and flexible authentication features.

The project includes sign-in, sign-out, and sign-up pages, as well as an account page where users can update their profile information. Data validation is also included to ensure that the form data submitted by users is valid, and feedback is provided to users if there are any errors.

Additionally, the project includes a profile image upload functionality that automatically optimizes the size and aspect ratio of the uploaded image to ensure a performant and consistent user experience.

New users will be redirected to a special page that allows you to collect additional information after the signup process if necessary.

### The project uses:

- Iron Session to manage cookies in a serverless environment.
- React Query for data fetching and mutations, which helps to strategically manage caching and provides an improved development experience.
- Tailwind CSS as the styling solution for rapid prototyping, allowing for easy and efficient customization of the project's visual design.
- Prisma with SQLite as the database backend to persistently store user data.

<br />

### NPM Scripts:

In the root directory, you can run:

- npm run build: builds the application for production.
- npm run dev: starts the application in development mode.
- npm start: starts the application in production mode.

<br/>

## Usage:

To get started, ensure that you have Node.js version 16.x or higher installed, then clone this repository and follow the instructions below to set up your environment and run the project locally.

<br/>

### Environment Variables:

To set up the required environment variables, create a .env.development.local file in the root directory and an .env file in the Prisma directory. Sample files are provided in their respective locations for reference. It should be noted that in a production environment, environment variables should be set up on the host server.

<br />

### Setup:

In the root directory use `npm ci` to install dependencies.

<br/>

### Development:

Use `npm run dev` to run the application in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br/>

### Production:

Use `npm run build` to build the app for production. Then use `npm start` to start the application in production mode.
