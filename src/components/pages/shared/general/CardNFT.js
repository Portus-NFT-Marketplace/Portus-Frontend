import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  maxWidth: 345,
  borderRadius: "15px",
  marginTop: 20,
  height: 400,
});

const StyledCardContent = styled(CardContent)({
  height: 130,
});

export default function NFTCard({
  name,
  description,
  price,
  img_url,
  id,
  foundation_owner,
}) {
  return (
    <StyledCard>
      <CardMedia style={{ height: 240 }} image={img_url} />
      <StyledCardContent>
        <Stack
          direction="row"
          style={{
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant="body1"
              component="div"
              style={{ color: "#E46842" }}
            >
              {price}
            </Typography>
            <Typography variant="body1" style={{ color: "#E46842" }}>
              GWEI
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          <i>{foundation_owner ? foundation_owner : "No foundation owner"}</i>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button size="small" href={`/details/${id}`}>
            ชมผลงานศิลปะ
          </Button>
        </CardActions>
      </StyledCardContent>
    </StyledCard>
  );
}
