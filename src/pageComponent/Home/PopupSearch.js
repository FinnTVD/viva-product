'use client'

import Loading from '@/components/Common/Loading'
import { DATA_SEARCH_TEXT_TOUR } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'
import { useRef, useState } from 'react'
import TourSearch from './TourSearch'
import btnClose from '@/assets/images/close.svg'
import Image from 'next/image'

function PopupSearch({ lang, onClose }) {
  const [text, setText] = useState('')
  const refSearch = useRef(null)
  
  const handleInput = (e) => {
    if (refSearch.current) {
        clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      setText(e.target.value)
    }, 500)
  }

  const { data, loading } = useQuery(DATA_SEARCH_TEXT_TOUR, {
    variables: {
      title: text,
      language: lang?.toUpperCase()
    }
  })
  const allTours = data?.allTours?.nodes
  const listTours = allTours?.filter((tour,index) => tour?.translation !== null)
  const uniqueObjects = listTours?.filter((obj, index, self) => {
    return index === self?.findIndex((item) => (
      item?.translation?.slug === obj?.translation?.slug
    ));
  });

  let result = 'No result for this search !!'
  if(lang === 'fr') {
    result = 'Aucun résultat pour cette Rechercher !!'
  }
  if(lang === 'it') {
    result = 'Nessun risultato per questa Cerca!!'
  }
  let search = 'Search...'
  if(lang === 'fr') {
    search = 'Rechercher...'
  }
  if(lang === 'it') {
    search = 'Cerca...'
  }
  return (
    <div className='w-[80vw] h-[80vh] bg-white relative z-10 overflow-y-auto'>
      <div className='sticky top-0'>
        <input
          type='text'
          placeholder={search}
          className='w-full border-none p-[1.25vw] outline-none text-[1.12vw]'
          onInput={handleInput}
        />
        <Image
          src={btnClose}
          alt='close'
          width={20}
          height={20}
          className='absolute md:top-[1.5vw] cursor-pointer right-[2.53vw]'
          onClick={onClose}
        />
      </div>
      <hr />
      <div className='p-[1.25vw]'>
        {loading ? (
          <div className='flex items-center justify-center w-full'>
            <Loading />
          </div>
        ) : (
          <div className='flex flex-col gap-[1vw]'>
            {uniqueObjects?.length === 0 ? (
              <h4 className='text-[1.1vw]'>{result}</h4>
            ) : (
              uniqueObjects?.map((tour, index) => (
                <TourSearch
                  onClose={onClose}
                  data={tour}
                  key={index}
                  lang={lang}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PopupSearch
