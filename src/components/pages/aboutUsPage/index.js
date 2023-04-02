import React from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Grid,
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

import "./style.css";

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
  paddingTop: 40,
  paddingBottom: 36,
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  marginTop: 30,
});

const StyledTypography = styled(Typography)({
  "&::first-letter": {
    paddingLeft: "4em",
  },
});

const StyledBoxAds = styled(Box)({
  backgroundColor: "#E46842",
  color: "white",
  height: 900,
  justifyContent: "center",
  alignItems: "center",
  position: "relative", // add position relative to the root
  display: "flex !important",
  marginTop: "40px",
});

function AboutUsPage() {
  const quote = "เพิ่มมูลค่าให้งานศิลปะ …สร้างรายได้เสริมให้มูลนิธิ ⸺ Portus";

  const aboutPortus = (
    <div>
      {`โครงการ Portus NFT เป็นโครงการที่จัดทำขึ้นภายใต้หลักสูตรปริญญาตรี คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมซอฟต์แวร์และความรู้ มหาวิทยาลัยเกษตรศาสตร์ ปีการศึกษา 2565 โดยมี ผศ. ภารุจ รัตนวรพันธุ์ เป็นอาจารย์ที่ปรึกษาประจำโครงการ โครงการนี้มีเป้าหมายเพื่อสร้างรายได้เสริมให้แก่มูลนิธิต่างๆในประเทศไทย ด้วยการแปลงผลงานศิลปะฝีมือน้องๆในมูลนิธิต่างๆ ให้เป็น cryptocurrency ในรูปแบบ non-fungible token หรือ NFT และเปิดให้ผู้ใช้งานสามารถเลือกซื้อผลงานศิลปะของน้องๆได้ตามชอบ โดยรายได้ที่ได้จากการขายผลงานศิลปะ หรือ NFT จะได้รับการโอนเข้าไปที่กระเป๋าเงินดิจิตอลของมูลนิธิเจ้าของผลงานโดยตรงไร้ซึ่งคนกลาง กล่าวคือ ผู้ซื้อสามารถรวมบริจาคเงินช่วยเหลือมูลนิธิต่างๆ ด้วยการซื้อผลงานศิลปะฝีมือน้องๆในรูปแบบ NFT ด้วยสกุลเงินดิจิตอลได้นั่นเอง โครงการ Portus NFT เปิดให้บริการในรูปแบบ soft-opening วันแรกในวันที่ 19 เมษายน พ.ศ. 2566 โดยผู้ใช้งานที่สนใจสามารถเลือกซื้อผลงานศิลปะจากน้องๆ ได้ด้วยตนเองผ่านการเข้าสู่ระบบด้วย MetaMask Wallet ของท่านและดำเนินการเลือกซื้อ NFT ตามราคาที่กำหนดไว้ เพื่อเป็นการบริจาคเงินช่วยเหลือมูลนิธิที่ท่านต้องการได้ผ่านเว็ปไซต์ของเรา และเนื่องจากการเปิดให้บริการในช่วงแรกยังคงเป็นการเปิดให้บริการเพื่อทดสอบระบบ หากมีข้อผิดพลาดประการใด ทางทีมผู้พัฒนาต้องขออภัยมา ณ​ ที่นี้ `}
    </div>
  );

  const fromUs = (
    <div>
      {`การพัฒนาโครงการ Portus NFT นับเป็นก้าวแรกที่สำคัญในการเป็นนักพัฒนาซอฟต์แวร์ของพวกเราก่อนที่จะออกจากรั้วมหาวิทยาลัยและเข้าสู่ช่วงวัยทำงาน โดยพวกเรามีความตั้งใจที่จะนำเทคโนโลยีที่ใครหลายๆคนอาจมองว่าเป็นเทคโนโลยีที่อยู่ในช่วงขาลง มาประกอบกับความรู้ความสามารถในการพัฒนาซอฟต์แวร์, การออกแบบ, การบริหารจัดการ, และ ความคิดสร้างสรรค์ของพวกเรา เพื่อพัฒนาให้เป็นเว็ปแอพพลิเคชั่นที่สามารถช่วยเหลือสังคมได้ พวกเราทีมผู้พัฒนาใคร่ขอขอบคุณผู้ใช้งานทุกท่านที่ให้ความสนใจเข้าเยี่ยมชมเว็บไซต์ของพวกเรา ตลอดจนอุดหนุนผลงานศิลปะจากน้องๆในมูลนิธิ หากมีข้อติชมประการใด พวกเราทีมผู้พัฒนาขอน้อมรับไว้ด้วยความยินดีและจะนำทุกคำติชมของทุกท่านมาพัฒนาตนเองเพื่อเป็นนักพัฒนาซอฟต์แวร์ที่ดีขึ้นต่อไปให้ได้ในอนาคต สุดท้ายนี้พวกเราใคร่ขอขอบคุณ ผศ. ภารุจ รัตนวรพันธุ์ และ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ ที่ช่วยประสิทธิ์ประสาทความรู้ด้านวิศวกรรมซอฟต์แวร์ และ ให้คำปรึกษาเกี่ยวกับการพัฒนาโครงการจนทีมผู้พัฒนาสามารถพัฒนาโครงการนี้ออกมาจนสำเร็จเสร็จสมบูรณ์ได้ เราหวังเป็นอย่างยิ่งว่าโครงการ Portus NFT จะสามารถสร้างคุณประโยชน์ให้กับมูลนิธิต่างๆ ได้ไม่มากก็น้อยตามที่ตั้งใจไว้`}
    </div>
  );

  return (
    <StyledRoot className={`page`}>
      <StyledBoxAds>
        <Stack
          style={{ justifyContent: "center", alignItems: "center" }}
          spacing={2}
        >
          <Typography variant="h4">" Portus กุญแจนำทางของคุณ "</Typography>
          <Stack style={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="caption">
              โดย สรุจ สัตยานุรักษ์ และ พิชชาภา แซ่ลิ้ม
            </Typography>
            <Typography variant="caption">
              คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมซอฟต์แวร์และความรู้
              มหาวิทยาลัยเกษตรศาสตร์
            </Typography>
          </Stack>
        </Stack>
      </StyledBoxAds>
      <Container maxWidth="lg">
        <Typography
          className="blockquote"
          variant="h3"
          style={{
            marginTop: "60px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {quote}
        </Typography>
        <StyledBox>
          <Grid container spacing={3}>
            <Grid item xs>
              <Stack style={{ marginBottom: "20px" }} spacing={1}>
                <Typography variant="h4">เกี่ยวกับ Portus</Typography>
                <Typography variant="caption" color="text.secondary">
                  <i>
                    โครงการนี้เป็นส่วนหนึ่งของคณะวิศวกรรมศาสตร์
                    สาขาวิศวกรรมซอฟต์แวร์และความรู้ มหาวิทยาลัยเกษตรศาสตร์
                  </i>
                </Typography>
              </Stack>
              <StyledTypography variant="body1" gutterBottom>
                {aboutPortus}
              </StyledTypography>
            </Grid>
            <Divider orientation="vertical" flexItem>
              <img src="./favicon.ico" width="50" height="50" />
            </Divider>
            <Grid item xs>
              <Stack style={{ alignItems: "end" }}>
                <Typography variant="h4" gutterBottom>
                  สารจากผู้พัฒนา
                </Typography>
              </Stack>
              <StyledTypography variant="body1" gutterBottom>
                {fromUs}
              </StyledTypography>
              <Stack
                direction="row"
                style={{ justifyContent: "space-between", marginTop: "20px" }}
              >
                <Stack
                  spacing={0.1}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    <i>สรุจ สัตยานุรักษ์</i>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Backend and Blockchain Developer
                  </Typography>
                </Stack>
                <Stack
                  spacing={0.1}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    <i>พิชชาภา แซ่ลิ้ม</i>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    UX-UI Designer and Frontend Developer
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                spacing={0.1}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  <i>ผศ. ภารุจ รัตนวรพันธุ์</i>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Project Advisor
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </StyledBox>
      </Container>
    </StyledRoot>
  );
}

export default AboutUsPage;
