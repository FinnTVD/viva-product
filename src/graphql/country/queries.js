const DATA_MENU_COUNTRY = `
query country($language: LanguageCodeFilterEnum){
  allCountries(first: 50, where: {
    language: $language
  }) {
    nodes {
      slug
      name
      description
      country {
        priority
        flag {
          sourceUrl
        }
        thumb {
          sourceUrl
        }
      }
    }
  }
}
`

const DATA_COUNTRY = `
query getInfoCountry($taxonomyValue: ID!,$language: LanguageCodeEnum!) {
  countries(id: $taxonomyValue, idType: SLUG) {
    name
    slug
    translation(language: $language) {
      name
      slug
      description
      ourTour{
        subtitle
        btn
        titleBlogs
        titleReviews
        titleTours
        titleTrips
      }
      country {
        flag {
          sourceUrl
        }
        banner {
          img {
            sourceUrl
          }
          explore
          nameCountry
          text
        }
        info {
          population
          area
          language
          currency
          wheather
          timze
        }
        blogs {
          ... on Post {
            title
            slug
            featuredImage{
              node{
                sourceUrl
              }
            }
            blogdetail{
              subtitle1
            }
            dateGmt
          }
        }
      }
    }
  }
}
`
const DATA_ICONS_COUNTRY = `query($language: LanguageCodeEnum!){
  page(id:"cG9zdDozMDQ1" idType:ID){
    translation(language:$language){
      travelStyle{
        icons{
          image{
            sourceUrl
          }
          name
        }
      }
    }
  }
}`

const DATA_SLIDE_TOUR = `
query getTourStyle($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 50,
    where: {
      taxQuery: {
        taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
        relation: AND
      }
    }
  ) {
    nodes {
      translation(language: $language) {
          slug
          countries {
            nodes {
              name
            }
          }
          tourDetail {
            priceTour
            banner {
              location
              rate
              title
              gallery {
                sourceUrl
                altText
                title
              }
              icons
            }
          }
        }
    }
  }
}
`
const DATA_SLIDE_OTHER_TOUR = `
query getTourStyle($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 100,
    where: {
      taxQuery: {
        taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
        relation: AND
      }
    }
  ) {
    nodes {
      translation(language: $language) {
          slug
          bestSeller {
            nodes {
              name
            }
          }
          countries {
            nodes {
              name
            }
          }
          tourDetail {
            priceTour
            banner {
              location
              rate
              title
              gallery {
                sourceUrl
                altText
                title
              }
            }
          }
        }
    }
  }
}
`

const GET_DATA_BEST_SELLER_OURTOUR = `
query getTourStyle($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 100,
    where: {
      taxQuery: {
        taxArray: [
        { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN },
        { taxonomy: BESTSELLER, operator: IN, terms:"best-seller-tours", field: SLUG }]
        relation: AND
      }
    }
  ) {
    nodes {
      translation(language: $language) {
          slug
          bestSeller {
            nodes {
              name
            }
          }
          countries {
            nodes {
              name
            }
          }
          tourDetail {
            priceTour
            banner {
              location
              rate
              title
              gallery {
                sourceUrl
                altText
                title
              }
            }
          }
        }
    }
  }
}
`

const GET_META_DATA = `query ($slug: ID!, $language: LanguageCodeEnum!) {
  countries(id: $slug, idType: SLUG) {
    translation(language: $language) {
      country{
        meta{
          title
          description
        }
      }
    }
  }
}`

export {
  DATA_MENU_COUNTRY,
  DATA_COUNTRY,
  DATA_SLIDE_TOUR,
  DATA_SLIDE_OTHER_TOUR,
  GET_META_DATA,
  GET_DATA_BEST_SELLER_OURTOUR,
  DATA_ICONS_COUNTRY
}
