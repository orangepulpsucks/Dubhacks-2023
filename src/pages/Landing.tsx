import React, { useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { setNewAlert } from '../service/alert';

import './Landing.css';

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  
  return (
    <CustomPage>
      <Container id="everything">
        <img src="./favicon.svg" id='landing-logo' />
        <Typography id='landing-text'>Snip-Cal 🌿</Typography>
        <Button id='landing-button' variant="contained">
          Get Started
        </Button>
        </Container>
    </CustomPage>
  )
};

export default Landing;