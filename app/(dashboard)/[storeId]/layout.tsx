import { ReactNode } from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import Navbar from '@/components/Navbar'

interface IDashboardProps {
  children: ReactNode
  params: { storeId: string }
}

export default async function Dashboard({ children, params }: IDashboardProps) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) redirect('/')

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
