'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { createTheme, FormControl, MenuItem, Select, useMediaQuery } from '@mui/material'
import { Button } from '@mui/base'
import { CHECK_VISA } from '@/graphql/checkVisa/queries'
import { useQuery } from '@apollo/client'
import { useData } from './DataContext'
import scrollDown from '@/helpers/scrollDown'
import Loading from '@/components/Common/Loading'
function Banner({ data, dataFilter, lang }) {
  const [nationality, setNationality] = useState('')
  const [country, setCountry] = useState('')
  const { dataB, setDataB } = useData(null)
  const [isLoading, setIsLoading] = useState(false);
  const refScroll = useRef()
  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768
      }
    }
  })
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleChangeNation = (e) => {
    setNationality(e.target.value)
  }
  const handleChangeCountry = (e) => {
    setCountry(e.target.value)
  }
  const dataVisa = useQuery(CHECK_VISA, {
    variables: {
      language: lang?.toUpperCase(),
      countryFrom: nationality,
      countryTo: country
    }
  })

  const handleCheck = function () {
    if(nationality !== "" && country !== "") {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        scrollDown(refScroll,'start')
        if (dataVisa) {
          var dataCheckVisa = dataVisa?.data?.allVisa?.nodes
        }
        if (dataCheckVisa) {
          var contentVisa = dataCheckVisa[0]?.checkVisa?.content
          var titleVisa = dataCheckVisa[0]?.checkVisa?.title
          const data = {
            contentVisa,
            titleVisa
          }
          setDataB(data)
        }
      }, 1500);
    } 
  }
  const dataBanner = data?.checkvisa?.banner
  let textCountry = 'Country'
  let choose = 'Please choose country !!!'
  if(lang === 'fr') {
    textCountry = 'Pays'
    choose === 'Veuillez choisir un pays !!!'
  }
  if(lang === 'it') {
    textCountry = 'Paese'
    choose='Per favore scegli il paese !!!'
  }

  return (
    <div className='relative'>
      <div className='md:h-[100vh] h-[216.53333vw] visaBanner relative flex md:items-center'>
      <Image
        alt='banner'
        src={onlySmallScreen ? dataBanner?.imagebannermobile?.sourceUrl : dataBanner?.imagebanner?.sourceUrl}
        width={1000}
        height={1000}
        quality={100}
        className='h-full absolute w-full z-[1] object-cover'
      />
      <Image
        alt='banner'
        src={dataBanner?.imageuser?.sourceUrl}
        quality={100}
        width={200}
        height={200}
        className='md:w-[31.125vw] md:h-[41.875vw] w-[60.26667vw] h-[81.6vw] object-cover absolute bottom-0 md:right-[8vw] right-0 z-[3] '
      />
      <div className='bg-overlayBanner absolute right-0 h-[100vh] w-[47.93vw] top-0 z-[2] md:block hidden'></div>
      <div className='bg-overlayBanner2 absolute w-full md:h-[12.4375vw] h-[26.13333vw] bottom-0 z-[3]'></div>
      <div className='flex flex-col relative z-10 md:pl-[8.13vw] md:pt-0 pt-[27.73vw] md:pr-0 px-[4.27vw]'>
        <h2 className='font-optima text-white md:text-[2.875vw] text-[5.86667vw] capitalize font-semibold leading-[120%] md:w-[37vw] mb-[6.13vw] md:mb-[2.5vw] mt-[3vw]'>
          {dataBanner?.heading}
        </h2>

        <p className='text-white xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw] leading-[1.5] md:mb-[1vw] mb-[2.13333vw]'>
          {dataBanner?.nationalchoice}
        </p>
        <FormControl
          inputprops={{ 'aria-label': 'Without label' }}
          sx={{
            maxWidth: '35.875vw',
            [theme.breakpoints.down('sm')]: {
              maxWidth: '100%',
              '& .MuiSelect-select': {
                fontSize: '3.733vw',
                lineHeight: '1.3'
              }
            },
            '&.MuiFormControl-root': {
              margin: 0
            },
            '& .MuiInputBase-root': {
              color: '#fff',
              fontSize: '1vw'
            }
          }}
        >
          <Select value={nationality} 
            onChange={handleChangeNation} 
            className='text-white' 
            displayEmpty
            sx={{
              '& .MuiSelect-outlined': {
                padding: '0.7rem'
              }
            }}
            renderValue={() => {
              let nameCountryFrom = textCountry
              if(nationality !== "") {
                const countryF = dataFilter?.countryFrom?.find((item,index) => item?.slug === nationality)
                nameCountryFrom = countryF?.name
              }
              return nameCountryFrom
            }}
            >
            {/* <MenuItem value=''
              sx={{
                '&.Mui-selected': {
                  background: 'rgba(255, 210, 32, 0.7)'
                }
              }}
            >
              <span className='xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw] leading-[1.5]'>{textCountry}</span>
            </MenuItem> */}
            {dataFilter?.countryFrom?.map((item, index) => (
              <MenuItem value={item?.slug} key={index}
              sx={{
                '&.Mui-selected': {
                  background: 'rgba(255, 210, 32, 0.7)'
                }
              }}
              >
                <span className='xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw] leading-[1.5] '>{item?.name}</span>
              </MenuItem>
            ))}
          </Select>
          {nationality === "" && <p className='mt-1 text-[#de0b0be6] text-[3.7333vw] md:text-[1vw]'>{choose}</p>}
        </FormControl>
        <p className='text-white xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw] leading-[1.5] md:mb-[1vw] md:mt-[1.5vw] mb-[2.13333vw] mt-[6.4vw]'>
          {dataBanner?.countrychoice}
        </p>
        <FormControl
          inputprops={{ 'aria-label': 'Without label' }}
          sx={{
            maxWidth: '35.875vw',
            [theme.breakpoints.down('sm')]: {
              maxWidth: '100%',
              '& .MuiSelect-select': {
                fontSize: '3.73vw',
                lineHeight: '1.3'
              }
            },
            '&.MuiFormControl-root': {
              margin: 0
            },
            '& .MuiInputBase-root': {
              color: '#fff',
              fontSize: '1vw'
            }
          }}
        >
          <Select 
            sx={{
              '& .MuiSelect-outlined': {
                padding: '0.7rem'
              }
            }}
            onChange={handleChangeCountry} 
            value={country} 
            className='text-white' 
            displayEmpty
            renderValue={() => {
              let nameCountryTo = textCountry
              if(country !== "") {
                const countryTo = dataFilter?.countryTo?.find((item,index) => item?.slug === country)
                nameCountryTo = countryTo?.name
              }
              return nameCountryTo
            }}
            >
            {/* <MenuItem value=''
              sx={{
                '&.Mui-selected': {
                  background: 'rgba(255, 210, 32, 0.7)'
                }
              }}
            >
              <span className='xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw]   leading-[1.5] '>
                {textCountry}
              </span>
            </MenuItem> */}
            {dataFilter?.countryTo?.map((item, index) => (
              <MenuItem value={item?.slug} key={index}
              sx={{
                '&.Mui-selected': {
                  background: 'rgba(255, 210, 32, 0.7)'
                }
              }}
              >
                <span className='xl:text-[1vw] md:text-[1.5vw] text-[3.73333vw]  leading-[1.5] '>
                  {item?.name}
                </span>
              </MenuItem>
            ))}
          </Select>
          {country === "" && <p className='mt-1 text-[#de0b0be6] text-[3.7333vw] md:text-[1vw]'>{choose}</p>}
        </FormControl>

        <Button
          className='bg-primaryColor btn-primary md:rounded-[0.75vw] rounded-[2.13333vw] w-fit md:mt-[3.13vw] mt-[8.53vw] px-[7.73vw] py-[3.2vw] md:px-[2.88vw] md:py-[1.25vw]'
          onClick={handleCheck} content={dataBanner?.button}
        >
          <span className='font-medium text-textColor'>
            {dataBanner?.button}
          </span>
        </Button>
        </div>
      </div>
      {isLoading && 
      <div className='fixed inset-0 z-50' style={{background: 'rgba(255,255,255,0.5)'}}>
        <div className='flex items-center justify-center w-full h-full text-center'>
          <Loading/>
        </div>
      </div>}
    <div ref={refScroll}></div>
    </div>
  )
}

export default Banner
