import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item, handleDelete,handleClick}) => {
  return (
    <li className='item'>
        <input onChange={() => handleClick(item.id)} type='checkbox' checked={item.checked} />
        <label onDoubleClick={() => handleClick(item.id)} >{item.item}</label>
        <FaTrashAlt role='button' tabIndex="0" onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.item}`} />
    </li>
  )
}

export default LineItem