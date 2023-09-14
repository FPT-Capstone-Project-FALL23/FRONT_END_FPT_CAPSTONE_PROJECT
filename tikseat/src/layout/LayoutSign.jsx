import { Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { NAME_LOGO } from "../Assets/Constant/ConstLogin";
import { Carousel } from "react-responsive-carousel";

const GridStyleLayout = styled(Grid)`
  height: 100% !important;
  overflow: hidden;
  width: 100vw;
  position: relative;
  padding: 90px 104px 0 104px;
  z-index: 2;
`;
const LayoutSign = ({ direction = "row", itemLeft = 4, itemRight = 8 }) => {
  return (
    <GridStyleLayout
      container
      spacing={10}
      direction={direction || "row-reverse"}
    >
      <Grid item md={itemLeft}>
        <Carousel
          style={{ overflow: "hidden", borderRadius: "30px", height: "780px" }}
          autoPlay
          infiniteLoop
          swipeable
          showThumbs={false}
          showArrows={false}
        >
          {Array(3)
            .fill(0)
            .map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: "750px",
                    overflow: "hidden",
                    borderRadius: "30px",
                  }}
                >
                  <img
                    alt=""
                    src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-hoa-cuc-trang-nen-troi-xanh.jpg"
                  />
                </div>
              );
            })}
        </Carousel>
      </Grid>
      <Grid item md={itemRight}>
        <div>
          <Typography variant="h3" className="logoStyle" component="h4">
            {NAME_LOGO}
          </Typography>
        </div>
        <Outlet />
      </Grid>
    </GridStyleLayout>
  );
};

export default LayoutSign;
