---
sidebar_position: 20
---

# Backend

The backend of our system is implemented using Django and can be found in the '/backend' folder. It serves as the foundation for supporting the functionality of the frontend. If you need to incorporate new APIs, you can conveniently add them to the Backend Django app.

## Database 

For the database, I had the option of using either SQLite or PostgreSQL. I opted for SQLite due to several reasons.

-   Most Importantly for me as an Indian is that it is SQLite is cheaper than PostgreSQL since in SQLite there is no need to purchase a separate server.
-   It allows developers to start developing faster since PostgreSQL requires spinning up a server, whereas SQLite is file-based
-   It is easier to view table contents using SQLite Browser application in SQLite compared to PostgreSQL

Although, it can be argued that PostgreSQL is more Scalable but for a Start Up, SQLite does the Job Perfectly. Also, in future you can always migrate to PostgreSQL if necessary.


## File Downloads

In our StartUps, there are instances where we need to share educational PDFs and templates with users. If you want to share a file with users, you can store it in the `/backend/downloads/` directory. Users will be able to access the file using a URL like `yourdomain.com/downloads/filename`.

<!-- Example ?: For example, when you bootstrap the application, we store the logo in the downloads folder by default. -->

## Email Templates

We have included email templates that can be used for welcoming users to your application or when they contact you through the Contact Form. It is recommended to customize these templates to align with your specific application. To do so, edit the respective HTML files located in `backend.backend/templates`.
