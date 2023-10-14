import React from 'react';
import { Button, Container, Grid, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import './Home.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const hardCodedEvents = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 234, 52, 3
  ]
  
  return (
    <CustomPage contentHeight="calc(100% - 150px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Hi, Bobby!
        </Typography>
        <Typography variant="body1">
          Here is an overview of your upcoming schedule for the next week.
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        {
          hardCodedEvents.map((event, i) => {
            return (
              <Container key={i} sx={{ my: 1, py: 1 }} className="event-item">
                <Grid container>
                  <Grid item xs={9} sm={10} md={11}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Lunch with Johnny
                    </Typography>
                    <Typography variant="body1">
                      December 9, 2023
                    </Typography>
                    <Typography variant="body1">
                      12:00 PM - 1:00 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={2} md={1} sx={{ display: "flex" }}>
                    <IconButton size="large" sx={{ "margin-left": "auto", color: "#ffffff" }}>
                      <ArrowForwardIcon fontSize="inherit"/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Container>
            )
          })
        }
      </Container>

      {/* Buttons at bottom */}
      <Container sx={{ py: 2 }} id="button-stack">
        <Button variant="contained" fullWidth size="large" startIcon={<CameraAltIcon />} sx={{ my: 1 }}>
          Snip Event
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1 }}>
          Create Event Manually
        </Button>
      </Container>
    </CustomPage>
  )
};

export default Home;