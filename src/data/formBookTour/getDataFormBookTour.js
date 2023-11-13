export default async function getDataFormBookTour(query, id, lang) {
  if (lang === 'it') {
    id = "cG9zdDoxODQz"
  } else if (lang === 'fr') {
    id = 'cG9zdDoxODQ1'
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: { id: id, language: lang?.toUpperCase() }
    }),
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
