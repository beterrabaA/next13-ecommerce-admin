import SettingsForm from '@/components/SettingsForm'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface ISettingsPageProps {
  params: { storeId: string }
}

const page = async ({ params }: ISettingsPageProps) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default page
