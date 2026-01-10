import React from 'react'

function Center({ className, children }: {className?: string, children: React.ReactNode}) {
  return (
    <div className={`mx-auto w-[87%] ${className}`}>{children}</div>
  )
}

export default Center;