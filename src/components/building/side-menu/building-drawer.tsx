import { FC, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BuildingSidebar } from "./building-sidebar";
import { getDrawer, getDrawerHeader } from "./mui-utils";
import { FrontMenuMode } from "../types";
import { Typography } from "@mui/material";

export const BuildingDrawer: FC<{
  open: boolean;
  width: number;
  onToggleMenu: (active?: boolean, mode?: FrontMenuMode) => void;
  onClose: () => void;
}> = (props) => {
  const theme = useTheme();
  const { open, width: drawerWidth, onClose, onToggleMenu } = props;
  const [sidebarOpen, setSidebarOpen] = useState(open);

  useEffect(() => {
    setSidebarOpen(open);
  }, [open]);

  const handleCloseSidebar = () => {
    onClose();
    setSidebarOpen(false);
  };

  const Drawer = getDrawer(drawerWidth);
  const DrawerHeader = getDrawerHeader();

  const imageStyles = {
    display: sidebarOpen ? "block" : "none",
    width: "60%",
    marginLeft: "35px",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "10px",
  };

  const typoStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "16px",
    fontWeight: "500",
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img
          style={imageStyles}
          src={process.env.PUBLIC_URL + "/BIMCA-Negro-01.png"}
          alt="Logo negro 1"
        />
        <IconButton onClick={handleCloseSidebar}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <BuildingSidebar onToggleMenu={onToggleMenu} open={open} />
      {sidebarOpen && (
        <>
          <Divider />
          <Typography sx={typoStyles}>Versión 2023.1</Typography>
        </>
      )}
    </Drawer>
  );
};
