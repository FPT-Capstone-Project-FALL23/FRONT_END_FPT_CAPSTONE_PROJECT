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
import { useNavigate } from "react-router-dom";

const CardItem = ({ dataEventItem }) => {
  const now = new Date();
  let statusEvent = null;
  const navigate = useNavigate();
  const currentTimestamp = Math.floor(now.getTime() / 1000);

  const serverTimestamp = new Date(dataEventItem?.time || 1633860600);

  if (serverTimestamp === currentTimestamp) {
    statusEvent = "Happening";
  } else {
    statusEvent = "Up Comming";
  }
  return (
    <Card
      style={{ borderRadius: "20px", overflow: "hidden" }}
      onClick={() => {
        navigate("/book-tickets");
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://i.ytimg.com/vi/d-ck5QxqgMg/maxresdefault.jpg"
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
                đất rừng phương nam
              </Typography>{" "}
              <Typography
                gutterBottom
                component="p"
                style={{ fontSize: "14px" }}
              >
                Đất rừng phương Nam (tựa tiếng Anh: Song of the South) là một bộ
                phim điện ảnh Việt Nam thuộc thể loại sử thi – tâm lý – chính
                kịch ra mắt vào năm 2023, được dựa trên cuốn tiểu thuyết cùng
                tên của nhà văn Đoàn Giỏi
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
