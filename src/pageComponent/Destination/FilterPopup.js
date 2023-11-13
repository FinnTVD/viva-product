'use client'
import searchIcon from '@/assets/images/search-normal.svg'
import calendar from '@/assets/images/calendarFilter.svg'
import wallet from '@/assets/images/wallet.svg'
import styleIcon from '@/assets/images/style-travel.svg'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/Common/Button'
import { useRouter } from 'next/navigation'
import { useClickOutside } from '@/helpers/customHooks'
import { createTheme } from '@mui/material'
function FilterPopup({ lang, dataFilter, slug }) {
  // const refLink = useRef(null)
  const searchRef = useRef()
  const popUp = useRef(null)
  const filterTourRef = useRef()
  let isFilterTourRef = useRef(false)
  const [travelStyle, setTravelStyle] = useState('')
  const [duration, setDuration] = useState('')
  const [budget, setBudget] = useState('')
  const [isOpen, setIsOpen] = useState(false)
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
    if (travelStyle || duration || budget) {
      if (travelStyle) {
        arrParams.push({ style: travelStyle })
      }
      if (duration) {
        arrParams.push({ duration: duration })
      }
      if (budget) {
        arrParams.push({ budget: budget })
      }
      const resultObject = {}
      arrParams.forEach((obj) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            resultObject[key] = obj[key]
          }
        }
      })
      const queryString = new URLSearchParams(resultObject).toString()
      var link = `/search?&country=${slug}&${queryString}`
      if (lang !== 'en') {
        link = `/search?&country=${slug}&${queryString}`
      }
      router.push(link)
    } else {
      router.push(`/search`)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600 && !isFilterTourRef.current) {
        searchRef.current.style.transform = 'translateX(0)'
        setTimeout(() => {
          filterTourRef.current.style.transform = 'translateX(0%)'
          filterTourRef.current.style.visibility = 'visible'
          filterTourRef.current.style.opacity = '1'
          setTimeout(() => {
            filterTourRef.current.style.transform = 'translateX(30%)'
            filterTourRef.current.style.visibility = 'hidden'
            filterTourRef.current.style.opacity = '0'
          }, 2000)
        }, 500)
        isFilterTourRef.current = true
      } else if (window.scrollY < 600 && isFilterTourRef.current) {
        searchRef.current.style.transform = 'translateX(300%)'
        filterTourRef.current.style.transform = 'translateX(30%)'
        filterTourRef.current.style.visibility = 'hidden'
        filterTourRef.current.style.opacity = '0'
        isFilterTourRef.current = false
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShow = (e) => {
    e.stopPropagation()
    if (popUp.current.classList && typeof popUp.current.classList.toggle === 'function') {
      popUp.current.classList.toggle('active')
    }
  }

  useClickOutside(popUp, (e) => {
    e.stopPropagation()
    if (popUp.current && !searchRef.current.contains(e.target)) {
      popUp.current.classList.remove('active')
    }
  })

  const option = {
    destination: 'Destination',
    budget : 'Budget',
    style: 'Travel Style',
    duration: 'Duration',
    day: 'day',
    price: '$',
    search: 'Search',
    filter: 'Filter tour'
  }
  if(lang === 'fr') {
    option.duration = 'Durée'
    option.style =' Types de voyages'
    option.day ='Jours'
    option.price= '€'
    option.search = 'Rechercher'
    option.filter = 'Visite guidée des filtres'
  }
  if(lang === 'it') {
    option.style = 'Tipo di viaggio'
    option.duration ='Durata'
    option.budget = 'Budget'
    option.destination = 'Destinazione'
    option.day ='Giorni'
    option.price= '€'
    option.search = 'Cerca'
    option.filter = 'Filtra tour'
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768
      }
    }
  })
  return (
    <div>
      <div className='fixed bottom-[6.44vw] z-[10] right-0 md:flex items-center h-12vw hidden'>
        <div
          onClick={handleShow}
          id='btn-search-animation'
          ref={searchRef}
          className='w-[4.5vw] h-[4.5vw] rounded-[50%] absolute right-[3.31vw] bg-[#FFD220] flex justify-center items-center flex-shrink-0 z-20'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
            <path
              d='M10.5413 19.2502C15.3508 19.2502 19.2497 15.3513 19.2497 10.5418C19.2497 5.73235 15.3508 1.8335 10.5413 1.8335C5.73186 1.8335 1.83301 5.73235 1.83301 10.5418C1.83301 15.3513 5.73186 19.2502 10.5413 19.2502Z'
              stroke='#171717'
              strokeWidth='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M20.1663 20.1668L18.333 18.3335'
              stroke='#171717'
              strokeWidth='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <div
          ref={filterTourRef}
          id='filterTourBlock'
          className=' py-[0.75vw] absolute  right-[5vw] h-fit px-[1.19vw] bg-[#FFD220] inline-flex justify-center items-center gap-[0.625vw] rounded-tl-[3.0625vw] rounded-bl-[3.0625vw] '
        >
          <span className='text-[1vw] text-[#171717] font-normal leading-[130%]'>{option.filter}</span>
          <div className='flex w-[1.375vw] h-[1.375vw] justify-center items-center'></div>
        </div>
      </div>
      <div
        ref={popUp}
        className='md:grid hidden z-20 grid-cols-2 filterPopUp gap-y-[2.12vw] gap-x-[2.25vw] justify-items-end rounded-[1vw] shadow-lg bg-white fixed bottom-[8.94vw] right-[6.13vw] items-center w-[28.6vw] pt-[2.5vw] pr-[2.125vw] pb-[2.18vw] pl-[2.1875vw]'
      >
        <div className='flex flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
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
                  <MenuItem value={item?.slug} key={index} className='filter-item'>
                    <span className='filter-item md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
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
                    name = nameCountry?.name+" "+ option.day
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
                  <MenuItem value={item?.name} key={index} className='filter-item'>
                    <span className='filter-item md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.day}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
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
                    name = nameCountry?.name+" "+ option.price
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
                  <MenuItem value={item?.name} key={index} className='filter-item'>
                    <span className='filter-item md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.price}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button onClick={handleSearch} className='btn-primary w-fit '>
          <Image src={searchIcon} width={50} height={50} alt='search' className='w-[1.25vw] h-[1.25vw]' />
          {option.search}
        </Button>
      </div>
    </div>
  )
}

export default FilterPopup
