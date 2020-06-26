/**
 * SignUp Page
 */

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import LOGIN_USER from '../../graphql/query/login';
import { setToken } from '../../configureClient';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation';
import { useQuery } from '@apollo/react-hooks';
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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RouteComponentProps } from 'react-router-dom';
import './styles.scss';
import { ExecutionResult } from 'react-apollo';

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

  const classes = useStyles();

  // const { loading, error, data: userData } = useQuery(LOGIN_USER, {variables : {
  //   email: values.email,
  //   passsword: values.password,
  // }});

  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>`Error! ${error.message}`</p>;

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

      // console.log(userData)
      // const { token, userId } = userData?.createUser;
      // setToken(token);
      // Cookies.set('userId', userId, { expires: 7 });
      props.history.replace('/home');
    } catch (error) {
      toast.error(error?.message ?? 'Unknown error', {
        autoClose: 6000,
      });
    }
  };

  return (
    <React.Fragment>
      <Header />
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
