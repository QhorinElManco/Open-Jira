import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton size="medium" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
