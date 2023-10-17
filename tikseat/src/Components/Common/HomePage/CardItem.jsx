import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { colorPalatinateBlue } from "../../../Assets/CSS/Style/theme";

const CardItem = ({ dataEventItem }) => {
  const now = new Date();
  let statusEvent = null;
  const currentTimestamp = Math.floor(now.getTime() / 1000); // Chia cho 1000 để chuyển đổi thành giây

  const serverTimestamp = new Date(dataEventItem?.time || 1633860600);

  // So sánh timestamp từ server với timestamp hiện tại
  if (serverTimestamp === currentTimestamp) {
    statusEvent = "Happening";
  } else {
    statusEvent = "Up Comming";
  }
  return (
    <Card style={{ borderRadius: "20px", overflow: "hidden" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://snsdkorean.files.wordpress.com/2011/08/smtown_family_by_kimhanjin.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Box display={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: `${colorPalatinateBlue}`,
                  }}
                >
                  SEP
                </span>
                <span style={{ fontSize: "28px", fontWeight: "700" }}>18</span>
              </div>
              <div style={{ fontWeight: "700", color: "green" }}>type</div>
            </div>
            <Box>
              <Typography
                gutterBottom
                variant="h5"
                style={{ fontSize: "16px", fontWeight: "700" }}
                component="p"
              >
                2011 Super Junior SM Town Live '10 World Tour New York City
              </Typography>{" "}
              <Typography
                gutterBottom
                component="p"
                style={{ fontSize: "14px" }}
              >
                Directly seated and inside for you to enjoy the show.
              </Typography>
              <Typography
                style={{
                  background: "gray",
                  color: "white",
                  fontWeight: "500",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  width: "max-content",
                  fontSize: "13px",
                }}
              >
                {statusEvent}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
