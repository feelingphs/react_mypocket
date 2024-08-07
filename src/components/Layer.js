import React, {useState} from 'react';

function Layer (props) {

  const [type, setType] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  
  const expCategoryOption = ["식비", "교통", "공과금", "대출"]
  const inCategoryOption = ["월급", "용돈", "캐시백", "이자"]
  const [categoryOption, setCategoryOption] = useState();

  const handleChangeRadio = (e) => {
    setType(e.target.value)
    
    if(e.target.value === "0"){
      setCategoryOption(
        expCategoryOption.map((data, i) => {
          return (
            <option value={ data } key={i}>{ data }</option>
          )
        })
      )
    } else {
      setCategoryOption(
        inCategoryOption.map((data, i) => {
          return (
            <option value={ data } key={i}>{ data }</option>
          )
        })

      )
    }
  }

  const saveExpenseDtaHandler = (data) => {
    const expenseData = {
      ...data,
      type: type,
      name:name,
      category:category,
      price:price,
    }
    props.handleDataPush(expenseData);
  }

  return (
      <div className="layer_wrap open">
          <div className="layer_type">
              <div className="type_wrap">
                  <div className="radio_wrap">
                      <input type="radio" id="typeExpenses" name="type" value="0" onChange={ handleChangeRadio }></input>
                      <label htmlFor="typeExpenses">지출</label>
                  </div>
                  <div className="radio_wrap">
                      <input type="radio" id="typeIncome" name="type" value="1" onChange={ handleChangeRadio }></input>
                      <label htmlFor="typeIncome">수입</label>
                  </div>
              </div>
              <div className="dropdown_wrap">
                  <label htmlFor="category">카테고리</label>
                  <select id="category" onChange={ (e) => { setCategory(e.target.value); }}>
                  { categoryOption }
                  </select>
              </div>
              <div className="input_wrap">
                  <label htmlFor="input_item_name">내역</label>
                  <input type="text" className="input_item_name" id="input_item_name" placeholder="장보기" onChange={(e) => { setName(e.target.value) }}></input>
              </div>
              <div className="input_wrap">
                  <label htmlFor="input_item_price">금액</label>
                  <input type="number" className="input_item_price" id="input_item_price" placeholder="30,000" onChange={(e) => { setPrice(e.target.value) }}></input>
              </div>
              <div className="button_wrap">
                  <button className="button" onClick={ (e) => saveExpenseDtaHandler() }><span>확인</span></button>
              </div>
          </div>
      </div>
  )
}

export default Layer;