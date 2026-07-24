AI Interview Platform

A full-stack MERN application built to make job interview preparation simpler. The core idea: paste in a job description, get role-specific interview questions, see where your skills fall short, and get a preparation roadmap based on that gap.

Live: https://ai-interview-platform-gamma-woad.vercel.app

What it does

Interview prep usually means jumping between different tools - one place for the resume, another to figure out what a job description actually needs, another to search for interview questions. This project brings all of that into one place:

Parses a job description and extracts the important requirements
Generates interview questions relevant to that specific role (using the Grok API)
Compares the user's current skills against what the role requires
Produces a learning roadmap based on the resulting skill gap
Includes a resume builder
Tech Stack
Frontend - React.js
Backend - Node.js, Express.js
Database - MongoDB
AI - Grok API
Deployment - Frontend on Vercel, Backend on Render
Folder Structure
ai-interview-platform/
├── Backend/       Express API, routes, controllers, models
├── Frontend/      React app
├── render.yaml    Render deployment config
└── .gitignore
Running Locally

Clone the repo:

git clone https://github.com/SHARAD7618/ai-interview-platform.git
cd ai-interview-platform

Backend setup:

cd Backend
npm install

Frontend setup:

cd ../Frontend
npm install

Create a .env file inside the Backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GROK_API_KEY=your_grok_api_key

Then run:

# From Backend
npm start

# From Frontend
npm start
Roadmap



Contributions are welcome - fork the repo, create a branch, and open a pull request.

Author

Sharad - BCA student, MERN stack developer GitHub: https://github.com/SHARAD7618
