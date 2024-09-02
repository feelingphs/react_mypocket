import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';

import { format, addMonths, eachDayOfInterval, startOfMonth, endOfMonth, subMonths, isToday } from 'date-fns';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// components
import PocketList from './components/PocketList';
import Layer from './components/Layer';

// scss
import './App.scss';


function App() {
  // const [pocketList, setPocketList] = useState()

  const {id} = "";
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
        } else {
          this.type = "income";
        }
      }
    }
    obj.priceCheck();
    obj.inputId();

    copy.push(obj);
    setPocketData(copy);
    setLayer(false);
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

  // 캘린더
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
    removeActive();
  }, [currentDate])
  const prevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
    removeActive();
  }, [currentDate])
  const days = eachDayOfInterval({
    start:monthStart,
    end:monthEnd,
  })

  let pos = 0;
  // 날짜 선택시 날짜 활성화
  const handleClickButton = e => {
    //const { name } = e.target
    removeActive();
    e.target.classList.add('on')
    //setPocketList(name)

    const dateWrap = document.querySelector('.date_wrap');
    const swiperWrapper = document.querySelector('.date_wrap .swiper-wrapper');
    const swiperWrapperLeft = swiperWrapper.getBoundingClientRect().left - 20;
    const swiperWrapperRight = swiperWrapper.getBoundingClientRect().right + 20;

    const targetRect = e.target.getBoundingClientRect();
    const boxHalf = dateWrap.clientWidth / 2;
    
    let listWidth = 0;
    document.querySelectorAll('.date_wrap .swiper-wrapper .swiper-slide').forEach(function (slide) {
      listWidth += slide.offsetWidth + 16;
    });

    const selectTargetPos = targetRect.left + e.target.offsetWidth / 2;

    //console.log(targetRect.left - swiperWrapperLeft);
    console.log("listWidth : " + listWidth)
    console.log("dateWrap.clientWidth : " + dateWrap.clientWidth)
    console.log("swiperWrapperLeft : " + swiperWrapperLeft);

    if (Math.abs(selectTargetPos - boxHalf) > dateWrap.offsetWidth*0.25) {
      // left
      if(targetRect.left - swiperWrapperLeft < 100) {
        pos = 0;
        console.log(1)
      // right
      } else if(listWidth - dateWrap.clientWidth + swiperWrapperLeft < 50) {
        pos = 1012;
        console.log(2)
      // 가운데 날짜 선택시
      } else {
        pos += selectTargetPos - boxHalf;
        console.log(3)
      }
    }



    console.log(pos);
    console.log("---");

    // 애니메이션 적용
    setTimeout(function () {
      swiperWrapper.style.transform = 'translateX(' + pos * -1 + 'px)';
      swiperWrapper.style.transitionDuration = '500ms';
    }, 200);

  }
  
  //날짜 비활성화
  const removeActive = () => {
    const dateDummy = document.querySelectorAll('.date')
    dateDummy.forEach(element => {
        element.classList.remove('on');
    });
  }

  // const dateMoveCenter = e => {
  //   const dateWrap = document.querySelector('.date_wrap');
  //   const targetRect = e.target.getBoundingClientRect();

  //   console.log(targetRect)
  // }

  return (
    <div className="wrap">
      <main className="main" id="main">
        <div className="container">
          <div className="content">
            <div className="pocket_summary">
              <div className="pocket_month">
                <button className="prev" onClick={ prevMonthHandler }>이전달</button>
                <div className="current_month">{format(currentDate, "yyyy년")} {format(currentDate, "M월")}</div>
                <button className="next" onClick={ nextMonthHandler }>다음달</button>
              </div>
              <p className="pocket_account">{ formatNumber(incomeTotal - expenseTotal) } 원</p>
              <div className="pocket_report">
                <p className="expenses">지출<span>{ formatNumber(expenseTotal) } 원</span></p>
                <p className="income">수입<span>{ formatNumber(incomeTotal) } 원</span></p>
              </div>
            </div>
            <Swiper 
              className="date_wrap"
              slidesPerView={7.5} 
              spaceBetween={16}
              modules={[Navigation, A11y]}
            >
              {
                days.map((date, i) => {
                  return (
                    <SwiperSlide key={ i }>
                      <button className="pocket_date" onClick={ handleClickButton }>
                        <span className={`date ${isToday(date) ? 'on' : ''}`}>{format(date, "d")}</span>
                        <span className="week">{format(date, "eee")}</span>
                      </button>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

            <PocketList pocketData={pocketData} formatNumber={formatNumber} setLayer={setLayer}></PocketList>
            
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
