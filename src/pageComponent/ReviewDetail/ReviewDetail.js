import Image from "next/image"
import locationIcon from '@/assets/images/route-square-gr.svg'
import calendar from '@/assets/images/calendarFilter.svg'
import tour from '@/assets/images/tourDetail/tourBg.png'
import Link from "next/link"
import Button from "@/components/Common/Button"
import Banner from "../HotDeal/Banner"
import SlideTour from "@/components/Common/SlideTour"
import Album from "./Album"

function ReviewDetail({data,lang,dataTour}) {
  const dataReview = data?.customerReview
  let day = 'days'
  let review = 'Review Tour'
  let view = 'View tour'
  let related = 'Related Tour'

  if(lang === 'fr' || lang === 'it') {
    day = 'jours'
  }
  if(lang === 'fr') {
    review='Visite de révision'
    view = 'Voir la visite'
    related='Visite connexe'
  }
  if(lang === 'it') {
    review = 'Tour di revisione'
    view = 'Visualizza il tour'
    related = 'Tour correlato'
  }

  return (
    <div className="relative">
      <div className="relative z-10 content">
        <div className="flex items-end justify-between max-md:flex-col">
          <h3 className="mt-[8.5vw] max-md:mt-[23vw] uppercase text-[2.625vw] max-md:text-[5.86vw] max-md:w-full font-bold w-[70%]"><span className="text-[#138140]">{review}:</span> <span>{dataReview?.tours?.title}</span></h3>
          <Link href={`/${lang}/tours/${dataReview?.tours?.slug}`} className="max-md:hidden">
            <Button className='btn-primary' content="View tour"><span>{view}</span> </Button>
          </Link>
        </div>
        <div className="flex items-center mt-[1.12vw]">
          <div className="flex items-center mr-[1.8vw]">
            <Image
              src={locationIcon}
              width={100}
              height={100}
              alt='location'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover mr-[0.25vw]'
            />
            <span>{dataReview?.tours?.tourDetail?.banner?.location}</span>
          </div>
          <div className="flex items-center">
            <Image
              src={calendar}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover mr-[0.25vw]'
            />
            <span>{dataReview?.time}</span>
          </div>
          <Link href={`/${lang}/tours/${dataReview?.tours?.slug}`} className="hidden ml-auto max-md:block">
            <Button className='btn-primary' content={view}><span>{view}</span> </Button>
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `${dataReview?.content}`}} className="mt-[2vw] max-md:mt-[6.27vw] max-md:text-[3.733vw] text-editor text-[1.125vw] text-[#171717]"></div>
        <div className='z-10 relative pt-[3.75vw]'>
          {dataReview?.albumImage?.length && <Album album={dataReview?.albumImage} lang={lang}/> }
        </div>
      </div>
      {/* List tour */}
      <h2 className='relative z-10 heading-1 md:mt-[5.25vw] mt-[12.8vw] md:pl-[8.06vw] pl-[4.27vw] mb-[3.5vw]'>
          {related}
      </h2>
      <div className='md:px-[8.06vw]'>
          <SlideTour data={dataTour} lang={lang}/>
      </div>
      <div className='hidden h-auto md:block'>
        <Image
          src={tour}
          alt='tour'
          className='absolute top-0 left-0 z-0 w-full h-full opacity-5'
        />
        <div
          className='absolute top-0 left-0 w-full h-full z-1'
          style={{
            background:
              'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.86) 8.95%, rgba(255, 255, 255, 0.74) 13.79%, rgba(255, 255, 255, 0.00) 47.85%, rgba(255, 255, 255, 0.84) 89.25%, #FFF 100%)'
          }}
        ></div>
      </div>
    </div>
  )
}

export default ReviewDetail