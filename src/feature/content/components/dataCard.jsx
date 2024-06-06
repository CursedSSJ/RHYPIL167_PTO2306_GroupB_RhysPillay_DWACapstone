import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styles } from "../styles/dataCard-styles";
import { useTheme } from "@mui/material/styles";
import supabase from "../../auth/authClient";

const DataCard = ({ seasons }) => {
  const [userId, setUserId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [playbackData, setPlaybackData] = useState([]);
  const [favorites, setFavorites] = useState({}); // State to track favorite episodes
  const [audioTime, setaudioTime] = useState({}); // State to track favorite episodes

  const theme = useTheme();
  const style = styles(theme);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setUserId(userIdFromStorage);

    const fetchFavoriteEpisodes = async () => {
      if (!userIdFromStorage) {
        return;
      }

      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", userIdFromStorage);

      if (error) {
        console.error("Error fetching favorite episodes:", error);
        return;
      }

      console.log("data: ", data);

      if (data) {
        // Set the state with favorite episodes
        const favoriteEpisodes = {};
        data.forEach((episode) => {
          favoriteEpisodes[episode.title] = true;
        });
        setFavorites(favoriteEpisodes);
      }
    };

    fetchFavoriteEpisodes();
  }, []);

  const handleFavorite = async (image, episode, season) => {
    const episodeTitle = episode.title;
    const newIsFavorited = !favorites[episodeTitle];

    console.log("Function hittt");

    const updatedFavorites = { ...favorites };
    updatedFavorites[episodeTitle] = newIsFavorited;
    setFavorites(updatedFavorites);

    if (!newIsFavorited) {
      await supabase.from("favourites").delete().eq("title", episode.title);
    } else {
      const now = new Date();
      await supabase.from("favourites").insert([
        {
          user_id: userId,
          image: image,
          title: episode.title,
          description: episode.description,
          season: season.season,
          episode: episode.episode,
          audio_file: episode.file,
          created_at: now,
        },
      ]);
    }
  };

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setUserId(userIdFromStorage);

    const fetchAudioTime = async () => {
      if (!userIdFromStorage) {
        return;
      }

      const { data, error } = await supabase
        .from("audio_access")
        .select("*")
        .eq("user_id", userIdFromStorage);

      if (error) {
        console.error("Error fetching audio times:", error);
        return;
      }

      console.log("data: ", data);

      if (data) {
        const audioTime = {};
        data.forEach((episode) => {
          audioTime[episode.title] = episode.playback_position;
        });
        setaudioTime(audioTime);
      }
    };

    fetchAudioTime();
  }, []);

  const handleAudioTimeUpdate = async (season, episode, currentTime) => {
    console.log("Updating playback position:", currentTime);

    const newAudio = !audioTime[currentTime];

    console.log("Function hittt");

    const updatedAudioTime = { ...audioTime };
    updatedAudioTime[episode.title] = currentTime;
    setaudioTime(updatedAudioTime);

    if (!newAudio) {
      await supabase.from("audio_access").delete().eq("title", episode.title);
    } else {
      // Save the current playback position to the database
      await supabase.from("audio_access").upsert([
        {
          user_id: userId,
          season: season.season,
          episode: episode.episode,
          title: episode.title,
          playback_position: currentTime,
        },
      ]);
    }
  };

  // Function to handle metadata loaded event for each audio element
  const handleMetadataLoaded = (episodeTitle) => (e) => {
    const savedTime = audioTime[episodeTitle];
    if (savedTime !== undefined) {
      e.target.currentTime = savedTime;
    }
  };

  return (
    <>
      <Box sx={style.seasonDropDownBox}>
        <FormControl sx={style.seasonDropDown}>
          <InputLabel sx={style.seasonDropDownText}>Select Season</InputLabel>
          <Select
            sx={style.seasonDropDownText}
            label="Select Season"
            value={selectedSeason === null ? "" : selectedSeason}
            onChange={(e) => {
              const value = e.target.value === "" ? null : e.target.value;
              setSelectedSeason(value);
            }}
          >
            {seasons.map((season, index) => (
              <MenuItem key={index} value={index}>
                {"Season " + (index + 1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Container sx={style.dataCardContainer}>
        {selectedSeason !== null && (
          <Card style={style.episodeBackground}>
            <img
              style={style.dataCardImage}
              src={seasons[selectedSeason].image}
              alt={`Season ${selectedSeason + 1}`}
            />
            <Typography variant="h4" sx={style.seasonTitle}>
              Season: {selectedSeason + 1}
            </Typography>
            <Typography variant="h5" sx={style.seasonTitle}>
              Episodes: {seasons[selectedSeason].episodes.length}
            </Typography>

            <div>
              {seasons[selectedSeason].episodes.map((episode, episodeIndex) => {
                return (
                  <Accordion key={episodeIndex} sx={style.episodeAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`episode-panel${selectedSeason}-${episodeIndex}-content`}
                      id={`episode-panel${selectedSeason}-${episodeIndex}-header`}
                      sx={style.episodeSummaryAccordion}
                    >
                      <Typography>Episode: {episode.episode}</Typography>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() =>
                          handleFavorite(
                            seasons[selectedSeason].image,
                            episode,
                            seasons[selectedSeason]
                          )
                        }
                      >
                        <FavoriteIcon
                          color={favorites[episode.title] ? "error" : "inherit"}
                        />
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <Typography>{episode.title}</Typography>
                        <Typography>
                          Description: {episode.description}
                        </Typography>
                        <audio
                          controls
                          style={style.audioPlayer}
                          id={`audio-${selectedSeason}-${episodeIndex}`}
                          onPause={(e) =>
                            handleAudioTimeUpdate(
                              seasons[selectedSeason],
                              episode,
                              e.target.currentTime
                            )
                          }
                          onLoadedMetadata={handleMetadataLoaded(episode.title)}
                        >
                          <source src={episode.file} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </Card>
        )}
      </Container>
    </>
  );
};

export default DataCard;
