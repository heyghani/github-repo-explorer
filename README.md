# GitHub Repository Explorer  
This is a React application that allows users to search for GitHub users and view their profiles using the GitHub API.  

You can see the live demo here: https://heyghani.github.io/github-repo-explorer

## Features  
- Search for GitHub users by username  
- Display a list of matched users  
- View a list of user repositories
- Redux Toolkit for state management  
- Unit & Integration tests using Jest and React Testing Library  

## Tech Stack  
- **Frontend:** React, TypeScript
- **Styling:** Taildwind CSS
- **State Management:** Redux Toolkit  
- **Testing:** Jest, React Testing Library

## Installation  
1. **Clone the repository:**  
   ```sh  
   git clone https://github.com/heyghani/github-repo-explorer.git && cd github-repo-explorer

2. **Install dependencies:**  
   ```sh
   npm install
   # or
   yarn install

## Usage

**Start the development server:**
  ```sh
     npm run start
     # or
     yarn start
  ```
Open http://localhost:3000 in your browser.

## Running the tests

**To run the test suite:**
  ```sh
     npm test
     # or
     yarn test
  ```
**Test Coverage: To check code coverage:**
  ```sh
     npm test -- --coverage
     # or
     yarn test --coverage
  ```

## Api Reference

Search users: ``GET https://api.github.com/search/users?q={username}``

Fetch user repositories: ``GET https://api.github.com/users/{username}/repos``
