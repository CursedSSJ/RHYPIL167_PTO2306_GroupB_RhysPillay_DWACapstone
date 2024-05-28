import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

import genres from "../config/genres";
import { styles } from "../styles/infoCard-styles";
import { useTheme } from "@mui/material/styles";

const InfoCard = () => {
  const [podcastData, setPodcastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const style = styles(theme);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/shows`);
        if (!response.ok) {
          throw new Error(`Error fetching podcast data: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPodcastData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Grid>
      {podcastData &&
        podcastData.map((podcast) => (
          <Grid key={podcast.id} sx={style.gridContainer}>
            <Card key={podcast.id}>
              <CardMedia
                component="img"
                height="140"
                image={podcast.image}
                alt={podcast.title}
              />
              <CardContent key={podcast.id}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div">
                      {podcast.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {podcast.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Seasons: {podcast.seasons}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Updated: {podcast.updated}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Genres:{" "}
                      {podcast.genres.map((genre) => genres[genre]).join(", ")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default InfoCard;
