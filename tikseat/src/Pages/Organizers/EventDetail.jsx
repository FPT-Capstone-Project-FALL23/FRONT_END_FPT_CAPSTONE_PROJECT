import React, { useEffect, useState } from "react";
import TotalRevenueEvent from "../../Components/Organizers/EventChart/TotalRevenueEvent";
import DayChartEvent from "../../Components/Organizers/EventChart/DayChart";
import BasicAreaEvent from "../../Components/Organizers/EventChart/BasicArea";
import { Grid, Typography } from "@mui/material";
import ApiEvent from "../../API/Event/ApiEvent";
import CheckinOneChart from "../../Components/Organizers/EventChart/CheckinOneChart";
import { getLocalStorageUserInfo } from "../../Store/userStore";

function EventDetail({ eventDetail }) {
  const idEvent = eventDetail._idEvent;
  console.log(eventDetail);
  console.log(idEvent);
  const dateEvent = eventDetail.startDay;
  const formattedDate = new Date(dateEvent).toLocaleString();

  const [allDataEvent, setAllDataEvent] = useState({
    totalMoney: null,
    totalRevenue: null,
    percent: null,
    totalChairs: null,
    totalSoldChairs: null,
    totalCheckedInChairs: null,
  });

  const [dataStatisticalEvent, setDataStatisticalEvent] = useState({
    dates: [],
    totalAmounts: [],
  });
  console.log(dataStatisticalEvent);

  useEffect(() => {
    const dataTotalEvent = async () => {
      try {
        const response = await ApiEvent.getTotalOneEvent({
          _idEvent: idEvent,
          _idOrganizer: getLocalStorageUserInfo()._id,
        });
        console.log("data", response);
        if (response.status === true) {
          const allEvent = {
            ...allDataEvent,
            totalMoney: response.totalMoney,
            totalRevenue: response.totalRevenue,
            percent: response.percent,
            totalChairs: response.totalChairs,
            totalSoldChairs: response.totalSoldChairs,
            totalCheckedInChairs: response.totalCheckedInChairs,
            totalRefundAmount: response.totalRefundAmount,
            totalEventAmount: response.totalEventAmount,
          };
          setAllDataEvent(allEvent);
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataTotalEvent();
  }, []);

  useEffect(() => {
    const getStatisticalEvent = async () => {
      try {
        const response = await ApiEvent.getStatistiaclEvent({
          _idEvent: idEvent,
        });
        if (response.status === true) {
          console.log(response.data);
          const dates = response?.data?.map((item) => item.date) || [];
          const totalAmounts =
            response?.data?.map((item) => item.totalAmount) || [];
          const indexes = dates?.map((item, index) => index + 1);
          const dataEvent = {
            ...dataStatisticalEvent,
            dates: indexes,
            totalAmounts: totalAmounts,
          };
          setDataStatisticalEvent(dataEvent);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStatisticalEvent();
  }, []);

  return (
    <>
      <Grid sx={{ border: "1px solid #ccc", borderRadius: "5px" }}>
        <Grid
          style={{
            backgroundColor: "#ccc",
            padding: "20px",
            borderRadius: "5px 5px 0px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            <span style={{ color: "yellow" }}>{eventDetail.eventName}</span>{" "}
            event
          </Typography>
          <Typography variant="h5">
            <span style={{ color: "black" }}>{formattedDate}</span>
          </Typography>
        </Grid>
        <Grid
          style={{
            borderRadius: "0px 0px 5px 5px",
            padding: "30px",
          }}
        >
          <Grid>
            <TotalRevenueEvent eventTotalDetail={allDataEvent} />
          </Grid>
          <Grid
            style={{
              display: "flex",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <Grid
              style={{
                height: "450px",
                width: "55%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  width: "100%",
                  padding: "20px",
                }}
              >
                {dataStatisticalEvent.dates.length > 0 && (
              <BasicAreaEvent statisticalEvent={dataStatisticalEvent} />
            )}
              </Grid>
            </Grid>

            <Grid
              style={{
                height: "450px",
                display: "flex",
                flexDirection: "column",
                width: "44%",
              }}
            >
              <Grid
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  marginBottom: "17px",
                }}
              >
                <DayChartEvent detailOneEvent={allDataEvent} />
              </Grid>
              <Grid
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <CheckinOneChart detailOneEvent={allDataEvent} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EventDetail;
