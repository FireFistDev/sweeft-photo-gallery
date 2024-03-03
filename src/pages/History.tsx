
import PhotoCard from "../components/PhotoCard";
import { UseMainContext } from "../context/Context";
const History = () => {
  const { cache, dispatch, state } = UseMainContext();
  const { data } = state;

  const choseHistory = (val: string) => {
    dispatch({ type: "SET_DATA", payload: cache[val] });
    dispatch({ type: "SET_QUERY", payload: val });
  };



  return (
    <main className="home-main">
      <div className="history-container">
        {Object.keys(cache).map((val: string, i: number) => (
          <div
            onClick={() => choseHistory(val)}
            className="history-item"
            key={val + i}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="home-div">
        {data?.map((item: any, index: number) => (
          <PhotoCard key={item.id + index} photo={item} />
        ))}
      </div>
    </main>
  );
};

export default History;
