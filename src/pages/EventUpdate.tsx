import React, { useState } from 'react';
import { Button, Container, Typography, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';

import './EventUpdate.css';

const EventUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const [appointmentType, setAppointmentType] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const hardCodedEvents = [0];
  
  return (
    <CustomPage contentHeight="calc(100% - 100px)">
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
        {hardCodedEvents.map((event, i) => {
          return (
            <Container key={i} sx={{ my: 1, py: 1 }} className="event-item">
              
              {/* Add input fields for appointment details */}
              <TextField
                label="Appointment Type"
                variant="outlined"
                fullWidth
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="input-field"
              />
              <TextField
                label="Time"
                variant="outlined"
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field"
              />
              <TextField
                label="Day"
                variant="outlined"
                fullWidth
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="input-field"
              />
              <TextField
                label="Additional Notes"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="input-field"
              />
            </Container>
          );
        })}
      </Container>

      {/* Buttons at the bottom */}
      <Container sx={{ py: 2 }} id="button-stack">
        <Button variant="contained" fullWidth size="large" sx={{ my: 1 }}>
          Confirm
        </Button>
      </Container>
    </CustomPage>
  );
};

export default EventUpdate;
