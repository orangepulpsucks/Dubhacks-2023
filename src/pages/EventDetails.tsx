import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';

const EventDetails: React.FC = () => {
  const dispatch = useDispatch();
  
  const hardCodedEvents = [0]
  
  return (
    <CustomPage contentHeight="calc(100% - 150px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Hi, Bobby!
        </Typography>
        <Typography variant="body1">
          Here is your detailed schedule.
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        {
          hardCodedEvents.map((event, i) => {
            return (
              <Container key={i} sx={{ my: 1, py: 1 }} className="event-item">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Lunch with Johnny
                </Typography>
                <br /> 
                <Typography variant="body1">
                  December 9, 2023
                </Typography>
                <Typography variant="body1">
                  12:00 PM - 1:00 PM
                </Typography>
                <br /> 
                <Typography variant="body1">
                Address:
                </Typography>
                <Typography variant="body1">
                4001 E Stevens Way NE
                </Typography>
                <Typography variant="body1">
                Seattle, WA 98195
                </Typography>
                <br /> 
                <Typography variant="body1">
                Additional notes:
                </Typography>
                <Typography variant="body1">
                Don't forget housewarming gift!
                </Typography>
                <br /> 
                <br /> 
                


              </Container>
            )
          })
        }
      </Container>

      {/* Buttons at bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button variant="contained" fullWidth size="large"sx={{ my: 1 }}>
          Edit
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1 }}>
          Remove
        </Button>
      </Container>
    </CustomPage>
  )
};

export default EventDetails;