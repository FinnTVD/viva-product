import { gql } from '@apollo/client'

const GET_POST = `
    query posts($language: LanguageCodeFilterEnum){
    posts(where: {language: $language}) {
      edges {
        node {
          id
          excerpt
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          language {
              code
              locale
          }
        }
      }
    }
  }
 `

const GET_ALL_POST = `
  query ($language: LanguageCodeFilterEnum!) {
    posts(where: { language: $language }) {
      nodes {
        id
        excerpt
        title
        slug
        blogdetail {
          heading
          time
          subtitle1
        }
        language {
          code
          locale
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
    page(id: "cG9zdDo1NjY=") {
      ourblog {
        heading1
        heading2
      }
    }
  }
`

const GET_ALL_POST_FILTER = gql`
  query GetAllPost(
    $language: LanguageCodeEnum!
    $offset: Int!
    $size: Int!
    $topicSlug: [String!]
    $categorySlug: [String!]
    $destinationSlug: [String!]
  ) {
    posts(
      first: 100,
      where: {
        offsetPagination: { offset: $offset, size: $size }
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
             { taxonomy: CATEGORY, operator: IN, terms: $categorySlug, field: SLUG }
            { taxonomy: TOPIC, operator: IN, terms: $topicSlug, field: SLUG }
            { taxonomy: COUNTRIES, operator: IN, terms: $destinationSlug, field: SLUG }
          ]
        }
      }
    ) {
      nodes {
        translation(language: $language) {
          id
          excerpt
          title
          slug
          blogdetail {
            heading
            time
            subtitle1
          }
          language {
            code
            locale
          }
          featuredImage {
            node {
              altText
              sourceUrl
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

const GET_ALL_TOURS_BESTSELLER = `
query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDo1NjY") {
    translation(language: $language) {
      ourblog {
        heading1
        heading2
        button
      }
    }
  }
  bestSeller(id:"dGVybToyODU="){
    tours{
      nodes{
        translation(language:$language){
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
                  sourceUrl
                  altText
                  title
                }
                icons
                location
                rate
                title
              }
            }
        }
      }
    }
  }
}
`

const GET_SERVICE_BY_CATEGORY = `
query ($language: LanguageCodeEnum!, $lang: LanguageCodeFilterEnum!) {
  categories(where: {language: $lang}) {
    nodes {
      posts {
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      translation(language: $language) {
        recommendservice{
          recommendservice{
            image{
              sourceUrl
            }
            related
          }
        }
        slug
        name
      }
    }
  }
}
  `

const GET_BEST_TOUR_BLOG_BY_COUNTRY = gql`
query GetFilterTour(
    $language: LanguageCodeEnum!
    $countrySlug: [String!]
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

export default GET_SERVICE_BY_CATEGORY
export { GET_POST, GET_ALL_POST, GET_ALL_POST_FILTER, GET_ALL_TOURS_BESTSELLER, GET_SERVICE_BY_CATEGORY, GET_BEST_TOUR_BLOG_BY_COUNTRY }
