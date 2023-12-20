import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Form.css";
import validateForm from "./validations";
import { postDogs } from "../../redux/Actions/Actions";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    height: "", 
    life_span: "",
    temperaments: [],
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si los temperamentos están cargados
    if (temperaments.length === 0) {
      // Si los temperamentos no están cargados, redirige a la página de "Landing"
      navigate("/");
    }
  }, [temperaments, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownClose = (event) => {
    event.stopPropagation(); // Evita que el clic se propague al formulario
    setIsDropdownOpen(false);
  };

  const handleTemperamentClick = (temperament) => {
    const updatedSelectedTemperaments = selectedTemperaments.includes(temperament)
      ? selectedTemperaments.filter((item) => item !== temperament)
      : [...selectedTemperaments, temperament];

    setSelectedTemperaments(updatedSelectedTemperaments);

    // Actualiza formData con los temperamentos seleccionados
    setFormData({ ...formData, temperaments: updatedSelectedTemperaments });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validar el formulario aquí
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0 && formSubmitted) {
      // Combinar maxWeight y minWeight en weight
      const weight = `${formData.maxWeight} - ${formData.minWeight}`;
      // Combinar maxHeight y minHeight en height
      const height = `${formData.maxHeight} - ${formData.minHeight}`;
      
  
      // Crear una copia del formData sin los campos que no deseas enviar
      const { maxHeight, maxWeight, minHeight, minWeight, temperaments, ...formDataToSend } = formData;
  
      const combinedData = {
        ...formDataToSend,
        weight,
        height,
        temperaments
      };
      dispatch(postDogs(combinedData))
        .then(() => {
          console.log("Datos enviados y guardados en la base de datos:", combinedData);
          window.alert("Los datos han sido guardados correctamente");
        })
        .catch((error) => {
          console.error("Error al guardar los datos en la base de datos:", error);
        });
    } else {
      // Si hay errores, establecer formSubmitted en true
      window.alert("Los datos no se enviaron, revisa los errores");
      setFormSubmitted(true);
    }
  };

  return (
    <div className="form-container">
        <h2>¡Crea tu Perrito!</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-columns">
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Name"
            required
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="name">
            Name
          </label>
          {formSubmitted && errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Altura Max"
            required
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="alturaMax">
            Altura Max
          </label>
          {formSubmitted && errors.maxHeight && <p className="error-message">{errors.maxHeight}</p>}
        </div>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Altura Min"
            required
            name="minHeight"
            value={formData.minHeight}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="alturaMin">
            Altura Min
          </label>
          {formSubmitted && errors.minHeight && <p className="error-message">{errors.minHeight}</p>}
        </div>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Peso Max"
            required
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="pesoMax">
            Peso Max
          </label>
          {formSubmitted && errors.maxWeight && <p className="error-message">{errors.maxWeight}</p>}
        </div>
        </div>
        <div className="form-column">
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Peso Min"
            required
            name="minWeight"
            value={formData.minWeight}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="pesoMin">
            Peso Min
          </label>
          {formSubmitted && errors.minWeight && <p className="error-message">{errors.minWeight}</p>}
        </div>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Años de vida"
            required
            name="life_span"
            value={formData.life_span}
            onChange={handleInputChange}
          />
          <label className="form__label" htmlFor="anosVida">
            Años de vida
          </label>
          {formSubmitted && errors.life_span && <p className="error-message">{errors.life_span}</p>}
        </div>
        <div className="form__group field">
  <input
    type="text"
    className="form__field"
    placeholder="Image URL" // Cambia el marcador de posición según tu preferencia
    required
    name="image"
    value={formData.image}
    onChange={handleInputChange}
  />
  <label className="form__label" htmlFor="image">
    Image URL
  </label>
  {formSubmitted && errors.image && <p className="error-message">{errors.image}</p>}
  {formSubmitted && errors.pesoAltura && <p className="error-message">{errors.pesoAltura}</p>}
</div>
        <div className="form__groupt fieldt">
        <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Seleccionar Temperamentos
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu" onClick={handleDropdownClose}>
            {temperaments && temperaments.temperaments ? (
              temperaments.temperaments.map((temperament, index) => (
                <li
                  key={index}
                  onClick={() => handleTemperamentClick(temperament)} // Manejar la selección del temperamento
                >
                  {temperament}
                  {selectedTemperaments.includes(temperament) && " (Seleccionado)"}
                </li>
              ))
            ) : (
              <li>Obteniendo temperamentos...</li>
            )}
          </ul>
        )}
</div>
</div>
      </form>
      <button className="learn-more" onClick={handleSubmit}>
    Cargar Datos
  </button>
    </div>
  );
};

export default Form;