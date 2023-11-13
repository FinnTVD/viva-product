'use client'
import Image from 'next/image'
import { useState } from 'react'
import SlideDayTour from './SlideDayTour'

export default function TourDetailStep({ data: tourDetailData,iconsDefault }) {
  const iconsDefault2 = iconsDefault
  let arrImg = []
  const [album, setAlbum] = useState([])
  const [open, setOpen] = useState(false)
  const handleClick = (url, index) => {
    tourDetailData[index]?.place?.map((item, index) => {
      arrImg.push(item?.image?.sourceUrl)
    })
    if (arrImg[0] !== url) {
      arrImg.map(item => item !== url)
      arrImg.unshift(url)
    }
    setAlbum(arrImg)
    setOpen(true)
  }
  return (
    <>
      <div>
        {tourDetailData?.map((tour, indexTour) => {
          let icons = []
          if(iconsDefault2) {
            icons = iconsDefault2?.concat(tour?.icons)
          } else {
            icons = tour?.icons
          }
          return (
            <div
              className='mb-[2.13vw] md:mb-[0]'
              key={indexTour}
            >
              <div className='flex font-medium leading-normal md:h-[2.375vw] h-[11.2vw] md:items-center md:gap-[1.625vw] gap-[2.67vw]'>
                <div className='bg-primaryColor md:h-[2.375vw] h-[5.86vw] md:w-[2.375vw] w-[10vw] md:text-[1vw] text-[2.66vw] rounded-full flex items-center justify-center mt-[1vw] md:mt-0'>
                  {indexTour + 1}
                </div>
                <div className='lg:text-[1.125vw] md:text-[1.4vw] text-[3.733vw]' dangerouslySetInnerHTML={{ __html: `${tour?.heading}` }}></div>
              </div>
              <div className='lg:text-[1vw] md:text-[1.4vw] text-[3.733vw] leading-normal md:pl-[3.75vw] pl-[5.6vw] md:pb-[3.125vw] md:pt-0 pt-[5.2vw] pb-[8.53vw] md:ml-[1.1875vw] ml-[2.93vw] md:my-[0.75vw] my-[-2vw] border-l border-dashed border-primaryColor flex flex-col md:gap-[1.5vw] gap-[5.6vw]'>
                <div className='text-justify opacity-80 text-editor' dangerouslySetInnerHTML={{ __html: `${tour?.desc}` }}></div>
                {/* image */}
                <div className={`${!tour?.gallery && 'hidden'}`}>
                  {tour?.gallery?.map((img, index) => {
                    return (
                      <Image
                        src={img?.sourceUrl}
                        alt={img?.altText || img?.title || 'img tour'}
                        key={index}
                        width={500}
                        height={500}
                        className=' md:max-h-[26.25vw] md:w-[50.0625vw] max-h-[40vw] object-cover mb-[1vw] rounded-[1.06667vw] md:rounded-[0.625vw]'
                      />
                    )
                  })}
                </div>
                {/* icon */}
                <div className='flex md:gap-[1.5vw] gap-[3.13vw] flex-wrap'>
                  {icons &&
                    icons?.length > 0 &&
                    icons?.map((icon, index) => {
                      return (
                        <div key={index} className='flex items-center gap-[0.5vw] max-md:gap-[1.5vw]'>
                          <Image
                            alt='icon'
                            src={icon?.img?.sourceUrl}
                            width={40}
                            height={40}
                            className='md:w-[3.5vw] w-[8.5vw] md:h-[3.5vw] h-[8.5vw] md:p-[0.55vw] p-[1.8vw] bg-[#FFF2BD] md:rounded-[5px] rounded-[4px]'
                          />
                          <span className='lg:text-[1vw] md:text-[1.4vw] text-[3.733vw] leading-normal'>{icon?.text}</span>
                        </div>
                      )
                    })}
                </div>

                <div className='flex flex-col md:gap-[1vw] gap-[2.67vw]'>
                  {tour?.place?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='flex md:gap-[0.625vw] gap-[2.13vw] items-center'
                      >
                        <Image
                          src={item?.image?.sourceUrl}
                          alt={item?.image?.altText || item?.image?.title || 'img-tour'}
                          width={40}
                          height={40}
                          className='md:w-[3vw] w-[10.67vw] md:h-[3vw] h-[10.67vw] object-cover'
                          onClick={() => handleClick(item?.image?.sourceUrl, indexTour)}
                        />
                        <span>{item?.placeName}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
        {open && <div>
          <div className='w-[70%] h-[70vh] fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-[100] max-md:h-[60vw] max-md:w-[90%]'>
            {<SlideDayTour data={album} />}
          </div>
          <div className='fixed inset-0 z-[90]' style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setOpen(false)}></div>
        </div>
        }
      </div>
    </>
  )
}
