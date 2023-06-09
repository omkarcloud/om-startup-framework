---
sidebar_position: 10
---

# TLDR of Frontend

## Routes 
We have already implemented a number of essential pages related to authentication, users dashboard, terms and conditions, pricing in next.js based frontend. 

Below, you will find an overview of the routes that have been created for your convenience:

- **Landing Page ('/')**
  - Shows to unauthenticated users.
  - Shows frequently asked questions (FAQs) Component at end.

- **Dashboard ('/')**
  - Shown to authenticated users.
  - Shows a collapsible navigation bar for  navigation.

- **Sign in/Sign up pages (/auth/sign-in/, /auth/sign-up/)**
  - Utilizes JWT for authentication.
  - Stores the authentication token as a cookie.
  - Supports authentication via email, Google, and password recovery.

- **Pricing ('/pricing/')**
  - Offers variable pricing options.
  - Includes FAQs and a WhatsApp contact button.

- **User Dashboard ('/staff/users/')**
  - Only accessible to Admin
  - Enables user management functions such as user deletion and banning.
  - Allows the admin to download usera as a CSV file.
  - Allows to see actions performed by user.

- **URL Shortener ('/staff/short-urls/')**
  - URL shortening similar to services like bit.ly.
  - Tracks the number of clicks on shortened URLs.

- **Privacy Policy and Terms & Conditions ('/legal/privacy/', '/legal/terms/')**
  - Provides privacy policy and terms templates.
  - Suitable for startups selling software services like Webflow, Shopify, and GitHub.

<!-- TODO: Action Tracking -->

<!-- TODO: Affiliate Marketing System -->

## Technologies: 
Elastic UI component library is used for creating beautiful buttons and navigation bars. Additionally, Tailwind CSS is also used in the development process.
