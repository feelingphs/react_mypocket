//import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './App.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function App() {
  const date = ["1일", "2일", "3일", "4일", "5일", "6일", "7일", "8일"]
  // const category = ["식비", "교통", "공과금"]
  return (
    <div className="wrap">
      <main className="main" id="main">
        <div className="container">
          <div className="pocket_summery">
            <button>2024년 6월</button>
            <p>97,000원</p>
            <div>
              <p>지출<span>3,000원</span></p>
              <p>수입<span>100,000원</span></p>
            </div>
          </div>
          <div className="">
            <Swiper 
              className="mySwiper"
              slidesPerView={5.5} 
              spaceBetween={10}
              modules={[Navigation]}
            >
              {
                date.map((i) => {
                  return (
                    <SwiperSlide><button>{i}</button></SwiperSlide>
                  )
                }
                )
              }
            </Swiper>
            <div className="pocket_list">
              <button className="pocket_item">
                <div className="item_info">
                  <span className="item_name">GS25 우유</span>
                  <span className="item_category">식비</span>
                </div>
                <div className="item_price">-2,000원</div>
              </button>
              <button className="pocket_item">
                <div className="item_info">
                  <span className="item_name">GS25 우유</span>
                  <span className="item_category">식비</span>
                </div>
                <div className="item_price">-2,000원</div>
              </button>
              <button className="pocket_add">
                추가
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
