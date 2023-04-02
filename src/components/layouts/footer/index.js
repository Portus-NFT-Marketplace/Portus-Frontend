import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Stack, Link } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FF9258",
    color: theme.palette.common.white,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // add position relative to the root
    display: "flex !important",
    marginTop: "60px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative", // add position relative to the content
    zIndex: 1, // set a higher z-index value than the contentCC
    margin: "0 auto", // horizontally center the content
    maxWidth: 600, // set a maximum width to prevent overflow
    marginBottom: "40px",
  },
  contentCC: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.common.white,
    height: 40,
    backgroundColor: "#E46842",
    position: "absolute", // position the contentCC absolutely within the root
    bottom: 0, // position it at the bottom
    left: 0, // align it to the left
    right: 0, // align it to the right
    zIndex: 0, // set a lower z-index value than the content
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.content}>
        <Stack style={{ marginBottom: "10px" }}>
          <Typography variant="h4">Portus NFT</Typography>
        </Stack>
        <Typography variant="caption">
          โดย สรุจ สัตยานุรักษ์ และ พิชชาภา แซ่ลิ้ม
        </Typography>
        <Typography variant="caption">
          คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมซอฟต์แวร์และความรู้
          มหาวิทยาลัยเกษตรศาสตร์
        </Typography>
      </div>
      <div className={classes.contentCC}>
        <Typography style={{ marginLeft: "20px" }} variant="body2">
          ©2023 Portus
        </Typography>
        <Stack
          direction="row"
          style={{ justifyContent: "space-evenly" }}
          spacing={2}
        >
          <Link href="/myNFT" underline="hover" color="white">
            NFT ของฉัน
          </Link>
          <Link href="/foundations" underline="hover" color="white">
            มูลนิธิ
          </Link>
          <Link
            href="/about_us"
            underline="hover"
            style={{ marginRight: "20px" }}
            color="white"
          >
            เกี่ยวกับเรา
          </Link>
        </Stack>
      </div>
    </footer>
  );
}

export default Footer;
