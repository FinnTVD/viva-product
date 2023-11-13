const isProd = process.env.NODE_ENV === 'production'

export default function myImageLoader({ src, width, quality }) {
  // Run development
  if (!isProd) return `${src}?w=${width}&q=${quality || 75}`

  // Run Production
  // Public file
  // if (src.includes("wp-content/uploads")) return `${src}?w=${width}&q=${quality || 75}`

  if (!!src.includes('/_next/static/media/')) {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  let url = src.replace('?_i=AA', '')
  if (!!src.includes(process.env.NEXT_PUBLIC_ORIGIN_URL)) {
    url = src.replace(process.env.NEXT_PUBLIC_ORIGIN_URL, process.env.NEXT_PUBLIC_CDN_URL)
  }
  return url
  // if (!src.includes(process.env.NEXT_PUBLIC_ORIGIN_URL)) {
  //   let url = src
  //   if (!!src.includes('/_next/static/media/')) {
  //     let urls = src.split('.')
  //     urls.splice(-2, 1)
  //     url = urls.join('.')
  //     url = url.replace('/_next/static/media/', '')
  //   } else {
  //     url = url.replace('/images/', '')
  //   }

  //   return `${process.env.NEXT_PUBLIC_CDN_URL}/public/${url}`
  // }

  // // Other file
  // const url = src.replace(process.env.NEXT_PUBLIC_ORIGIN_URL, process.env.NEXT_PUBLIC_CDN_URL)
  // return url
}
