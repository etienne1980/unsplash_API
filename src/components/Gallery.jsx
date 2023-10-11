import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../utils/custom";
import { toast } from "react-toastify";
import { useGlobalContext } from "./Context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["images", searchTerm], // by default react query caches the result of the get request and it stores in memory (caches) using the queryKey provided and only if the value of the queryKey changes it re-fetches the results. we need to add the searchTerm to the queryKey array. the searchTerm will trigger reactQuery to refetch the images... why?? because the queryKey array has changed (remember that it changes because searchTerm represents what the user searched for in the search field inside the form) and that is why I used an array so that I can add multiple values. If the search term was not into the array, we would not display the images when the user performs the search (because the query key would not change and therefore react would not trigger a refetch).

    queryFn: () => customFetch(searchTerm),
  });

  /* alternavite set up (without using the custom axios request)
  
    const { data, isLoading, isError } = useQuery({
    queryKey: ["picture", searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(`${url}&query=${searchTerm}`);
      //   console.log(data);
      return data;
    },
  });
  */

  if (isLoading) {
    return (
      <section className='container'>
        <h2>Loading images ...</h2>
      </section>
    );
  }

  if (error) {
    console.log(error);
    return <p>{error.message}</p>;
  }

  if (data.data.results.length === 0) {
    toast.error("no result found");
    return;
  }

  return (
    <article className='container'>
      {data.data.results.map((item) => {
        // console.log(item);

        // using optional chaining
        const image = item?.urls?.regular || "image not available"; // in essence, this line of code is trying to get the regular URL from item.urls, but if it doesn't exist or is null, it will default to the string "image".

        const { id, alt_description } = item;

        return (
          <div key={id}>
            <img className='img' src={image} alt={alt_description} />
          </div>
        );
      })}
    </article>
  );
};

export default Gallery;
