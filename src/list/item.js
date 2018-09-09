import React from "react"

function Item(props) {
  return (
    <div className="item">
      <span>{props.value}</span>-
      <span> {props.result}</span>
    </div>
  )
}

export default Item
