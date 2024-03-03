import { useRef } from "react";
import { UseMainContext } from "../context/Context";
import useOutClick from "../hooks/useOutClick";

export default function SinglePage() {
  const { dispatch, state } = UseMainContext();
  const { views, likes, downloads, urls }  = state.singlePhotoData;
  const imgRef: any = useRef(null);
  const removeId = () => {
    dispatch({ type: "SET_SINGLE_ID", payload: "" });
    dispatch({ type: "SET_SINGLE", payload: {} });
  };

  useOutClick(imgRef, removeId);
  if (urls && urls.full) {
    return (
      <div className="singlePage">
        <div ref={imgRef} className="imageCard">
          <img src={urls.full} alt="Full size" />
          <div className="info">
            <div>Views: {views}</div>
            <div>Likes: {likes}</div>
            <div>Downloads: {downloads}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="singlePage">loading</div>;
  }
}
