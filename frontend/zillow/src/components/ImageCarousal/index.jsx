import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Item = (props) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        flexDirection: "column",
        backgroundImage: `url(${props.item.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "250px",
        backgroundPosition: "center",
      }}>
      <Typography
        sx={{ padding: "10px 10px 0px 10px" }}
        component="h3"
        variant="h5">
        {props.item.name}
      </Typography>
      <Typography sx={{ padding: "10px" }} component="p" variant="p">
        {props.item.description}
      </Typography>
    </Paper>
  );
};

const ImageCarousal = () => {
  var images = [
    {
      name: "Old Town",
      description: "115 Old Town, South Yarmouth, MA 02664",
      image: "/old-town.webp",
    },
    {
      name: "Lily Pond Drive",
      description: "51 Lily Pond Drive, South Yarmouth, MA 02664",
      image: "/lily-pond.webp",
    },
    {
      name: "Watermark At Jordan Creek",
      description: "6455 Galleria Dr, West Des Moines, IA 50266",
      image: "/watermark.webp",
    },
  ];

  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon />}
      PrevIcon={<ArrowBackIosIcon />}
      indicators={false}
      navButtonsAlwaysVisible
      animation="slide"
      autoPlay={false}>
      {images.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default ImageCarousal;
