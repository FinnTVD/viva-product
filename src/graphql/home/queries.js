import { gql } from '@apollo/client'
const DATA_HEADER = `
query homePage($id:ID!){
    page (id: $id) {
        home {
          header {
            nav1
            nav2
            nav3
            nav4
            nav5
            nav6
            nav7
          }
        }
      }
}
`

const GET_HOME_PAGE = `query getHomePageData($id:ID!) {
  page(id: $id) {
      home {
        groupbutton{
        buttonbooktour
        buttonseemore
        }
        banner {
          fieldGroupName
          text
          background {
            sourceUrl
          }
        }
        survey {
          fieldGroupName
          text
          title
          type {
            icon {
              sourceUrl
            }
            text
          }
        }
        inspectionTrip {
          title
        }
        bestTour {
          fieldGroupName
          title
        }
        travelStyle {
          title
          desc
          travelStyleList {
            id
            slug
            banner {
              travelStyleInfo {
                travelStyleName	
                travelStyleImage {
                  altText
                  sourceUrl
                }
                textHomePage
                imageHomePage {
                  id
                  sourceUrl
                  altText
                }
              }
            }
          }
          desc
          title
        }
        representative {
        title
        desc
        members {
          img {
            altText
            sourceUrl
          }
          name
          role
          email
          telephone
        }
      }
        video {
          thumbnail {
            altText
            sourceUrl
          }
          label {
            line1
            line2
          }
          video {
            mediaItemUrl
            mimeType
          }
          videomb {
            mediaItemUrl
            mimeType
          }
          thumbnailmb {
            altText
            sourceUrl
          }
        }
        customerReview {
          fieldGroupName
          text
          title
          video
          customerReview {
            ... on CustomerReview {
              slug
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
          listReview {
            ... on CustomerReview {
              slug
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
        blogs {
          fieldGroupName
          title
          listBlog {
            ... on Post {
              id
              excerpt
              title
              slug
              dateGmt
              blogdetail {
								subtitle1
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              language {
                code
                locale
              }
            }
          }
        }
        footer {
          logoPartner {
            altText
            sourceUrl
          }
          column1 {
            contact {
              title
              content
            }
            linkFb
            linkLinked
            linkInstargram
            linkYoutube
          }
          column2 {
            title
            officesVietnam {
              title
              content
            }
          }
          column3 {
            title
            officesAboard {
              title
              content
            }
          }
          column4 {
            titlePayment
            imgsPayment {
              sourceUrl
              altText
            }
            titleForum
            imgsForum {
              img {
                sourceUrl
              }
              link
            }
          }
        }
      }
  }
}`

const GET_NEXT_STEP = `query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMzI5") {
    translation(language: $language) {
      aboutUsReviews {
        steps {
          heading
          step {
            title
          }
        }
      }
    }
  }
}`

const GET_FOOTER = `query getHomePageData($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxOQ==") {
    translation(language: $language) {
      home {
        footer {
          textDescription
          logoPartner {
            altText
            sourceUrl
          }
          column1 {
            contact {
              title
              content
            }
            linkFb
            linkLinked
            linkInstargram
            linkYoutube
          }
          column2 {
            title
            officesVietnam {
              title
              content
            }
          }
          column3 {
            title
            officesAboard {
              title
              content
            }
          }
          column4 {
            titlePayment
            imgsPayment {
              sourceUrl
              altText
            }
            titleForum
            imgsForum {
              img {
                sourceUrl
                altText
              }
              link
            }
          }
        }
      }
    }
  }
}
`

const GET_SOCIAL_MOBILE = `query getHomePageData {
  page(id: "cG9zdDoxOQ==") {
    translation(language: EN) {
      home {
        footer {
          column1 {
            linkFb
            linkLinked
            linkInstargram
            linkYoutube
          }
        }
      }
    }
  }
}
`

const GET_META_DATA = `query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxOQ==") {
    translation(language: $language) {
      home {
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

const GET_INFO_CONTACT = `query getInfoContact($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxOQ==") {
    translation(language: $language) {
      home {
        footer {
          column1 {
            contact {
              title
              content
            }
          }
        }
      }
    }
  }
}`

const GET_DATA_iNSEPECT = gql`query getDataInsepect(
    $language: LanguageCodeEnum!
    $categorySlug: [String!] 
    $destinationSlug: [String!]
  ) {
  posts(
    where: {
      taxQuery:
      {
        taxArray: [
        { taxonomy: CATEGORY, operator: IN, terms: $categorySlug, field: SLUG },
        { taxonomy: COUNTRIES, operator: IN, terms: $destinationSlug, field: SLUG }]
      }
  }
  ) {
    nodes {
      translation(language: $language) {
        id
        title
        slug
        featuredImage{
          node{
            sourceUrl
            altText
            title
          }
        }
        blogdetail {
          heading
          time
        }
        categories {
          nodes {
            name
          }
        }
        countries {
          nodes{
            name
          }
        }
      }
    }
  }
}`

const GET_INITIAL_FILTER = `
query($language : LanguageCodeFilterEnum!){
  allCountries (where:{language: $language}){
    nodes{
      taxonomyName
      slug
      name
    }
  }
  
  categories (where:{language: $language}){
    nodes{
      taxonomyName
      slug
      name
    }
  }
}
`
export { DATA_HEADER, GET_HOME_PAGE, GET_NEXT_STEP, GET_FOOTER, GET_META_DATA, GET_SOCIAL_MOBILE, GET_INFO_CONTACT, GET_DATA_iNSEPECT, GET_INITIAL_FILTER }
