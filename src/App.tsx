import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';

/* Your page imports */
import Landing from './pages/Landing';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventUpdate from './pages/EventUpdate';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Your CSS */
import './App.css';



setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <GoogleOAuthProvider clientId="1008397358579-890um7lj3iepcnab1f1lielf12pdklib.apps.googleusercontent.com">
        <IonReactRouter>
          <IonRouterOutlet>
            {/** Page routing here */}
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/event/:id/details">
              <EventDetails />
            </Route>
            <Route exact path="/event/:id/update">
              <EventUpdate />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </GoogleOAuthProvider>
    </IonApp>
  );
}

export default App;
