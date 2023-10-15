import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router';

import CustomPage from '../components/CustomPage';
import { setToken } from '../store/slices/creds';
import { setNewAlert } from '../service/alert';

import './Landing.css';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const successMsg = (codeResponse: any) => {
    dispatch(setToken(codeResponse.access_token));

    setNewAlert(dispatch, {
      alertType: 'success',
      msg: 'Successfully connected to Google'
    });
    history.push('/home');
  }

  const errorMsg = (error: any) => {
    setNewAlert(dispatch, {
      alertType: 'error',
      msg: 'We were unable to authenticate with Google'
    });
  }

  const login = useGoogleLogin({
    onSuccess: successMsg,
    onError: errorMsg,
    scope: SCOPES.join(' ')
  });
  
  return (
    <CustomPage>
      <Container id="everything">
        <img src="./favicon.svg" id='landing-logo' />
        <Typography id='landing-text'>Snip-Cal 🌿</Typography>
        <Button id='landing-button' sx={{ fontSize: '16px' }}variant="contained" onClick={() => login()}>
          Connect with Google
        </Button>
        </Container>
    </CustomPage>
  )
};

export default Landing;