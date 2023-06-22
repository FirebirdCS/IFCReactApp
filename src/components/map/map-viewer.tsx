import Button from "@mui/material/Button/Button";
import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import "./map-viewer.css";
import { Box, Modal, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    width: 400,
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
    width: 600, // Ajusta el ancho del segundo modal según tus necesidades
    maxHeight: 500, // Ajusta la altura máxima del segundo modal según tus necesidades
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
      <div className="round-button-container">
        <Button
          variant="contained"
          color="primary"
          className="round-button"
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How do I create a building?
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Things first, you need the coordinates in hand and you need to type
            it in order: First latitude, second longitude
          </Typography>
          <img
            className="modal-image"
            src={process.env.PUBLIC_URL + "/Paso1.gif"}
            alt="Pasos"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={openSecondModal}
              startIcon={<ArrowForwardIcon />}
              sx={{
                width: "50px",
                padding: "4px",
              }}
            ></Button>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How do I create a building?
          </Typography>
          <Typography mb={2} id="modal-modal-description" sx={{ mt: 2 }}>
            Now that you introduced the coordinates all you have to do is right
            click where do you want to create a new building!
          </Typography>
          <img
            className="second-modal-image"
            src={process.env.PUBLIC_URL + "/Paso2.gif"}
            alt="Pasos"
          />
        </Box>
      </Modal>
    </>
  );
};
