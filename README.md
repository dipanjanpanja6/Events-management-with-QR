This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Production Guide

First, setup [Node.js/npm](https://nodejs.org/en/download/) and [postgres](https://www.postgresql.org/)

Then, create .env.local file from `.env.local.example` and update database url

Then, run :

```bash
npm run setup
#or
sh ./.script/setup.sh
```

<details>
  <summary>Or create database manually</summary>

```bash
psql -U <username> <default_database_name> -c "CREATE DATABASE <new_database_name>;"
```

Then, run:

```bash
npm i
npm run migrate:latest
npm run build
npm start

```

</details>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

```

```
