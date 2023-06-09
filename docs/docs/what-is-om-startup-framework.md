---
sidebar_position: 30
---

# What is Om Startup Framework?

Om Startup Framework is an effort to save you months of Development Time by providing pre-built functionality for commonly used features such as authentication, pricing, landing, user dashboard, url shortner, affiliate system etc. 

To do that we have already implemented code using Technologies like Next.js, Django, Kubernetes and many technologies.

An Om Startup application is mainly split into 5 folders: frontend, backend, blog, k8s .github.

**frontend**
The frontend uses Next.js framework, Elastic UI and Tailwind Css. It has Pages for authentication, pricing, landing, user dashboard, url shortner, affiliate system etc. 

**backend**
The backend uses Django framework and provides backend functionality to support authentication, pricing, landing, user dashboard, url shortner, affiliate system etc. pages. It also use SQLite Database be default.

**blog**
The Blog is a Next.js based Blog created using blogging template of [tailwind-nextjs-starter-blog by Timothy](https://github.com/timlrx/tailwind-nextjs-starter-blog)

**k8s** 
We use Kubernetes to deploy application. By the way you don't need to know Kubernetes or Docker as it is already configured for you.


**.github** 
It containg Github Action YAML file to delpoy application to Kubernetes on push. Again you do not need to know Github Action as it is already configured for you.