# FAQ Management System

This is a Node.js/Express-based FAQ management system that supports multilingual content and comes with rich text editing capabilities. The system provides automatic translation into Hindi and Bengali, allowing seamless management and display of FAQ content across multiple languages.

### Core Features

- **Multilingual FAQ Management**: Automatically translates FAQs to Hindi and Bengali using the Google Translate API.
- **Rich Text Editing**: Create and format FAQs with full rich text editing capabilities.
- **RESTful API**: Easily integrates with other systems using the provided API.
- **Caching with Redis**: Boosts performance by caching frequently accessed data.
- **Admin Interface**: Manage FAQ entries, preview translations, and monitor translation statuses.
- **Real-Time Translation Indicators**: Visual feedback on the translation progress.
- **Dockerized Deployment**: Containerized for easy setup and deployment.
- **Test Coverage**: Ensure stability with unit and integration tests.

### Technology Stack

- **Node.js**: JavaScript runtime for building the backend API and handling server-side logic.
- **Express.js**: Lightweight framework for building APIs and managing routing.
- **MongoDB**: NoSQL database for storing FAQ data.
- **Redis**: In-memory data structure store, used for caching frequently accessed data.
- **Google Translate API**: Provides automatic translations for FAQs in Hindi and Bengali.
- **Mocha & Chai**: Testing frameworks for unit and integration tests.
- **Docker**: Used for containerization, simplifying deployment.

---

### Project Structure

```plaintext
faq-backend/
├── config/
│   ├── db.js                # MongoDB connection configuration
│   ├── redis.js             # Redis connection configuration
├── controllers/
│   ├── faqController.js     # Logic to handle FAQ-related requests
├── middlewares/
│   ├── authMiddleware.js    # Authorization middleware (if applicable)
├── models/
│   ├── faq.js               # MongoDB schema for FAQ data
├── routes/
│   ├── faqRoutes.js         # API routes for FAQ operations
├── service/
│   ├── translationService.js # Integration with Google Translate API
├── utils/
│   ├── cache.js             # Cache management with Redis
│   ├── errorHandler.js      # Middleware for error handling
├── app.js                   # Express app setup and configuration
├── tests/
│   ├── faq.test.js          # Unit tests for the FAQ API
├── .env                     # Environment variables for sensitive data
├── .gitignore               # Files to be ignored by Git
├── Dockerfile               # Dockerfile for building the container
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
└── server.js                # Entry point for the Express server
```

---

### Prerequisites

Before running this project, ensure that you have the following installed:

- **Node.js & npm**: Download and install from [here](https://nodejs.org/en/download/).
- **Redis**: Install Redis from [here](https://redis.io/download).

---

### Running the Project Locally

To get the application running locally on your machine, follow these steps:

1. **Clone the repository**  
   Clone the project to your local environment:

   ```bash
   git clone https://github.com/vanshjaggi/FAQ_SYSTEM_BHARATFD.git
   cd FAQ_SYSTEM_BHARATFD
   ```

2. **Install project dependencies**  
   Use npm to install the necessary packages:

   ```bash
   npm install
   ```

3. **Set up environment variables**  
   In the root directory, create a `.env` file to store environment-specific configurations like database URLs and API keys. Example:

   ```plaintext
   MONGO_URI=mongodb://127.0.0.1:27017/faqs
   REDIS_URL=redis://localhost:6379
   GOOGLE_TRANSLATE_API_KEY=ENTER_YOUR_KEY_HERE
   ```

4. **Start Redis server**  
   Ensure Redis is installed and running. You can start Redis by running:

   ```bash
   redis-server
   ```

5. **Launch the application**  
   Once the environment is set up, start the application:

   ```bash
   npm start
   ```

   The app will now be available at [http://localhost:8000](http://localhost:8000).

6. **Run tests**  
   To verify that everything works as expected, you can run the test suite:

   ```bash
   npm test
   ```

---

### Docker Deployment

To deploy the application in a Docker container:

1. **Build the Docker image**:

   ```bash
   docker build -t faqs-app .
   ```

2. **Run the application inside a container**:

   ```bash
   docker run -p 8000:8000 faqs-app
   ```

Your app will be accessible at [http://localhost:8000](http://localhost:8000) inside the Docker container.

---
