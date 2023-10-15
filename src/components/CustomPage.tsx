import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonContent } from '@ionic/react';

import Alert from './Alert';

interface ComponentProps {
  children?: ReactNode;
  contentHeight?: string;
}

const CustomPage: React.FC<ComponentProps> = ({ contentHeight = "100%", children = [] }: ComponentProps) => {
  
  const theme: any = createTheme({
    palette: {
      primary: {
        main: "#8BABF1",
      },
      secondary: {
        main: "#6c757d",
      }
    },
    shape: {
      borderRadius: 5,
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <IonContent forceOverscroll={false} style={{ height: contentHeight }}>
        { children }
        <Alert />
      </IonContent>
    </ThemeProvider>
  )
}

export default CustomPage;