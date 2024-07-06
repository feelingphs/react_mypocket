import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// components
import Layer from './components/Layer';

// scss
import './App.scss';


function App() {
  const date = ["1", "2", "3", "4", "5", "28", "29", "30"]
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"]

  
  const [pocketData, setPocketData] = useState([
    {id:1, type:"expenses", name:"GS편의점 도시락", category:"식비", price:"- 5,900"},
    {id:2, type:"expenses", name:"야간 택시", category:"교통", price:"- 9,000"},
    {id:3, type:"expenses", name:"전기세", category:"공과금", price:"- 59,000"},
    {id:4, type:"income", name:"월급", category:"월급", price:"+ 400,000"},
  ])

  const [pocketList, setPocketList] = useState()
  const [month, setMonth] = useState(6)
  const [layer, setLayer] = useState(false)

  const handleClickButton = e => {
    const { name } = e.target
    const dateDummy = document.querySelectorAll('.date')
    dateDummy.forEach(element => {
        element.classList.remove('on');
    });
    e.target.classList.add('on')
    setPocketList(name)
  }


  const {id} = "";
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  const handleDataPush = (e) => {
    let copy = [...pocketData];
    const obj = {
      id:id,
      inputId: function() {
        this.id = pocketData[pocketData.length - 1].id + 1;
        console.log(this.id);
      },
      type: type,
      name:name,
      category:category,
      price:price,
      priceCheck: function() {
        if(this.type === "0"){
          this.type = "expenses";
          this.price = "- " + this.price
        } else {
          this.type = "income";
          this.price = "+ " + this.price
        }
      }
    }
    obj.priceCheck();
    obj.inputId();

    copy.push(obj);
    setPocketData(copy)

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
              <button className="pocket_add" onClick={() => {setLayer(true)}}>
                <span>+</span>
              </button>
            </div>
            {layer === true ?
              <>
                <Layer></Layer>
                <div className="dim"></div>
              </>
              : null
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
