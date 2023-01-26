import React from 'react'

const SectionTitle = ({ title }) => {
  return (
    <div className={'col-span-4 border-gray-800 py-2 my-6'}>
      <div className={'flex flex-row-reverse items-center w-full gap-3'}>
        <hr className={'border-t flex-grow border-gray-800'} />
        <span className={'text-2xl'}>{title}</span>
      </div>
    </div>
  )
}
export default SectionTitle
