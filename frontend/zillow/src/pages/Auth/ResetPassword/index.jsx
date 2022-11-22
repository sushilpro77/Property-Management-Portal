import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../store/slices/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onResetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setShowError(false);

    const password = data.get("newpassword");
    const confirmPassword = data.get("confirmpassword");

    if (password !== confirmPassword) {
      setShowError("Passwords Don't Match");
    }

    const valid = password === confirmPassword;

    if (valid) {
      dispatch(resetPassword({ password })).then((res) => {
        console.log("res: ", res);
        if (res && res.error && res.error.code === "ERR_BAD_REQUEST") {
          setShowError(true);
          return;
        }
        navigate("/");
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={onResetPassword}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newpassword"
            type="password"
            error={!!showError}
            helperText={showError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={!!showError}
            helperText={showError}
          />
          {showError && (
            <Alert severity="error">Username or Password not correct !!!</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Reset Password
          </Button>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Link href="/" variant="body2">
                Home
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}>
        {"Copyright © "}
        <Link color="inherit" href="/">
          Raspa
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
