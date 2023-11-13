"use client"
import Button from "@/components/Common/Button"
import Image from "next/image"
import { useState } from "react"

function Album({album,lang}) {
  const [indexAlbum,setIndexAlbum] = useState(1)
  const totalPage = Math.ceil(+album.length/2)
  let view = 'View more'
  if(lang === 'fr') {
    view = 'Voir plus'
  }
  if(lang === 'it') {
    view = 'Visualizza altro'
  }
  const handleMoreAlbum = () => {
    setIndexAlbum(indexAlbum+1)
  }
  const dataAlbum = album?.slice(0,indexAlbum*2)
  return (
    <div>
      <div className="grid grid-cols-2 gap-[1.2vw] max-md:gap-[3vw] max-md:grid-cols-1">
        {dataAlbum?.map((img,index) => (
          <Image key={index} src={img?.sourceUrl} alt={img?.altText || img?.title || 'img tour'} width={500} height={400} className="w-full h-[26vw] object-cover max-md:h-[73vw]"/>
        ))}
      </div>
      {totalPage > 1 && indexAlbum < totalPage && <div className="mx-auto w-max mt-[2vw] max-md:mt-[6vw]"><Button onClick={handleMoreAlbum} className='btn btn-secondary' content={view}><span>{view}</span> </Button></div>}
    </div>
  )
}

export default Album