import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Filters.css';
import { setSelectedTemperament, getTemperaments, setShowBddDogs, setShowApiDogs } from '../../redux/Actions/Actions.js';
import { useEffect } from 'react';

const Filter = ({ setSortOrder }) => {
  const temperamentos = useSelector((state) => state.temperaments);
  const [selectedTemperament, setSelectedTemperamentLocal] = useState('');
  const [selectedDogsType, setSelectedDogsType] = useState('ambos');

  const dispatch = useDispatch();

  useEffect(() => {
    if (temperamentos.length === 0) {
      dispatch(getTemperaments())
        .catch((error) => {
          console.error("Error al obtener los temperamentos:", error);
        });
    }
  }, [dispatch, temperamentos]);

  const handleResetSort = () => {
    setSortOrder("original");
  };

  const handleTemperamentSelect = (event) => {
    const selectedTemperament = event.target.value;
    setSelectedTemperamentLocal(selectedTemperament);
    dispatch(setSelectedTemperament(selectedTemperament));
  };

  const handleWeightSort = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    if (order === "za") {
      // Si se selecciona "Z-A," ordena alfabéticamente de la Z a la A
      setSortOrder("za");
    }
    if (order === "az") {
      // Si se selecciona "A-Z," ordena alfabéticamente de la A a la Z
      setSortOrder("az");
    }
  };

  const handleDogsTypeSelect = (event) => {
    const selectedType = event.target.value;
    setSelectedDogsType(selectedType);

    if (selectedType === 'api') {
      dispatch(setShowApiDogs(true));
      dispatch(setShowBddDogs(false));
    } else if (selectedType === 'bdd') {
      dispatch(setShowApiDogs(false));
      dispatch(setShowBddDogs(true));
    } else {
      dispatch(setShowApiDogs(true));
      dispatch(setShowBddDogs(true));
    }
  };

  return (
    <div className="filtros">
      <div className="container">
      </div>
      <div class="radio-input-wrapper">
  <label class="label">
    <input value="api" name="value-radio" id="value-2" class="radio-input" type="radio" checked={selectedDogsType === 'api'} onChange={handleDogsTypeSelect}/>
    <div class="radio-design"></div>
    <div class="label-text">API</div>
  </label>
  <label class="label">
    <input value="bdd" name="value-radio" id="value-3" class="radio-input" type="radio" checked={selectedDogsType === 'bdd'} onChange={handleDogsTypeSelect}/>
    <div class="radio-design"></div>
    <div class="label-text">BDD</div>
  </label>
  <label class="label">
    <input value="ambos" name="value-radio" id="value-4" class="radio-input" type="radio" checked={selectedDogsType === 'ambos'} onChange={handleDogsTypeSelect} />
    <div class="radio-design"></div>
    <div class="label-text">Ambas</div>
  </label>
</div>

      <div className="containerordenamientos">
        <form>
          <label>
            <input
              type="radio"
              name="radio"
              value="asc"
              onChange={handleWeightSort}
            />
            <span>Menor peso</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="desc"
              onChange={handleWeightSort}
            />
            <span>Mayor peso</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="original"
              onChange={handleResetSort}
            />
            <span>Original</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="az"
              onChange={handleWeightSort}
            />
            <span>A-Z</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="za"
              onChange={handleWeightSort}
            />
            <span>Z-A</span>
          </label>
        </form>
      </div>

      <div className="containerasd">
        <form>
          <label htmlFor="temperamentoSelect">Seleccionar Temperamento:</label>
          <select
            id="temperamentoSelect"
            name="temperamento"
            className="temperamento-dropdown"
            onChange={handleTemperamentSelect}
            value={selectedTemperament}
          >
            <option value="">-- Seleccionar --</option>
            <option value="todos">Todos</option>
            {temperamentos && temperamentos.temperaments ? (
              temperamentos.temperaments.map((temperamento, index) => (
                <option key={index} value={temperamento}>
                  {temperamento}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Cargando temperamentos...
              </option>
            )}
          </select>
        </form>
      </div>
    </div>
  );
};

export default Filter;