This is a full stack application based on the MERN app from [John Smilga](https://github.com/john-smilga/mern-jobify-v2/tree/main), but using Typescript and React server components

## Stack used

Database: [MongoDB](https://www.mongodb.com/)
ORM: [Prisma](https://www.prisma.io/)
Backend: [Express](https://expressjs.com/), [NodeJS](https://nodejs.org)
Frontend: [NextJS](https://nextjs.org/)
Schema Validation - runtime: [zod](https://github.com/colinhacks/zod)

## Live app

[https://mern-nextjs.onrender.com](https://mern-nextjs.onrender.com)

## Fork instructions

- Make the following change

📁client/utils/customFetch.ts
```diff
+const url = `http://localhost:${port}`
-const url = "https://mern-nextjs.onrender.com"
```

- run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
