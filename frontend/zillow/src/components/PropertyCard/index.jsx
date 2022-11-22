import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  const { property, href } = props;
  const {
    id,
    title,
    description,
    homeType,
    price,
    images,
    propertyType,

    location: { name },
  } = property;

  return (
    <Card sx={{ maxWidth: 345, width: 345, height: 410 }}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites" onClick={() => props.onFavClicked(props.property)}>
            <FavoriteIcon />
          </IconButton>
        }
        title={title}
        subheader={propertyType}
      />
      <Carousel
        NextIcon={<ArrowForwardIosIcon />}
        PrevIcon={<ArrowBackIosIcon />}
        indicators={false}
        navButtonsAlwaysVisible
        animation="slide"
        autoPlay={false}>
        {images.map((item, i) => (
          <CardMedia
            component="img"
            height="194"
            image={item.url}
            alt="Paella dish"
          />
        ))}
      </Carousel>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}>
          <AttachMoneyIcon />
          <Typography
            sx={{ marginLeft: "5px" }}
            variant="body2"
            color="text.secondary">
            {" "}
            {price}
          </Typography>
        </div>
        <Link to={href}>Details</Link>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
