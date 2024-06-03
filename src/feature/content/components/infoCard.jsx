import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  CircularProgress,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  TextField,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import genres from "../config/genres";
import { styles } from "../styles/infoCard-styles";
import { useTheme } from "@mui/material/styles";

const InfoCard = () => {
  const [podcastData, setPodcastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);

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
        setPodcastData(data);
        setFilteredData(data);

        // Initialize the showFullDescription state for each podcast
        const initialDescriptionState = {};
        data.forEach((podcast) => {
          initialDescriptionState[podcast.id] = false;
        });
        setShowFullDescription(initialDescriptionState);

        const shuffledData = podcastData.sort(() => Math.random() - 0.5);
        const carouselPodcasts = shuffledData.slice(0, 6);
        setCarouselData(carouselPodcasts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      podcastData.filter((podcast) =>
        podcast.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, podcastData]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const toggleDescription = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container sx={style.infoCardMainContainer}>
      <Slider {...settings} style={style.infoCardCarasoulCardContainerSlider}>
        {carouselData.map((podcast) => (
          <Container key={podcast.id} sx={style.infoCardCarasoulCardContainer}>
            <Card>
              <CardMedia
                component="img"
                image={podcast.image}
                alt={podcast.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {podcast.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {showFullDescription[podcast.id] ? (
                    <>
                      {podcast.description}
                      <Button onClick={() => toggleDescription(podcast.id)}>
                        Read Less
                      </Button>
                    </>
                  ) : (
                    <>
                      {podcast.description.slice(0, 100)}...
                      <Button onClick={() => toggleDescription(podcast.id)}>
                        Read More
                      </Button>
                    </>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seasons: {podcast.seasons}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated: {podcast.updated}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genres:{" "}
                  {podcast.genres.map((genre) => genres[genre]).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        ))}
      </Slider>
      <TextField
        label="Filter Podcasts"
        variant="outlined"
        // fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={style.infoCardContainerFilterBox}
      />
      <Grid container spacing={2} sx={style.infoCardContainerGridContainer}>
        {filteredData.map((podcast) => (
          <Grid item xs={12} sm={6} md={4} key={podcast.id}>
            <Card style={{ height: "100%" }}>
              <CardMedia
                component="img"
                image={podcast.image}
                alt={podcast.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {podcast.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {showFullDescription[podcast.id] ? (
                    <>
                      {podcast.description}
                      <Button onClick={() => toggleDescription(podcast.id)}>
                        Read Less
                      </Button>
                    </>
                  ) : (
                    <>
                      {podcast.description.slice(0, 100)}...
                      <Button onClick={() => toggleDescription(podcast.id)}>
                        Read More
                      </Button>
                    </>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seasons: {podcast.seasons}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated: {podcast.updated}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genres:{" "}
                  {podcast.genres.map((genre) => genres[genre]).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InfoCard;
