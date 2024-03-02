
import React from 'react'
interface PhotoProps {
    photo: {
        urls: {
            regular: string;
        };
        description: string;
        likes: number;
        sponsorship: {
            // tagline: string;
            sponsor: {
                name: string;
            };
        };
    };
}
const PhotoCard: React.FC<PhotoProps> = ({ photo }) => {
    return (
        <div className="photo-card">
            <img src={photo.urls.regular} alt={photo.description} className="photo-image" />
            <div className="photo-details">
 
                {/* <h3>{photo.description}</h3> */}
                {/* <p>Likes: {photo.likes}</p> */}
      
            </div>
        </div>
    );
};

export default PhotoCard;