import prismadb from '@/lib/prismadb'

const page = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })
  return <div>Active Store:{store?.name}</div>
}

export default page
