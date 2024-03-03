
import React from 'react'
import { UseMainContext } from '../context/Context';
interface PhotoProps {
    photo: {
        id:string 
        urls: {
            regular: string;
        };
        description: string;
    
        
    };
}
const PhotoCard: React.FC<PhotoProps> = ({ photo }) => {
    const {getSingle } = UseMainContext()
    return (
        <div onClick={()=>getSingle(photo.id)} className="photo-card">
            <img src={photo.urls.regular} alt={photo.description} className="photo-image" />
            <div className="photo-details">
          </div>
        </div>
    );
};

export default PhotoCard;