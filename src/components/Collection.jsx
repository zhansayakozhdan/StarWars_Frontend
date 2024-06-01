import React from 'react'

export const Collection = ({name, climate, terrain, imageUrl, population}) => {
  return (
      <div className="collection">
        <img className="collection__big" src={imageUrl} alt="Item" />
        <h4>Название: {name}</h4>
        <h6>Климат: {climate}</h6>
        <h6>Ландшафт: {terrain}</h6>
        <h6>Население: {population}</h6>
      </div>
  )
}

