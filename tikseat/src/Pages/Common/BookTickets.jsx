import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import IconStar from "../../Components/Common/Icons/IconStar";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import IconCircle from "../../Components/Common/Icons/IconCircle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // pt: 2,
  // px: 4,
  // pb: 3,
};

const DataStage = [
  {
    type: "normal",
    chair_name: "A12",
    id: 1,
    price: 50000,
  },
  {
    type: "normal",
    chair_name: "A13",
    id: 2,
    price: 50000,
  },
  {
    type: "pair",
    chair_name: "A14",
    id: 3,
    price: 50000,
  },
  {
    type: "pair",
    chair_name: "H12",
    id: 4,
    price: 50000,
  },
  {
    type: "pair",
    chair_name: "A14",
    id: 5,
    price: 50000,
  },
  {
    type: "pair",
    chair_name: "H12",
    id: 6,
    price: 50000,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
  },
};
const images = [
  {
    day: "20",
    weekdays: "Thứ 6",
  },
  {
    day: "21",
    weekdays: "Thứ 7",
  },
  {
    day: "22",
    weekdays: "Chủ nhật",
  },
  {
    day: "23",
    weekdays: "Thứ 2",
  },
  {
    day: "24",
    weekdays: "Thứ 3",
  },
  {
    day: "25",
    weekdays: "Thứ 4",
  },
  {
    day: "26",
    weekdays: "Thứ 5",
  },
  {
    day: "27",
    weekdays: "Thứ 6",
  },
  {
    day: "28",
    weekdays: "Thứ 7",
  },
  {
    day: "29",
    weekdays: "Chủ nhật",
  },
  {
    day: "30",
    weekdays: "Thứ 2",
  },
  {
    day: "28",
    weekdays: "Thứ 7",
  },
  {
    day: "29",
    weekdays: "Chủ nhật",
  },
  {
    day: "30",
    weekdays: "Thứ 2",
  },
];
const BookTickets = () => {
  const [age, setAge] = useState("");
  const [selectChair, setSelectChair] = useState([]);
  console.log("selectChair: ", selectChair);
  const [checkDay, setCheckDay] = useState(1);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          background: "white",
          position: "relative",
          padding: "0 150px",
        }}
        component="nav"
      >
        <Toolbar>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <div>tes</div>
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: "100%",
          position: "relative",
          background:
            "url(https://i.ytimg.com/vi/d-ck5QxqgMg/maxresdefault.jpg) no-repeat center ",
          height: "550px",
          backgroundSize: "cover",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "rgb(0 0 0 / 84%)",
            position: "absolute",
          }}
        ></div>
        <Stack
          direction={"row"}
          gap={"40px"}
          style={{
            margin: "0 auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}
        >
          <div style={{ width: "400px" }}>
            <img
              alt=""
              loading="lazy"
              src="https://media.vov.vn/sites/default/files/styles/large/public/2023-09/official_poster.jpg"
            ></img>
          </div>
          <Stack
            direction={"column"}
            flex={1}
            padding={"20px 0"}
            color={"white"}
          >
            <Chip
              color="primary"
              style={{
                fontWeight: "700",
                width: "max-content",
                borderRadius: "10px",
              }}
              label="K"
            />
            <Typography variant="h3" marginTop={"20px"}>
              đất rừng phương nam
            </Typography>
            <Stack>
              <Typography color={"gray"}>
                song of the south - 2023 - 110 phút
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"10px"}
              marginTop={"10px"}
            >
              <span style={{ color: "yellow", width: "30px", display: "flex" }}>
                <IconStar />
              </span>
              <Typography style={{ fontWeight: "700" }} variant="h5">
                8.3
              </Typography>
              <Stack>
                <Typography fontSize={"12px"} color={"gray"} variant="body2">
                  1.4k
                </Typography>
                <Typography fontSize={"12px"} color={"gray"} variant="body2">
                  Đánh giá
                </Typography>
              </Stack>
            </Stack>
            <Typography
              variant="body1"
              fontStyle={"italic"}
              color={"gray"}
              margin={"20px 0"}
            >
              Dựa theo tiểu thuyết cùng tên của nhà văn Đoàn Hải
            </Typography>
            <Stack gap={"20px"}>
              <Typography variant="h3">Nội dung</Typography>
              <Typography variant="body1" color={"gray"}>
                Đất rừng phương Nam (tựa tiếng Anh: Song of the South) là một bộ
                phim điện ảnh Việt Nam thuộc thể loại sử thi – tâm lý – chính
                kịch ra mắt vào năm 2023, được dựa trên cuốn tiểu thuyết cùng
                tên của nhà văn Đoàn Giỏi... Xem Theem
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={"20px"} marginTop={"30px"}>
              <Stack>
                <Typography color="gray">Ngày chiếu</Typography>
                <Typography fontWeight={"700"}>20/10/2023</Typography>
              </Stack>
              <Stack>
                <Typography color="gray">Thể loại</Typography>
                <Typography fontWeight={"700"}>
                  Chiến trang, kịch tính, gia đình
                </Typography>
              </Stack>
              <Stack>
                <Typography color="gray">Quốc Gia</Typography>
                <Typography fontWeight={"700"}>Viet Nam</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Grid
          style={{
            margin: "100px auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}
          container
          spacing={2}
        >
          <Grid item xs={8}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab label="About" value="1" />
                  <Tab label="Ticket infomation" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h4">About</Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    alignSelf={"center"}
                  >
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
                      {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={age || 10}
                        defaultValue={10}
                        // label="Thanh Pho"
                        onChange={handleChange}
                        // IconComponent={<LocationOnIcon />}
                      >
                        <MenuItem value={10}>Thanh pho HCM</MenuItem>
                        <MenuItem value={20}>THanh pho HN</MenuItem>
                        <MenuItem value={30}>Thanh Pho hai phong</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      startIcon={<MyLocationIcon />}
                      size="medium"
                      variant="outlined"
                      style={{ height: "max-content", padding: "15px 20px" }}
                    >
                      Gần bạn
                    </Button>
                  </Stack>
                </Stack>
                <Stack>
                  Phim "Đất rừng phương Nam" bán được 900.000 vé, bằng một nửa
                  "Bố già" (Trấn Thành) sau một tuần chiếu. Theo Box Office
                  Vietnam - đơn vị quan sát phòng vé độc lập, chiều 20/10, phim
                  đạt gần 76 tỷ đồng, dẫn đầu bảng xếp hạng phòng vé sau một
                  tuần công chiếu. Tốc độ bán vé này chỉ bằng một nửa Bố già -
                  phim từng gây sốt phòng vé do Trấn Thành đồng sản xuất và đóng
                  chính, ra mắt năm 2021 - trong cùng kỳ. Tỷ lệ lấp đầy phòng vé
                  của Đất rừng phương Nam đạt 15%, cũng bằng một nửa Bố già. Nhà
                  bà Nữ - tác phẩm ra rạp hồi Tết của Trấn Thành - hiện giữ kỷ
                  lục với hơn 200 tỷ đồng trong một tuần. Tuy nhiên, tác phẩm
                  này chiếu vào dịp Tết, thời điểm sức mua vé thường tăng cao so
                  với ngày thường. Trên hệ thống bán vé của các cụm rạp lớn như
                  CGV, Galaxy, Lotte, tác phẩm hiện được xếp số suất chiếu áp
                  đảo so với các phim ra mắt cùng thời điểm. Tại CGV Sư Vạn Hạnh
                  - một trong những rạp đông khán giả nhất TP HCM, Đất rừng
                  phương Nam được xếp 27 suất một ngày. Các phim ngoại như Vầng
                  trăng máu (Leonardo Dicaprio đóng chính), Bước chân thép -
                  phim Hàn về đường đua marathon, được
                  <Stack marginTop={"20px"}>
                    <Typography variant="h5">Content</Typography>
                    <Divider></Divider>
                    <Typography variant="body2" marginTop={"10px"}>
                      An là một cậu bé sinh sống ở đô thành của khu vực Nam Kỳ
                      Lục tỉnh cùng với mẹ của mình vào những năm 1920 – 1930.
                      Ba của An là Hai Thành, một người đi theo cách mạng với
                      mong muốn đánh đuổi Pháp rời khỏi Việt Nam. Khi danh tính
                      của Hai Thành bị bại lộ, mẹ của An đã dẫn cậu rời khỏi đô
                      thành duới sự chỉ dẫn của thầy giáo Bảy. Trên đường đi thì
                      một cuộc biểu tình của quần chúng nhân dân đã diễn ra khi
                      Võ Tòng – một thành viên của tổ chức Chính Nghĩa hội[a] –
                      bị bắt giữ. Tại đây, một vụ xô xát đã diễn ra giữa binh
                      lính Pháp và những người biểu tình, dẫn đến việc mẹ của An
                      vô tình đã bị lính Pháp bắn chết. Út Lục Lâm – một tên
                      trộm trong thời chiến đã vô tình thấy cảnh tượng này nên
                      hắn đã quyết định hỗ trợ An rời khỏi đó. Sau khi chôn cất
                      mẹ của mình, An đã bị ngất vì đói nhưng được Út Lục Lâm
                      cưu mang bằng số tiền mà hắn trộm được. Để sinh tồn, An
                      cũng đã phải học cách ăn trộm theo Út Lục Lâm. Trong một
                      dịp Tết Đoan ngọ, chính quyền bảo hộ Pháp dưới sự chỉ đạo
                      của tướng Durie đã quyết định xử tử Võ Tòng công khai
                      trước mặt quần chúng nhân dân nhằm răn đe về hành vi phản
                      loạn, chống lại chính quyền bảo hộ. Trong lúc chứng kiến
                      việc hành quyết, An đã bị say men cơm rượu và cậu vô tình
                      trở thành người khai màn cho việc cướp pháp trường và giải
                      cứu Võ Tòng, với sự xuất hiện ngay sau đó của tổ chức
                      Chính Nghĩa hội. Sau khi Võ Tòng được giải cứu, An và Út
                      Lục Lâm cũng bắt đầu mất liên lạc với nhau. An được cưu
                      mang bởi ông Tiều – một thầy thuốc người Hoa và cũng là
                      một thành viên của Chính Nghĩa hội, ngoài ra ông có một
                      đứa con tên là Xinh. Tại đây, An đã được ông Tiều huấn
                      luyện và trở thành một thành viên của Chính Nghĩa hội sau
                      lời thề. Trong một buổi ghé thăm chợ nổi trên sông, An có
                      dịp gặp gỡ với Cò, ông Ba "bắt rắn", bác Ba Phi, Tư Ù và
                      Tư Mắm – một người đang theo đuổi ông Tiều. Một gánh hát
                      cải lương với sự góp mặt của thầy giáo Bảy cũng đã đến khu
                      vực nhằm lan tỏa nghệ thuật về lòng yêu nước cho nhân dân.
                      Cả ba bạn An, Cò và Xinh cũng được mời tham gia diễn tuồng
                      trong dịp Tết Trung thu sắp diễn ra. Không lâu sau đó, một
                      thành viên của Chính Nghĩa hội bị bắt giữ. Nhiều nghĩa
                      quân của khu vực Nam Kỳ cùng lực lượng cách mạng đã có một
                      cuộc trao đổi nhằm giải thoát các tù nhân, nhưng giữa họ
                      lại nảy sinh nhiều mâu thuẫn. Trong lúc thi hành giải
                      thoát tù nhân, ông Tiều đã bị bọn lính Pháp bắt giữ. Trong
                      tù, ông Tiều đã phát hiện ra Tư Mắm là nhân tình của tướng
                      Durie và thực chất cô là gián điệp được cài vào nhằm tiếp
                      cận các tổ chức nghĩa quân cũng như lực lượng cách mạng.
                      Cùng lúc đó, Út Lục Lâm đang lẻn vào dinh thự của tướng
                      Durie để trộm thì phát hiện sự việc nên liền báo về cho
                      An. Khi bị bắt giữ, Xinh đã vô tình tiết lộ cho Tư Mắm
                      biết rằng ba của An chính là Hai Thành và cả hai sẽ gặp
                      nhau trong dịp Tết Trung thu ở gánh hát cải lương.
                    </Typography>
                  </Stack>
                  {/* <CarouselStyled
                    ssr
                    partialVisbile
                    itemClass="image-item"
                    responsive={responsive}
                  >
                    {images.map((item, index) => {
                      return (
                        <Stack key={index} padding={"10px"}>
                          <Stack
                            onClick={() => {
                              setCheckDay(index);
                            }}
                            alignItems={"center"}
                            style={{
                              cursor: "pointer",
                              borderRadius: "10px",
                              border: `1px solid ${
                                checkDay === index ? "#bbbb02" : "#ddd"
                              }`,
                              width: "max-content",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                background: `${
                                  checkDay === index ? "#bbbb02" : "#ddd"
                                }`,
                                color: `${
                                  checkDay === index ? "white" : "black"
                                }`,
                                fontWeight: "700",
                                padding: "10px 30px",
                              }}
                            >
                              {item.day}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                padding: "10px 0",
                                color: `${
                                  checkDay === index ? "#bbbb02" : "black"
                                }`,
                              }}
                            >
                              {item.weekdays}
                            </div>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </CarouselStyled> */}
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack>
                  {/* <Typography variant="h4">Choose time</Typography> */}
                  <Stack marginTop={"30px"} direction={"column"} gap={"20px"}>
                    {Array(14)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <Stack
                            direction={"column"}
                            style={{ cursor: "pointer" }}
                            onClick={handleOpen}
                          >
                            <Stack
                              key={index}
                              direction={"row"}
                              color={"gray"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              padding={"15px 0"}
                            >
                              <Typography variant="body2">
                                Day1 - Rvip (Day 1:5pm - 9:30pm 21.10.2023)
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={"700"}
                                color={"black"}
                              >
                                4,200,000 VND
                              </Typography>
                            </Stack>
                            <Divider />
                          </Stack>
                        );
                      })}
                  </Stack>
                  <ModalStyled open={open} onClose={handleClose}>
                    <Box sx={{ ...style, width: "70%" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          background: "#a9a90a",
                          display: "flex",
                          fontWeight: "bold",
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "10px",
                            color: "white",
                            zIndex: 2,
                            display: "flex",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={handleClose}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </div>
                        <span>By ticket</span>
                      </div>
                      <Stack
                        direction={"column"}
                        alignItems={"center"}
                        style={{ background: "black", padding: "20px" }}
                      >
                        <Stack
                          direction={"column"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <div
                            style={{
                              width: "400px",
                              height: "10px",
                              borderRadius: "30px",
                              background: "white",
                            }}
                          ></div>
                          <Typography
                            variant="body1"
                            color={"white"}
                            marginTop={"10px"}
                            fontWeight={"700"}
                          >
                            Stage
                          </Typography>
                        </Stack>
                        <Box
                          component={"div"}
                          height={"400px"}
                          style={{ overflow: "auto" }}
                        >
                          <Stack
                            direction={"row"}
                            gap={"10px"}
                            flexWrap={"wrap"}
                          >
                            {DataStage?.length > 0 &&
                              DataStage.map((item) => {
                                return (
                                  <div
                                    onClick={() => {
                                      setSelectChair([
                                        ...selectChair,
                                        item.chair_name,
                                      ]);
                                    }}
                                    key={item.id}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "5px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      color: "white",
                                      cursor: "pointer",
                                      backgroundColor: "#6908bd",
                                    }}
                                  >
                                    {item.chair_name}
                                  </div>
                                );
                              })}
                          </Stack>
                        </Box>
                        <Stack color={"white"} direction={"row"} gap={"40px"}>
                          <Stack gap={"10px"}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#46494c",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Đã đặt</span>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#d33209",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Ghế vip</span>
                            </Stack>
                          </Stack>
                          <Stack gap={"10px"}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#ff20cb",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                  border: "1px solid white",
                                }}
                              ></div>
                              <span>Ghế bạn chọn</span>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#ff20cb",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Ghế đôi</span>
                            </Stack>
                          </Stack>
                          <Stack gap={"10px"}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#6908bd",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Ghế thường</span>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#302d32",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                  border: "1px solid green",
                                }}
                              ></div>
                              <span>Vùng trung tâm</span>
                            </Stack>
                          </Stack>
                        </Stack>
                        <Typography
                          variant="body2"
                          color={"white"}
                          marginTop={"20px"}
                        >
                          Xem chi tiết hình ảnh và thông tin ghế
                        </Typography>
                      </Stack>
                      <Stack padding={"20px"}>
                        <Stack
                          direction={"row"}
                          gap={"20px"}
                          alignItems={"center"}
                        >
                          <Chip
                            color="primary"
                            style={{
                              fontWeight: "700",
                              width: "max-content",
                              borderRadius: "10px",
                            }}
                            label="K"
                          />
                          <Typography variant="h4">
                            Đất rừng phương nam
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          color={"#bfad17"}
                          margin={"10px 0"}
                        >
                          09:45 ~ 11:35 · T3, 24/10 · Phòng chiếu P5 · 2D Phụ đề
                        </Typography>
                        <Divider />
                        <Stack
                          direction={"row"}
                          padding={"15px 0"}
                          style={{ color: "gray" }}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Typography variant="body2">Chỗ ngồi</Typography>
                          {selectChair.length > 0 && (
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                              style={{
                                borderRadius: "10px",
                                border: "1px solid gray",
                                padding: "5px 10px",
                              }}
                            >
                              <div>
                                {selectChair?.length > 0 &&
                                  selectChair
                                    .map((item) => {
                                      return String(item);
                                    })
                                    .join(",")}
                              </div>
                              <span
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "red",
                                }}
                                onClick={() => setSelectChair([])}
                              >
                                <IconCircle />
                              </span>
                            </Stack>
                          )}
                        </Stack>
                        <Divider />
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          marginTop={"15px"}
                          alignItems={"center"}
                        >
                          <Stack>
                            <Typography variant="body2" color={"gray"}>
                              Tạm tính
                            </Typography>
                            <Typography variant="h6">{"0 đ"}</Typography>
                          </Stack>
                          <Button
                            type="button"
                            style={{
                              background: "#bfad17",
                              color: "white",
                              fontWeight: "bold",
                              padding: "10px 20px",
                            }}
                          >
                            By Ticket
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </ModalStyled>
                </Stack>
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={4}>
            <Typography component={"div"} variant="h3">
              Events
            </Typography>

            <Stack
              direction={"column"}
              gap={"20px"}
              style={{ marginTop: "30px" }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Card key={index} sx={{ display: "flex", gap: "20px" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 140, borderRadius: "10px" }}
                        image="https://cdn.nbtv.vn/upload/news/8_2022/2_13463624082022.jpg"
                        alt="Live from space album cover"
                      />
                      <Stack direction={"column"}>
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          style={{ padding: 0 }}
                        >
                          <Chip
                            label="18+"
                            style={{
                              borderRadius: "4px",
                              background: "red",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "12px",
                              padding: "5px 0",
                            }}
                          />
                          <Typography component="div" variant="h5">
                            Thanh Pho ngu gat
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="gray"
                            component="div"
                          >
                            Hình sự chính kịch
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            <span
                              style={{
                                color: "yellow",
                                width: "20px",
                                display: "flex",
                              }}
                            >
                              <IconStar />
                            </span>
                            <Typography variant="body2" color={"gray"}>
                              8.3
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Stack>
                    </Card>
                  );
                })}
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

const CarouselStyled = styled(Carousel)`
  border: 1px solid gray;
  padding: 5px;
  border-radius: 10px;
  .react-multiple-carousel__arrow {
    padding: 0;
    height: 100%;
    border-radius: 0;
    color: gray;
    background-color: white;
    box-shadow: 0 0 4px 1px #ddd;
    &::before {
      color: black;
    }
    &--right {
      right: 0 !important;
    }
    &--left {
      left: 0 !important;
    }
  }
`;

const ModalStyled = styled(Modal)`
  .MuiBox-root {
    border: none;
    overflow: hidden;
    border-radius: 10px;
  }
`;
export default BookTickets;
