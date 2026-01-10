import React from 'react'

function Center({ children }: {children: React.ReactNode}) {
  return (
    <div className="mx-auto w-[87%]">{children}</div>
  )
}

export default Center;