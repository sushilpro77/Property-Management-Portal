import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import Container from '@mui/material/Container';
import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import {del, get, put} from "../../api";
import DeleteAlert from "../../components/DeleteAlert/DeleteAlert";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/slices/users/usersSlice";
import {useNavigate} from "react-router-dom";


export default function Users() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const seletor = useSelector((state) => state.users);
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [deletModelShow, setDeletModelShow] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(fetchUsers(username)).then((res) => {
      setData(res.payload);
    })
  }

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const filter = () => {
    fetchData();
  }

  function onBtnClicked(type, item){
    if(type == 'view'){
      navigate(`/dashboard/users/${item.id}/view`)
    } else if( type == 'edit'){
      navigate(`/dashboard/users/${item.id}/edit`)
    } else {
      // disable
      setDeletModelShow(!deletModelShow)
      setDeleteData(item);
    }
  }

  const onConfirmClicked = async() => {
    let payload = {...deleteData};
    payload.enabled = false;
    let res = await put(`/api/users/${deleteData.id}/edit`, payload);
    setDeletModelShow(false);
    fetchData()
  }

  return (
    <>
      <Container fixed>
        <h1> Users </h1>

        <Grid container spacing={1} direction="row"
          alignItems="center"
          justify="center">
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="By Username"
              value={username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => filter()}>Filter</Button>
          </Grid>
        </Grid>
        <br /><br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Full Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Enabled</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.fullName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.roles[0].role_name}</TableCell>
                  <TableCell align="right">{row.enabled ? "Enabled" : "Disabled"}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="contained">
                      <Button size="small" color="secondary" onClick={()=> {onBtnClicked('view',row)}}>View</Button>
                      <Button size="small" color="success" onClick={()=> {onBtnClicked('edit',row)}}>Edit</Button>
                      <Button size="small" color={row.enabled ? "error" : "secondary"} onClick={()=> {onBtnClicked('disable',row)}}>{row.enabled ? "Disable" : "Enable"}</Button>
                      <Button size="small" color="warning" onClick={()=> {navigate(`/dashboard/users/${row.id}/passwordReset`)}}>Reset Password</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        { deletModelShow && <DeleteAlert item={deleteData}  open={deletModelShow} setOpen={setDeletModelShow} onConfirmClicked={() => onConfirmClicked()}  />}
      </Container>

    </>
  )
}
