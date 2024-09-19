import React from 'react'

interface dynamicTextProp {
    title: string
}
export default function DynamicText({title}: dynamicTextProp) {
  return (

      <span className="flex mr-[5px] min-w-max">{title}</span>
  )
}
