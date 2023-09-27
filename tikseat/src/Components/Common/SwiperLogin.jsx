import React from "react";
import { Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SwiperLogin() {
  return (
    <>
        <Swiper
          style={{height:"100%"}}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2020/12/hinh-nen-blackpink-75-696x1116.jpg?fit=700%2C20000&quality=95&ssl=1"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="https://bangxephang.com/wp-content/uploads/2022/08/hinh-nen-blackpink-cho-dien-thoai.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="https://maytinhvui.com/hinh-nen-blackpink/anh-nen-blackpink-5/"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
    </>
  );
}
