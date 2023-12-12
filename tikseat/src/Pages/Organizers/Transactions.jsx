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
      <Grid>
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
      </Grid>
    </>
  );
}

export default Transactions;
