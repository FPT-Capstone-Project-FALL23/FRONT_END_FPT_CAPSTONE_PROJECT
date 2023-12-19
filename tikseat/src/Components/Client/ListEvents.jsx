import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
const ListEvents = ({ idEvent }) => {
  const navigate = useNavigate();
  const [dataEvents, setDataEvents] = useState("");
  useEffect(() => {
    async function getAllEvents() {
      const resEventData = await ApiClient.getAllEvents();
      const filterEvent = await resEventData?.events?.filter((event) => {
        return event._id !== idEvent;
      });
      setDataEvents(filterEvent);
    }
    getAllEvents();
  }, [idEvent]);
  return (
    <Grid item xs={12}>
      <Typography component={"div"} variant="h3">
        Other events
      </Typography>
      <Carousel
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container-with-dots"
        focusOnSelect={false}
        infinite
        keyBoardControl
        pauseOnHover
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
          },
        }}
        rewind={false}
        shouldResetAutoplay
        showDots={false}
        slidesToSlide={1}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        partialVisible={false}>
        {dataEvents?.length > 0 &&
          dataEvents.map((event) => {
            return (
              <Card
                onClick={() => {
                  navigate(`/book-tickets/${event?._id}`);
                }}
                key={event._id}
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  margin: "10px",
                }}>
                <CardMedia
                  component="img"
                  sx={{
                    // width: 300,
                    height: "250px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    objectFit: "fill",
                  }}
                  image={
                    event.eventImage ||
                    "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                  }
                  alt="Live from space album cover"
                />
                <Stack direction={"column"} style={{ padding: "20px" }}>
                  <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: 0 }}>
                    <Box
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        gap: "5px",
                      }}>
                      {event?.type_of_event?.map((item, index) => (
                        <Chip label={item} key={index} />
                      ))}
                    </Box>
                    <Typography component="div" variant="h6">
                      {event.event_name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="gray"
                      component="div">
                      {event.event_location.city}
                    </Typography>
                  </CardContent>
                </Stack>
              </Card>
            );
          })}
      </Carousel>
      <div style={{ height: "200px" }}></div>
    </Grid>
  );
};

export default React.memo(ListEvents);
