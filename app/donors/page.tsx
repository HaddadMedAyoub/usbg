//donors/page.tsx
import type { Metadata } from 'next'
import DonorsPage from '@/components/blocks/DonorsPage'

export const metadata: Metadata = {
  title: 'الداعمون | USBG',
  description: 'أبطال خلف الكواليس — كل دينار يبني مستقبل الاتحاد',
}

export default function Page() {
  return <DonorsPage />
}
