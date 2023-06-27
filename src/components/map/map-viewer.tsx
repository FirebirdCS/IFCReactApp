import Button from "@mui/material/Button/Button";
import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import "./map-viewer.css";
import { Box, Modal, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PreviousIcon from "@mui/icons-material/ArrowBack";

export const MapViewer: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const containerRef = useRef(null);
  const [state, dispatch] = useAppContext();
  const { user, building } = state;

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
    closeModal();
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const secondStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: { container, user } });
    }
    openModal();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (building) {
    const url = `/building?id=${building.uid}`;
    return <Navigate to={url} />;
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
          <p>Haz click derecho para crear un nuevo edificio o</p>
          <Button onClick={onToggleCreate}>Cancelar</Button>
        </div>
      )}
      <div className="gis-button-container">
        <Button color="primary" variant="contained" onClick={onToggleCreate}>
          Crear edificio
        </Button>
        <Button color="primary" variant="contained" onClick={onLogout}>
          Cerrar sesión
        </Button>
      </div>
      <div className="img-container">
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + "/BIMCA-Crema-01.png"}
        />
      </div>
      <div className="round-button-container">
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "100%",
            fontSize: "20px",
            color: "#fff",
            lineHeight: "50px",
            textAlign: "center",
            background: "#EF6337",
            minWidth: "unset",
            padding: "0",
          }}
          onClick={openModal}
        >
          <QuestionMarkIcon />
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Pasos para crear un edificio
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Coordenadas
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Antes que todo, necesitas las coordenadas en mano y necesitas
            escribirlas dentro de la barra de búsqueda de la siguiente manera:
            Primero latitud, segundo longitud.
          </Typography>
          <img
            className="modal-image"
            src={process.env.PUBLIC_URL + "/Paso1.gif"}
            alt="Pasos"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={closeModal}
              sx={{
                width: "70px",
                padding: "6px",
                marginRight: "8px",
              }}
            >
              X
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={openSecondModal}
              sx={{
                width: "70px",
                padding: "6px",
                marginRight: "14px",
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={isSecondModalOpen}
        onClose={closeSecondModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={secondStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Pasos para hacer un edificio
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hacer un edificio
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Ahora que has introducido las coordenadas todo lo que debes que
            hacer es hacer click derecho en el lugar donde quieres crear tu
            edificio!
          </Typography>
          <img
            className="second-modal-image"
            src={process.env.PUBLIC_URL + "/Paso2.gif"}
            alt="Pasos"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeSecondModal();
                openModal();
              }}
              sx={{
                width: "70px",
                padding: "8px",
                marginRight: "8px",
              }}
            >
              <PreviousIcon />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={closeSecondModal}
              sx={{
                width: "70px",
                padding: "6px",
              }}
            >
              X
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
