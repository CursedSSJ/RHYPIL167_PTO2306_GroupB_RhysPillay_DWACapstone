import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { styles } from "../styles/favouriteCard-styles";
import { useTheme } from "@mui/material/styles";
import supabase from "../../auth/authClient";

import { format } from "date-fns";

const FavoriteEpisodes = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortDateOrder, setSortDateOrder] = useState("asc");

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

  const removeFavorite = async (episodeId) => {
    try {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("id", episodeId)
        .eq("user_id", userId);

      if (error) {
        throw new Error("Error removing favorite episode");
      }

      setFavoriteEpisodes((prevEpisodes) =>
        prevEpisodes.filter((episode) => episode.id !== episodeId)
      );
    } catch (error) {
      console.error("Error removing favorite episode:", error);
      setError(error.message);
    }
  };

  const handleSortButtonClick = () => {
    const sortedData = [...favoriteEpisodes].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });

    const newFavouritesData =
      sortOrder === "asc" ? sortedData.reverse() : sortedData;
    setFavoriteEpisodes(newFavouritesData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDateSortButtonClick = () => {
    const sortedData = [...favoriteEpisodes].sort((a, b) => {
      const dateA = new Date(a.date_updated);
      const dateB = new Date(b.date_updated);
      return dateA - dateB;
    });

    const newFavouritesData =
      sortDateOrder === "asc" ? sortedData : sortedData.reverse();
    setFavoriteEpisodes(newFavouritesData);
    setSortDateOrder(sortDateOrder === "asc" ? "desc" : "asc");
  };

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

  return (
    <Container sx={style.favouriteCardContainer}>
      <Typography sx={style.favouriteCardHeading}>
        Your Favourite Episodes
      </Typography>
      <Button onClick={handleSortButtonClick}>
        {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
      </Button>
      <Button onClick={handleDateSortButtonClick}>
        {sortDateOrder === "asc" ? "Sort Oldest First" : "Sort Newest First"}
      </Button>
      {favoriteEpisodes.length === 0 ? (
        <Typography variant="body1">
          You haven't favourited any episodes yet.
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
              <Typography variant="h5">
                Date Favourited:{" "}
                {format(new Date(episode.created_at), "dd/MM/yyyy")}
              </Typography>
              <Typography variant="h5">
                Date Updated:{" "}
                {format(new Date(episode.date_updated), "dd/MM/yyyy")}
              </Typography>
              <Typography variant="body2">{episode.description}</Typography>
              <div>
                <audio controls>
                  <source src={episode.audio_file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFavorite(episode.id)}
              >
                Remove from Favorites
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default FavoriteEpisodes;
