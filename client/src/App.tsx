/**
 * App Component
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient, { getToken } from './configureClient';
import PrivateRoute from './utils/auth';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Users from './screens/Users';
import Update from './screens/Update';
import NoMatch from './screens/NoMatch';
import Subscription from './screens/Subscription';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

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
export const UserContext = React.createContext(getToken());

const App = () => {
  return (
    <UserContext.Provider value={getToken()}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/users" component={Users} />
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
