import {  useState, useEffect } from "react"
import axios from "axios"
import PhotoCard from "../components/PhotoCard"
import { UseMainContext } from "../context/Context";
import { json } from "react-router-dom";
const Home = () => {

  const { state,dispatch,SearchPhoto} = UseMainContext()
  const { data, loading,   } = state
  let debounceTimer: number | undefined ;
 

  const debouncedSearchPhoto = (query:string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        SearchPhoto(query);
        dispatch({ type: "SET_QUERY", payload: query }   )
    }, 500); 
  };

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
