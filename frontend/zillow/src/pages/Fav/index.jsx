import { Button, ButtonGroup, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteAlert from '../../components/DeleteAlert/DeleteAlert';
import { deleteFavList, fetchFavList, setAddEditForm } from '../../store/slices/fav/favSlice';
import CreateFav from './CreateFav';
import FavListView from './view/FavListView';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function FavList() {
  const [id, setId] = useState(null);
  const [fav, setFav] = useState(null);
  const [favList, setFavList] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favListData = useSelector((state) => state.favLists );
  
  // const [data, setData] = useState(favListData.favList);
  const [deletModelShow, setDeletModelShow] = useState(false);
  const [createModelShow, setCreateModelShow] = useState(false);
  const [viewModelShow, setViewModelShow] = useState(false);
  

  useEffect(() => {
    dispatch(fetchFavList());
  },[])
  



  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }


  function onBtnClicked(type, id){
    if(type == 'view'){
      //view
      setFavList(id.favItems);
      setViewModelShow(!viewModelShow)

    } else if( type == 'edit') {
      //edit
      setFav(id);
      dispatch(setAddEditForm(false));
      setCreateModelShow(!createModelShow)
    } else {
      // delete
      setId(id);
      setDeletModelShow(!deletModelShow)
    }
  }

  // when use click new btn
  function setNewFavClicked(){
    dispatch(setAddEditForm(true));
    setCreateModelShow(!createModelShow)
  }

  // for delete model confirm btn
  function onConfirmDeleteClicked(item){
    dispatch(deleteFavList(item.id)).then((res) => {
      dispatch(fetchFavList());
      setDeletModelShow(!deletModelShow);
    })
    
  }

  // view model close
  function onCloseClicked(item){
    setViewModelShow(!viewModelShow)
  }
  
  // create model
  function onCreateConfirmClicked(item){
    setCreateModelShow(!createModelShow)
  }

  return (
    <>
      <Container fixed>
        <Grid container spacing={12} direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Grid item>
            <h1> FavList </h1>
          </Grid>
          <Grid item>
            <Button variant="contained" color='success' onClick={() => setNewFavClicked() } startIcon={<AddCircleIcon />} >Add New</Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favListData.favList.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="contained">
                      <Button size="small" color="secondary" onClick={()=> {onBtnClicked('view',row)}}>View</Button>
                      <Button size="small" color="success" onClick={()=> {onBtnClicked('edit',row)}}>Edit</Button>
                      <Button size="small" color="error" onClick={()=> {onBtnClicked('delete',row)}}>Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        { deletModelShow && <DeleteAlert item={id}  open={deletModelShow} setOpen={setDeletModelShow} onConfirmClicked={onConfirmDeleteClicked}  />}
        { createModelShow && <CreateFav item={fav}  open={createModelShow} setOpen={setCreateModelShow} onCreateConfirmClicked={onCreateConfirmClicked}  />}
        { viewModelShow && <FavListView item={favList}  open={viewModelShow} setOpen={setViewModelShow} onCloseClicked={onCloseClicked}  />}
      </Container>
    </>
  )
}
