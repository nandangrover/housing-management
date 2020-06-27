/**
 * SignUp Page
 */

import React, { useState, useEffect, FormEvent, ChangeEvent, useContext } from 'react';
import { toast } from 'react-toastify';
import LOGIN_USER from '../../graphql/mutation/login';
import { setToken, getUser } from '../../configureClient';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useMutation } from '@apollo/react-hooks';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import './styles.scss';
import { ExecutionResult } from 'react-apollo';
import { UserContext } from '../../App';

interface SignUpState {
  email: string;
  password: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [values, setValues] = useState<SignUpState>({
    email: '',
    password: '',
  });

  useEffect(() => {
    const user = getUser();
    if (user) props.history.replace('/home');
  });

  const [login, { error: mutationError }] = useMutation(LOGIN_USER);

  // Context provides info regarding existance of user
  const { setUser } = useContext(UserContext);

  const classes = useStyles();

  /**
   * Handle Input field change
   * @param name
   */
  const handleChange = (name: string) => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.currentTarget.value });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const { email, password } = values;

      if (!validatePassword(password)) {
        toast.error('Invalid password', { autoClose: 6000 });
        return;
      }

      if (!validateEmail(email)) {
        toast.error('Invalid Email', { autoClose: 6000 });
        return;
      }

      const { data }: ExecutionResult = await login({
        variables: {
          ...values,
        },
      });

      const { token } = data?.login;
      setToken(token);
      // Set the new user for all the components to know
      setUser(getUser());
      props.history.replace('/home');
    } catch (error) {
      toast.error(mutationError?.message ?? 'Unknown error', {
        autoClose: 6000,
      });
    }
  };

  return (
    <React.Fragment>
      <Header {...props} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleChange('email')}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleChange('password')}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" color="inherit" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Footer />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
