import React, {useEffect, useState} from 'react';
import css from "./bankkomat.module.scss"
let greenbacksArray = {100000:100000,50000:50000,20000:20000,10000:10000,5000:5000,2000:2000,1000:1000}
let greenbacksArr = [100000,50000,20000,10000,5000,2000,1000];
const Bankomat = () => {
  const[amount,setAmount] = useState("")
  const[error,setError] = useState("")
  const[selected,setSelected] = useState([])

  useEffect((value)=>{
   if(!amount){
     setSelected([])
   }
  },[])
  const getMoney = (el) => {
    let changeGreenbacksArr = [];
    for(let i = 0; i < greenbacksArr.length; i++ ){
      changeGreenbacksArr[i] = Math.floor(el /greenbacksArr[i])
      if(el%greenbacksArr[i]===0){
        break;
      }
      el = el % greenbacksArr[i];

    }
    setSelected(changeGreenbacksArr)
  }


  const onChange = (e)=>{
    setSelected([])
    if(e.target.value%1000 === 0 && e.target.value <= 500000){
      setAmount(e.target.value)
      // let y =
      getMoney(e.target.value)
      // getMoney1(e.target.value)
      // console.log(y)
      setError("")
    }else{
      setError("please enter valid number")
      setAmount("")
      setSelected([])
    }
  }
  return (
    <div className={css.container} >
      <form>
        <input
          // value="value"
          type="number"
          placeholder=""
          onChange={e=>onChange(e)}
        />
        <ul className={css.ul} >
          {selected.map((el,index)=>{
            return  <li key={index}>
              {/*{*/}
              {/*  greenbacksArr[index]*/}
              {/*}...*/}
              {
                selected[index]>0 ? greenbacksArr[index] : ""
              }      {
                selected[index]>0?selected[index] : ""

              }

            </li>
          })}
        </ul>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default Bankomat;