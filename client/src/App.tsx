/**
 * App Component
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient, { getUser } from './configureClient';
import PrivateRoute from './utils/auth';
import Login from './screens/Login';
import Logout from './components/Logout';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Billing from './screens/Billing';
import Notices from './screens/Notices';
import Notice from './screens/Notice';
import Update from './screens/Update';
import NoMatch from './screens/NoMatch';
import Subscription from './screens/Subscription';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

interface UserInfo {
  user: any;
  setUser: any;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // Purple and green play nicely together.
      main: '#1976D2',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#F06292',
    },
  },
});

/**
 * Logged in User info
 */
export const UserContext = React.createContext<UserInfo>({
  user: undefined,
  setUser: ()  => {},
});

const App: React.FC = () => {
 const [userInfo, setUser] = useState<any>(getUser());
 
  return (
    <UserContext.Provider value={{
      user: userInfo,
      setUser,
    }}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/billing" component={Billing} />
              <PrivateRoute path="/notices" component={Notices} />
              <PrivateRoute path="/notice" component={Notice} />
              <PrivateRoute path="/update" component={Update} />
              <PrivateRoute path="/subscription" component={Subscription} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </ApolloProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
