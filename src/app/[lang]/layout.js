import { idEn, idFr, idIt } from '@/data/getDataPage'
import Footer from '../../components/Common/Footer'
import ThemeRegistry from '../../components/ThemeRegistry/ThemeRegistry'

// Swiper
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
// Aos
import 'aos/dist/aos.css'
// style css
import './globals.css'
import '../../scss/main.scss'
import '../../assets/fonts/stylesheet.css'
import getDataPage from '@/data/getDataPage'
import getDataPost from '@/data/getDataPost'
import { DATA_MENU_COUNTRY } from '@/graphql/country/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
import getDataWithTaxonomy from '@/data/getDataWithTaxonomy'
import ApolloClientProvider from '../apolloProvider'
import getHotDealHeader from '@/data/hotDeal'
import { DATA_HEADER, GET_SOCIAL_MOBILE, GET_INFO_CONTACT } from '@/graphql/home/queries'
import GET_SERVICE_BY_CATEGORY from '@/data/getDataRcmServices'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_DATA_MENU_WWR } from '@/graphql/aboutUs/who-we-are/queries'
import getAboutUsData from '@/data/aboutUs/getAboutUsData'
import { GET_DATA_MENU_RT } from '@/graphql/aboutUs/responsible-travel/queries'
import { GET_DATA_MENU_RV } from '@/graphql/aboutUs/reviews/queries'
import Navbar from '@/components/Common/Navbar'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import { Suspense } from 'react'
import Loader from '@/components/Common/Loader'
import SearchButton from '@/pageComponent/Home/SearchButton'
import PopupPromotion from '@/components/Common/PopupPromotion'
import { DATA_POPUP_VOUCHER } from '@/graphql/hotDeal/queries'
import ChatTawkto from '@/components/Common/ChatTawkto'


const idEnBook = 'cG9zdDoxNDIy'
const idFrBook = 'cG9zdDoxODQ1'
const idItBook = 'cG9zdDoxODQz'

const linkChatFr = 'https://embed.tawk.to/6551cf91958be55aeaaefe7b/1hf3p5kpr'
const linkChatIt = 'https://embed.tawk.to/6551cfd4958be55aeaaefe8f/1hf3p7lvq'
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }, { lang: 'fr' }]
}
export const metadata = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}
export default async function RootLayout({ children, params }) {
  let data
  let dataBookTour
  let dataMenuCountry
  let recommendserviceList
  let socialMobile
  if (params.lang === 'en') {
    data = await getDataPage(idEn, DATA_HEADER)
    dataMenuCountry = await getDataPost('EN', DATA_MENU_COUNTRY)
    recommendserviceList = await getDataPost('EN', GET_SERVICE_BY_CATEGORY)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idEnBook, params.lang)
    socialMobile = await getDataPost('EN', GET_SOCIAL_MOBILE)
  }
  if (params.lang === 'it') {
    data = await getDataPage(idIt, DATA_HEADER)
    dataMenuCountry = await getDataPost('IT', DATA_MENU_COUNTRY)
    recommendserviceList = await getDataPost('IT', GET_SERVICE_BY_CATEGORY)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idItBook, params.lang)
    socialMobile = await getDataPost('IT', GET_SOCIAL_MOBILE)
  }
  if (params.lang === 'fr') {
    data = await getDataPage(idFr, DATA_HEADER)
    dataMenuCountry = await getDataPost('FR', DATA_MENU_COUNTRY)
    recommendserviceList = await getDataPost('FR', GET_SERVICE_BY_CATEGORY)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idFrBook, params.lang)
    socialMobile = await getDataPost('FR', GET_SOCIAL_MOBILE)
  }

  const dataHome = data?.data?.page?.home
  const travelStylesList = await getDataWithTaxonomy({ lang: params.lang || 'EN' }, GET_LIST_TRAVEL_STYLE_NAME)

  //get header of hotDeal
  const result = await getHotDealHeader(params.lang)
  const hotDeals = result?.data?.page?.translation?.hotDeals
  // get data of menu - about-us
  const wwrRes = await getAboutUsData(GET_DATA_MENU_WWR, params.lang)
  const rtRes = await getAboutUsData(GET_DATA_MENU_RT, params.lang)
  const rvRes = await getAboutUsData(GET_DATA_MENU_RV, params.lang)
  //
  const dataTaxonomiesCountry = await getDataPost(params.lang, DATA_TAXONOMIES_COUNTRY)
  const dataTaxonomiesStyleTour = await getDataPost(params.lang, DATA_TAXONOMIES_TOUR_STYLE)
  const dataTaxonomiesBudget = await getDataPost(params.lang, DATA_TAXONOMIES_BUDGET)
  const dataTaxonomiesDuration = await getDataPost(params.lang, DATA_TAXONOMIES_DURATION)
  let contactInfo = await getDataPost(params.lang, GET_INFO_CONTACT)
  contactInfo = contactInfo?.data?.page?.translation?.home?.footer?.column1?.contact

  const dataPopupVoucher = await getDataPost(params.lang, DATA_POPUP_VOUCHER)
  const isPopup = dataPopupVoucher?.data?.page?.translation?.popupPromotion?.thumbPopup === null
  return (  
    <html lang={params.lang}>
      <body suppressHydrationWarning={true}>
        <ApolloClientProvider>
          <ThemeRegistry>
            <Suspense fallback={<Loader />}>
              <Navbar
                socialMobile={socialMobile}
                dataTaxonomiesCountry={dataTaxonomiesCountry}
                dataTaxonomiesStyleTour={dataTaxonomiesStyleTour}
                dataTaxonomiesBudget={dataTaxonomiesBudget}
                dataTaxonomiesDuration={dataTaxonomiesDuration}
                travelStylesList={travelStylesList}
                lang={params.lang}
                dataHome={dataHome?.header}
                dataMenuCountry={dataMenuCountry?.data?.allCountries?.nodes}
                hotDeals={hotDeals}
                rcmServicesList={recommendserviceList}
                dataBookTour={dataBookTour}
                contactInfo={contactInfo}
                dataAboutUs={{
                  wwrRes: wwrRes?.data?.page?.translation,
                  rtRes: rtRes?.data?.page?.translation,
                  rvRes: rvRes?.data?.page?.translation
                }}
              />
              <SearchButton lang={params.lang} />
              {!isPopup && <PopupPromotion lang={params.lang} data={dataPopupVoucher?.data?.page?.translation}/>}
              {params.lang === 'fr' && <ChatTawkto url={linkChatFr}/>}
              {params.lang === 'it' && <ChatTawkto url={linkChatIt}/>}
              {children}
              <Footer lang={params.lang} />
            </Suspense>
          </ThemeRegistry>
        </ApolloClientProvider>
        {/* <div className='flex items-center justify-center w-full h-screen overflow-hidden'>
          <div className='relative w-[25vw] h-[25vw]'>
            <h1 className='text-[2vw] font-bold absolute bottom-[-2vw] left-1/2 -translate-x-1/2 w-fit whitespace-nowrap'>
              Something big is coming ...
            </h1>
            <Image
              className='object-contain z-[5]'
              src={src}
              alt='bao tri'
              fill
              sizes='100vw'
            />
          </div>
          <Image
            className='absolute top-[2vw] left-[2vw] w-[5vw] h-[5vw] object-contain'
            src={logoSrc}
            alt='logo viva'
          />
        </div> */}
      </body>
    </html>
  )
}
