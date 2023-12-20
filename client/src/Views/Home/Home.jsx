import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cardshome from './Cardshome/Cardshome';
import { getRazas, allDogs } from '../../redux/Actions/Actions.js';
import "./Home.css";
import Loader from '../Loader/Loader';
import Filter from '../Filters/Filter';

const Home = () => {
  const dispatch = useDispatch();
  const dogsData = useSelector((state) => state.dogs);
  const razasData = useSelector((state) => state.razas);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get('name');
  const [filteredData, setFilteredData] = useState([]);
  const selectedTemperament = useSelector((state) => state.selectedTemperament);
  const [sortOrder, setSortOrder] = useState("original");
  const showApiDogs = useSelector((state) => state.showApiDogs);
  const showBddDogs = useSelector((state) => state.showBddDogs);

  // función para extraer el valor numérico de weight
  function extractWeightValue(weightString) {
    const match = weightString.match(/(\d+)/g);
    if (match && match.length >= 1) {
      return parseInt(match[0], 10);
    } else {
      return 0;
    }
  }


  useEffect(() => {
    console.log("pidiendo");
    if (searchName) {
      dispatch(getRazas(searchName)).then(() => {
        setIsLoading(false);
      });
    } else {
      dispatch(allDogs()).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, searchName]);
  console.log(dogsData)

  const visibleData = razasData.length > 0 ? razasData : dogsData;

  useEffect(() => {
    if (selectedTemperament && selectedTemperament !== 'todos') {
      let filteredDogs = visibleData.filter((dog) =>
        dog.temperament && dog.temperament.includes(selectedTemperament)
      );
  
      // Aplicar el filtro según la selección "Ambos"
      if (showApiDogs && showBddDogs) {
        setFilteredData(filteredDogs);
      } else {
        // Filtrar solo los perros de "API" o "BDD"
        if (showApiDogs) {
          filteredDogs = filteredDogs.filter((dog) => typeof dog.id === 'number');
        }
        if (showBddDogs) {
          filteredDogs = filteredDogs.filter((dog) => typeof dog.id !== 'number');
        }
        setFilteredData(filteredDogs);
      }
    } else {
      let allDogsData = visibleData;
  
      // Aplicar el filtro según la selección "Ambos"
      if (showApiDogs && showBddDogs) {
        setFilteredData(allDogsData);
      } else {
        // Filtrar solo los perros de "API" o "BDD"
        if (showApiDogs) {
          allDogsData = allDogsData.filter((dog) => typeof dog.id === 'number');
        }
        if (showBddDogs) {
          allDogsData = allDogsData.filter((dog) => typeof dog.id !== 'number');
        }
        setFilteredData(allDogsData);
      }
    }
  }, [selectedTemperament, visibleData, showApiDogs, showBddDogs]);

  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const start = currentPage * dogsPerPage;
  const end = start + dogsPerPage;

  const sortedData = [...filteredData];

  if (sortOrder === "asc") {
    sortedData.sort((a, b) => {
      const weightA = extractWeightValue(a.weight);
      const weightB = extractWeightValue(b.weight);
      return weightA - weightB;
    });
  } else if (sortOrder === "desc") {
    sortedData.sort((a, b) => {
      const weightA = extractWeightValue(a.weight);
      const weightB = extractWeightValue(b.weight);
      return weightB - weightA;
    })
  } else if (sortOrder === "za") {
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  } else if (sortOrder === "az") {
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }


  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>

          <Filter setSortOrder={setSortOrder} />
          <div className="grid-container">
            {sortedData.slice(start, end).map((data, index) => (
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
              &#8592;
            </button>
            <span>Página {currentPage + 1}</span>
            <button
              className='btn'
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={end >= visibleData.length}
            >
              &#8594;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
