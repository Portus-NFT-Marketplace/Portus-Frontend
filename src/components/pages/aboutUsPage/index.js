import React, { useState, useEffect } from "react";
import axios from "axios";
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

function AboutUsPage() {
  const quote = "กรุณากินไก่ให้หมด เพราะไก่ที่หมดจานดีกว่าการที่หมดใจ ⸺ Portus";

  const aboutPortus = (
    <div>
      {`  ฉลุยรุสโซ เลสเบี้ยนสไปเดอร์หมวยโบว์ลิ่ง มหาอุปราชาบ๋อย
              อันเดอร์เซ็นเซอร์บลอนด์ฟอร์ม สแควร์ตุ๊กแครกเกอร์ อึ้ม
              แตงกวาตู้เซฟอุเทนโกลด์แคชเชียร์
              ตาปรือแจ็กพอตแชมพูครัวซองดีพาร์ทเมนต์ วีนไชน่า
              เปียโนเทรลเลอร์ไงวอลซ์ ติ๋มกาญจนาภิเษก เอ๋อบาร์บี้ว่ะป๊อป
              พุทโธโฟมมหภาครากหญ้า พีเรียดไวอากร้าวอลซ์ ผิดพลาด เบอร์รี
              ซาบะจัมโบ้ไทเฮาโปรเจ็คท์ แมมโบ้ ทอล์ค ถ่ายทำ
              สุริยยาตรรันเวย์โรแมนติคปาสเตอร์บอกซ์
              ทาวน์แซลมอนบลูเบอร์รี่ราชบัณฑิตยสถาน ชัตเตอร์ รุสโซ
              ทัวร์นาเมนท์เฟอร์รี่จัมโบ้คองเกรสแหวว
              พาร์ตเนอร์ซาบะเซลส์แมนแจ็กพ็อต เซอร์วิสเมาท์
              ติงต๊องคาแร็คเตอร์เรซิ่นไพลินดีพาร์ทเมนต์ ม้ง เอาท์ดอร์ทีวี
              บลูเบอร์รี แซวธุรกรรม เซอร์ธุรกรรมแอสเตอร์แอคทีฟวิทย์
              เซอร์ปัจฉิมนิเทศโรแมนติกไฟต์วิลล์ ซูเปอร์รูบิกจังโก้
              วโรกาสอัลบั้มดีลเลอร์ บริกรคอลเล็กชั่นลาเต้บลูเบอร์รีต้าอ่วย
              สมิติเวช ฮิบรูแอสเตอร์อวอร์ด รุสโซดัมพ์เทเลกราฟสึนามิวิดีโอ แรลลี
              สต๊อกมยุราภิรมย์ วอลนัทคอปเตอร์อยุติธรรมเจ๊าะแจ๊ะแมชชีน
              โซลาร์ไฟแนนซ์เช็ก อิมพีเรียลรายชื่อ ไฮแจ็ควีไอพีชัวร์ แอ็คชั่น
              ต่อรอง สติ๊กเกอร์ คาวบอยโอเลี้ยงฮิบรูพาสต้าสป็อต
              โง่เขลายนตรกรรมชนะเลิศเซ็กซี่ วโรกาสรันเวย์ซีน
              มะกันเวอร์แซ็กธรรมาฟอยล์ ตรวจทาน พาสตา เดี้ยง
              โบว์ลิ่งกลาสปัจเจกชนไทม์สกรัม ไวอะกร้าสามช่า พาสปอร์ต ศิลปากรสวีท
              โปรรีดไถกับดักกิฟท์ ธัมโมเพรียวบางวาฟเฟิล
              โจ๋พฤหัสคอนเฟิร์มอุปการคุณ เซ็นทรัลโครนาซูเปอร์ตุ๋ยมอบตัว
              สันทนาการแรลลี่แชมพู เลดี้ไทเฮา ทัวร์จิตเภทดีพาร์ทเมนต์
              สะเด่าอิสรชนทัวร์นาเมนท์กระดี๊กระด๊า เพนตากอนโจ๋โดมิโนแอปเปิ้ล
              กรรมาชนจูเนียร์รีดไถเฮีย`}
    </div>
  );

  const fromUs = (
    <div>
      {`  กฤษณ์สกาย โปรเจคท์สเปควินไบเบิลซาตาน
              เคลื่อนย้ายโง่เขลาเรซินเบอร์เกอร์ ชีสพลานุภาพคอมเมนท์
              จิตพิสัยแรงดูดมิลค์ เอ็กซ์เพรสโซนี่ จูนสตูดิโอรีโมตคันยิแอสเตอร์
              วิทย์โรลออนติวเตอร์ ศิลปวัฒนธรรมวีซ่า ลาตินเฟิร์มผลักดัน
              โพลารอยด์บูติกติวเตอร์
              เพลย์บอยมอยส์เจอไรเซอร์อัลบั้มเบญจมบพิตรซาฟารี แอโรบิค
              ซีเนียร์แฟ้บยิว อันเดอร์แก๊สโซฮอล์ เฟอร์นิเจอร์แฟลชไลท์
              พูลไวกิ้งสตริงตะหงิดยิว ซีรีส์วอล์คแอโรบิคซะ พาสปอร์ต
              วาฟเฟิลวอร์รูมล้มเหลวฮิปฮอปฟลุค พาสปอร์ตแอพพริคอท พะเรอเมคอัพ
              ลอจิสติกส์ปอดแหก เคลม ลิสต์ไบโอซีอีโอ จิตเภท เจ๊าะแจ๊ะ
              ปักขคณนาพาสต้าเมเปิลอาว์พาสตา เยลลี่สุริยยาตรเฮียพาสเจอร์ไรส์
              แดนเซอร์ไอเดียจิตพิสัยเอสเปรสโซ แอ็คชั่นเมี่ยงคำฟรังก์
              รันเวย์อพาร์ตเมนท์ สตาร์ท อิสรชนมาร์จินสปอร์ตยิมมินต์
              เลคเชอร์แคร็กเกอร์ฮาร์ดแพนดา ไฮเปอร์ยังไงแคชเชียร์แจ๊กพ็อต
              อุด้งวอลนัทฟอร์มเนิร์สเซอรีสุนทรีย์ ไวอากร้า สะบึมส์หล่อฮังก้วย
              ปฏิสัมพันธ์ สไตล์วิกไรเฟิลป๊อกเลคเชอร์
              ไมเกรนเบิร์ดเซ็กซ์ตรวจสอบโฮลวีต เก๋ากี้พริตตี้ โฟล์ครีดไถ อึ๋ม
              โอเพ่นพุทธศตวรรษ เอ็กซ์โป เซอร์วิสเสกสรรค์โหงวบ๊วยเทเลกราฟ มาราธอน
              หมั่นโถวโฮสเตส แคปฟยอร์ดแมกกาซีนเยลลี่โปรเจกต์ เซ็กซ์
              ดิสเครดิตเทเลกราฟสไตล์เจ๊าะแจ๊ะไทเฮา
              แมมโบ้โอ้ยพลาซ่าวอฟเฟิลวอร์รูม ช็อคช็อปแอพพริคอทสามแยก
              เบอร์เกอร์ฮีโร่คอรัปชันโฮมเมาท์`}
    </div>
  );

  return (
    <StyledRoot className={`page`}>
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
                style={{ justifyContent: "space-evenly", marginTop: "20px" }}
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
                    Frontend Developer
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
                  Project Consultant
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