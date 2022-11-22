import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <footer>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" sx={{ bottom: 0, top: "unset" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" component="div">
              Raspa
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </footer>
  );
};
export default Footer;
