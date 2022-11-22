import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropertyBarChart from "../../components/Charts/PropertyBarChart";
import PropertyPieChart from "../../components/Charts/PropertyPieChart";
import { loadPropertyStats } from "../../store/slices/properties/propertySlice";
import { selectPropertyStats } from "../../store/slices/properties/selectors";
import { isLoggedIn, selectAuth } from "../../store/slices/user/selectors";
import { get } from "../../api";

export default function Dashboard() {
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [value, setValue] = useState("");
  const [data, setData] = useState(rows);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get("/api/applications").then((res) => {
      console.log(res.data.content);
      setApplications(res.data.content);
    });
    get("/api/users").then((res) => setUsers(res.data));
  }, []);

  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => isLoggedIn(state));
  const userRole = useSelector((state) => selectAuth(state));
  const { names, counts } = useSelector((state) => selectPropertyStats(state));
  const pieChartData = useSelector((state) => state.properties.propertyStats);

  const AUTH_ROLES = ["ROLE_ADMIN"];
  const isAuthorized = isSignedIn && AUTH_ROLES.includes(userRole);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(loadPropertyStats());
    }
  }, []);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Container
        sx={{
          marginBottom: "6rem",
        }}>
        <h1> Dashboard </h1>

        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="center">
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="By Price"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Property Type"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Number of Rooms"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Home Type"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Location"
              value={value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => alert("Clicked")}>
              Filter
            </Button>
          </Grid>
        </Grid>
        <br />
        <br />
        <h1>Recent Applications</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Property Title</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Is For Rent</TableCell>
                <TableCell align="right">Is For Buying</TableCell>
                <TableCell align="right">Submission Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow
                  key={application.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {application.property.title}
                  </TableCell>
                  <TableCell align="right">
                    {application.user.username}
                  </TableCell>
                  <TableCell align="right">
                    {application.isForRent ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {application.isForSell ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {application.submissionDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <h1>Recent Registered Users</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Full Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.fullName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isAuthorized && names.length > 0 && counts.length > 0 && pieChartData && (
          <Box>
            <PropertyBarChart
              title="Properties Rented By Location"
              xAxisData={names}
              name={"Properties Bar Chart"}
              type="bar"
              data={counts}
            />
            <PropertyPieChart
              title="Properties Rented By Location"
              data={pieChartData}
            />
          </Box>
        )}
      </Container>
    </>
  );
}
