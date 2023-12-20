import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import perros from "../../utils/perros.png"
import { getTemperaments } from "../../redux/Actions/Actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción getTemperaments al montar el componente
    dispatch(getTemperaments())
      .catch((error) => {
        console.error("Error al obtener los temperamentos:", error);
      });
  }, [dispatch]);

  return (
    <div className="background">
      <div className="bienvenida">
        <h1>Bienvenido a la SPA de Dogs!</h1>
        <h2><b>Donde encontraras toda la informacion sobre nuestos perros!</b></h2>
        <Link to ="/home">
          <br></br>
        <button className="landing-button">
          Click para ingresar!
        </button>
      </Link>
    </div><div className="perros">
        <img src={perros} alt="fondo" />
      </div>
    </div>)
};

export default Landing;