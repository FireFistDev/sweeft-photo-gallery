import axios from "axios";
import { useContext,createContext, ReactNode,  useReducer, useEffect, useState } from "react";

type State ={
     data:any[],
     loading:boolean,
     singlePhotoData:any,
     per_Page:number ,
     pages:number,
     querySearch:string,
     singleID:string 
}

type Action = {
      payload:any ,
       type:string 
}
type Cell = {
     
     state: State 
      dispatch:React.Dispatch<Action>

      cache:any 
  
      getSingle:(id:string)=> void 
      SearchPhoto:(query:string)=> void
}

const context = createContext<Cell | null>(null)



export const ContextProvider = ({children}:{children:ReactNode})=>{
      const initialState = {
          data: [],
          singlePhotoData:{},
          loading: true,
          per_Page: 20,
          pages: 1,
          querySearch: "",
          singleID:''
        };
        
        const reducer = (state: State , action:Action ) => {
          switch (action.type) {
            case 'SET_DATA':
              return { ...state, data: action.payload, loading: false };
            case "SET_SINGLE":
              return {...state,  singlePhotoData:action.payload}
            case 'SET_PAGES':
              return { ...state, pages: action.payload };
            case 'SET_SINGLE_ID':
              return { ...state, singleID: action.payload };
            case 'SET_QUERY':
              return { ...state, querySearch: action.payload };
            default:
              return state;
          }
        };
     const [state, dispatch] = useReducer(reducer, initialState);
     const [cache,setCache] =  useState<any>({})
 
     const getData = async()=>{
      await axios.get(`https://api.unsplash.com/photos/?per_page=${state.per_Page}&page=${state.pages}&order_by=popular&client_id=BAprcfSosQfGW732JS9ICqsLvwMwvoNzhuADwKGLJxY`).then((res:any)=> {
        dispatch({ type: 'SET_DATA', payload: [...state.data, ...res.data] });
      })
    }
    
    const getinfo = async (query: string) : Promise<any> => {
       return  await axios.get(
         `https://api.unsplash.com/search/photos/?per_page=${state.per_Page}&page=${state.pages}&query=${query}&order_by=popular&client_id=BAprcfSosQfGW732JS9ICqsLvwMwvoNzhuADwKGLJxY`
       );
    
     } 
 
     const getSingle = async(id:string ) =>{

       try {
        dispatch({type:"SET_SINGLE_ID", payload:id})

        const res =   await axios.get(`https://api.unsplash.com/photos/${id}/?client_id=BAprcfSosQfGW732JS9ICqsLvwMwvoNzhuADwKGLJxY&order_by=popular&per_page=50&query=trees`)
         dispatch({type:'SET_SINGLE', payload:res.data})
        console.log(res )
       } catch (error) {
        console.log(error)
       }
     }
    const SearchPhoto = async (query:string) => {
    
     if (cache [query]) {
      dispatch({ type: 'SET_DATA', payload:cache[query]});
    } else {
      dispatch({ type: 'SET_DATA', payload: []});
      try {
        console.log("n")
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
          dispatch({ type: 'SET_PAGES', payload: state.pages + 1 });
    };
    }
    
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [state.pages]);
    
    useEffect(()=>{
      if (!state.querySearch) {
          getData();
        }  
      }, [state.pages])
      useEffect(()=>{
       if(state.querySearch){
     
        SearchPhotoInfinite(state.querySearch);
       }
      
       },[state.pages])

     return <context.Provider  value={{state, dispatch, cache,SearchPhoto, getSingle }}>{children}</context.Provider>
}



export const UseMainContext = ()=>{
     const innerContext = useContext(context)
     if(!innerContext){
         throw new Error("Context Not Wrapped")
     }
     return innerContext
    }