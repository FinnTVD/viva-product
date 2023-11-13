import getAboutUsData from '@/data/aboutUs/getAboutUsData'
import getDataPost from '@/data/getDataPost'
import getDataYear from '@/data/getDataYear'
import { getMeta } from '@/data/metaData/getMeta'
import getMetaDataPages from '@/data/metaData/getMetaDataPages'
import { GET_META_DATA, GET_REVIEWS_DATA } from '@/graphql/aboutUs/reviews/queries'
import { DATA_TAXONOMIES_COUNTRY } from '@/graphql/filter/queries'
import IndexAboutUs from '@/pageComponent/AboutUs'

const getYearReview = `query {
  allYears {
    nodes {
      name
    }
  }
}`
export async function generateMetadata({ params: { lang } }) {
  const res = await getMetaDataPages(GET_META_DATA, lang)

  const { aboutUsReviews } = res?.data?.page?.translation

  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = aboutUsReviews?.meta?.title
  const excerpt = aboutUsReviews?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

export default async function page({ params: { lang } }) {
  const res = await getAboutUsData(GET_REVIEWS_DATA, lang)
  const dataCountry = await getDataPost(lang, DATA_TAXONOMIES_COUNTRY)
  const dataYear = await getDataYear(getYearReview)
  const arrCountry = dataCountry?.data?.allCountries?.nodes
  arrCountry?.sort(function(a, b) {
    var numA = parseInt(a?.country?.priority);
    var numB = parseInt(b?.country?.priority);
    return numA - numB;
  });
  const arrYear = dataYear?.data?.allYears?.nodes?.map(item => item?.name)
  return (
    <IndexAboutUs
      res={res}
      lang={lang}
      arrCountry={arrCountry}
      arrYear={arrYear}
    />
  )
}
