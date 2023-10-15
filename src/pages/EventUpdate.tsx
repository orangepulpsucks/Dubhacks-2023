import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router';

import CustomPage from '../components/CustomPage';
import { selectLastState } from '../store/slices/events';
import { setNewAlert } from '../service/alert';
import { addEvent, updateEvent } from '../store/slices/events';

// Helper function for generating ranges from start inclusive to stop exclusive
const range = (start: number, stop: number) => {
  return Array.from({ length: (stop - start) }, (_, i) => start + i);
}

const EventUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const lastEvent = useSelector(selectLastState);
  const { id }: any = useParams();
  const isCreate = id == 'new' ? true : false;

  const [data, setData] = useState({
    title: '',
    date: {
      day: 1,
      month: 1,
      year: 2023
    },
    description: '',
    priority: 3
  });

  // Fill in params
  useEffect(() => {
    if (lastEvent) {
      setData({
        title: lastEvent.title,
        date: {
          day: lastEvent.date.day,
          month: lastEvent.date.month,
          year: lastEvent.date.year
        },
        description: lastEvent.description,
        priority: lastEvent.priority
      });
    }
  }, [lastEvent]);

  // Button handlers
  const handleConfirm = () => {
    if(isCreate) {
      dispatch(addEvent(data));

      setNewAlert(dispatch, {
        alertType: 'success',
        msg: 'Successfully created event'
      });

      history.push('/home');
    } else {
      dispatch(updateEvent({ id, event: data }));

      setNewAlert(dispatch, {
        alertType: 'success',
        msg: 'Successfully updated event'
      });

      history.push('/event/' + id + '/details');
    }
  }

  const handleCancel = () => {
    if(isCreate) {
      history.push('/home');
    } else {
      history.push('/event/' + id + '/details');
    }
  }

  // Change handlers
  const handleTitleChange = (e: any) => {
    setData({ ...data, title: e.target.value });
  };

  const handleDescriptionChange = (e: any) => {
    setData({ ...data, description: e.target.value });
  };

  const handlePriorityChange = (e: any) => {
    setData({ ...data, priority: e.target.value });
  };

  const handleDayChange = (e: any) => {
    setData({ ...data, date: { ...data.date, day: e.target.value } });
  };

  const handleMonthChange = (e: any) => {
    setData({ ...data, date: { ...data.date, month: e.target.value } });
  };

  const handleYearChange = (e: any) => {
    setData({ ...data, date: { ...data.date, year: e.target.value } });
  };
  
  return (
    <CustomPage contentHeight="calc(100% - 100px)">
      {/* Header */}
      <Container sx={{ my: 3, px: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "35px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          {isCreate ? 'Create' : 'Update'} Event
        </Typography>
      </Container>

      {/* Events */}
      <Container sx={{ px: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          Event Details
        </Typography>
        <TextField
          label="Event Title"
          variant="outlined"
          fullWidth
          value={data.title}
          onChange={handleTitleChange}
          sx={{ mb: 1 }}
        />
          <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />

        <TextField
          label="Additional Notes"
          variant="outlined"
          fullWidth
          value={data.description}
          onChange={handleDescriptionChange}
          sx={{ mb: 1 }}
        />

        

        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          Event Date
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Select
              value={data.date.month}
              fullWidth
              onChange={handleMonthChange}
              sx={{ mb: 1 }}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select
              value={data.date.day}
              fullWidth
              onChange={handleDayChange}
              sx={{ mb: 1 }}
            >
              {
                range(1, 32).map((day) => {
                  return (
                    <MenuItem value={day} key={day}>{day}</MenuItem>
                  )
                })
              }
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Select
              value={data.date.year}
              fullWidth
              onChange={handleYearChange}
              sx={{ mb: 1 }}
            >
              {
                range(1900, 2024).reverse().map((day) => {
                  return (
                    <MenuItem value={day} key={day}>{day}</MenuItem>
                  )
                })
              }
            </Select>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", fontFamily: "Helvetica, sans-serif", marginBottom: "5px", color: "#3a3b3c" }}>
          Event Importance
        </Typography>
        <Select
          value={data.priority}
          fullWidth
          onChange={handlePriorityChange}
          sx={{ mb: 1 }}
        >
          <MenuItem value={1}>1 - Not Important</MenuItem>
          <MenuItem value={2}>2 - Somewhat Important</MenuItem>
          <MenuItem value={3}>3 - Moderately Important</MenuItem>
          <MenuItem value={4}>4 - Very Important</MenuItem>
          <MenuItem value={5}>5 - Extremely Important</MenuItem>
        </Select>
      </Container>

      {/* Buttons at the bottom */}
      <Container sx={{ py: 2 }} className="button-stack-2">
        <Button variant="contained" fullWidth size="large" sx={{ my: 1, borderRadius: "30px" }} onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" color="secondary" fullWidth size="large" sx={{ mb: 1, borderRadius: "30px" }} onClick={handleCancel}>
          Cancel
        </Button>
      </Container>
    </CustomPage>
  );
};

export default EventUpdate;
