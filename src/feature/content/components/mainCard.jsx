import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Container,
  CardContent,
  CardMedia,
  Box,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { styles } from "../styles/mainCard-styles";
import { useTheme } from "@mui/material/styles";

import DataCard from "./dataCard";

const MainCard = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const style = styles(theme);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching podcast data: ${response.status}`);
        }
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (isLoading) {
    return (
      <Container sx={style.mainCardLoading}>
        <Typography variant="h3">
          Loading...
          <CircularProgress />
        </Typography>
      </Container>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container sx={style.mainCardContainer}>
      <CardMedia
        sx={style.mainCardContainerCardContent}
        component="img"
        image={podcast.image}
        alt={podcast.title}
      />
      <CardContent>
        <Typography variant="h4">{podcast.title}</Typography>
        <Typography variant="body2">{podcast.description}</Typography>
        {/* <Typography variant="h5">Seasons: {podcast.seasons}</Typography> */}
        <Typography variant="h5">
          Updated: {format(new Date(podcast.updated), "dd/MM/yyyy")}
        </Typography>
        <Typography variant="h5">
          Genres:
          <Box component="span" ml={1}>
            {podcast.genres.map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                size="large"
                style={style.mainCardGenrePills}
              />
            ))}
          </Box>
        </Typography>
      </CardContent>
      <DataCard seasons={podcast.seasons} />
    </Container>
  );
};

export default MainCard;
