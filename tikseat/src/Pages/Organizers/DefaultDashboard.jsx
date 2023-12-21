import React, { useEffect, useState } from "react";
import TotalRevenue from "../../Components/Organizers/AllDetailChart/TotalRevenue";
import DayChart from "../../Components/Organizers/AllDetailChart/DayChart";
import BasicArea from "../../Components/Organizers/AllDetailChart/BasicArea";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import ApiEvent from "../../API/Event/ApiEvent";
import CheckinChart from "../../Components/Organizers/AllDetailChart/CheckinChart";
import Footer from "../../Components/Common/Footer/Footer";

function DefaultDashboard() {
  const dataInfo = getLocalStorageUserInfo();
  const organizers_id = dataInfo._id;
  const [dataTopEvent, setDataTopEvent] = useState([]);

  const [dataStatisticalAllEvent, setDataStatisticalAllEvent] = useState({
    months: [],
    totalAmounts: [],
  });

  const [yearChart, setYearChart] = useState(2023);
  const [noChart, setNoChart] = useState("");

  const [allDataEvent, setAllDataEvent] = useState({
    totalMoney: null,
    totalRevenue: null,
    percent: null,
    totalChairs: null,
    totalSoldChairs: null,
    totalCheckedInChairs: null,
  });

  const handleChangeYear = (event) => {
    setYearChart(event.target.value);
  };

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

  useEffect(() => {
    const getStatisticalAllEvent = async () => {
      try {
        const response = await ApiEvent.getStatistiaclAllEvent({
          _idOrganizer: dataInfo._id,
          year: yearChart,
        });
        if (response.status === true) {
          setNoChart("");
          const months = response?.data?.map((item) => item.month) || [];
          const totalAmounts =
            response?.data?.map((item) => item.totalAmount) || [];
          const indexes = months?.map((item, index) => index + 1);
          const dataEvent = {
            ...dataStatisticalAllEvent,
            months: indexes,
            totalAmounts: totalAmounts,
          };
          setDataStatisticalAllEvent(dataEvent);
        } else {
          console.log("error");
        }
      } catch (error) {
        setNoChart(error.response.data.message);
        console.log(error);
      }
    };
    getStatisticalAllEvent();
  }, [yearChart]);

  useEffect(() => {
    const dataTopEvent = async () => {
      try {
        const response = await ApiEvent.getTop5Event({
          organizers_id: organizers_id,
        });
        if (response.status === true) {
          console.log(response.data);
          setDataTopEvent(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    dataTopEvent();
  }, []);

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
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              width: "49.5%",
            }}
          >
            <DayChart dataAllEventDetail={allDataEvent} />
          </Grid>
          <Grid
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              width: "49.5%",
            }}
          >
            <CheckinChart dataAllEventDetail={allDataEvent} />
          </Grid>
        </Grid>

        <Grid
          style={{
            height: "500px",
            display: "flex",
            margin: "30px 0px 20px 0px",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              width: "55%",
              padding: "20px",
            }}
          >
            <Box sx={{ maxWidth: 120, marginLeft:"80%", marginBottom:"-5%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearChart}
                  label="Year"
                  onChange={handleChangeYear}
                >
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {noChart !== "" && (
              <p style={{color:"red"}}>{noChart}</p>
            )}
            {dataStatisticalAllEvent.months.length > 0 && (
              <BasicArea dataChart={dataStatisticalAllEvent} />
            )}
          </Grid>

          <Grid
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "44%",
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Grid sx={{ marginBottom: "15px" }}>
              <Typography variant="h5" fontWeight={600}>
                Top 5 Events
              </Typography>
            </Grid>
            <Grid
              sx={{
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {dataTopEvent &&
                dataTopEvent.map((item) => (
                  <Grid
                    sx={{
                      width: "100%",
                      height: "19%",
                      backgroundColor: "#ffea63a6",
                      borderRadius: "5px",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Grid sx={{ width: "40%" }}>{item.event_name}</Grid>

                    <Grid sx={{ width: "27%" }}>
                      <Rating
                        value={item.totalRating}
                        precision={0.5}
                        readOnly
                      />
                    </Grid>
                    <Grid
                      sx={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      {item.totalTicketAmountReceived.toLocaleString()}
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DefaultDashboard;
