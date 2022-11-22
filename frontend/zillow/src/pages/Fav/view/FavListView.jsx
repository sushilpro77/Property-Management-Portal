import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteFavItem, fetchFavList } from '../../../store/slices/fav/favSlice';
import { loadProperties } from "../../../store/slices/properties/propertySlice";

export default function FavListView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(!props.open);
  }

  const onDeleteClick = (id) => {
    dispatch(deleteFavItem(id)).then((res) => {
      handleClose();
      dispatch(fetchFavList());
    })
  }
  
  const onViewClick = (id) => {
    dispatch(loadProperties({location: "", propertyType:""})).then(() => {
      navigate("/property-details/"+id);
      handleClose();
    });
   
  }

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
      <DialogTitle>FavList Details</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Fav List Name
        </DialogContentText> */}
        <TableContainer component={Paper} wrap="nowrap" justify="space-between">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small">SN</TableCell>
                <TableCell>Item List</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.item.length > 0 ? props.item.map((val, idx) => {
                return (
                  <TableRow>
                    <TableCell>
                      {idx+1}
                    </TableCell>
                    <TableCell>{val.property.title}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="contained" onClick={() => onViewClick(val.property.id)} endIcon={<RemoveRedEyeIcon />}>View</Button>{"  "}
                      <Button size="small" color='error' variant="contained" onClick={()=>onDeleteClick(val.id)} endIcon={<CancelIcon />}>Remove</Button>
                    </TableCell>
                  </TableRow>
                )
              })
              :
              <TableRow>
              <TableCell>Nothing to show</TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
