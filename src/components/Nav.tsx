import { Link, useNavigate } from "react-router-dom";
import "../index.css"; // Import your CSS file
import { UseMainContext } from "../context/Context";

export default function Nav() {
  const {dispatch}  = UseMainContext()

 const Navigation = useNavigate() 

  const navigateToMain = ()=>{
     Navigation("/")
     dispatch({ type: "SET_DATA", payload: [ ] })
  }
  return (
    <nav className="navbar">
      <a onClick={ navigateToMain }   className="nav-link">
        Main
      </a>
      <a  onClick={()=>Navigation("/history")} className="nav-link">
        History
      </a>
    </nav>
  );
}
