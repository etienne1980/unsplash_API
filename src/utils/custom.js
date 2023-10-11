import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const customFetch = axios.create({
  baseURL: `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=`,
});

/* 

Using environment variables is a standard practice for managing sensitive information, such as API keys, credentials, and other configuration data. It helps keep this information secure and separate from your codebase.

1. Create a .env file: This is where you'll store your sensitive information.

2. Add .env to .gitignore: This ensures that the .env file is not included in your version control system (like Git), so it won't be pushed to GitHub.

3. Define environment variables in .env: Follow the NAME=VALUE format. In your case, using VITE_ is specific to Vite.js, which is a build tool. If you were using a different framework or environment, the prefix might be different (e.g., REACT_APP_ for React applications).

VITE_API_KEY=your_api_key_here

4. Restart your server: This is necessary for the changes to take effect.

5. Access the environment variable in your code: You can use import.meta.env in Vite.js to access the environment variable.

const apiKey = import.meta.env.VITE_API_KEY;

By following these steps, you're ensuring that your sensitive information is kept separate from your codebase, which helps maintain security and privacy. It's a good practice for managing configuration in any project, particularly when it comes to sensitive data.

*/
