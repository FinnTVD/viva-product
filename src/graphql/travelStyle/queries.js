import { gql } from '@apollo/client'

const GET_INFO_PAGE_TRAVEL_STYLE = `query getInfoPageTravelStyle($taxonomyValue: ID!, $language: LanguageCodeEnum!) {
  tourStyle(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      slug
      banner {
        tourstylename
        banner {
          desc
          heading
          subdesc
          title
          banner {
            altText
            sourceUrl
          }
        }
        
        hotTour {
          title
          hotTour {
            ... on Tours {
              translation(language: $language) {
                id
                slug
                bestSeller {
                  nodes {
                    name
                  }
                }
                tourDetail {
                  priceTour
                  banner {
                    gallery {
                      title
                      altText
                      sourceUrl
                    }
                    rate
                    title
                    location
                    icons
                  }
                }
              }
             
            }
          }
        }
        groupbutton {
          buttonseemore
        }
      }
    }
  }
}`

const GET_LIST_TRAVEL_STYLE_NAME = `query getTourStyleName($language: LanguageCodeFilterEnum) {
  allTourStyle(first: 50,where: {language: $language}) {
    nodes {
      id
      name
      banner {
        travelStyleInfo {
          priority
          travelStyleImage {
          altText
          sourceUrl
        }
        travelStyleName
        }
      }
      slug
    }
  }
}`

const GET_LIST_TOUR_TRAVEL_STYLE_CLIENT = gql`
  query getTourStyle(
    $language: LanguageCodeEnum!
    $taxonomyValue: String
    $taxonomyName: TaxonomyEnum
    $offset: Int!
    $size: Int!
  ) {
    allTours(
      where: {
        taxQuery: {
          taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
          relation: AND
        }
        offsetPagination: { offset: $offset, size: $size }
      }
    ) {
      edges {
        node {
          translation(language: $language) {
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
            id
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

const GET_META_DATA = `query ($slug: ID!, $language: LanguageCodeEnum!) {
  tourStyle(id: $slug, idType: SLUG) {
    translation(language: $language) {
      banner {
        meta {
          title
          description
        }
      }
    }
  }
}`

const DATA_WHY_TRAVEL = `query getWhyTravel(
  $language: LanguageCodeEnum!
){
page(id: "cG9zdDozMDYw") {
  translation(language: $language) {
    title
    tourStyle {
      whytravel {
        text
        reason {
          image {
            sourceUrl
          }
          title
          content
        }
      }
    }
  }
}
}`

export { GET_INFO_PAGE_TRAVEL_STYLE, GET_LIST_TRAVEL_STYLE_NAME, GET_LIST_TOUR_TRAVEL_STYLE_CLIENT, GET_META_DATA, DATA_WHY_TRAVEL }
