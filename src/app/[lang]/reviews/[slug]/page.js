import getDataTourReview from "@/data/getDataTourReview"
import { getMeta } from "@/data/metaData/getMeta"
import getTourDetail from "@/data/tourDetail/getTourDetail"
import { DATA_RELATED_TOUR_REVIEW, REVIEW_DETAIl } from "@/graphql/customersReview/queries"
import ReviewDetail from "@/pageComponent/ReviewDetail/ReviewDetail"

export async function generateMetadata({ params: { slug, lang } }) {
  const res =  await getTourDetail(REVIEW_DETAIl,slug,lang)
  const title = res?.data?.customerReview?.translation?.title + " - " +res?.data?.customerReview?.translation?.customerReview?.tours?.title
  return getMeta(title, null, null)
}

async function page({ params: { lang, slug } }) {
  const data = await getTourDetail(REVIEW_DETAIl,slug,lang)
  const dataReview = data?.data?.customerReview?.translation
  const listCountry = dataReview?.customerReview?.tours?.countries?.nodes
  const countrySlug = listCountry?.map(item => item?.slug)
  const relatedTour = await getDataTourReview(
    {
      countrySlug: countrySlug,
      lang: lang
    },
    DATA_RELATED_TOUR_REVIEW
  )
  const relatedTourNotNull = relatedTour?.data?.allTours?.nodes.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })
  return (
    <ReviewDetail dataTour = {relatedTourNotNull} data={dataReview} lang={lang}/>
  )
}

export default page