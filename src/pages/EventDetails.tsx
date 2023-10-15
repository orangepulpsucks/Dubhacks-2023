import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router';

import CustomPage from '../components/CustomPage';
import { setLast } from '../store/slices/events';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllState } from '../store/slices/events';

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

const selectedColors = [
  'rgb(139, 171, 241, 0.6)'
];

const EventDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id }: any = useParams();
  const allState = useSelector(selectAllState);
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

  useEffect(() => {
    if(allState) {
      const idx = allState.findIndex((event: any) => event.id == id);
      if (idx >= 0) {
        setState(allState[idx]);
      }

      dispatch(setLast(allState[idx]));
    }
  }, [allState]);

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
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "35px", fontFamily: "Helvetica, sans-serif", marginBottom: "-5px", color: "#3a3b3c" }}>
          View Event
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2}}>
        <Container sx={{ my: 1, py: 2 }} className="event-item">
          <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "25px" }}>
            {state.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "10px", marginBottom: "-8px", fontSize: "17" }}>
            {months[state.date.month-1]} {state.date.day}, {state.date.year}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2, fontSize: "18px" }}>
            Additional notes:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "18px", marginTop:"-5px" }}>
            {state.description ? state.description : "None"}
          </Typography>
        </Container>
      </Container>

      {/* Buttons at bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button variant="contained" fullWidth size="large"sx={{ my: 1, borderRadius: "30px" }} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1, borderRadius:"30px" }} onClick={handleCancel}>
          Cancel
        </Button>
      </Container>
    </CustomPage>
  )
};

export default EventDetails;