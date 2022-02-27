import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { authStartLogout } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../interfaces/index";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ AUTH }: AppState) => AUTH);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    dispatch(authStartLogout());
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "#10c9a3", marginBottom: "80px" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRM
        </Typography>
        {user?.id && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle
                sx={{ color: "white", height: "1.5em", width: "1.5em" }}
              />
            </IconButton>
            <Menu
              className="mi-menu"
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
