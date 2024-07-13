import React from "react";
import numeral from "numeral"
const currencyFormat =({amount})=>{
  const formattedAmount=numeral(amount).format("50,0. 00")
  return <div>{formattedAmount }</div>
}
export default currencyFormat