import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

export default function DeleteAlert(props) {

  const handleClose = () =>{
    props.setOpen(!props.open);
  }
  
  const handleDelete = (id) =>{
    props.onConfirmClicked(id)
  }

  return (
    <Dialog fullWidth
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(props.item)} >Yes</Button>
        </DialogActions>
      </Dialog>
  )
}
