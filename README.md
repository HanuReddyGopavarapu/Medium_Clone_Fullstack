# Medium App Clone

A feature-rich blogging platform inspired by Medium, allowing users to create, edit, and share articles seamlessly. The project is built with a modern web stack, ensuring scalability, security, and performance.

## 🚀 Features
- User authentication (signup/login) using JWT
- Create, edit, and delete articles
- Responsive UI with Tailwind CSS
- Role-based access control
- Secure API endpoints with type validation
- Optimized database queries with Prisma Accelerate

## 🛠 Tech Stack
### Frontend:
- **React**: Component-based UI development
- **TypeScript**: Strongly-typed JavaScript for better maintainability
- **Tailwind CSS**: Utility-first styling for a modern and responsive design
- **Axios**: API communication
- **Custom Type-Checking Library**: Ensures data validation on the frontend

### Backend:
- **Hono**: Lightweight, high-performance web framework
- **Express.js**: Simplified API handling
- **Prisma ORM**: Database modeling and queries
- **PostgreSQL**: Relational database management
- **Zod**: Schema validation
- **JWT Authentication**: Secure user sessions

### Deployment:
- **Cloudflare Workers**: Serverless deployment for performance and scalability
- **Prisma Accelerate**: Optimized connection pooling for database interactions

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/medium-app-clone.git
   cd medium-app-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```sh
   DATABASE_URL="your_postgresql_database_url"
   JWT_SECRET="your_secret_key"
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## 📜 API Endpoints
### Authentication:
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user

### Articles:
- `GET /api/articles` - Retrieve all articles
- `POST /api/articles` - Create a new article
- `PUT /api/articles/:id` - Update an article
- `DELETE /api/articles/:id` - Delete an article

## 📖 License
This project is licensed under the [MIT License](LICENSE).

---

💡 **Contributions are welcome!** If you find any issues or have suggestions, feel free to open a PR.
