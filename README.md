# CC Payroll

## Backend

1. Create a `.env` file in the `backend` folder with the following contents:
    ```
    DB_CONNECTION_STRING=./payroll.db
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

2. Install dependencies and start the server:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

## Frontend

1. Create a `.env.local` file in the `frontend` folder with the following contents:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

2. Install dependencies and start the development server:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Running the App

- Start the backend server first, then the frontend server.
- Access the app at `http://localhost:3000`.

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)
