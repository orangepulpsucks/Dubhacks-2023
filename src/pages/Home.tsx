import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useHistory } from 'react-router';

import CustomPage from '../components/CustomPage';
import GenEventInfo from '../service/util';
import { setNewAlert } from '../service/alert';
import { setLast } from '../store/slices/events';
import { OPENAI_KEY } from '../keys';
import { selectTokenState } from '../store/slices/creds';
import { selectAllState } from '../store/slices/events';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CameraAltIcon from '@mui/icons-material/CameraAlt';



export const priorityColors = [
  "#A8F5AF",
  "#80ED99",
  "#57CC99",
  "#38A3A5",
  "#22577A"
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTokenState);
  const allState = useSelector(selectAllState);

  const [events, setEvents] = useState(allState);

  // OpenAPI config
  const generator = new GenEventInfo(OPENAI_KEY);
  let generatorReady = false;
  generator.init().then(() => {
    generatorReady = true;
  });

  // Camera handler
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src
    // You can access the original file using image.path
    const imageUrl = image.webPath;

    // Get JSON and set in redux
    if (generatorReady) {
      setNewAlert(dispatch, {
        alertType: 'success',
        msg: 'Hold on a second, we are processing your image...'
      });

      let txt = await generator.parseEventFromImage(imageUrl);
      if(!txt) {
        setNewAlert(dispatch, {
          alertType: 'error',
          msg: 'Sorry, we were unable to extract information from your snip'
        });
      } else {
        dispatch(setLast({
          title: txt.title,
          date: txt.date,
          description: txt.summary,
          priority: txt.priority
        }));

        setNewAlert(dispatch, {
          alertType: 'success',
          msg: 'Please review the information about your event'
        });
        
        history.push('/event/new/update');
      }
    } else {
      setNewAlert(dispatch, {
        alertType: 'error',
        msg: 'Sorry, the app is not ready yet, please retry shortly'
      });
    }
  };

  const manualCreate = async () => {
    dispatch(setLast({
      title: '',
      date: {
        day: 1,
        month: 1,
        year: 2023
      },
      description: '',
      priority: 3
    }));

    history.push('/event/new/update');
  }

  return (
    <CustomPage contentHeight="calc(100% - 150px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "39px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          Hello there!
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "15px", fontFamily: "Helvetica, sans-serif", color: "gray", lineHeight: "1", marginBottom: "-1px" }}>
        &nbsp;An overview of your upcoming plans.
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        {events.length > 0 ?
          events.map((event: any, i: any) => {
            const backgroundColor = priorityColors[event.priority - 1];
            return (
              <Container key={i} sx={{ my: 1, py: 1 }} className="event-item" style={{ backgroundColor }}>
                <Grid container>
                  <Grid item xs={9} sm={10} md={11}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "28px", marginBottom: "1px" }}>
                      {event.title}
                    </Typography>
                    <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />
                    <Typography variant="body1" sx={{ fontSize: "20px" }}>
                      {months[event.date.month-1]} {event.date.day}, {event.date.year}
                    </Typography>
                   
                  </Grid>
                  <Grid item xs={3} sm={2} md={1} sx={{ display: "flex" }}>
                    <IconButton size="large" sx={{ marginLeft: "auto", color: "#ffffff" }} href={'/event/' + event.id + '/details'}>
                      <ArrowForwardIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Container>
            )
          })
          :
         <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '60vh', fontFamily: "Helvetica, sans-serif", color: "gray" }}>
          No upcoming events.
        </Typography>        
        }
      </Container>

      {/* Buttons at the bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<CameraAltIcon />}
          sx={{ my: 1, borderRadius: "30px", color: "white", backgroundColor: "#82B56A" }}
          onClick={takePicture}
        >
          Snip Event
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          size="large"
          sx={{ mb: 1, borderRadius: "30px", backgroundColor: "white", fontColor: "gray", fontSize: "19px" }}
          onClick={manualCreate}
        >
          Create Event Manually
        </Button>
      </Container>
    </CustomPage>
  )
};

export default Home;
