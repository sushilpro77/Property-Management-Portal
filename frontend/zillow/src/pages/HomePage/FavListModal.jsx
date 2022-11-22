import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavItem, fetchFavList } from '../../store/slices/fav/favSlice';
import { loadProperties } from '../../store/slices/properties/propertySlice';

export default function FavListModal(props) {
  const [list, setList] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const favListData = useSelector((state) => state.favLists );
  console.log('favListData', favListData);
  
  
  useEffect(() => {
    dispatch(fetchFavList());
  },[])

  const handleClose = () => {
    props.setOpen(!props.open);
  }
  
  const handleConfirmSubmit = (propertyId) => {
    // props.setOpen(!props.open);
    console.log('666', list);
    console.log('667', propertyId);
    let data = new FormData();
    data.property = {id: propertyId.id}
    data.id = list.id
    console.log('whats in inside', data);
    dispatch(addFavItem(data)).then((res) => {
      handleClose(); // hide modal
      dispatch(loadProperties())
    })
  }
  
  const onListChange = (event) => {
    console.log('====================================');
    console.log(event.target.value);
    console.log('====================================');
    setList(favListData.favList[event.target.value]);
    // props.setOpen(!props.open);
  }

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>Choose Fav List</DialogTitle>
        <DialogContent>
          { !favListData.error ? 
          <FormControl fullWidth>
              <InputLabel id="ptype-simple-select">Choose List</InputLabel>
              <Select
                labelId="ptl-simple-select-label"
                id="list-simple-select"
                value={list.name}
                label="Age"
                onChange={onListChange}
              >
                {
                  favListData.favList && favListData.favList.map((item, index) => {
                    return (
                      <MenuItem value={index}>{item.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            : 
            <DialogContentText size="small">
            To manage Fav List. Login to dashboard
          </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          { !favListData.error ? <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleConfirmSubmit(props.item)}>Save</Button>
          </>
          :
          <Button onClick={handleClose}>Ok</Button>
          }
        </DialogActions>
      </Dialog>
  )
}
