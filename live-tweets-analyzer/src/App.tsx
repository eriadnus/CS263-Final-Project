import React from 'react';
import { HorizontalBar } from "./components/HorizontalBar";
import './App.css';
import {CustomTweet} from "./components/CustomTweet";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Typography} from "@mui/material";
import {TeamLogo} from "./components/TeamLogo";

function App() {
  return (
      <Box>
          <Grid2 container sx={{pt: 8}} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid2 xs={12} md={12} lg={12}>
                  <Typography align={'center'} variant={'h2'} component={'h2'}>
                      NBA Tweet Sentiment Analysis
                  </Typography>
              </Grid2>
              <Grid2 container xs={12} md={12} lg={12}>
                  <Grid2 xs={3} md={3} lg={3}>
                      <TeamLogo teamLogo={'Heat'} />
                  </Grid2>
                  <Grid2 xs={6} md={6} lg={6}>
                      <CustomTweet/>
                  </Grid2>
                  <Grid2 xs={3} md={3} lg={3}>
                      <TeamLogo teamLogo={'Lakers'} />
                  </Grid2>
              </Grid2>
              <Grid2 xs={12} md={12} lg={12}>
                  <HorizontalBar
                      leftTeamWinningProbability={30}
                      leftTeamColor={'#CE1141'}
                      rightTeamColor={'#552583'}
                  />
              </Grid2>
          </Grid2>
      </Box>
  );
}

export default App;
