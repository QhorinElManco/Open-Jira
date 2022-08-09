import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC, ReactNode } from "react";
import { Navbar } from "../ui";
import { SideBar } from "../ui";

interface Props {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title || "OpenJira"}</title>
      </Head>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Sidebar */}
      <SideBar></SideBar>

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
