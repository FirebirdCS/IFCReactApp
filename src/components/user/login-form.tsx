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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img className="landing-logo" alt="ifcjs logo" src="ifcjs-logo.png" />

      <Button variant="contained" color="primary" onClick={onLoginClick}>
        Click here to log in.
      </Button>
    </Box>
  );
};
