import { format } from 'date-fns'

import { formatter } from '@/lib/utils'

import prismadb from '@/lib/prismadb'

import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'

const page = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    isPaid: item.isPaid,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((a, b) => {
        return a + Number(b.product.price)
      }, 0),
    ),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default page
