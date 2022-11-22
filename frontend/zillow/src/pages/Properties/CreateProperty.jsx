import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, put } from "../../api";
export default function CreateProperty() {
    const params= useParams();
    const navigate=useNavigate();
    const[entity, setEntity]=useState();
    const[data, setData]=useState({
      title:'',
      price:'',
      numberOfRooms:'',
      propertyType:'',
      homeType:'',
      location:'',
      isForRent:'',
      isForSell:''
    })
    useEffect(() => {
      get("api/properties/" +params.id).then(({data}) => {
        console.log("250",data)
         setData(data)
      })
    }, [params.id])

    const save = async () => {
      let res = await put("/api/properties/" + data.id + "/edit", {
        ...data
      })
      navigate(-1);
        
    }

    const handleChange = (event) => {
      console.log(event.target.value);
      setData({ ...data, [event.target.name] : event.target.value  })
    };

   
  return (
    <Container fixed>
      <h1>CreateProperty</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField label="Title" name="title" value={data.title} 
          onChange={handleChange} variant="outlined" />
        </FormControl>

        <Grid item container sx={{ m: 0, mr: 1 }} spacing={1} direction="row"
          alignItems="center"
          justify="center">
          <Grid item xs={12}>

            <TextField fullWidth sx={{ mr: 1 }}
              id="outlined-multiline-flexible"
              label="No of room"
              name="numberOfRooms"
              value={data.numberOfRooms}
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12}>

            <TextField fullWidth sx={{ mr: 1 }}
              id="outlined-multiline-flexible"
              label="Price"
              name='price'
              value={data.price}
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12}>
            {/* // Property type */}
            <FormControl fullWidth>
              <InputLabel id="ptype-simple-select">Property Type</InputLabel>
              <Select
                labelId="pt-simple-select-label"
                id="p-simple-select"
                value={data.propertyType}
                name='propertyType'
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value='Single-Family Home'>Single-Family Home</MenuItem>
                <MenuItem value='Townhome'>Townhome</MenuItem>
                <MenuItem value='Bungalow'>Bungalow</MenuItem>
                <MenuItem value='Ranch'>Ranch</MenuItem>
                <MenuItem value='Condos'>Condos</MenuItem>
                <MenuItem value='Victorian'>Victorian</MenuItem>
                <MenuItem value='Colonial'>Colonial</MenuItem>
                <MenuItem value='Container Home'>Container Home</MenuItem>
                <MenuItem value='Split Level'>Split Level</MenuItem>
                <MenuItem value='Houseboat'>Houseboat</MenuItem>
                <MenuItem value='Mediterranean'>Mediterranean</MenuItem>
                <MenuItem value='Tudor'>Tudor</MenuItem>
                <MenuItem value='Craftsman'>Craftsman</MenuItem>
                <MenuItem value='Tiny House'>Tiny House</MenuItem>
                <MenuItem value='Co-op'>Co-op</MenuItem>
                <MenuItem value='Cabin'>Cabin</MenuItem>
                <MenuItem value='Apartment'>Apartment</MenuItem>
                <MenuItem value='Manufactured Home'>Manufactured Home</MenuItem>
                <MenuItem value='Mobile Home'>Mobile Home</MenuItem>
                <MenuItem value='Mid-Century Modern Style'>Mid-Century Modern Style</MenuItem>
                <MenuItem value='Cape Cod'>Cape Cod</MenuItem>
                <MenuItem value='Farmhouse'>Farmhouse</MenuItem>
                <MenuItem value='Mansion'>Mansion</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Res">Res</MenuItem>
                <MenuItem value="condo">Condo</MenuItem>
                <MenuItem value="condoNew">Condo New</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {/* home type */}
            <FormControl fullWidth>
              <InputLabel id="htype-simple-select">Home Type</InputLabel>
              <Select
                labelId="ht-simple-select-label"
                id="h-simple-select"
                name='homeType'
                value={data.homeType}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="Townhouse">Townhouse</MenuItem>
                <MenuItem value="Multi family">Multi family</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
                <MenuItem value="Mobile / Manufactured">Mobile / Manufactured</MenuItem>
                <MenuItem value="Coop Unit">Coop Unit</MenuItem>
                <MenuItem value="Vacant land">Vacant land</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Single family">Single family</MenuItem>

              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="sell-radio-buttons">Is For Sell</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="isForSale"
                defaultValue={data.isForSell}
                onChange={handleChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>

            <FormControl>
              <FormLabel id="rent-radio-buttons">Is For Rent</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                defaultValue={data.isForRent}
                name="isForRent"
                onChange={handleChange}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={() => save()}>Submit</Button>
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
