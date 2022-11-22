import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toogleSideBar } from "../../store/slices/sidebar/sidebarSlice";
import { isLoggedIn, selectAuth } from "../../store/slices/user/selectors";
import { useSelector } from "react-redux";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => isLoggedIn(state));
  const userRole = useSelector((state) => selectAuth(state));

  const AUTH_ROLES = ["ROLE_ADMIN", "ROLE_OWNER"];
  const isAuthorized = isSignedIn && AUTH_ROLES.includes(userRole);

  const settings = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Reset Password", to: "/reset-password" },
    { label: "Logout", to: "/logout" },
  ];

  if (!isAuthorized) {
    settings.shift();
  }

  const handleOpenDrawerMenu = (event) => {
    dispatch(toogleSideBar());
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "black" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isAuthorized && (
            <MenuIcon
              sx={{ cursor: "pointer" }}
              onClick={handleOpenDrawerMenu}
              size="large"
            />
          )}

          <Link to="/">
            <img src="/logo.jpeg" width={100} height={50} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}></Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {!isSignedIn && (
            <Button
              onClick={() => navigate("/signin")}
              sx={{ my: 2, color: "white", display: "block" }}>
              Sign In
            </Button>
          )}

          {isSignedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.to}
                    onClick={() => navigate(setting.to)}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
