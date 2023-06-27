import { IconButton, Toolbar, Typography, Box } from "@mui/material";
import { FC } from "react";
import { getAppBar } from "./mui-utils";
import MenuIcon from "@mui/icons-material/Menu";

export const BuildingTopBar: FC<{
  open: boolean;
  onOpen: () => void;
  width: number;
}> = (props) => {
  const { open, onOpen, width } = props;
  const Appbar = getAppBar(width);

  const containerStyles = {
    display: "flex",
    alignItems: "center",
  };

  const imageStyles = {
    width: "20%",
    marginLeft: "25px",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "10px",
    transform: open ? "scale(0.7)" : "scale(2.5)",
  };

  return (
    <Appbar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {!open && (
          <Box sx={{ visibility: open ? "hidden" : "visible" }}>
            <Box style={containerStyles}>
              <img
                style={imageStyles}
                src={process.env.PUBLIC_URL + "/BIMCA-Crema-01.png"}
                alt="Logo"
              />
            </Box>
          </Box>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ marginLeft: "auto" }}
        >
          Visor IFC
        </Typography>
      </Toolbar>
    </Appbar>
  );
};
