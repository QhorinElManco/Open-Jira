import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

export const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="To do" />
            {/* Agregar una nueva entrada */}
            <NewEntry />
            {/* Cargar las otras entradas */}
            <EntryList status={"pending"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="In progress"></CardHeader>
            <EntryList status={"in-progress"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Finished" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
