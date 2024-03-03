
import Home from "./pages/Home";
import History from "./pages/History";
import { BrowserRouter  , Route ,Routes } from "react-router-dom";
import LayOut from "./LayOut";
import "./index.css"
function App() {
  return (
 
      < BrowserRouter>
          <Routes>
        <Route path="/" Component={LayOut} >
            <Route path="" Component={Home} />
            <Route path="/history" Component={History} />
              
      </Route>
          </Routes>
 </ BrowserRouter>
 
  );
}

export default App;
