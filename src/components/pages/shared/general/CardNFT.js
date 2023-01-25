import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NFTCard() {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardMedia
        style={{ height: 240 }}
        image="https://goodparentingbrighterchildren.com/wp-content/uploads/2019/03/Children-drawing-PB.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          NFT NAME
        </Typography>
        <Typography variant="body2" color="text.secondary">
          NFT Description
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small">VIEW</Button>
      </CardActions>
    </Card>
  );
}
