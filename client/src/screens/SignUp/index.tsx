/**
 * SignUp Page
 */

import React, { useState, useContext, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import CREATE_USER from '../../graphql/mutation/createUser';
import { setToken, getUser } from '../../configureClient';
import { validateEmail, validatePassword, validateFlat } from '../../utils/validation';
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
  [key: string]: any;
  firstName: string;
  lastName: string;
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

const SignUp: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [values, setValues] = useState<SignUpState>({
    firstName: '',
    lastName: '',
    email: '',
    flat: '',
    password: '',
  });

  useEffect(() => {
    const user = getUser();
    if (user) props.history.replace('/home');
  });

  const [createUser, { error: mutationError }] = useMutation(CREATE_USER);

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
      const { email, password, flat } = values;

      if (!validatePassword(password)) {
        toast.error('Invalid password', { autoClose: 6000 });
        return;
      }

      if (!validateEmail(email)) {
        toast.error('Invalid Email', { autoClose: 6000 });
        return;
      }

      if (!validateFlat(flat)) {
        toast.error('Invalid Flat Number. Flat Number should be of type X*-N* (Example: Sapphire-456)'
        , { autoClose: 6000 });
        return;
      }
      const { data }: ExecutionResult = await createUser({
        variables: {
          userInput: { ...values },
        },
      });
      const { token } = data?.createUser;
      setToken(token);

      setUser(getUser());
      // Redirect to home
      props.history.replace('/home');
    } catch (error) {
      toast.error(mutationError?.message ?? 'Unknown error', { autoClose: 6000 });
    }
  };

  return (
    <React.Fragment>
      <Header {...props}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleChange('firstName')}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleChange('lastName')}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
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
                  onChange={handleChange('flat')}
                  id="Flat"
                  label="Flat Number"
                  name="Flat"
                  autoComplete="flat"
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" color="inherit" variant="body2">
                  Already have an account? Sign in
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

export default SignUp;
