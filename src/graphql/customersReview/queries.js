import { gql } from '@apollo/client'

export const GET_All_CUSTOMERS_REVIEW = gql`
query GetDataPageReview($language: LanguageCodeEnum!, $offset: Int!, $size: Int!, $yearSlug: [String!], $countrySlug: [String!]) {
  allCustomerReview(
    first: 100,
    where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: DESC}, taxQuery: {taxArray: [{taxonomy: YEARS, operator: IN, terms: $yearSlug, field: NAME}, {taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: SLUG}]}}
  ) {
    nodes {
      translation(language: $language) {
        slug
        customerReview {
          content
          authorInformation {
            name
            country
            thumbnail {
              sourceUrl
            }
          }
          tours {
            ...on Tours {
              title
              slug
              tourDetail {
                banner {
                  gallery {
                    altText
                    title
                    sourceUrl
                  }
                  location
                  title
                }
                numberDay
              }
            }
          }
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
export const GET_REVIEWS = `query ($language: LanguageCodeEnum!) {
  allCustomerReview(first: 4) {
    nodes {
      translation(language: $language) {
        customerReview {
          authorInformation {
            country
            name
            thumbnail {
              altText
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
}`

export const GET_ALL_REVIEWS = `query GetAllCustomersReview($language: LanguageCodeEnum!) {
  allCustomerReview {
    pageInfo {
      hasNextPage
      hasPreviousPage
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
     translation (language: $language) {
      slug
       customerReview {
        content
        authorInformation {
          country
          name
          thumbnail {
            altText
            sourceUrl
          }
        }
        tours {
          ... on Tours {
            slug
            tourDetail {
              banner {
                gallery {
                  altText
                  title
                  sourceUrl
                }
                location
                title
              }
              numberDay
            }
            countries {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
    }
  }
}`

export const REVIEW_DETAIl = `
query getReviewDetail($slug: ID!, $language: LanguageCodeEnum!){
  customerReview(id:$slug,idType: URI) {
    translation(language:$language) {
			slug
      title
        customerReview {
          albumImage {
            sourceUrl
            altText
            title
          }
          content
          time
          authorInformation {
            name
            country
            thumbnail {
              sourceUrl
            }
          }
          tours {
            ...on Tours {
              title
              slug
              countries {
                nodes {
                  name
                  slug
                }
              }
              tourDetail {
                banner {
                  video {
                    overlayImage {
                      sourceUrl
                    }
                   	uploadVideo {
                      mediaItemUrl
                    }
                  }
                  gallery {
                    altText
                    title
                    sourceUrl
                  }
                  location
                  title
                }
                numberDay
              }
            }
          }
        }
    }
  }
}
`

export const DATA_RELATED_TOUR_REVIEW = `query GetRelateTourReview(
  $countrySlug: [String!]
  $language: LanguageCodeEnum!
) {
  allTours(
    first: 100,
    where: {
      taxQuery: {
        taxArray: [
          { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: SLUG }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
  ) {
    nodes {
      translation(language: $language) {
        id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
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
            icons
          }
        }
      }
    }
  }
}`