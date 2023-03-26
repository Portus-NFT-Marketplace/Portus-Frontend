import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

export default function NFTCard({
  name,
  description,
  price,
  img_url,
  id,
  foundation_owner,
}) {
  return (
    <Card style={{ maxWidth: 345, marginTop: 20 }}>
      <CardMedia style={{ height: 240 }} image={img_url} />
      <CardContent>
        <Stack direction="row" style={{ justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {price}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          <i>{foundation_owner}</i>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small" href={`/details/${id}`}>
          ชมผลงานศิลปะ
        </Button>
      </CardActions>
    </Card>
  );
}
