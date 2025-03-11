GitHub Repository Explorer

This is a React application that allows users to search for GitHub users and view their profiles using the GitHub API.

🚀 Features

Search for GitHub users by username

Display a list of matched users

View user details including username and list of repository

Redux Toolkit for state management

Integration tests using Jest and React Testing Library

🛠 Tech Stack

Frontend: React, TypeScript

State Management: Redux Toolkit

Testing: Jest, React Testing Library, Redux Mock Store

📦 Installation

Clone the repository

git clone https://github.com/heyghani/github-repo-explorer.git
cd github-repo-explorer

Install dependencies

npm install
# or
yarn install

🔥 Usage

Start the development server

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

🧪 Running Tests

To run the test suite:

npm test
# or
yarn test

Test Coverage

To check code coverage:

npm test -- --coverage
# or
yarn test --coverage

📂 Project Structure

├── src
│   ├── components          # UI components (SearchForm, ListUser, etc.)
│   ├── store               # Redux slices and store configuration
│   ├── utils               # Helper functions
│   ├── tests               # Test utilities and mocks
│   ├── types               # Interfaces
│   ├── App.tsx             # Root component
│   ├── index.tsx           # React entry point
│
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation

📜 API Reference

The app fetches data from the GitHub API:

GET https://api.github.com/search/users?q={username} - Search users
GET https://api.github.com/search/users/{username}/repos - Fetch user repositories


📄 License

This project is licensed under the MIT License.

