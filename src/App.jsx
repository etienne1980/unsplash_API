import Gallery from "./components/Gallery";
import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/ThemeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position='top-center' autoClose={1000} />
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </>
  );
};
export default App;
