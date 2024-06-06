import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Chip,
  Box,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import genres from "../config/genres";
import { styles } from "../styles/infoCard-styles";
import { useTheme } from "@mui/material/styles";

import { format } from "date-fns";

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

  const navigate = useNavigate();

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

        // Set the initial description state
        const initialDescriptionState = {};
        data.forEach((podcast) => {
          initialDescriptionState[podcast.id] = false;
        });
        setShowFullDescription(initialDescriptionState);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if podcastData is available and not empty before setting up the carousel data
    if (podcastData && podcastData.length > 0) {
      const shuffledData = [...podcastData].sort(() => Math.random() - 0.5);
      const carouselPodcasts = shuffledData.slice(0, 6);
      setCarouselData(carouselPodcasts);
    }
  }, [podcastData]);

  useEffect(() => {
    setFilteredData(
      podcastData.filter((podcast) =>
        podcast.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, podcastData]);

  if (isLoading) {
    return (
      <Container sx={style.infoCardLoading}>
        <Typography variant="h3" sx={style.infoCardMainLoaderText}>
          {" "}
          Loading...
          <CircularProgress />
        </Typography>
      </Container>
    );
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

  const handleCardClick = (id) => {
    console.log("navigating...");
    navigate(`/content/mainCard/${id}`);
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
  console.log("carouselData: ", carouselData);
  return (
    <Container sx={style.infoCardMainContainer}>
      <Slider {...settings} style={style.infoCardCarasoulCardContainerSlider}>
        {carouselData.map((podcast) => (
          <Container
            key={podcast.id}
            sx={style.infoCardCarasoulCardContainer}
            onClick={() => handleCardClick(podcast.id)}
          >
            <Grid item xs={12} sm={6} md={4} key={podcast.id}>
              <Card sx={style.infoCardGridContainercard}>
                <CardMedia
                  component="img"
                  image={podcast.image}
                  alt={podcast.title}
                />
                <CardContent sx={style.infoCardContainerCardContent}>
                  <Typography variant="h4" component="div">
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2">
                    {showFullDescription[podcast.id] ? (
                      <>
                        {podcast.description}
                        <Button onClick={() => toggleDescription(podcast.id)}>
                          Read Less
                        </Button>
                      </>
                    ) : (
                      <>
                        {podcast.description.slice(0, 99)}...
                        <Button onClick={() => toggleDescription(podcast.id)}>
                          Read More
                        </Button>
                      </>
                    )}
                  </Typography>
                  <Typography variant="h5">
                    Seasons: {podcast.seasons}
                  </Typography>
                  <Typography variant="h5">
                    Updated: {format(new Date(podcast.updated), "dd/MM/yyyy")}
                  </Typography>
                  <Typography variant="h5">
                    Genres:
                    <Box component="span" ml={1}>
                      {podcast.genres.map((genre, index) => (
                        <Chip
                          key={index}
                          label={genres[genre]}
                          size="large"
                          style={style.infoCardContainerGenrePills}
                        />
                      ))}
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        ))}
      </Slider>
      <Container sx={style.infoCardContainerFilterBox}>
        <TextField
          label="Filter Podcasts"
          value={filter}
          fullWidth
          onChange={(e) => setFilter(e.target.value)}
        />
      </Container>
      <Grid container spacing={2} sx={style.infoCardContainerGridContainer}>
        {filteredData.length === 0 ? (
          <Typography variant="body1">No results found.</Typography>
        ) : (
          filteredData.map((podcast) => (
            <Grid item xs={12} sm={6} md={4} key={podcast.id}>
              <Card
                sx={style.infoCardGridContainercard}
                onClick={() => handleCardClick(podcast.id)}
              >
                <CardMedia
                  component="img"
                  image={podcast.image}
                  alt={podcast.title}
                />
                <CardContent sx={style.infoCardContainerCardContent}>
                  <Typography variant="h4" component="div">
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2">
                    {showFullDescription[podcast.id] ? (
                      <>
                        {podcast.description}
                        <Button onClick={() => toggleDescription(podcast.id)}>
                          Read Less
                        </Button>
                      </>
                    ) : (
                      <>
                        {podcast.description.slice(0, 99)}...
                        <Button onClick={() => toggleDescription(podcast.id)}>
                          Read More
                        </Button>
                      </>
                    )}
                  </Typography>
                  <Typography variant="h5">
                    Seasons: {podcast.seasons}
                  </Typography>
                  <Typography variant="h5">
                    Updated: {format(new Date(podcast.updated), "dd/MM/yyyy")}
                  </Typography>
                  <Typography variant="h5">
                    Genres:
                    <Box component="span" ml={1}>
                      {podcast.genres.map((genre, index) => (
                        <Chip
                          key={index}
                          label={genres[genre]}
                          size="large"
                          style={style.infoCardContainerGenrePills}
                        />
                      ))}
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default InfoCard;
