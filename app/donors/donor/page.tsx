//donors/donor/page.tsx
import { Suspense } from 'react'
import DonorClient from './DonorClient'

export default function DonorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#F7C600]/30 border-t-[#F7C600] animate-spin" />
      </div>
    }>
      <DonorClient />
    </Suspense>
  )
}
