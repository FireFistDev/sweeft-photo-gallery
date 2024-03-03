

import { UseMainContext } from "../context/Context";

const Search = () => {
    const {dispatch,SearchPhoto} = UseMainContext()
    let debounceTimer: number | undefined ;
   
  
    const debouncedSearchPhoto = (query:string) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
          SearchPhoto(query);
          dispatch({ type: "SET_QUERY", payload: query }   )
      }, 500); 
    };

  return (
    <input
    type="text"
    className="search-input"
    placeholder="ძებნა"
    onChange={(e) => debouncedSearchPhoto  (e.target.value)}
  />
  )
}

export default Search
