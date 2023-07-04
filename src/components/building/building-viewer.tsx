import {
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import { BuildingDrawer } from "./side-menu/building-drawer";
import { BuildingTopBar } from "./side-menu/building-topbar";
import { CssBaseline } from "@mui/material";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { getDrawerHeader } from "./side-menu/mui-utils";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/building-viewport";
import { BuildingBottomMenu } from "./bottom-menu/building-bottom-menu";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export const BuildingViewer: FC = () => {
  const [width] = useState(240);
  const [sideOpen, setSideOpen] = useState(true);
  const [frontOpen, setFrontOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frontMenu, setFrontMenu] = useState<FrontMenuMode>("BuildingInfo");

  const [{ building, user }] = useAppContext();

  if (!building) {
    return <Navigate to="/map" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleFrontMenu = (active = !frontOpen, mode?: FrontMenuMode) => {
    if (mode) {
      setFrontMenu(mode);
    }
    setFrontOpen(active);
  };

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxHeight: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const shortcuts = [
    {
      icon: <CutIcon />,
      text: "Herramienta de corte: Presiona la tecla P para hacer un corte. Presiona la tecla Suprimir para eliminar el corte.",
    },
    {
      icon: <RulerIcon />,
      text: "Herramienta de medición: Presiona la tecla D para habilitar una regla. Presiona la tecla Suprimir para eliminar la medición.",
    },
    {
      icon: <ExplodeIcon />,
      text: "Explosión: Presiona el ícono para explotar los diferentes niveles del modelo.",
    },
  ];

  const DrawerHeader = getDrawerHeader();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <BuildingTopBar
          width={width}
          open={sideOpen}
          onOpen={() => toggleDrawer(!sideOpen)}
        />

        <BuildingDrawer
          width={width}
          open={sideOpen}
          onClose={() => toggleDrawer(false)}
          onToggleMenu={toggleFrontMenu}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <BuildingViewport />
          <BuildingFrontMenu
            onToggleMenu={toggleFrontMenu}
            open={frontOpen}
            mode={frontMenu}
          />

          <BuildingBottomMenu />

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
              <QuestionMarkIcon className="small-icon" />
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
                component="h2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  marginLeft: "15px",
                }}
              >
                Shortcuts
              </Typography>
              <List>
                {shortcuts.map((shortcut, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{shortcut.icon}</ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "16px" }}
                      primary={shortcut.text}
                    />
                  </ListItem>
                ))}
              </List>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "left",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModal}
                  sx={{
                    width: "30px",
                    padding: "6px",
                    marginLeft: "auto",
                  }}
                >
                  X
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
};
