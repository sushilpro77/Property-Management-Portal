import { Button, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {get, post, put} from "../../api";

export default function ResetUserPassword() {
  const params = useParams();
  const navigate = useNavigate();

  const [entity, setEntity] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    get("/api/users/" + params.id).then((res) => {
      setEntity(res.data)
    })
  }, [])

  const save = async () => {
    let res = await put("/api/users/" + entity.id + "/passwordReset", {
      ...entity, password
    })
    navigate(-1);
  }

  return (
    <Container fixed>
      <h1>Edit User</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Grid item container sx={{ m: 0, mr: 1 }} spacing={1} direction="row"
          alignItems="center"
          justify="center">
          <Grid item xs={12}>
            <TextField fullWidth sx={{ mr: 1 }}
               id="outlined-multiline-flexible"
               label="New Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color={"secondary"} onClick={() => navigate(-1)}>Back</Button>
            {" "}<Button variant="contained" onClick={() => save()}>Submit</Button>
          </Grid>
        </Grid>
      </Box>


      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
      {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
      {/* </FormControl> */}

    </Container>
  )
}
