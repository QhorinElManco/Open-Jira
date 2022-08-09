import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsContactsIconIcon from "@mui/icons-material/Contacts";
import { UIContext, UIProvider } from "../../context/ui";

interface menuItem {
  name: string;
  icon: React.ReactNode;
}

const menuItems: menuItem[] = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "About", icon: <InfoIcon /> },
  { name: "Contact", icon: <ContactsContactsIconIcon /> },
];

export const SideBar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer onClose={closeSideMenu} open={sideMenuOpen}>
      <Box sx={{ padding: "5px 10px", width: 250 }}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <Divider />

      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((item, index) => ( 
          <ListItem key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
