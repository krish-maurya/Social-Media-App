DEVNET Social Media App (XUI)

A full-stack real-time Social Media Application built with Next.js 16, React 19, Prisma, PostgreSQL, Clerk Authentication, Socket.IO, and ImageKit.
This project demonstrates modern full-stack development with authentication, real-time updates, infinite scrolling, media uploads, and optimized database queries.

🌟 Features
🔐 Authentication with Clerk
👤 User profiles with avatars
📝 Create, edit, and delete posts
❤️ Like posts
🔁 Repost functionality
💬 Real-time updates using Socket.IO
🖼️ Image uploads via ImageKit
🔎 Search functionality (users & posts)
♾️ Infinite scrolling feed
⚡ Optimized queries using Prisma
🎨 TailwindCSS responsive UI

🛠️ Tech Stack
Frontend
Next.js 16
React 19
TailwindCSS
TanStack React Query
React Infinite Scroll
Heroicons & Lucide Icons
timeago.js

Backend
Next.js (Custom Node Server)
Socket.IO
Prisma ORM
PostgreSQL
Zod (Validation)
Authentication & Media
Clerk (Authentication)
ImageKit (Image Upload & Optimization)

⚙️ Installation & Setup
1️⃣ Clone the Repository
```
git clone https://github.com/krish-maurya/Social-Media-App.git
cd Social-Media-App
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Setup Environment Variables

Create a .env file in the root directory:
```
DATABASE_URL=your_postgresql_database_url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```
4️⃣ Prisma Setup

Generate Prisma client:
```
npx prisma generate

Run migrations:

npx prisma migrate dev

Seed database:

npm run db:seed
```

🧪 Development

Run the development server:
```
npm run dev
```
This runs a custom Node server:
```
cross-env NODE_ENV=development node src/app/server.js
🚀 Production

Build the app:

npm run build

Start production server:

npm start

```
📁 Project Structure (Simplified)
```
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── server.js
│   │   └── ...
│   ├── components/
│   ├── lib/
│   └── ...
├── public/
├── package.json
└── README.md
```

🔥 Real-Time Architecture
Socket.IO server runs alongside Next.js custom server.
Clients connect via socket.io-client.

Used for:
Real-time likes
Instant post updates


📊 Database

PostgreSQL
Managed with Prisma ORM

🎯 Learning Highlights

This project demonstrates:
Full-stack architecture with modern React
Server-side & client-side separation
Real-time communication
Database optimization
Authentication flow handling
File uploads with CDN optimization
Production-ready structure

🧑‍💻 Author

Krish Maurya
GitHub:
https://github.com/krish-maurya

📜 License

This project is open-source and available under the MIT License.
