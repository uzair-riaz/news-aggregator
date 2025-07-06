# News Aggregator

News Aggregator is a full-stack web application that collects, filters, and displays articles from multiple news sources. The app allows users to search and filter articles based on various criteria and manage their news preferences.

## Features

### Frontend

- Built with **React** and **Tailwind CSS** and **ShadCn**.
- Real-time search and filtering options for articles.
- Infinite scrolling for seamless browsing.
- Multi-select filters for authors, categories, and sources.
- Responsive design for mobile, tablet, and desktop.

### Backend

- Built with **Laravel**.
- Supports **cursor-based pagination** for efficient data handling.
- Provides a robust API for managing articles and user preferences.
- Queue management for background tasks using **Laravel Queue**.
- Scheduled commands for periodic operations.

### Database

- Uses **MySQL** as the relational database for managing articles, preferences, and user data.

---

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux**: State management library.
- **React Infinite Scroll Component**: For infinite scrolling functionality.

### Backend

- **Laravel**: PHP framework for backend development.
- **MySQL**: Relational database for storing data.
- **Docker**: Containerization for consistent development and deployment environments.

---

## Requirements

Ensure you have the following installed on your machine:

- **Docker** and **Docker Compose**
- **Node.js** (>= 18.x)
- **npm** or **yarn** (for frontend dependencies)
- **MySQL** (optional if using Docker)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ArmashXD/news-aggregator
cd news-aggregator
```

### 2. Environment Variables

- Create a .env file in the backend directory and configure it as follows

```bash
APP_NAME=NEWS
APP_ENV=local
APP_KEY=base64:3JjJhlW9AjGjNX5YkvbR/kU6c686kbx3YXPFzXPwsJY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=news
DB_USERNAME=user
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

NEWS_API_KEY=bf64554809f94e9ca192f7135264d640
GUARDIAN_API_KEY=b29deda7-729c-4ab2-ad00-4a4a72e52e12
NEW_YORK_TIMES_API_KEY=iM9YWp0lWidBO3WbEcJyaVtADOywCh8J
NEW_YORK_TIMES_APP_SECRET=Lxn5UJ7dm5BajAPw
```

- Create a .env file in the frontend directory for any frontend-specific configurations .

```bash
VITE_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_APP_NAME=News Aggregator
```

### 3. Start Services:

Run the following command to build and start the containers

```bash
docker-compose up --build
```

### 4. Access the Application:

```bash
Frontend: http://localhost:3000
Backend: http://localhost:8000
```

### 5. Running Artisan Commands in Backend

To run Laravel artisan commands, access the backend container:

```bash
docker exec -it laravel-backend bash
php artisan migrate
php artisan queue:work
```

### Key Features in Detail

- Article Search and Filtering
- Users can search and filter articles by:

### Keywords

- Authors (multi-select)
- Categories (multi-select)
- Sources (multi-select)
- Date (filter by specific date)
- Infinite Scrolling
- Articles are displayed with infinite scrolling to enhance user experience and performance.

### User Preferences

- Users can set their preferences for:

### Favorite authors, categories, and sources.

- These preferences are saved and applied to the news feed

### Development

Running Locally Without Docker If docker compose is not working

### Backend

```bash
cd backend
composer update && composer install
php artisan migrate:fresh
php artisan schedule:work
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev

```
