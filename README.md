# 🌤️ Weather Journal

Weather Journal is a mini project developed as part of a learning journey to explore API integration, database management, and web application deployment using Next.js.

The application allows users to search for real-time weather information and create personal journal entries to record their daily experiences.

Throughout this project, we explored **Next.js, TypeScript, Weather API, Prisma ORM, and SQLite**. The application was deployed using **Vercel**. However, since Vercel's serverless environment does not support persistent write operations to local SQLite files, we integrated **Turso (libSQL)** as a cloud-hosted database to enable full CRUD functionality in the deployed application.

## 🚀 Live Demo

[Weather Journal – Visit Website](https://weather-journal-gzsa.vercel.app/)

## ✨ Features

- Search for weather information by city.
- View current weather conditions and temperature.
- Create personal weather journal entries.
- View saved journal entries.
- Edit existing journal entries.
- Delete journal entries.
- Store journal data in a cloud-hosted database.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** React Bootstrap
- **Weather Data:** Weather API
- **ORM:** Prisma
- **Local Database:** SQLite
- **Cloud Database:** Turso (libSQL)
- **Deployment:** Vercel

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/WinnyJazz/weather-journal.git
```

### 2. Navigate to the project directory

```bash
cd weather-journal
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and configure the following variables:

```env
DATABASE_URL="your_database_url"
TURSO_DATABASE_URL="your_turso_database_url"
TURSO_AUTH_TOKEN="your_turso_auth_token"
OPEN_WEATHER_API_KEY="your_weather_api_key"
```

Replace the placeholder values with your own credentials.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turso Documentation](https://docs.turso.tech/)
- [OpenWeather API Documentation](https://openweathermap.org/api)

---

Developed as a learning project to explore full-stack web development, database integration, API usage, and deployment.
