import React, { useState, useContext, ChangeEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
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
  CircularProgress,
} from '@material-ui/core';
import { validateIfValue } from '../../utils/validation';
import ADD_NOTICE from '../../graphql/mutation/addNotice';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../../App';

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
  // Currently logged in user
  const { user } = useContext(UserContext);
  
  const [values, setValues] = useState<any>({
    description: '',
    status: false,
  });

  const [validationError, setValidationError] = useState<any>({
    description: false,
  });

  const [uploadedFileName, setFileName] = useState<any>(null);

  const [fileData, setFileData] = useState<any>(null);

  const [noticeLoading, setLoading] = useState<any>(false);

  const [addNotice, { error: mutationError }] = useMutation(ADD_NOTICE);

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
    setValidationError({ ...validationError, [name]: false });
    setValues({ ...values, [name]: event.currentTarget.value });
  };

  /**
   * Handle Checkbox field change
   * @param name
   */
  const handleCheckBoxChange = (name: string) => (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleCapture = ({ target }: any) => {
    try {
      const fileReader = new FileReader();
      const name = target.files[0].name;
  
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = (e: any) => {
        // Set file name
        setFileName(target.files[0].name);
        setFileData({ [name]: e.target.result });
      };
    } catch(e) {
      reset();
      handleClose();
      toast.error('Something went wrong', {
        autoClose: 6000,
      })
    }
  };

  const handleSubmit = async (event: any): Promise<void> => {
    try {
      const { description, status } = values;

      if (!validateIfValue(description)) {
        setValidationError({ ...validationError, description: true });
        return;
      }

      if (!validateIfValue(uploadedFileName)) {
        toast.error('Add a file to continue', {
          autoClose: 6000,
        })
        return;
      }
      setLoading(true);
      await addNotice({
        variables: {
          noticeInput: { userId: user.userId, description, status, file: fileData[uploadedFileName], fileName: uploadedFileName, mimetype: uploadedFileName.split('.')[1] },
        },
      });
      reset();
      handleClose();
    } catch (error) {
      console.log(error)
      toast.error(mutationError?.message ?? 'Unknown error', {
        autoClose: 6000,
      });
      reset();
      handleClose();
    }
  };

  /**
   * Reset state to defaults
   */
  const reset = (): void => {
    setLoading(false);
    setFileData(null);
    setFileName(null);
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
          {noticeLoading && <CircularProgress style={{margin: 'auto', display: 'block'}} color="secondary" />}
            <CssBaseline />
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={validationError.description}
                    autoComplete="fname"
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleChange('description')}
                    id="description"
                    label="Notice Description"
                    helperText="Description can't be empty"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.status}
                        onChange={handleCheckBoxChange('status')}
                        name="status"
                      />
                    }
                    label="Resolution Status"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                    className="input-file"
                    style={{ display: 'none' }}
                    onChange={handleCapture}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />{' '}
                  <label
                    style={{ display: 'flex' }}
                    htmlFor="raised-button-file">
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
          <Button onClick={handleSubmit} autoFocus color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoticeModal;
