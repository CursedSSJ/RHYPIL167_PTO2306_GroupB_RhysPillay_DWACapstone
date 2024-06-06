import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { styles } from "../styles/favouriteCard-styles";
import { useTheme } from "@mui/material/styles";
import supabase from "../../auth/authClient";

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const style = styles(theme);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setUserId(userIdFromStorage);

    const fetchFavoriteEpisodes = async () => {
      try {
        if (!userId) {
          return;
        }

        const { data, error } = await supabase
          .from("favourites")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          throw new Error("Error fetching favorite episodes");
        }

        if (data) {
          setFavoriteEpisodes(data);
          setIsLoading(false); // Set loading state to false after successful fetch
        }
      } catch (error) {
        console.error("Error fetching favorite episodes:", error);
        setError(error.message);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchFavoriteEpisodes();
  }, [userId]);

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

  console.log("favoriteEpisodes: ", favoriteEpisodes);

  return (
    <Container sx={style.favouriteCardContainer}>
      <Typography sx={style.favouriteCardHeading}>
        Your Favorite Episodes
      </Typography>
      {favoriteEpisodes.length === 0 ? (
        <Typography variant="body1">
          You haven't favorited any episodes yet.
        </Typography>
      ) : (
        favoriteEpisodes.map((episode, index) => (
          <Card key={index} sx={style.favouriteCardEpisodeContainer}>
            <img
              style={style.favouriteCardImage}
              src={episode.image}
              alt={"Episode Image"}
            />
            <CardContent>
              <Typography variant="h3">{episode.title}</Typography>
              <Typography variant="h4">
                Season {episode.season}, Episode {episode.episode}
              </Typography>
              <Typography variant="body2">{episode.description}</Typography>
              <div>
                <audio controls>
                  <source src={episode.audio_file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default FavoriteEpisodes;
