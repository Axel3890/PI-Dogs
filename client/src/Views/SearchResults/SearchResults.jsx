import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cardshome from '../Home/Cardshome/Cardshome';
import { getRazas } from '../../redux/Actions/Actions';
import Loader from '../Loader/Loader';
import perrito from "../../utils/perrito.png";
import Filter from "../Filters/Filter";
import { Link } from 'react-router-dom';
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const razasData = useSelector((state) => state.razas);
  const selectedTemperament = useSelector((state) => state.selectedTemperament);
  const showApiDogs = useSelector((state) => state.showApiDogs);
  const showBddDogs = useSelector((state) => state.showBddDogs);
  const [sortOrder, setSortOrder] = useState("original");
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get('name');
  const [visibleData, setVisibleData] = useState([]);

  function extractWeightValue(weightString) {
    const match = weightString.match(/(\d+)/g);
    if (match && match.length >= 1) {
      return parseInt(match[0], 10);
    } else {
      return 0;
    }
  }

// Función para filtrar y ordenar los datos
const filterAndSortData = (data) => {
  let filteredDogs = data;

  if (selectedTemperament && selectedTemperament !== 'todos') {
    filteredDogs = data.filter((dog) =>
      dog.temperament && dog.temperament.includes(selectedTemperament)
    );
  }

  if (showApiDogs && showBddDogs) {
  } else {
    if (showApiDogs) {
      filteredDogs = filteredDogs.filter((dog) => typeof dog.id === 'number');
    }
    if (showBddDogs) {
      filteredDogs = filteredDogs.filter((dog) => typeof dog.id !== 'number');
    }
  }

  if (sortOrder === "asc") {
    filteredDogs.sort((a, b) => {
      // Ordenar por peso ascendente para mostrar menor peso primero
      return extractWeightValue(a.weight) - extractWeightValue(b.weight);
    });
  } else if (sortOrder === "desc") {
    filteredDogs.sort((a, b) => {
      // Ordenar por peso descendente para mostrar mayor peso primero
      return extractWeightValue(b.weight) - extractWeightValue(a.weight);
    });
  } else if (sortOrder === "za") {
    filteredDogs.sort((a, b) => {
      // Ordenar alfabéticamente de Z a A
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    });
  } else if (sortOrder === "az") {
    filteredDogs.sort((a, b) => {
      // Ordenar alfabéticamente de A a Z
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }

  return filteredDogs;
};


  useEffect(() => {
    if (searchName) {
      dispatch(getRazas(searchName)).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, searchName]);

  useEffect(() => {
    setVisibleData(filterAndSortData(razasData));
  }, [razasData, selectedTemperament, showApiDogs, showBddDogs, sortOrder]);

  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const start = currentPage * dogsPerPage;
  const end = start + dogsPerPage;

  if (!isLoading && (!visibleData || visibleData.length === 0)) {
    return (
      <div>
        <img src={perrito} alt="buscando" />
        <br></br>
        <h3>No se encontró lo que buscabas, prueba con otro nombre!</h3>
        <Link to="/home">
          <button className="buttonsearchsr">
            Volver a home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <Filter setSortOrder={setSortOrder}></Filter>
          <div className="grid-container">
            {visibleData.slice(start, end).map((data, index) => (
              <Cardshome key={index} data={data} />
            ))}
          </div>
          <br />
          <div>
            <button
              className='btn'
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Anterior
            </button>
            <span>Página {currentPage + 1}</span>
            <button
              className='btn'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={end >= visibleData.length}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
