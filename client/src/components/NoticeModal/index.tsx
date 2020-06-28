import React, { useState, FormEvent, ChangeEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  Checkbox,
  Button,
  CssBaseline,
  TextField,
  Grid,
  FormControlLabel,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';

const styles: any = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose, ...other }: any = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: any) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const NoticeModal: React.FC<any> = ({ state = false, setModalState }: any) => {
  const [values, setValues] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    flat: '',
    password: '',
  });

  const [uploadedFileName, setFileName] = useState<any>(null);

  const [fileData, setFileData] = useState<any>(null);

  // const [createUser, { error: mutationError }] = useMutation(CREATE_USER);
  const handleClose = () => {
    setModalState(false);
  };

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

  const handleCapture = ({ target }: any) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e: any) => {
      // Set file name
      setFileName(target.files[0].name);
      setFileData({ [name]: e.target.result });
    };
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // try {
    //   const { email, password, flat } = values;

    //   if (!validatePassword(password)) {
    //     toast.error('Invalid password', { autoClose: 6000 });
    //     return;
    //   }

    //   if (!validateEmail(email)) {
    //     toast.error('Invalid Email', { autoClose: 6000 });
    //     return;
    //   }

    //   if (!validateFlat(flat)) {
    //     toast.error('Invalid Flat Number. Flat Number should be of type XX-NN', { autoClose: 6000 });
    //     return;
    //   }
    //   const { data }: ExecutionResult = await createUser({
    //     variables: {
    //       userInput: { ...values },
    //     },
    //   });
    //   const { token } = data?.createUser;
    //   setToken(token);

    //   setUser(getUser());
    //   // Redirect to home
    //   props.history.replace('/home');
    // } catch (error) {
    //   toast.error(mutationError?.message ?? 'Unknown error', { autoClose: 6000 });
    // }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add a new notice
        </DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange('description')}
                    id="description"
                    label="Notice Description"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange('status')}
                        name="status"
                      />
                    }
                    label="Resolution Status"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/jpeg,image/png,application/pdf"
                    className="input-file"
                    style={{ display: 'none' }}
                    onChange={handleCapture}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />{' '}
                  <label style={{display:'flex'}} htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      className="upload-button"
                      style={{ marginRight: '10px' }}>
                      Upload
                    </Button>
                    {uploadedFileName
                      ? `${uploadedFileName} is Uploaded`
                      : 'Upload an image or pdf file for Notice'}
                  </label>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoticeModal;
