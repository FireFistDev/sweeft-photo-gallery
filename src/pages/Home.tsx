
import PhotoCard from "../components/PhotoCard"
import Search from "../components/Search";
import { UseMainContext } from "../context/Context";

const Home = () => {


  const { state } = UseMainContext()
  const { data, loading} = state
  


  return (
    <main className="home-main">
      <Search/>
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
