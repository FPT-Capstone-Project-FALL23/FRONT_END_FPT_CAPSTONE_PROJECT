import React from "react";
import { Box, Drawer, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TableTransaction from "../../Components/Organizers/TableTransaction/TableTransaction";



const styles = {
  typography: {
    fontFamily: "Georgia, serif",
    fontSize: "24px",
    fontWeight: "bold",
    // Add any other desired styles here
  },
};
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

function Transactions() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    
      {/* <Grid>
        <Grid style={{ marginBottom: "10px" }} item xs={12}>
          <Typography variant="h4" style={styles.typography}>
            Transaction
          </Typography>
        </Grid>
        <Drawer />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ width: "100%" }}>
              <AntTabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example">
                <AntTab value="1" label="History" />
                <AntTab value="2" label="Request" />
              </AntTabs>
            </Box>
            <TabPanel value="1">
              <TableTransaction />
            </TabPanel>
            <TabPanel value="2">Request</TabPanel>
          </TabContext>
        </Box>
      </Grid> */}
      {/* <div style={{ display: 'flex' }}> */}
       <div>
        <b style={{ position: "relative", letterSpacing: "-1px" }}>Overview</b>

        {/* <div style={{display: 'flex'}}> */}

  <div style={{
    flex: 1, 
    borderRadius: '14px',
    backgroundColor: '#4745a4',
    padding: '20px',
  }}>
    <div
          style={{
            alignSelf: "stretch",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "18px",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              flex: "1",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "18px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                flex: "1",
                borderRadius: "14px",
                backgroundColor: "#4745a4",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "20px",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "9px",
                  }}
                >
                  
                    
                  </div>
                  <div
                    style={{
                      flexShrink: "0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "9px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        lineHeight: "24px",
                        fontWeight: "600",
                      }}
                    >
                      Your Balance
                    </div>
                    <div
                      style={{
                        flexShrink: "0",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "4px",
                        fontSize: "12px",
                      }}
                    >
                     
                     
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    position: "relative",
                    borderTop: "1px solid #fff",
                    boxSizing: "border-box",
                    height: "1px",
                    opacity: "0.2",
                  }}
                />
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "28px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      letterSpacing: "-2px",
                      fontWeight: "600",
                    }}
                  >
                    $ 28,891.138
                  </div>
                  
                </div>
              </div>
            </div>
            </div>       
      </div>
      
  </div>
  <br></br>
  <Grid container spacing={2}>
  <Grid item xs={6}>
  <div style={{
     
    fontSize: '20px',
    borderRadius: '14px',
    backgroundColor: '#4745a4',
    textAlign: 'right',
    width: '450px',
    padding: '37px',
  }}>
    <div
              style={{
                alignSelf: "stretch",
                flex: "1",
                borderRadius: "14px",
                backgroundColor: "#fff",
                border: "1px solid rgba(222, 222, 222, 0.7)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "20px",
                color: "#0d163a",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "9px",
                  }}
                >
                  
                    
                  
                  <div
                    style={{
                      flexShrink: "0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "9px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        lineHeight: "24px",
                        fontWeight: "600",
                      }}
                    >
                      Transactions
                    </div>
                    <div
                      style={{
                        flexShrink: "0",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "4px",
                        fontSize: "12px",
                      }}
                    >
                      
                      
                      <div style={{ position: "relative", opacity: "1", fontSize: "2em" }}>
                        10 
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
                </div>
      </Grid>
      
  
  
  <br></br>
  <Grid item xs={6}>
  <div style={{
    width: '450px',
    borderRadius: '30px',  
    textAlign: 'left',
    fontSize: '19px',
    color: '#fff',
  }}>
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "184px",
        textAlign: "left",
        fontSize: "14px",
        color: "#fff",
        fontFamily: "'Cera Pro'",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "0%",
          right: "0%",
          bottom: "0%",
          left: "0%",
          borderRadius: "30px",
          background: "black",
        }}
      />
      
      <div
        style={{
          position: "absolute",
          width: "13.65%",
          top: "calc(50% + 54px)",
          left: "76.83%",
          letterSpacing: "0.5px",
          fontWeight: "500",
          textAlign: "right",
          display: "inline-block",
          height: "13px",
        }}
      >
        
        09/25
      </div>
      <div
        style={{
          position: "absolute",
          width: "52.38%",
          top: "calc(50% + 54px)",
          left: "9.52%",
          letterSpacing: "0.5px",
          fontWeight: "500",
          display: "inline-block",
          height: "13px",
          opacity: "0.9",
        }}
      >
        5282 3456 7890 1289
      </div>
      <img
        style={{
          position: "absolute",
          height: "19.52%",
          width: "14.29%",
          top: "13.59%",
          right: "9.52%",
          bottom: "66.89%",
          left: "76.19%",
          maxWidth: "100%",
          overflow: "hidden",
          maxHeight: "100%",
          objectFit: "cover",
        }}
        alt=""
        src="https://xlink.vn/dlmvt0ep"
      />
      <div
        style={{
          position: "absolute",
          width: "46.03%",
          top: "calc(50% - 40px)",
          left: "9.52%",
          fontSize: "28px",
          fontWeight: "500",
          display: "inline-block",
          height: "26px",
        }}
      >
        $5,750,20
      </div>
      <div
        style={{
          position: "absolute",
          width: "40%",
          top: "calc(50% - 62px)",
          left: "9.52%",
          fontWeight: "500",
          display: "inline-block",
          height: "13px",
          opacity: "0.54",
        }}
      >
        Current Balance
      </div>
    </div>
  </div>  
      </Grid>
  
      </Grid>
      
      
    </>
  );
}

export default Transactions;
