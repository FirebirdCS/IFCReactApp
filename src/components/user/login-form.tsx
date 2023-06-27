import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import "./user-styles.css";
import { Box, Button } from "@mui/material";

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
        <h1 className="navbar-title">
          <img
            className="ifcjs-logo"
            src="https://firebirdcs.github.io/IFCReactApp/ifcjs-logo.png"
            alt="ifcjs logo"
          />{" "}
          Visor IFC
        </h1>
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </Button>
      </nav>
      <div className="content-container">
        <div className="left-content">
          <img
            className="landing-logo"
            alt="ifcjs logo"
            src="https://firebirdcs.github.io/IFCReactApp/ifcjs-logo.png"
          />
        </div>
        <div className="right-content">
          <h2>¡Tú modelo IFC en la web!</h2>
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
