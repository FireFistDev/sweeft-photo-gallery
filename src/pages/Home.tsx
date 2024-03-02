import {  useState, useEffect } from "react"
import axios from "axios"
import PhotoCard from "../components/PhotoCard"
import { UseMainContext } from "../context/Context";
const Home = () => {
  const { state,dispatch} = UseMainContext()
  
 const { data, loading, per_Page, pages, querySearch} = state
let debounceTimer: number | undefined ;
const [cache,setCache] =  useState<any>({})

  const debouncedSearchPhoto = (query:string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        SearchPhoto(query);
        dispatch({ type: "SET_QUERY", payload: query }   )
    }, 500); 
  };

  const getData = async()=>{
    await axios.get(`https://api.unsplash.com/photos/?per_page=${per_Page}&page=${pages}&order_by=popular&client_id=BAprcfSosQfGW732JS9ICqsLvwMwvoNzhuADwKGLJxY`).then((res:any)=> {
      dispatch({ type: 'SET_DATA', payload: [...data, ...res.data] });
    })
  }

  const getinfo = async (query: string) : Promise<any> => {
     return  await axios.get(
       `https://api.unsplash.com/search/photos/?per_page=${per_Page}&page=${pages}&query=${query}&order_by=popular&client_id=BAprcfSosQfGW732JS9ICqsLvwMwvoNzhuADwKGLJxY`
     );

   }
 

 
const SearchPhoto = async (query:string) => {

   if (cache[query]) {
    dispatch({ type: 'SET_DATA', payload:cache[query]});
  } else {
    dispatch({ type: 'SET_DATA', payload: []});
    try {
      const response = await  getinfo(query)
       setCache({ ...cache, [query]: response.data.results});
      dispatch({ type: 'SET_DATA', payload: response.data.results });

  
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: 'SET_DATA', payload: []});

    }
  }
};

const SearchPhotoInfinite = async (query:string) => {
 
  try {
    const response = await  getinfo(query)
    if(cache[query]) { 
    
    const cashedData = [...cache[query], ...response.data.results] 
     
    setCache({ ...cache, [query]: cashedData });
    dispatch({ type: 'SET_DATA', payload:  cashedData });
}
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({ type: 'SET_DATA', payload: []});
  }
}

const handleScroll = () => {
  const fullHeightControl  =  window.innerHeight   +  document.documentElement.scrollTop  
  if (fullHeightControl  >= document.documentElement.scrollHeight ) {
      dispatch({ type: 'SET_PAGES', payload: pages + 1 });
};
}


useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [pages]);


useEffect(()=>{
  getData()
}, [])
 
useEffect(() => {
  if (!querySearch) {
 
    getData();
  } else {
    SearchPhotoInfinite(querySearch);
  }
}, [pages, querySearch]);

 

  return (
    <main className="home-main">
      <input
        type="text"
        className="search-input"
        placeholder="ძებნა"
        onChange={(e) => debouncedSearchPhoto  (e.target.value)}
      />
      <div  className="home-div">
        {data?.map((item:any, index:number) => (
          <PhotoCard key={item.id + index} photo={item} />
        ))}
        { loading && <p>Loading...</p>}
      </div>
 
    </main>
  )
        }
  
export default Home
