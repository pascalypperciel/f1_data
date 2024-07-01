import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalysisIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";

export const drawerWidth = 190;

interface SidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ open, setOpen }: SidebarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const matchRoute = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          overflowX: "hidden",
          boxSizing: "border-box",
          ...(open && {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          ...(!open && {
            width: theme.spacing(7),
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        },
      }}
    >
      <List>
        <List>
          <ListItemButton
            selected={matchRoute("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>
          <ListItemButton
            selected={matchRoute("/lap")}
            onClick={() => navigate("/lap")}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Lap Review" />}
          </ListItemButton>
          <ListItemButton
            selected={matchRoute("/analysis")}
            onClick={() => navigate("/analysis")}
          >
            <ListItemIcon>
              <AnalysisIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Analysis" />}
          </ListItemButton>
          <ListItemButton
            selected={matchRoute("/settings")}
            onClick={() => navigate("/settings")}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Settings" />}
          </ListItemButton>
        </List>
      </List>
      <Divider />
      <IconButton
        onClick={() => setOpen(!open)}
        style={{ position: 'absolute', bottom: '0', right: '0' }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
    </Drawer>
  );
}

export default Sidebar;
