"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function NotFound({lang}) {
  const router = useRouter()
  router.push(`/${lang}`)
  return (
    <Link href={`/${lang}`}></Link>
  )
}
