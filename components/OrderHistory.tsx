import React, { useEffect, useState } from 'react';
import { Package, Truck, Calendar, MessageCircle, ExternalLink, Clock } from 'lucide-react';
import { Order } from '../types';
import { getOrders } from '../services/orderService';

interface OrderHistoryProps {
  userId: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(userId);
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2].map(i => (
          <div key={i} className="h-64 bg-gray-100/50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-end justify-between border-b border-timeless-dark pb-6">
        <h2 className="font-display text-3xl text-timeless-dark">Order History</h2>
        <span className="font-mono text-xs text-gray-500">{orders.length} RECORDS FOUND</span>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white border border-dashed border-gray-200">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-6" strokeWidth={1} />
          <p className="font-serif text-xl italic text-gray-400 mb-2">No archive found.</p>
          <p className="text-xs uppercase tracking-widest text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-500 group">
            
            {/* Order Header / Invoice Strip */}
            <div className="bg-gray-50/50 p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                   <h3 className="font-display text-lg text-timeless-dark">INVOICE #{order.id.split('-')[1]}</h3>
                   <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${
                     order.status === 'Delivered' ? 'border-green-200 text-green-700 bg-green-50' :
                     order.status === 'Shipped' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                     'border-yellow-200 text-yellow-700 bg-yellow-50'
                   }`}>
                     {order.status}
                   </span>
                </div>
                <p className="font-mono text-xs text-gray-500">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl text-timeless-dark">₹{order.total.toLocaleString('en-IN')}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Amount</p>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6 md:p-8">
              <div className="space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-timeless-dark mb-1">{item.name}</h4>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{item.brand}</p>
                      <p className="font-mono text-xs text-gray-400">Quantity: {item.quantity} &times; ₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Tracking */}
            <div className="px-6 md:px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center text-xs text-timeless-dark">
                    <Truck size={14} className="mr-3 text-timeless-gold" />
                    <span className="uppercase tracking-widest font-bold mr-2">Tracking ID:</span>
                    <span className="font-mono text-gray-500">{order.trackingNumber || 'Processing...'}</span>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="flex items-center text-xs text-timeless-dark">
                      <Clock size={14} className="mr-3 text-timeless-gold" />
                      <span className="uppercase tracking-widest font-bold mr-2">Est. Delivery:</span>
                      <span className="font-mono text-gray-500">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                  )}
               </div>

               <div className="flex w-full md:w-auto gap-4">
                  <button onClick={() => alert('Tracking details updated.')} className="flex-1 md:flex-none px-6 py-3 border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-timeless-dark hover:text-white transition-colors">
                    Track Package
                  </button>
                  <button onClick={() => window.location.href=`mailto:help@1985.com`} className="flex-1 md:flex-none px-6 py-3 bg-timeless-dark text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-timeless-gold transition-colors">
                    Support
                  </button>
               </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;