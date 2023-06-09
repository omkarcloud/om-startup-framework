---
sidebar_position: 40
---

# Kubernetes


We use Kubernetes to configure and manage the complete stack of Om Startup Framework. Spefically we use Kubernetes for following purposes:

- Provisioning a 4GB volume for the SQLite database.
- Proxying all requests sent to the '/blog/' URL to the blog service.
- Proxying all requests sent to the '/backend/' URL to the backend service.
- Proxying all other requests to the frontend service.
- Getting an SSL certificate from Let's Encrypt when deploying the project on the Google Cloud Platform.


:::info Note

It is perfectly fine if you're not familiar with Kubernetes, as the information mentioned above was just for your knowledge, Kubernetes is already configured for you in Om Startup Framework

:::
