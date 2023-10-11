import { createContext, useContext, useEffect, useState } from "react";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

// function to check if user prefers dark mode (see comment below) in his user settings. it returns true or false
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches; // this will be true if computer setting are set on dark theme preference
  console.log(prefersDarkMode);

  // the point of the following line is to set a user preference: if the user does not have the default theme selected in the setting but likes to have the dark theme on the application, the value stored in local storage will be taken as a preference
  /* This line attempts to retrieve a value from the browser's local storage. It looks for an item with the key "darkMode". If it exists, it checks if its value is the string "true". If it is, storedDarmMode will be true; otherwise, it will be false. */
  const storedDarkMode = localStorage.getItem("darkMode") === "true"; // (getItem returns a string that is why I am comparing it to a string value 'true')

  /* This line returns the result of a logical OR (||) operation between storedDarmMode and prefersDarkMode. This means that if storedDarmMode is true, it will be returned. Otherwise, if storedDarmMode is false, it will return the value of prefersDarkMode. */

  return storedDarkMode || prefersDarkMode; // if both false means that user prefers light theme
};

// CONTEXT APP PROVIDER
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode()); // invoking function for dark mode check

  const [searchTerm, setSearchTerm] = useState("white-canvas");

  // function to implement dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    // storing in local storage
    localStorage.setItem("darkMode", newDarkTheme);
  };

  // set up functionality to fire when application loads:

  /* 
    everytime we toggle the theme using the toggleDarkTheme func (which is done when the user clicks on the button icons toggle):

    - the state var isDarkTheme changes 
    - and the code inside the useEffect runs every time it changes

  */

  useEffect(() => {
    // const body = document.querySelector("body");
    document.body.classList.toggle("dark-theme", isDarkTheme); //toggling based on isDarkTheme value (it true will add the class if false will remove the class)
  }, [isDarkTheme]);

  return (
    <globalContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </globalContext.Provider>
  );
};

/* dark theme user preference */

/* 

  const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;

    console.log(prefersDarkMode);

    return prefersDarkMode;
  };

  const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;:
  This line uses the window.matchMedia method to check if the user's operating system prefers a dark color scheme. 
  
  It does this by passing the CSS media query (prefers-color-scheme: dark) to matchMedia.
  
  The .matches property is then used to determine if the query matches the current environment.
  
  If it does, prefersDarkMode var will be true; otherwise, it will be false.


  The function is checking for the user's system preference for dark mode, which is controlled at the operating system level. 
  Specifically, it checks the user's preferred color scheme, which can be set by the user in their system settings.

  So, if a user has set their system to use dark mode (for example, in their device's settings), this function will return true. If the user prefers light mode, it will return false.

  Keep in mind that this code snippet specifically checks the user's system preference. If the user hasn't set a preference or if their browser doesn't support this feature, it may return false by default. 



*/
