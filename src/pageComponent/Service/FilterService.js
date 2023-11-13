'use client'
import locationIcon from '@/assets/images/route-square-gr.svg'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

function FilterService({ handleDes, metaDestination, slug }) {
  const [destination, SetDestination] = useState('')

  const handleChangeDestination = (event) => {
    SetDestination(event.target.value)
    handleDes(event.target.value)
  }

  return (
    <div className='flex gap-[3.2vw] md:pt-[1.2vw] md:justify-normal justify-between md:mt-[3.5vw] ourBlog relative'>
      <div className='background max-md:hidden md:block'></div>
      <div className='flex flex-col select md:rounded-0 justify-center rounded-[1.06667vw] flex-shrink-0 md:w-auto max-md:h-[10.67vw] w-[43.53333vw]'>
        <div className='bgFilterMobile'></div>
        <div className='flex items-center select-mobile'>
          <Image
            src={locationIcon}
            width={100}
            height={100}
            alt='location'
            className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
          />
          <FormControl
            sx={{
              minWidth: '8.75vw',
              '&.MuiFormControl-root': {
                margin: 0
              }
            }}
          >
            <Select
              value={destination}
              onChange={handleChangeDestination}
              displayEmpty
              inputprops={{ 'aria-label': 'Without label' }}
              sx={{
                height: '2.5rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSvgIcon-root': {
                  right: 0
                },
                '& .MuiSelect-outlined': {
                  padding: 0,
                  paddingLeft: '0.62vw'
                }
              }}
            >
              <MenuItem value=''>
                <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                  Country
                </span>
              </MenuItem>
              {metaDestination?.map((destination, index) => (
                <MenuItem key={index} value={destination?.slug}>
                  <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                    {destination?.name}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default FilterService
