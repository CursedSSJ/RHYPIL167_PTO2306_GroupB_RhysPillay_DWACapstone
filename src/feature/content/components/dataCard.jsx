import React, { useState } from "react";
import {
  Container,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styles } from "../styles/dataCard-styles";
import { useTheme } from "@mui/material/styles";

const DataCard = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const theme = useTheme();
  const style = styles(theme);

  return (
    <>
      <Select
        value={selectedSeason === null ? "" : selectedSeason}
        onChange={(e) => {
          const value = e.target.value === "" ? null : e.target.value;
          setSelectedSeason(value);
        }}
      >
        <MenuItem value="">Select Season</MenuItem>
        {seasons.map((season, index) => (
          <MenuItem key={index} value={index}>
            Season {index + 1}
          </MenuItem>
        ))}
      </Select>
      <Container sx={style.dataCardContainer}>
        {/* Display selected season */}
        {selectedSeason !== null && (
          <Card>
            <img
              style={style.dataCardImage}
              src={seasons[selectedSeason].image}
              alt={`Season ${selectedSeason + 1}`}
            />
            <Typography variant="h4" sx={style.seasonTitle}>
              Season {selectedSeason + 1}
            </Typography>

            <div>
              {seasons[selectedSeason].episodes.map((episode, episodeIndex) => (
                <Accordion key={episodeIndex} sx={style.episodeAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`episode-panel${selectedSeason}-${episodeIndex}-content`}
                    id={`episode-panel${selectedSeason}-${episodeIndex}-header`}
                    sx={style.episodeSummaryAccordion}
                  >
                    <Typography>Episode: {episode.episode}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Typography>
                        Description: {episode.description}
                      </Typography>
                      <audio controls style={style.audioPlayer}>
                        <source src={episode.file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Card>
        )}
      </Container>
    </>
  );
};

export default DataCard;
