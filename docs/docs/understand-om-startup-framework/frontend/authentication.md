---
sidebar_position: 20
---
 
# Authentication

This page will guide you about the Authentication system in Om StartUp Framework. 

Once you have started server, you can visit the following URLs to see the authentication system in action:

- **Sign Up**: [http://localhost:3000/auth/sign-up/](http://localhost:3000/auth/sign-up/)
- **Sign In**: [http://localhost:3000/auth/sign-in/](http://localhost:3000/auth/sign-in/)

![](/img/feautres_sign_up.png)

The Authentication system implemented in Om StartUp Framework provides the following features at enterprise level:

- Email Authentication
- Google Authentication
- Forgot Password

The Authentication is done using JWT and the token is stored as a cookie.

## Email Authentication
The Email Authentication system in Om StartUp Framework is designed to provide enterprise-level email authentication you are used to in apps like weblow, shopify etc.

Before allowing users to register, their email address needs to be verified to ensure its authenticity.

To maintain the integrity of our application and prevent abuse, we block registration from domains associated with spam emails, such as 'tempmail', 'guerrillamail', 'sharklasers' etc.

Additionally, we enforce a password policy where the password must be a minimum of 8 characters in length.

## Google Authentication 

We understand that users expect a single click sign-up experience. Therefore, we have included Google Authentication support. This allows users to easily sign up using their Google accounts.

## Configuration

To make the Authentication System fully functional, you need the following API keys:

- **Google OAuth Client ID**: The Google OAuth Client ID is used to enable Google Sign.
- **Brevo API Key**: The Brevo API Key is used to send verification and password reset emails to users. Please note that Brevo offers a free tier that allows you to send 300 emails per month, which is good enough for startups.

You can continue developing your SaaS application, and once it's ready, you can proceed to the Deployment section to learn how to get and configure Google OAuth Client ID and Brevo API Key.


:::info Note

When you initially create your Om Application, the Google OAuth Client ID and Brevo API Key will be missing, which means you won't be able to use the Authentication system locally and feautres like signing in, signing out will not work. 

However, once your application is deployed to the Google Cloud and the required configurations are properly set up, the authentication system will work seamlessly.

:::

## Seeding 
When you run the command `npm run db:seed` in `backend/` directory, the following users will be added to the database:

- Admin
- Sanskar
- Sariputra

By default, the first user created will be Admin.

## Switching between Unauthenticated and Authenticated State

When an unauthenticated user visits the '/' endpoint, they will be shown the Landing Page. However, when an authenticated user visits the same endpoint, they are shown Dashboard page.

During the development of your SaaS application, you will need to switch between authenticated and unauthenticated states. To do this, open the `middleware.py` file and modify the `is_authenticated` variable to either `True` or `False` as needed.