import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import ClientAvt from "../../Assets/Images/Client.png";
import OrganizersAvt from "../../Assets/Images/Organizers.png";
import { ToastContainer, toast } from "react-toastify";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import InputCustom from "../../Components/Common/Input/InputCustom";
import { setLocalStorageToken } from "../../Store/authStore";
import { setLocalStorageUserData } from "../../Store/userStore";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import { ROLE } from "../../Assets/Constant/Common/constCommon";

import ApiCommon from "../../API/Common/ApiCommon";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChooseAccess = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  console.log(role);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayCode, setDisplayCode] = useState("none");
  const [callAPI, setCallAPI] = useState("verifyEmail");

  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setRole(role);
  };

  const handleResetSelection = () => {
    setSelectedRole(null);
  };

  const navigateAfterConfirmPassword = (roleUser) => {
    if (roleUser === ROLE[0]) {
      navigate("/login");
    } else {
      navigate("/createProfileOrganizers");
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      await ApiCommon.resendOTP({
        email: email,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();

    if (callAPI === "verifyEmail") {
      // Step 1: Verify Email
      try {
        const response = await ApiCommon.verifyEmail({
          email: email,
        });

        if (response.status === true) {
          setCallAPI("verifyCode");
          setDisplayCode("block");
        } else {
          console.log("Invalid email or other error!");
        }
      } catch (error) {
        console.log("error: ", error);
        const err = error.response.data.message;
        toast.error(err, toastOptions);
      }
    } else {
      // Step 2: Verify Code
      try {
        const response = await ApiCommon.verifyCode({
          email: email,
          enteredOTP: verifyCode,
        });

        if (response.status === true) {
          setCallAPI("setPassword");
          console.log("bbbb");
          try {
            const response = await ApiCommon.registerUser({
              email: email,
              password: newPassword,
              role: role,
            });

            if (response.status === true) {
              const roleUser = response.data.role;
              const token = response.token;
              const userData = response.data;
              navigateAfterConfirmPassword(roleUser);
              setLocalStorageToken(token);
              setLocalStorageUserData(userData);
            } else {
              console.log("Error setting password!");
            }
          } catch (error) {
            console.log("error: ", error);
            const err = error.response.data.message;
            toast.error(err, toastOptions);
          }
        } else {
          console.log("Invalid code or other error!");
        }
      } catch (error) {
        console.log("Error verifying code: ", error);
        // Handle error
      }
    }
  };

  return (
    <>
      <FormSubmit onSubmit={handleSumit}>
        <Grid
          sx={{
            display: "flex",
            marginTop: "50px",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <Grid sx={{ width: "45%" }}>
            <Link
              to={"/login"}
              style={{
                marginTop: "20px",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
              }}
            >
              <KeyboardArrowLeftIcon /> <span>Back to login</span>
            </Link>
            <Typography
              variant="h4"
              component={"h5"}
              style={{ marginTop: "20px", fontStyle: "italic" }}
            >
              Choose Access
            </Typography>
            <p style={{ color: "#112211", marginTop: "20px" }}>
              To access tiksea, it is necessary to select the type of access
              permission
            </p>
            <Stack
              justifyContent={"space-evenly"}
              alignItems={"center"}
              direction={"row"}
              style={{ marginTop: "100px" }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {selectedRole !== "organizer" && (
                    <Box
                      style={{
                        width: "150px",
                        height: "175px",
                        boxShadow: "rgb(245 210 23 / 68%) 0px 1px 15px 15px",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        onClick={() => handleRoleSelection("client")}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "-6px",
                          color: "black",
                        }}
                        fullWidth
                      >
                        <img
                          style={{
                            height: "150px",
                            width: "150px",
                            borderRadius: "20px 20px 0px 0px",
                          }}
                          src={ClientAvt}
                          alt=""
                        />
                        <span>Client</span>
                      </Button>
                    </Box>
                  )}
                  {selectedRole !== "client" && (
                    <Box
                      style={{
                        width: "150px",
                        height: "175px",
                        boxShadow: "rgb(245 210 23 / 68%) 0px 1px 15px 15px",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        onClick={() => handleRoleSelection("organizer")}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "-6px",
                          color: "black",
                        }}
                        fullWidth
                      >
                        <img
                          style={{
                            height: "150px",
                            width: "150px",
                            borderRadius: "20px 20px 0px 0px",
                          }}
                          src={OrganizersAvt}
                          alt=""
                        />
                        <span>Organizers</span>
                      </Button>
                    </Box>
                  )}
                </Grid>
                <Grid sx={{ marginTop: "40px" }}>
                  {selectedRole && (
                    <Button
                      style={{
                        padding: "10px",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "15px",
                        backgroundColor:"#f5bd19"
                      }}
                      onClick={handleResetSelection}
                    >
                      Reset Choose ROLE
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "30px",
            }}
          >
            <Grid sx={{ marginBottom: "30px", color:"black" }}>
              <h2>User Account</h2>
            </Grid>
            <Grid style={{ marginBottom: "30px" }}>
              <InputCustom type="email" setValue={setEmail} label="Email" />
            </Grid>

            <InputCustom
              type="password"
              setValue={setNewPassword}
              label="New Password"
            />
            <InputCustom
              type="password"
              setValue={setConfirmPassword}
              label=" Re-enter Password"
            />

            <Grid sx={{ display: displayCode }}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                onChange={(e) => setVerifyCode(e.target.value)}
                // setValue={setVerifyCode}
                value={verifyCode === undefined ? "" : verifyCode}
                label="Enter Code"
              />
              <IconButton
                sx={{
                  float: "right",
                  marginTop: "-48px",
                  marginRight: "2px",
                }}
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <Stack
                spacing={1}
                alignItems={"center"}
                direction={"row"}
                style={{
                  fontSize: "18px",
                  margin: "20px",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Link
                  component="button"
                  onClick={handleResendOTP}
                  style={{
                    color: "#F5BD19",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  RESEND
                </Link>
              </Stack>
            </Grid>
            <Grid className="btnLogin">
              <Button
                style={{
                  padding: "10px",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
                type="submit"
                fullWidth
              >
                {callAPI}
              </Button>
            </Grid>
            <ToastContainer />
          </Grid>
        </Grid>
      </FormSubmit>
    </>
  );
};

export default ChooseAccess;
