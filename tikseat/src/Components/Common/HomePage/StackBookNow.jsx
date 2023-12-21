import { Button, Stack, Typography } from "@mui/material";
import React from "react";

function StackBookNow({ itemEvent, setShowEvent }) {
  const hour = new Date(itemEvent.date).getHours();
  const minute = new Date(itemEvent.date).getMinutes();
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={{
        padding: "10px",
        border: "2px solid orange",
        borderRadius: "10px",
        color: "#d70b0b",
      }}
    >
      <div>
        <Typography variant="h6" fontSize={"16px"}>
          Event date: {new Date(itemEvent.date).toLocaleDateString()}
        </Typography>
        <Typography variant="h6" fontSize={"16px"}>
          Time: {formattedTime}
        </Typography>
      </div>
      <Button
        onClick={() => setShowEvent(() => itemEvent._id)}
        variant="outlined"
        color="error"
      >
        Book now
      </Button>
    </Stack>
  );
}

export default StackBookNow;
