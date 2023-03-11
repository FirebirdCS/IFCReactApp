import Button from "@mui/material/Button/Button";
import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import "./map-viewer.css";

export const MapViewer: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const containerRef = useRef(null);
  const [state, dispatch] = useAppContext();
  const { user } = state;

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: { container, user } });
    }

    return () => {
      dispatch({ type: "REMOVE_MAP" });
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div
        onContextMenu={onCreate}
        className="full-screen"
        ref={containerRef}
      />
      {isCreating && (
        <div className="overlay">
          <p>Right click to create a new building or</p>
          <Button onClick={onToggleCreate}>Cancel</Button>
        </div>
      )}
      <div className="gis-button-container">
        <Button color="primary" variant="contained" onClick={onToggleCreate}>
          Create building
        </Button>
        <Button color="primary" variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};
