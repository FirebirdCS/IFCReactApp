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
          IFC Viewer
        </h1>
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          onClick={onLoginClick}
        >
          Log In
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
          <h2>Your IFC model in the web!</h2>
          <p>
            IFC.js takes advantage of the browsers to display a fully modeled
            IFC for the user. You have options to manage the coordinates,
            properties and tools about your IFC model.
          </p>
        </div>
      </div>
    </div>
  );
};
