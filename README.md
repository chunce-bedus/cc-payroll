# cc-payroll

## Overview

cc-payroll is a payroll management system for workers at palm oil fruit collection centers. It allows workers to manage their profiles, sign up, sign in, and track their performance and salaries based on grading forms received from the palm oil mill.

## Features

- **User Authentication**: Sign up and sign in using email and password.
- **Employee Management**: Add, update, view, and delete employee details.
- **Performance Tracking**: View and manage grading performance and cumulative salaries.
- **Multi-Language Support**: Available in English and Bahasa Indonesia.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cc-payroll.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cc-payroll
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory with the following entries:
    ```
    DB_CONNECTION_STRING=./payroll.db
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```
2. The server will run on `http://localhost:5000` by default.

## API Endpoints

### Employee Management

- **Get All Employees**
  - `GET /api/employees/all`
  - Returns a list of all employee names.

- **Sign Up**
  - `POST /api/employees/signup`
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "collectionCenter": "MJM Bekenu"
    }
    ```

- **Sign In**
  - `POST /api/employees/signin`
  - Request body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Returns a JWT token.

- **Get Employee Details**
  - `GET /api/employees/:id`
  - Returns details of the employee with the given ID.

- **Update Employee Details**
  - `PUT /api/employees/:id`
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "collectionCenter": "MJM Bekenu",
      "password": "newpassword123"
    }
    ```

- **Delete Employee**
  - `DELETE /api/employees/:id`
  - Deletes the employee with the given ID.

## Testing

You can use tools like Postman to test the API endpoints.

## Contribution

Feel free to fork the repository and submit pull requests. Please ensure your code adheres to the project’s coding standards.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions, please contact [daneshdaren@gmail.com](mailto:daneshdaren@gmail.com).
