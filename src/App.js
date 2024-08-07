import React, { useState, useEffect } from 'react';
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
  const minMonth = 1;
  const maxMonth = 12;

  const date = ["1", "2", "3", "4", "5", "28", "29", "30"]
  const week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"]

  const [pocketList, setPocketList] = useState()

  const {id} = "";
  const [month, setMonth] = useState(6)
  const [incomeTotal, setIncomeTotal] = useState()
  const [expenseTotal, setExpenseTotal] = useState()
  const [layer, setLayer] = useState(false)

  // 수입, 지출 목록
  const [pocketData, setPocketData] = useState([
    {id:1, type:"expenses", name:"GS편의점 도시락", category:"식비", price:"1000"},
    {id:2, type:"expenses", name:"야간 택시", category:"교통", price:"1000"},
    {id:3, type:"expenses", name:"전기세", category:"공과금", price:"1000"},
    {id:4, type:"income", name:"월급", category:"월급", price:"1000"},
    {id:4, type:"income", name:"월급", category:"월급", price:"1000"},
  ])

  // 날짜 선택시 날짜 활성화
  const handleClickButton = e => {
    const { name } = e.target
    const dateDummy = document.querySelectorAll('.date')
    dateDummy.forEach(element => {
        element.classList.remove('on');
    });
    e.target.classList.add('on')
    setPocketList(name)
  }

  // 수입, 지출 목록 데이터 추가
  const handleDataPush = (data) => {
    console.log(data.type, data.name, data.category, data.price);
    let copy = [...pocketData];
    const obj = {
      id:id,
      inputId: function() {
        this.id = pocketData[pocketData.length - 1].id + 1;
      },
      type: data.type,
      name: data.name,
      category: data.category,
      price: data.price,
      priceCheck: function() {
        if(this.type === "0"){
          this.type = "expenses";
          //this.price = "- " + this.price
        } else {
          this.type = "income";
          //this.price = "+ " + this.price
        }
      }
    }
    obj.priceCheck();
    obj.inputId();

    copy.push(obj);
    setPocketData(copy);
    setLayer(false);
  }

  // 월 증가
  const monthIncrease = () => {
    setMonth((month) => {
      if(month < maxMonth) {
        return month + 1;
      } else {
        return month;
      }
    })
  }
  
  // 월 감소
  const monthDecrease = () => {
    setMonth((month) => {
      if(month > minMonth) {
        return month - 1;
      } else if (month === minMonth){
        return month;
      }
    })
  }

  // 금액 숫자로 전환
  const formatNumber = (num) => {
    if (num !== undefined && num !== null && !isNaN(num)) {
      num = Number(num);
      return num.toLocaleString('ko-KR');
    } else {
      return 'Invalid number';
    }
  }

  // 전체 수입 금액
  useEffect( () => {
    let price = 0;
    Object.keys(pocketData).forEach(function(key) {
      const pocketType = pocketData[key].type;
      if(pocketType === 'income') {
        const pocketPrice = pocketData[key].price;
        price += Number(pocketPrice);
        setIncomeTotal(price);
      }
    })
  }, [pocketData])

  // 전체 지출 금액
  useEffect( () => {
    let price = 0;
    Object.keys(pocketData).forEach(function(key) {
      const pocketType = pocketData[key].type;
      if(pocketType === 'expenses'){
        const pocketPrice = pocketData[key].price;
        price += Number(pocketPrice);
        setExpenseTotal(price);
      }
    })
  }, [pocketData])

  return (
    <div className="wrap">
      <main className="main" id="main">
        <div className="container">
          <div className="content">
            <div className="pocket_summary">
              <div className="pocket_month">
                <button className="prev" onClick={ () => { monthDecrease() }}>이전달</button>
                <div className="current_month">2024년 { month }월</div>
                <button className="next" onClick={ () => { monthIncrease() }}>다음달</button>
              </div>
              <p className="pocket_account">{ incomeTotal - expenseTotal } 원</p>
              <div className="pocket_report">
                <p className="expenses">지출<span>{ formatNumber(expenseTotal) } 원</span></p>
                <p className="income">수입<span>{ formatNumber(incomeTotal) } 원</span></p>
              </div>
            </div>
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
                      <div className="item_price">{ formatNumber(data.price) } 원</div>
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
                <Layer handleDataPush={handleDataPush}></Layer>
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
