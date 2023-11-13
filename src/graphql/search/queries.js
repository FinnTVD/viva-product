import { gql } from '@apollo/client'

const GET_TOUR_FILTER = `
query getTour($language: LanguageCodeFilterEnum) {
    allTours(first: 100,where: {language: $language}) {
      nodes {
        tourDetail {
          priceTour
          banner {
            gallery {
              altText
              title
              sourceUrl
            }
            location
            title
            rate
          }
        }
      }
    }
  }`

const DATA_ALL_TOUR = gql`
  query getAllTour($language: LanguageCodeEnum!) {
    allTours(first: 100) {
      nodes {
        translation(language: $language) {
          id
          title
          slug
          tourStyle {
            nodes {
              slug
            }
          }
          tourDetail {
            priceTour
            numberDay
            banner {
              title
              gallery {
                sourceUrl
                altText
                title
              }
              location
              rate
            }
          }
        }
      }
    }
  }
`

const GET_META_DATA = `query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMzQz") {
    translation(language: $language) {
      search {
        meta {
          title
          description
        }
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
    }
  }
}`

const GET_SEARCH_INFO = `
query getSearchInfo($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMzQ4") {
    translation(language: $language) {
      search {
        newRelated
        noResult {
          content
          fieldGroupName
          title
        }
        foundResults
        button
        title
        noResult {
          content
          title
        }
        navbar {
          budget
          destination
          duration {
            max
            maxValue
            min
            minValue
            title
          }
          selectYourInformation
          title
          travelStyles
        }
      }
    }
  }
}`
export { GET_TOUR_FILTER, DATA_ALL_TOUR, GET_META_DATA, GET_SEARCH_INFO }
