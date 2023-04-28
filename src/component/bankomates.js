import React, {useEffect, useState} from 'react';
import css from "../../src/component/bankkomat.module.scss"
const a = {
  100000: 20000,
  50000: 20000,
  20000: 20000,
  10000: 200000,
  5000: 200000,
  2000: 200000,
  1000: 200000
}
const Bankomates = () => {

  const [amount, setAmount] = useState("")
  const [result, setResult] = useState([])
  const [error, setError] = useState("")

  const [res, setRes] = useState([]);
  const [end, setEnd] = useState(false)

  function getAllSubsetsInSet(set) {
    const result = [];
    let mask = 1;

    do {
      let maskString = mask.toString(2).padStart(set.length, '0');

      result.push(set.filter((item, index) => maskString[index] === '1'));
      mask++;
    } while (mask < (2 ** set.length));

    return result;
  }

  function getMoney(currencies, limits, amount) {
    const sorted = currencies.sort((a, b) => b - a);

    let workingLimits = {
      ...limits
    };
    let workingAmount = amount;
    let result = {};

    for (let i = 0; i < sorted.length; i++) {
      let currentCurrency = sorted[i];
      let desiredBanknotes = Math.floor(workingAmount / currentCurrency);
      let availableBanknotes = workingLimits[currentCurrency];
      let banknotesToBeUsed = (availableBanknotes < desiredBanknotes) ? availableBanknotes : desiredBanknotes;

      workingAmount = (workingAmount - (banknotesToBeUsed * currentCurrency));
      workingLimits[currentCurrency] = availableBanknotes - banknotesToBeUsed;
      result[currentCurrency] = banknotesToBeUsed;
    }
    console.log('result: ', result)
    if (workingAmount > 0) {
      return {
        result: {},
        limits,
        error: true,

      }
    }
    let final = {};
    Object.keys(result).map(r => result[r] ? final[r] = result[r] : '')


    return {
      result: final,
      limits: workingLimits,
      error: false
    }
  }

  function ATM(limits, amount) {

    let currencies = Object.keys(limits).map(item => Number(item));

    let allCurrencyCombinations = getAllSubsetsInSet(currencies);

    let resultsForEachCombination = allCurrencyCombinations.map(combination => {

      return getMoney(combination, limits, amount);
    });

    const succeedResults = resultsForEachCombination.filter(variant => !variant.error);
    if (succeedResults.length) {
      console.log("succeedResults.length:", succeedResults.length)
      console.log("succeedResults:", succeedResults)
      const finalResults = succeedResults.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === succeedResults.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });
      console.log("finalResults:" +
        "")
      const y = finalResults.sort((a, b) => {
        let h = Object.keys(finalResults[0])
        let k = Object.keys(a.result).map(k => Number(k))
        let z = Object.keys(b.result).map(k => Number(k))
        let s = 0
        z.sort(function (a, b) {
          return b - a
        })
        k.sort(function (a, b) {
          return b - a
        })
        let arr = []
        arr.push(z)
        arr.push(k)
        console.log("arr:", arr)
      });
      return y;
    }

    setError("No possible ways")
    return {
      result: 'No possible ways',
      limits
    }
  }
  ;
  const onChange = (e) => {
    setAmount(e.target.value)
    if (Number(e.target.value) < 1000 || Number(e.target.value) % 1000 != 0) {
      setError("write valid number");
      setRes([]);
      setEnd(false)
      return;
    }
    setError('');
    let b = ATM(a, e.target.value)
    setRes(b)
  }
  useEffect(() => {
    if (res.length) {
      res.forEach(el => {
        el.max = Object.keys(el.result).sort((a, b) => {
          return +b - +a
        })
      })
      res.sort((a, b) => {
        if (b.max[0] === a.max[0]) {
          return b.max[1] - a.max[1]
        }
        return b.max[0] - a.max[0]
      })
      setEnd(true)
    }
  }, [res])


  return (
    <div>
      <div>
        <input
          type="number"
          onChange={e => {
            onChange(e)
          }}
        />
      </div>
      <div>{error || amount}</div>

      <ul className={css.ul} >
        {end &&
          res.map((el, index) => {
            // console.log(Object.keys(el.result))
            return <li key={index}>
              {Object.keys(el.result)?.map((innerEl, index) => {
                if (el.result[innerEl] > 0) {
                }
                return el.result[innerEl] > 0 && <span key={index}>
                  {innerEl} * {el.result[innerEl]}<br/>
                </span>
              })
              }
              <br/><br/><br/><br/><br/>
            </li>
          })
        }
      </ul>
    </div>

  );
};

export default Bankomates;