import React from 'react';
import { Button, Container, Grid, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useHistory } from 'react-router';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const selectedColors = [
  'rgb(139, 171, 241, 0.7)'
];

// Function to generate random pastel colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Camera handler
  const takePicture = async () => {
    // ... your existing code ...
  };

  const hardCodedEvents = [
    0, 1, 2, 3, 4
  ]

  return (
    <CustomPage contentHeight="calc(100% - 150px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "39px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          Hello, Bobby!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "15px", fontFamily: "Helvetica, sans-serif", color: "gray", lineHeight: "1" }}>
        &nbsp;An overview of your upcoming plans.
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        {
          hardCodedEvents.map((event, i) => {
            const backgroundColor = selectedColors[i % selectedColors.length];            
            return (
              <Container key={i} sx={{ my: 1, py: 1 }} className="event-item" style={{ backgroundColor }}>
                <Grid container>
                  <Grid item xs={9} sm={10} md={11}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "28px", marginBottom: "1px" }}>
                      Lunch with Johnny
                    </Typography>
                    <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />
                    <Typography variant="body1" sx={{ fontSize: "20px" }}>
                      December 9, 2023
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "20px" }}>
                      12:00 PM - 1:00 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={2} md={1} sx={{ display: "flex" }}>
                    <IconButton size="large" sx={{ marginLeft: "auto", color: "#ffffff" }}>
                      <ArrowForwardIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Container>
            )
          })
        }
      </Container>

      {/* Buttons at the bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<CameraAltIcon />}
          sx={{ my: 1, borderRadius: "30px", color: "white" }}
          onClick={takePicture}
        >
          Snip Event
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1, borderRadius: "30px", color: "white", backgroundColor: "#82B56A"}}>
          Create Event
        </Button>
      </Container>
    </CustomPage>
  )
};

export default Home;
