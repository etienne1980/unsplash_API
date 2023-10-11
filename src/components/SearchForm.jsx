import { toast } from "react-toastify";
import { useGlobalContext } from "./Context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // accessing the value for the input (what the user writes in the input field) (instead of using the controlled input). search is the value of the name attribute inside the input text
    const searchValue = e.target.elements.search.value;

    if (!searchValue) {
      toast.warn("please insert pic to search");
      return;
    }

    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className='title'>unsplash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          className='form-input search-input'
          type='text'
          name='search'
          placeholder='type here the image are you looking for'
        />
        <button className='btn' type='submit'>
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
