import { Box, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import IconNext from "../../Common/Icons/IconNext";
import IconPrev from "../../Common/Icons/IconPrev";
import { Link } from "react-router-dom";
import logoWeb from "../../../Assets/Images/logo.png";
import imgBgHeader from "../../../Assets/Images/bgheaderhomepage.png";
import imgCarousel from "../../../Assets/Images/pngguru.png";
import { navItems } from "../../../Assets/Constant/Common/dataStatic";
import {
  AppBarStyle,
  ButtonLoginStyle,
  CarouselStyle,
  FormHeaderStyle,
  HeaderStyle,
  TextFieldStyle,
} from "../../../Assets/CSS/Style/style.const";
import { colorWhite } from "../../../Assets/CSS/Style/theme";
import { LOGIN } from "../../../Assets/Constant/Common/constLogin";

const Header = () => {
  return (
    <>
      <HeaderStyle className="header">
        <img src={imgBgHeader} alt="" />
        <div className="header-overlay"></div>
        <div
          style={{
            position: "absolute",
            zIndex: "22",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80%",
            width: "100%",
          }}>
          <CarouselStyle
            autoPlay={false}
            infiniteLoop="true"
            swipeable
            showThumbs={false}
            showArrows={true}
            showIndicators={false}
            renderArrowNext={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0",
                    top: "0",
                    zIndex: "22",
                    color: "white",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={clickHandler}>
                  <IconNext />
                </div>
              );
            }}
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: "22",
                    color: "white",
                  }}
                  onClick={clickHandler}>
                  <IconPrev />
                </div>
              );
            }}>
            {Array(3)
              .fill(0)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "50px",
                      padding: "0 50px",
                    }}>
                    <div
                      key={index}
                      style={{
                        overflow: "hidden",
                        borderRadius: "30px",
                        maxWidth: "600px",
                        width: "100%",
                      }}>
                      <img alt="" src={imgCarousel} />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}>
                      <div style={{}}>
                        <h3
                          style={{
                            fontSize: "40px",
                            fontWeight: 700,
                            color: "white",
                            textAlign: "start",
                          }}>
                          SBS MTV The Kpop Show Ticket Package
                        </h3>
                        <p
                          style={{
                            fontSize: "18px",
                            color: "white",
                            textAlign: "start",
                          }}>
                          Look no further! Our SBS The Show tickets are the
                          simplest way for you to experience a live Kpop
                          recording.
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "30px",
                        }}>
                        <Button
                          style={{
                            background: "#F5167E",
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                          }}>
                          Get Tiket
                        </Button>
                        <Button
                          style={{
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                            border: "1.5px solid white",
                          }}>
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </CarouselStyle>
        </div>
        <FormHeaderStyle>
          <Grid container spacing={2}>
            <Grid item xs={4} style={{}}>
              <TextFieldStyle
                id="filled-helperText"
                label="Search Event"
                defaultValue="Konser Jazz"
                variant="filled"
                size="medium"
              />
            </Grid>
            <Grid item xs={4} style={{}}>
              <TextFieldStyle
                id="filled-helperText"
                label="Place"
                defaultValue="Indonesia"
                variant="filled"
                size="medium"
              />
            </Grid>
            <Grid item xs={4} style={{}}>
              <TextFieldStyle
                id="filled-helperText"
                label="Time"
                defaultValue="Time"
                variant="filled"
                size="medium"
              />
            </Grid>
          </Grid>
        </FormHeaderStyle>
      </HeaderStyle>
      <AppBarStyle component="nav">
        <Toolbar>
          <div style={{ height: "40px" }}>
            <img src={logoWeb} height={40} alt="logo web" />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: "40px",
                alignItems: "center",
              },
            }}>
            <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
              {navItems.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  style={{ color: `${colorWhite}`, fontWeight: "500" }}>
                  {item.title}
                </Link>
              ))}
            </Box>
            <ButtonLoginStyle to={"/login"}>{LOGIN}</ButtonLoginStyle>
          </Box>
        </Toolbar>
      </AppBarStyle>
    </>
  );
};

export default Header;
