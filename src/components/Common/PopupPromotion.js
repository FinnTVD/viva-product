"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import closeIcon from "@/assets/images/close-white.svg"
import Link from "next/link"

function PopupPromotion({lang,data}) {
  const [showPopup,setShowPopup] = useState(false)
  const handleCloseImg = (e) => {
    e.stopPropagation();
  }
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true)
    },3000)
  },[])
  return (
    <div>
      {showPopup && <div className="fixed w-full h-full z-[199] inset-0" style={{background: 'rgba(0,0,0,0.65)'}} onClick={() => setShowPopup(false)}>
        <div className="max-w-[65rem] w-[50%] max-md:w-[90%] max-h-[50rem] h-[90vh] max-md:h-[60vh] z-[200] absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2" onClick={handleCloseImg}>
          <Link href={`/${lang}/voucher/${data?.popupPromotion?.voucher?.slug}`}>
            <Image src={data?.popupPromotion?.thumbPopup?.sourceUrl} width={500} height={500} className="object-cover w-full h-full rounded-[2vw]" alt={data?.popupPromotion?.thumbPopup?.altText || "thumb voucher"}/> 
          </Link>
          <div className="w-[3.2vw] h-[3.2vw] max-md:w-[6.5vw] max-md:h-[6.5vw] rounded-full cursor-pointer bg-slate-600 grid place-items-center absolute max-md:right-[4vw] max-md:top-[4vw] right-[2vw] top-[2vw]" onClick={() => setShowPopup(false)}>
            <Image src={closeIcon} width={50} height={50} alt="icon" className=" w-[2vw] h-[2vw] max-md:w-[4.67vw] max-md:h-[4.67vw]" />
          </div>
        </div>
      </div>}
    </div>
  )
}

export default PopupPromotion