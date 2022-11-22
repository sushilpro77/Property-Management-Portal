import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFavList, editFavList, fetchFavList } from '../../store/slices/fav/favSlice';


export default function CreateFav(props) {
  const dispatch = useDispatch();
  const favListData = useSelector((state) => state.favLists );
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if(!favListData.isFirst)
      setName(props.item.name)
  },[])
  

  const handleClose = () =>{
    props.setOpen(!props.open); 
  }
  
  const onNameChange = (event) =>{
    setError( event.target.value ? false : true);
    setName(event.target.value)
    // props.setOpen(!props.open); 
  }
  
  const handleConfirmSubmit = (item) =>{
    if(name == null || name == ''){
      setError(true);
      return;
    }
    let data = new FormData();
    data.name = name;
    if(favListData.isFirst){
      dispatch(createFavList(data)).then(res => {
        dispatch(fetchFavList());
        props.setOpen(!props.open);
      });
    } else {
      // edit
      data.id = item.id
      console.log('data', data);
      dispatch(editFavList(data)).then(res => {
        dispatch(fetchFavList());
        props.setOpen(!props.open);
      });
      // props.onCreateConfirmClicked(data)
    }
  }


  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>{favListData.isFirst ? 'Add New' : 'Edit'} Fav</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fav List Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={onNameChange}
            color={ error ?  "warning" : ""}
            focused={ error }
            error={ error }
            helperText={error ? "Required." : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleConfirmSubmit(props.item)}>Submit</Button>
        </DialogActions>
      </Dialog>
  )
}
