/* eslint-disable no-constant-condition */
import React from 'react'

interface dynamicTextProp {
  tab?: number 
  title?: string
  endSpace?:number
  children?: React.ReactNode
}

export default function DText({ children, tab = 0, title="", endSpace=0}: dynamicTextProp) {
  const tabSpaces = '\u00A0'.repeat(tab * 4); // 4 spaces per tab
  const spaces = '\u00A0'.repeat(endSpace);

  return (
    <>
      <p className={`${false ? "block w-full" : "flex flex-wrap"}`}>
        <>
          {tabSpaces}{title}
        </>
        <>
          {children}
        </>
        {spaces}
        <br />
      </p>
    </>
  )
}
