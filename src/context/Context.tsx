import { useContext,createContext, ReactNode,  useReducer } from "react";

type State ={
     data:any[],
     loading:boolean,
     cache:any ,
     per_Page:number ,
     pages:number,
     querySearch:string
}

type Action = {
      payload:any ,
       type:string 
}
type Cell = {
     
     state: State 
      dispatch:React.Dispatch<Action>
}

const context = createContext<Cell | null>(null)



export const ContextProvider = ({children}:{children:ReactNode})=>{
  
     const initialState = {
          data: [],
          loading: true,
          cache: {},
          per_Page: 20,
          pages: 1,
          querySearch: ""
        };
        
        const reducer = (state: State , action:Action ) => {
          switch (action.type) {
            case 'SET_DATA':
              return { ...state, data: action.payload, loading: false };
            case 'SET_CACHE':
              return { ...state, cache: action.payload };
            case 'SET_PAGES':
              return { ...state, pages: action.payload };
            case 'SET_QUERY':
              return { ...state, querySearch: action.payload };
            default:
              return state;
          }
        };
     const [state, dispatch] = useReducer(reducer, initialState);

     return <context.Provider  value={{state, dispatch }} >{children}</context.Provider>
}




export const UseMainContext = ()=>{
     const innerContext = useContext(context)
     if(!innerContext){
         throw new Error("Context Not Wrapped")
     }
     return innerContext
    }