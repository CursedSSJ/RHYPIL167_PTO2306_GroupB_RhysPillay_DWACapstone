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
        console.log("podcast data: ", data);
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
        <Typography variant="h3" sx={style.mainLoaderText}>
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
      <Container sx={style.mainCardInnerContainer}>
        <CardMedia
          sx={style.mainCardContainerCardContent}
          component="img"
          image={podcast.image}
          alt={podcast.title}
        />
        <CardContent>
          <Typography sx={style.mainCardTitle}>{podcast.title}</Typography>
          <Typography sx={style.mainCardSummary}>
            {podcast.description}
          </Typography>
        </CardContent>
        <DataCard seasons={podcast.seasons} />
      </Container>
    </Container>
  );
};

export default MainCard;
