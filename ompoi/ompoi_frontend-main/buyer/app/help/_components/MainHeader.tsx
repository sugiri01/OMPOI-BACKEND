import { Input } from '@/components/ui/input'
import React from 'react'

function MainHeader() {
  return (
    <div className='flex flex-col gap-2 text-gray-50 text-center justify-center items-center-safe py-6'>
        <h1 className='text-[2.3rem] font-black'>How can we help you?</h1>
        <p>Get instant answers to your questions about cashew sourcing</p>
        <Input type="text" placeholder="Search for help articles, guides, FAQs..." className="mt-4 w-140 h-12 max-w-full px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>
    </div>
  )
}

export default MainHeader