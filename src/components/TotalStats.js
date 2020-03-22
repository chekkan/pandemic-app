import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { useQuery } from "react-query";

function TotalStats() {
  const { status, data, error } = useQuery("totalStats", () => {
    async function run(url) {
      let res = await fetch(url);
      return await res.json();
    }
    return run("https://pandemic-api.azurewebsites.net/v1/stats");
  });
  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Confirmed
                </Typography>
                <Typography variant="h5" component="h2">
                  {data.confirmed.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Deaths
                </Typography>
                <Typography variant="h5" component="h2">
                  {data.deaths.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Recovered
                </Typography>
                <Typography variant="h5" component="h2">
                  {data.recovered.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default TotalStats;
