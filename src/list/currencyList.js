import React from 'react'
import Item from './item'

function CurrencyList(props) {
  return (
    <div>
      {props.list.map(item => <Item result={item.result} value={item.value} key={item.id}/>)}
    </div>
  )
}

export default CurrencyList
