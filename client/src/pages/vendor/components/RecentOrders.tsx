export const RecentOrders = () => {
  const orders = [
    { id: '#123', amount: '₹450', status: 'Pending' },
    { id: '#124', amount: '₹320', status: 'Delivered' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
      <h3 className="font-bold mb-4">Recent Orders</h3>

      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="flex justify-between text-sm">
            <span>{o.id}</span>
            <span>{o.amount}</span>
            <span className="text-gray-500">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
