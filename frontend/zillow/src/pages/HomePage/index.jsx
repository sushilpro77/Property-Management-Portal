import SearchIcon from "@mui/icons-material/Search";
import {
  Button, Container, FormControl, Grid,
  InputLabel, MenuItem, Select
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageCarousal from "../../components/ImageCarousal";
import PropertyCard from "../../components/PropertyCard";
import { loadProperties } from "../../store/slices/properties/propertySlice";
import { selectProperties } from "../../store/slices/properties/selectors";
import FavListModal from "./FavListModal";

const HomePage = (props) => {
  const [location, setLocation] = useState("");
  const [createModelShow, setCreateModelShow] = useState(false);
  const [fav, setFav] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const properties = useSelector((state) => selectProperties(state));
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "propertyType") {
      setPropertyType(e.target.value);
    } else if (e.target.name === "location") {
      setLocation(e.target.value);
    }
  };

  const onFavClicked = (fav) => {
    setFav(fav);
    setCreateModelShow(true);

  }
  const onCreateConfirmClicked = (fav) => {
    setFav(fav);
  }

  const onSearch = (e) => {
    e.preventDefault();
    let locationValue = location;
    let propertyValue = propertyType;
    if (location === "0") {
      locationValue = null;
    }
    if (propertyType === "0") {
      propertyValue = null;
    }
    dispatch(
      loadProperties({ location: locationValue, propertyType: propertyValue })
    );
  };

  useEffect(() => {
    dispatch(loadProperties({ location, propertyType }));
  }, []);

  return (
    <Container
      sx={{ padding: "0px !important", borderRadius: "", marginBottom: "6rem" }}
      component="main"
      maxWidth="xl">
      <ImageCarousal />
      <Container>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 3 }}>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                name="location"
                labelId="location-label"
                id="location"
                value={location}
                label="Location"
                onChange={handleChange}>
                <MenuItem value={"0"}>All</MenuItem>
                <MenuItem value={"Fairfield"}>Fairfield</MenuItem>
                <MenuItem value={"Black Hawk County"}>
                  Black Hawk County
                </MenuItem>
                <MenuItem value={"Johnson County"}>Johnson County</MenuItem>
                <MenuItem value={"Linn County"}>Linn County</MenuItem>
                <MenuItem value={"Polk County"}>Polk County</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
              <InputLabel id="property-label">Property Type</InputLabel>
              <Select
                name="propertyType"
                labelId="property-label"
                id="property"
                value={propertyType}
                label="Property Type"
                onChange={handleChange}>
                <MenuItem value={"0"}>All</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Res">Res</MenuItem>
                <MenuItem value="condo">Condo</MenuItem>
                <MenuItem value="condoNew">Condo New</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
              <Button
                onClick={onSearch}
                variant="contained"
                endIcon={<SearchIcon />}>
                Search
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 3 }}>
          {properties.map((item) => {
            const href = `/property-details/${item.id}`;
            return (
              <Grid item>
                <PropertyCard property={item} href={href} onFavClicked={onFavClicked} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      { createModelShow && <FavListModal item={fav}  open={createModelShow} setOpen={setCreateModelShow} onCreateConfirmClicked={onCreateConfirmClicked}  />}
    </Container>
  );
};

export default HomePage;
