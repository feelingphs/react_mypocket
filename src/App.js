//import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './App.scss';
import { useState } from 'react';

function App() {
  const date = ["1", "2", "3", "4", "5", "6", "7", "28"]
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
  const type = ["expenses", "expenses", "expenses", "income"]
  const itemName = ["GS편의점 도시락", "야간 택시", "전기세", "월급"]
  const itemCategory = ["식비", "교통", "공과금", "월급"]
  const itemPrice = ["- 5,900", "- 9,000", "- 59,000", "+ 400,000"]

  const [content, setContent] = useState()
  const handleClickButton = e => {
    const { name } = e.target
    setContent(name)
  }

  const [layer, setLayer] = useState('')

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
              className="pocket_month"
              slidesPerView={7.5} 
              spaceBetween={16}
              modules={[Navigation]}
            >
              {
                date.map((date, i) => {
                  return (
                    <SwiperSlide>
                      <button className="pocket_date" onClick={ handleClickButton }>
                        <span className="date">{ date }</span>
                        <span className="week">{ week[i] }</span>
                        { content }
                      </button>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
            <div className="pocket_list">
              {
                itemName.map((itemName, i) => {
                  return(
                    <button className={ "pocket_item " + type[i] }>
                      <div className="item_info">
                        <span className="item_name">{ itemName }</span>
                        <span className="item_category">{ itemCategory[i] }</span>
                      </div>
                      <div className="item_price">{ itemPrice[i] }원</div>
                    </button>
                  )
                })
              }
              <button className="pocket_add" onClick={() => {setLayer('open')}}>
                <span>+</span>
              </button>
            </div>
            <div className={"layer_wrap " + layer}>
              <div className="layer_type">
                <div className="type_wrap">
                  <button className="type_expenses">
                    <span>지출</span>
                  </button>
                  <button className="type_income">
                    <span>수입</span>
                  </button>
                </div>
                <div className="dropdown_wrap">
                  <label for="category">카테고리</label>
                  <select id="category">
                    <option value="food">식비</option>
                    <option value="transortation">교통</option>
                    <option value="dues">공과금</option>
                  </select>
                </div>
                <div className="input_wrap">
                  <label for="input_item_name">내역</label>
                  <input type="text" className="input_item_name" id="input_item_name" placeholder="장보기"></input>
                </div>
                <div className="input_wrap">
                  <label for="input_item_price">금액</label>
                  <input type="number" className="input_item_price" id="input_item_price" placeholder="30,000"></input>
                </div>
                <div className="button_wrap">
                  <button className="button"><span>확인</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
