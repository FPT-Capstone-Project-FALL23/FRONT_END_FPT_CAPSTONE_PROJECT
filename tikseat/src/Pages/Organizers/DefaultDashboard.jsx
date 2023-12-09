import React, { useEffect, useState } from "react";
import TotalRevenue from "../../Components/Organizers/AllDetailChart/TotalRevenue";
import DayChart from "../../Components/Organizers/AllDetailChart/DayChart";
import BasicArea from "../../Components/Organizers/AllDetailChart/BasicArea";
import { Grid, Typography } from "@mui/material";

import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import ApiEvent from "../../API/Event/ApiEvent";
import CheckinChart from "../../Components/Organizers/AllDetailChart/CheckinChart";

function DefaultDashboard() {
  const dataInfo = getLocalStorageUserInfo();
  const [allDataEvent, setAllDataEvent] = useState({
    totalMoney: null,
    totalRevenue: null,
    percent: null,
    totalChairs: null,
    totalSoldChairs: null,
    totalCheckedInChairs: null,
  });

  useEffect(() => {
    const dataTotalEvent = async () => {
      try {
        const response = await ApiEvent.getTotalAllEvent({
          _idOrganizer: dataInfo._id,
        });
        if (response.status === true) {
          const allEvent = {
            ...allDataEvent,
            totalMoney: response.totalMoney,
            totalRevenue: response.totalRevenue,
            percent: response.percent,
            totalChairs: response.totalChairs,
            totalSoldChairs: response.totalSoldChairs,
            totalCheckedInChairs: response.totalCheckedInChairs,
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
  }, [dataInfo._id]);

  return (
    <>
      <Grid
        style={{
          padding: "10px",
        }}
      >
        <Grid>
          <TotalRevenue dataAllEventDetail={allDataEvent} />
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
              <BasicArea />
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
                backgroundColor:"#fff",
                padding:"10px",
                borderRadius: "5px",
                width: "100%",
                marginBottom: "17px",
              }}
            >
              <DayChart dataAllEventDetail={allDataEvent} />
            </Grid>
            <Grid
              style={{
                backgroundColor:"#fff",
                padding:"10px",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              <CheckinChart dataAllEventDetail={allDataEvent} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DefaultDashboard;
