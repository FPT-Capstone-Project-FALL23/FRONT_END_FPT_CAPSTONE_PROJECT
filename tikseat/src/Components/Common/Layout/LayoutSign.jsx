import { Grid, Typography, Paper } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { NAME_LOGO } from "../../../Assets/Constant/Common/constCommon";
import SwiperLogin from "../../../Components/Common/SwiperLogin";
import "../../../Assets/CSS/Common/LayoutSign.css";
import ApiEvent from "../../../API/Event/ApiEvent";
import { useEffect, useState } from "react";

const GridStyleLayout = styled(Grid)`
  height: 100vh;
  // overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutSign = ({ direction = "row", itemLeft, itemRight }) => {

  const [dataImage, setDataImage] = useState();

  async function getThreeImaged() {
    try {
      const reponse = await ApiEvent.getLatestHotEventImages();
      console.log(reponse);
      if (reponse) {
        setDataImage(reponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThreeImaged();
  }, []);

  return (
    <>
      <GridStyleLayout container className="login">
        <Paper
          className="loginGrid"
          style={{
            boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          }}>
          <Grid item md={itemLeft} className="left">
            <Link to={"/#"} style={{ textDecoration: "none" }}>
              <Typography variant="h3" className="logo" component="h4">
                {NAME_LOGO}
              </Typography>
            </Link>
            <Outlet />
          </Grid>

          <Grid item md={itemRight} className="right">
            <SwiperLogin dataImage={dataImage}/>
          </Grid>
        </Paper>
      </GridStyleLayout>
    </>
  );
};

export default LayoutSign;
