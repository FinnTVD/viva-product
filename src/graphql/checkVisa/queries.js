import { gql } from "@apollo/client"

const COUNTRY_TO = `
query($language: LanguageCodeFilterEnum!) {
  allToCountry(first: 50, where : {language: $language}) {
    nodes {
     name
      slug
      description
    }
  }
}`

const COUNTRY_FROM = `
query($language: LanguageCodeFilterEnum!) {
  allFromCountry(first: 50, where : {language: $language}) {
    nodes {
     name
      slug
      description
    }
  }
}`

const CHECK_VISA = gql`
query CheckVisaTour($language:LanguageCodeFilterEnum, $countryFrom: [String!], $countryTo: [String!]) {
  allVisa(
    first: 50
    where: {language: $language,taxQuery: {taxArray: [{taxonomy: FROMCOUNTRY, operator: IN, terms: $countryFrom, field: SLUG}, {taxonomy: TOCOUNTRY, operator: IN, terms: $countryTo, field: SLUG}]}, orderby: {field: DATE, order: DESC}}
  ) {
    nodes {
      id
        title
        slug
        checkVisa {
          title
          content
        }
    }
  }
}`
export {COUNTRY_TO, COUNTRY_FROM,CHECK_VISA}