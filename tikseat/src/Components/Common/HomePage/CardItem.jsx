import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { colorPalatinateBlue } from "../../../Assets/CSS/Style/theme";
import { useNavigate } from "react-router-dom";

const CardItem = ({ dataEventItem }) => {
  console.log("dataEventItem: ", dataEventItem);
  const now = new Date();
  let statusEvent = null;
  const navigate = useNavigate();
  const currentTimestamp = Math.floor(now.getTime());

  const serverTimestamp = new Date(dataEventItem?.event_date[0].date).getTime();
  console.log("serverTimestamp: ", serverTimestamp);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formattedDate2 = new Date(
    dataEventItem?.event_date[0].date
  ).toLocaleDateString(undefined, options);

  const HourEvent = new Date(dataEventItem?.event_date[0].date);

  const hour = HourEvent.getHours();
  const minute = HourEvent.getMinutes();

  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  if (serverTimestamp <= currentTimestamp) {
    statusEvent = "Happening";
  } else {
    statusEvent = "Up Comming";
  }
  return (
    <Card
      style={{ borderRadius: "20px", overflow: "hidden" }}
      onClick={() => {
        navigate(`/book-tickets/${dataEventItem?._id}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: "300px", objectFit: "fill" }}
          image={
            dataEventItem.eventImage ||
            "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
          }
          alt="green iguana"
        />
        <CardContent>
          <Box display={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                  {formattedTime}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formattedDate2}
                </span>
              </div>
            </div>
            <Box width={"100%"}>
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "gray",
                  }}
                  component="h5"
                >
                  {dataEventItem.event_location.city}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  component="p"
                >
                  {dataEventItem.event_name}
                </Typography>
              </div>
              <Typography
                gutterBottom
                component="p"
                style={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "200px",
                }}
              >
                {dataEventItem.event_description}
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
              >
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
                <Typography>{dataEventItem.type_of_event}</Typography>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
