import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import "./user-styles.css";
import { Button } from "@mui/material";

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLoginClick = () => {
    dispatch({ type: "LOGIN" });
  };

  if (state.user) {
    return <Navigate to="/map" />;
  }

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <img
          className="bimca-logo"
          src={process.env.PUBLIC_URL + "/01-BIMCA.png"}
          alt="bimca logo"
        />{" "}
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          onClick={onLoginClick}
          aria-label="Login button"
        >
          Iniciar sesión
        </Button>
      </nav>
      <div className="content-container">
        <div className="right-content">
          <h1>
            VISOR IFC
            <sup
              style={{
                fontSize: "0.6em",
                verticalAlign: "0.45em",
                fontWeight: "800",
              }}
            >
              ™
            </sup>
          </h1>
          <h2>TÚ MODELO IFC EN LA WEB</h2>
          <p>
            La herramienta IFC.js toma ventaja de los buscadores para mostrar
            modelos completos IFC para el usuario. Tienes distintas opciones
            para manejar coordenadas, propiedades y herramientas acerca de tu
            modelo IFC.
          </p>
        </div>
      </div>
    </div>
  );
};
