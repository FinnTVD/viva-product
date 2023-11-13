'use client'
import searchIcon from '@/assets/images/search-normal.svg'
import calendar from '@/assets/images/calendarFilter.svg'
import wallet from '@/assets/images/wallet.svg'
import styleIcon from '@/assets/images/style-travel.svg'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useRef, useState } from 'react'
import Button from '@/components/Common/Button'
import { useRouter } from 'next/navigation'
import { createTheme } from '@mui/material'
function FilterBanner({ lang, dataFilter,slug }) {
  const refLink = useRef()
  const [travelStyle, setTravelStyle] = useState('')
  const [duration, setDuration] = useState('')
  const [budget, setBudget] = useState('')
  const router = useRouter()

  const handleChangeTravelStyle = (event) => {
    setTravelStyle(event.target.value)
  }
  const handleChangeDuration = (event) => {
    setDuration(event.target.value)
  }
  const handleChangeBudget = (event) => {
    setBudget(event.target.value)
  }

  const handleSort = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.name.split('-')[0]);
      var numB = parseInt(b?.name.split('-')[0]);
      return numA - numB;
    });
  }
  const arrBudget = dataFilter?.budget
  handleSort(arrBudget)

  const arrDuration = dataFilter?.duration
  handleSort(arrDuration)

  const arrCountry = dataFilter?.countries
  arrCountry?.sort(function(a, b) {
    var numA = parseInt(a?.country?.priority);
    var numB = parseInt(b?.country?.priority);
    return numA - numB;
  });

  const arrStyle = dataFilter?.style
  arrStyle?.sort(function(a, b) {
    var numA = parseInt(a?.banner?.travelStyleInfo?.priority);
    var numB = parseInt(b?.banner?.travelStyleInfo?.priority);
    return numA - numB;
  });

  function handleSearch(e) {
    const arrParams = []
    if(travelStyle || duration || budget) {
    
      if(travelStyle) {
        arrParams.push({'style':travelStyle})
      }
      if(duration) {
        arrParams.push({'duration':duration})
      }
      if(budget) {
        arrParams.push({'budget':budget})
      }
      const resultObject = {};
      arrParams.forEach(obj => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            resultObject[key] = obj[key];
          }
        }
      });
      const queryString = new URLSearchParams(resultObject).toString();
      var link = `/search?&country=${slug}&${queryString}`
      if(lang !== 'en') {
        link = `/search?&country=${slug}&${queryString}`
      }
      router.push(link)
    } else {
      router.push(`/search`)
    }
  }

  const option = {
    destination: 'Destination',
    budget : 'Budget',
    style: 'Travel Style',
    duration: 'Duration',
    day: 'day',
    search: 'Search',
    price: '$'
  }
  if(lang === 'fr') {
    option.duration = 'Durée'
    option.style =' Types de voyages'
    option.day ='Jour'
    option.search = 'Rechercher'
    option.price= '€'
  }
  if(lang === 'it') {
    option.style = 'Tipo di viaggio'
    option.duration ='Durata'
    option.budget = 'Budget'
    option.destination = 'Destinazione'
    option.day ='Giorno'
    option.search = 'Cerca'
    option.price= '€'
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768
      }
    }
  })
  return (
    <div className='flex gap-x-[1.75vw]'>
      <div className='flex max-md:grid max-md:grid-cols-2 max-md:gap-[2.67vw] md:gap-x-[1.87vw] gap-y-[3.2vw] gap-x-[2.67vw] md:flex-nowrap flex-wrap md:justify-normal justify-between'>
        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
        <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.style}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={styleIcon}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={travelStyle}
                onChange={handleChangeTravelStyle}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.style
                  if(travelStyle !== "") {
                    const nameCountry = arrStyle?.find((item,index) => item?.slug === travelStyle)
                    name = nameCountry?.name
                  }
                  return name
                }}
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
                {arrStyle?.map((item, index) => (
                  <MenuItem value={item?.slug} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
          <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.duration}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={calendar}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={duration}
                onChange={handleChangeDuration}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.duration
                  if(duration !== "") {
                    const nameCountry = arrDuration?.find((item,index) => item?.name === duration)
                    name = nameCountry?.name + " " + option?.day
                  }
                  return name
                }}
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
                {arrDuration?.map((item, index) => (
                  <MenuItem value={item?.name} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.day}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
        <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.budget}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={wallet}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={budget}
                onChange={handleChangeBudget}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.budget
                  if(budget !== "") {
                    const nameCountry = arrBudget?.find((item,index) => item?.name === budget)
                    name = nameCountry?.name + " " + option.price
                  }
                  return name
                }}
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
                {arrBudget?.map((item, index) => (
                  <MenuItem value={item?.name} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.price}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Button
        ref={refLink}
        onClick={handleSearch}
        className='btn-primary'
      >
        <Image
          src={searchIcon}
          width={50}
          height={50}
          alt='search'
          className='w-[1.25vw] h-[1.25vw]'
        />
        {option.search}
      </Button>
    </div>
  )
}

export default FilterBanner
