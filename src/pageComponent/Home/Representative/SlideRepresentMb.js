'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import icon from '@/assets/images/route-square.svg'
import callIcon from '@/assets/images/call-calling.svg'
import directIcon from '@/assets/images/direct.svg'

function SlideRepresentMb({ data }) {
  const [indexSlider, setIndexSlider] = useState(0)
  const slideData = data
  const swiperRef = useRef()
  const handleSlideChange = (swiper) => {
    setIndexSlider(swiper.activeIndex)
  }
  return (
    <div className='box-border relative'>
      <Swiper
        slidesPerView={2.1}
        spaceBetween={0}
        onSlideChange={handleSlideChange}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        className='relative flex flex-col cursor-grab'
      >
        {slideData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className='ml-[2.66vw] md:ml-0 relative rounded-[1.6vw]'>
                  <Image
                    src={item?.img?.sourceUrl}
                    width={500}
                    height={500}
                    alt={item?.img?.altText}
                    className='w-full h-[54.4vw] block object-cover rounded-[1.6vw]'
                  />
                  <div className='flex contact absolute top-0 right-0 pt-[1.5vw] pr-[1.42vw]  flex-col gap-[0.75vw]'>
                    <div className='flex gap-[0.5vw] flex-row-reverse items-center contactInfoSlide'>
                      <a href={`tel:${item?.telephone}`} className='iconContact w-[2.5vw] h-[2.5vw] max-md:w-[5vw] max-md:h-[5vw] rounded-full bg-[#444340] flex items-center justify-center'>
                        <Image
                          src={callIcon}
                          width={50}
                          height={50}
                          alt='img'
                          className='w-[1.5vw] h-[1.5vw] max-md:w-[3.5vw] max-md:h-[3.5vw] object-cover cursor-pointer '
                        />
                      </a>
                      <a href={`tel:${item?.telephone}`} className='bg-[#444340] max-md:hidden text-[#FFD220] md:text-[1vw] md:px-[0.5vw] rounded-[0.67vw] contactInfo md:py-[0.2vw]'>
                        {item?.telephone}
                      </a>
                    </div>
                    <div className='flex gap-[0.5vw] flex-row-reverse items-center'>
                      <a href={`mailto:${item?.email}`} className='iconContact w-[2.5vw] h-[2.5vw] max-md:w-[5vw] max-md:h-[5vw] rounded-full bg-[#444340] flex items-center justify-center'>
                        <Image
                          src={directIcon}
                          width={50}
                          height={50}
                          alt='img'
                          className='w-[1.5vw] h-[1.5vw] max-md:w-[3.5vw] max-md:h-[3.5vw] object-cover  cursor-pointer'
                        />
                      </a>
                      <a href={`mailto:${item?.email}`} className='bg-[#444340] text-[#FFD220] md:text-[1vw] md:px-[0.5vw] rounded-[0.67vw] contactInfo md:py-[0.2vw]'>
                        {item?.email}
                      </a>
                    </div>
                  </div>
                  <div className='info absolute bottom-0 md:pb-[1.77vw] pb-[3.544vw] md:pl-[1.79vw] pl-[3.5vw]'>
                    <div className='flex items-center md:gap-x-[0.4vw] gap-x-[0.8vw]'>
                      <Image
                        src={icon}
                        width={50}
                        height={50}
                        alt='img'
                        className='md:w-[1.5625vw] md:h-[1.5625vw] w-[2.66vw] h-[2.66vw] object-cover'
                      />
                      <span className='text-white md:text-[1.19vw] text-[2.66vw] leading-normal'>{item?.role}</span>
                    </div>
                    <h3 className='text-white md:text-[1.59vw] text-[3.2vw] font-bold leading-normal md:mt-[0.33vw]'>
                      {item?.name}
                    </h3>
                  </div>
                </div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
     
    </div>
  )
}

export default SlideRepresentMb
