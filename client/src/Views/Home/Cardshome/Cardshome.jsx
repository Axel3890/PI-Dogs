import React, { useState, useEffect } from 'react';
import "./Cardshome.css";
import { Link } from 'react-router-dom';

const Cardshome = ({ data }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const isNumeric = !isNaN(data.id);

  const imageUrl = isNumeric
    ? `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`
    : data.reference_image_id;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = imageUrl;

    imageLoader.onload = () => {
      if (imageLoader.src === imageUrl) {
        setImage(imageUrl);
        setLoading(false);
      }
    };

    return () => {
      imageLoader.onload = null;
    };
  }, [imageUrl]);

  return (
    <Link to={`/detail/${data.id}`}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <img
                src={image}
                alt={data.name}
              />
            )}
            <p className="title">{data.name}</p>
          </div>
          <div className="flip-card-back">
            <p className="title">Haz click para más detalles!</p>
            <p>Peso: {data.weight}</p>
            <p>Temperamentos: {data.temperament}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cardshome;

// //div {
//   width: 100%;
//   height: 50%;
//   overflow: clip; corta la imagen
// }

// img {
//   height: 100%;
//   width: auto;
// }