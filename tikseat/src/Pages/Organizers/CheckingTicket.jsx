import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import "../../Assets/CSS/Organizer/Checkin.css";

function CheckingTicket() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  console.log(scanResultWebCam);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <Grid
      maxWidth="100%"
      sx={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "30px" }}
    >
      <h2>Generate Download & Scan QR Code </h2>
      <Grid className="body-QR">
        <Grid className="generate">
          <TextField
            fullWidth
            label="Enter Text Here"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            sx={{ marginTop: "20px", width: "50%" }}
            variant="contained"
            color="primary"
            onClick={() => generateQrCode()}
          >
            Generate
          </Button>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUrl ? (
              <a href={imageUrl} download>
                <img
                  style={{ height: "300px", width: "300px" }}
                  src={imageUrl}
                  alt="img"
                />
              </a>
            ) : null}
          </Grid>
        </Grid>

        <Grid className="scanner">
          <Grid>
            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
              delay={5}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Đổi thẻ Grid thành toast có button Oke để checkin */}
      <Grid sx={{ marginTop: "30px" }}>
        <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
      </Grid>
    </Grid>
  );
}

export default CheckingTicket;
