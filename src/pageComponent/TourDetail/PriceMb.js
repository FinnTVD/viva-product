'use client'

import React, { useState } from 'react'
import priceIcon from '@/assets/images/tourDetail/price.svg'
import mapIcon from '@/assets/images/tourDetail/mapIcon.png'

import Image from 'next/image'
import Button from '@/components/Common/Button'
import ModalCustom from '@/components/Common/ModalCustom'
import imageTest from '@/assets/images/banner-about.png'

export default function PriceMb({ data, onClick }) {
  const [openModal, setOpenModal] = useState(false)
  const lang = data?.lang
  let person = 'Pax'
  if(lang === 'fr') {
    person = 'Pax'
  }
  if(lang === 'it') {
    person = 'Pax'
  }
  return (
    <div className='fixed bottom-0 left-0 z-[100000]'>
      <div className='w-[16vw] h-[16vw] mb-[4.27vw] ml-[4.27vw] flex items-center justify-center bg-primaryColor rounded-full flex-shrink-0'>
        <Image
          src={mapIcon}
          alt='icon'
          className='w-[8.33vw] h-[8.33vw]'
          onClick={() => setOpenModal(true)}
        />
      </div>

      {openModal && (
        <ModalCustom
          openModal={openModal}
          setOpenModal={setOpenModal}
          className='w-[90vw]'
        >
          <Image
            src={data?.map?.sourceUrl || imageTest}
            alt={data?.map?.altText}
            width={1000}
            height={1000}
            className='object-contain w-full h-full rounded-lg'
          />
        </ModalCustom>
      )}

      <div className='px-[4.27vw] pt-[4.2vw] pb-[3.2vw] w-[100vw] bg-[#fff]'>
        <div className='flex justify-between items-center mb-[2.27vw] text-[#171717]'>
          <div className='text-[3.73vw] font-medium'>{data?.price?.header}:</div>
          <div className='text-[4.26vw] capitalize leading-[1.5] font-bold'>${data?.price?.value} / {person}</div>
        </div>

        <Button
          className='flex justify-center w-full btn-primary'
          onClick={() => onClick()}
        >
          {data?.button}
        </Button>
      </div>
    </div>
  )
}
