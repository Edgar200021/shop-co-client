import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader/PageLoader'

interface Props {
  className?: string
}

export default function VerifyAccount({ className }: Props) {
  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp">
        <div className="max-w-[800px] w-full"></div>
      </div>
    </main>
  )
}
