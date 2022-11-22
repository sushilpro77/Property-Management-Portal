import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../../store/slices/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const fullName = data.get("fullName");
    const userName = data.get("userName");
    const confirmPassword = data.get("confirmPassword");
    const phoneNumber = data.get("phoneNumber");

    if (password.length < 4 || confirmPassword.length < 4) {
      setPasswordError("Passwords length must be atleast 4 characters ");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords Don't match");
      return;
    }

    const valid = event.currentTarget.reportValidity();

    if (valid) {
      dispatch(
        signupUser({
          email,
          password,
          fullName,
          username: userName,
          phoneNumber,
        })
      )
        .unwrap()
        .then((result) => {
          console.log("Result: ", result);
          setShowError(false);
          setErrorMessage(null);
          dispatch(loginUser({ email, password }))
            .unwrap()
            .then((res) => {
              navigate("/");
            });
        })
        .catch((error) => {
          console.log("Error: ", error);
          const { status } = error;
          if (status === 409) {
            const { data } = error;
            const { message } = data;
            setShowError(true);
            setErrorMessage(message);
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="full-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="phone-number"
                name="phoneNumber"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                autoFocus
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="user-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          {showError && (
            <Alert sx={{ marginTop: 2 }} severity="error">
              {errorMessage}!!!
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Raspa
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};

export default SignUp;
