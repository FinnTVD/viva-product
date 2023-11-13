'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import icon from '@/assets/images/route-square.svg'
import callIcon from '@/assets/images/call-calling.svg'
import directIcon from '@/assets/images/direct.svg'

function SlideRepresent({ data }) {
  const [indexSlider, setIndexSlider] = useState(0)
  // const [slideData, setSlideData] = useState(data)
  const slideData = data?.concat(data)?.concat(data)
  const swiperRef = useRef()
  const handleNextSlide = () => {
    swiperRef.current?.slideNext()
  }
  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev()
  }

  const handleSlideChange = (swiper) => {
    setIndexSlider(swiper.activeIndex)
  }

  useEffect(() => {
    handleNextSlide()
  }, [])
  useEffect(() => {
    handleNextSlide()
  }, [slideData])
  
  return (
    <div className='box-border relative slide-represent'>
      <Swiper
        breakpoints={{
          768: {
            centeredSlides: true,
            coverflowEffect: {
              depth: 100
            },
            slidesPerView: 5,
            zoom: true,
            spaceBetween: 0,
            loop: true,
            loopFillGroupWithBlank: true,
          }
        }}
        effect='coverflow'
        slidesPerView={2.1}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1
        }}
        zoom={false}
        onSlideChange={handleSlideChange}
        centeredSlides={false}
        modules={[Pagination, EffectCoverflow]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        className='relative flex flex-col cursor-grab'
      >
        {slideData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className='ml-[2.66vw] md:ml-0 relative presentative-item rounded-[1.6vw]'>
                  <Image
                    src={item?.img?.sourceUrl}
                    width={500}
                    height={500}
                    alt={item?.img?.altText}
                    className='w-full h-[54.4vw] md:h-[29.14588vw] block object-cover rounded-[1.6vw] presentative-img'
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
      <div className='md:flex hidden absolute top-[50%] -translate-y-2/4 z-10 w-full justify-between'>
        <button
          onClick={handlePrevSlide}
          className='w-[3.625vw] h-[3.625vw] rounded-full flex justify-center items-center bg-primaryColor button-slide__tour absolute left-[6.5vw] top-[50%] -translate-y-2/4'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-[1.5vw] h-[1.5vw]'
          >
            <path
              d='M3.15303 12.0969L19.457 0.960938L12.873 12.0969L19.457 23.2409L3.15303 12.0969Z'
              fill='#001258'
            />
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className='w-[3.625vw] h-[3.625vw] rounded-full flex justify-center items-center bg-primaryColor button-slide__tour absolute right-[6.5vw] top-[50%] -translate-y-2/4'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-[1.5vw] h-[1.5vw]'
          >
            <path
              d='M20.847 12.0969L4.54297 0.960938L11.127 12.0969L4.54297 23.2409L20.847 12.0969Z'
              fill='#001258'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SlideRepresent
