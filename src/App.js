import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './App.scss';


function App() {
  //const month = 
  const date = ["1", "2", "3", "4", "5", "28", "29", "30"]
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"]

  const [pocketData, setPocketData] = useState([
    {id:1, type:"expenses", name:"GS편의점 도시락", category:"식비", price:"- 5,900"},
    {id:2, type:"expenses", name:"야간 택시", category:"교통", price:"- 9,000"},
    {id:3, type:"expenses", name:"전기세", category:"공과금", price:"- 59,000"},
    {id:4, type:"income", name:"월급", category:"월급", price:"- 400,000"},
  ])

  

  const [pocketList, setPocketList] = useState()
  const [month, setMonth] = useState(6)
  const [layer, setLayer] = useState()

  const handleClickButton = e => {
    const { name } = e.target
    const dateDummy = document.querySelectorAll('.date')
    dateDummy.forEach(element => {
      element.classList.remove('on');
    });
    e.target.classList.add('on')
    setPocketList(name)
  }

  const handleDataPush = () => {

  }



  return (
    <div className="wrap">
      <main className="main" id="main">
        <div className="container">
          <div className="pocket_summary">
            <div className="pocket_month">
              <button className="prev" onClick={ () => { setMonth( month - 1 )}}>이전달</button>
              <div className="current_month">2024년 { month }월</div>
              <button className="next" onClick={ () => { setMonth( month + 1 )}}>다음달</button>
            </div>
            <p className="pocket_account">97,000 원</p>
            <div className="pocket_report">
              <p className="expenses">지출<span>3,000 원</span></p>
              <p className="income">수입<span>100,000 원</span></p>
            </div>
          </div>
          <div className="">
            <Swiper 
              className="date_wrap"
              slidesPerView={7.5} 
              spaceBetween={16}
              modules={[Navigation]}
            >
              {
                date.map((date, i) => {
                  return (
                    <SwiperSlide key={ i }>
                      <button className="pocket_date" onClick={ handleClickButton }>
                        <span className="date">{ date }</span>
                        <span className="week">{ week[i] }</span>
                      </button>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

            { pocketList }
            <div className="pocket_list">
              {
                pocketData.map((data, i) => {
                  return(
                    <button className={ "pocket_item " + data.type } key={ i }>
                      <div className="item_info">
                        <span className="item_name">{ data.name }</span>
                        <span className="item_category">{ data.category }</span>
                      </div>
                      <div className="item_price">{ data.price }원</div>
                    </button>
                  )
                })
              }
              <button className="pocket_add" onClick={() => {setLayer('open')}}>
                <span>+</span>
              </button>
            </div>
            <div className={ "layer_wrap " + layer }>
              <div className="layer_type">
                <div className="type_wrap">
                  <div className="radio_wrap">
                    <input type="radio" id="typeExpenses" name="type" value={}></input>
                    <label for="typeExpenses">지출</label>
                  </div>
                  <div className="radio_wrap">
                    <input type="radio" id="typeIncome" name="type" value={}></input>
                    <label for="typeIncome">수입</label>
                  </div>
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
                  <button className="button" onClick={ handleDataPush }><span>확인</span></button>
                </div>
              </div>
            </div>
            <div className={ "dim " + layer }></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
