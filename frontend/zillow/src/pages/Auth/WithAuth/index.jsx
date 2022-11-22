import { useSelector } from "react-redux";
import { isLoggedIn, selectAuth } from "../../../store/slices/user/selectors";
import { Link, Navigate } from "react-router-dom";
import CustomSnackBar from "../../../components/SnackBar";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/system";

const WithAuth = (props) => {
  const { roles, children } = props;
  const isSignedIn = useSelector((state) => isLoggedIn(state));
  const userRole = useSelector((state) => selectAuth(state));

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("Something Went Wrong!!!");

  const auth = isSignedIn && roles.includes(userRole);

  useEffect(() => {
    if (!auth) {
      setOpen(true);
      setSeverity("error");
      setMessage("You are not authorized to access this route!!!");
    }
  }, []);

  return auth ? (
    children
  ) : (
    <>
      {isSignedIn && (
        <CustomSnackBar
          open={open}
          setOpen={setOpen}
          severity={severity}
          message={message}
        />
      )}
      <Container component="main">
        <Box display="flex" justifyContent={"center"}>
          <Link to="/">Home</Link>
        </Box>
      </Container>
    </>
  );
};

export default WithAuth;
