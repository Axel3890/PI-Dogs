import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogByName } from '../../redux/Actions/Actions';
import "./Detail.css";
import { Link } from 'react-router-dom';

const Detail = () => {
  const { dogId } = useParams();
  const dispatch = useDispatch();
  const dogInfo = useSelector((state) => state.dogInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (dogId) {
      dispatch(getDogByName(dogId)).then(() => setIsLoading(false));
    }
  }, [dispatch, dogId]);

  if (isLoading) {
    return (
      <div className="detail-box loading">
        <strong>Cargando...</strong>
      </div>
    );
  }

  if (!dogInfo || !dogInfo.id) {
    return (
      <div className="detail-box not-found">
        <strong>No se encontraron detalles del perro.</strong>
      </div>
    );
  }

  const imageUrl =
    typeof dogInfo.id === 'number'
      ? `https://cdn2.thedogapi.com/images/${dogInfo.image}.jpg`
      : dogInfo.image;

  return (
    <div className="detail-container">
      <div className="detail-box">
        <div className="detail-image">
          <img src={imageUrl} alt={dogInfo.name} className="dog-image" />
        </div>
        <div className="detail-text">
          <div className="detail-item">
            <h3>ID:</h3> {dogInfo.id}
          </div>
          <div className="detail-item">
            <h3>Nombre:</h3> {dogInfo.name}
          </div>
          <div className="detail-item">
            <h3>Altura:</h3> {dogInfo.height}
          </div>
          <div className="detail-item">
            <h3>Peso:</h3> {dogInfo.weight}
          </div>
          <div className="detail-item">
            <h3>Temperamento:</h3> {dogInfo.temperaments.join(', ')}
          </div>
        </div>
        <div className='boton'>
        <Link to="/home" className="button-search">
        Volver a home
      </Link>
      </div>
      </div>
    </div>
  );
};

export default Detail;