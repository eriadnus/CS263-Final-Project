import React from 'react';
import { HorizontalBar } from "./components/HorizontalBar";
import './App.css';
import {CustomTweet} from "./components/CustomTweet";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Typography} from "@mui/material";
import {TeamLogo} from "./components/TeamLogo";
import {Dashboard} from "./components/Dashboard";

function App() {
  return <Dashboard leftTeam={'Lakers'} rightTeam={'Raptors'}/>;
}

export default App;
