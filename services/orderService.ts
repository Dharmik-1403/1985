
import { Order, CartItem, OrderStatus } from '../types';

export const getOrders = async (userId: string): Promise<Order[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // Generate mock orders
  return [
    {
      id: 'ORD-2024-8834',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      status: 'Shipped',
      total: 12500,
      trackingNumber: '1Z999AA10123456784',
      estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // +3 days
      items: [
        {
          id: 'shoe-1',
          name: 'Air Jordan 1 High "Chicago"',
          brand: 'Nike Air Jordan',
          category: 'Shoes' as any,
          price: 12500,
          description: '',
          imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800',
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-2023-1102',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
      status: 'Delivered',
      total: 4500,
      trackingNumber: '1Z999AA10123456799',
      estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
      items: [
        {
          id: 'hoodie-1',
          name: 'Nike Sportswear Club Fleece',
          brand: 'Nike',
          category: 'Hoodies' as any,
          price: 4500,
          description: '',
          imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800',
          quantity: 1
        }
      ]
    }
  ];
};
