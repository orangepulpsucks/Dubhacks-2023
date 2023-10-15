import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router';

import CustomPage from '../components/CustomPage';
import { setLast } from '../store/slices/events';

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

const EventDetails: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [state, setState] = useState({
    title: 'Loading...',
    date: {
        day: 1,
        month: 1,
        year: 2023
    },
    description: '',
    priority: 3
  });

  // Button handlers
  const handleEdit = () => {
    history.push('/event/' + id + '/update');
  }
  
  const handleCancel = () => {
    history.push('/home');
  }
    
  return (
    <CustomPage contentHeight="calc(100% - 150px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          View Event
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        <Container sx={{ my: 1, py: 2 }} className="event-item">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {state.title}
          </Typography>
          <Typography variant="body1">
            {months[state.date.month-1]} {state.date.day}, {state.date.year}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
            Additional notes:
          </Typography>
          <Typography variant="body1">
            {state.description ? state.description : "None"}
          </Typography>
        </Container>
      </Container>

      {/* Buttons at bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button variant="contained" fullWidth size="large"sx={{ my: 1 }} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1 }} onClick={handleCancel}>
          Cancel
        </Button>
      </Container>
    </CustomPage>
  )
};

export default EventDetails;