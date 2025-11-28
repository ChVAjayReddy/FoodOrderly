import { useCart } from "../data/CartContext";

const MyOrders = () => {
  const { myorders, MyOrders } = useCart();
  console.log(myorders);

  const extractValue = (fieldValue) => {
    if (!fieldValue) return "N/A";
    if (fieldValue.stringValue) return fieldValue.stringValue;
    if (fieldValue.integerValue) return fieldValue.integerValue;
    if (fieldValue.doubleValue) return fieldValue.doubleValue;
    if (fieldValue.arrayValue) return fieldValue.arrayValue.values || [];
    return "N/A";
  };

  const getOrderMillis = (order) => {
    try {
      const ts = order._document?.data?.value?.mapValue?.fields?.ordertime;
      if (!ts) return null;

      const tv = ts.timestampValue;
      if (tv && typeof tv.toMillis === "function") return tv.toMillis();

      if (tv && tv.seconds) return Number(tv.seconds) * 1000;

      if (typeof tv === "string") {
        const parsed = Date.parse(tv);
        if (!isNaN(parsed)) return parsed;
      }

      const tsString =
        order._document?.data?.value?.mapValue?.fields?.timestamp?.stringValue;
      if (tsString) {
        const parsed = Date.parse(tsString);
        if (!isNaN(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("getOrderMillis error", e);
    }
    return null;
  };

  if (!myorders || myorders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-4xl text-center font-bold text-gray-800 mb-3">
            No Orders Yet
          </h2>
          <p className="text-gray-600 text-lg">
            Start ordering your favorite meals today!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 My Orders</h1>
        <p className="text-gray-600">Track your order history and status</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myorders.map((order, index) => {
          const orderData =
            order._document?.data?.value?.mapValue?.fields || {};
          const totalAmount = extractValue(orderData.totalAmount);
          const itemsField = orderData.orderItems || orderData.items;
          const items = Array.isArray(extractValue(itemsField))
            ? extractValue(itemsField).length
            : extractValue(itemsField) || "N/A";
          const dateString =
            orderData.timestamp?.stringValue ||
            orderData.date?.stringValue ||
            null;
          const date = dateString || new Date().toLocaleDateString();

          const orderMillis = getOrderMillis(order);
          const elapsed = orderMillis ? Date.now() - orderMillis : null;

          let timeStatus = "Pending";
          if (elapsed === null) timeStatus = "Unknown";
          else if (elapsed <= 120000) timeStatus = "⏳Pending";
          else if (elapsed <= 240000) timeStatus = "✔️Accepted";
          else if (elapsed <= 480000) timeStatus = "♨Preparing";
          else if (elapsed <= 960000) timeStatus = "🏍️Out for delivery";
          else timeStatus = "📦Delivered";

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Order #{index + 1}
                </h3>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    timeStatus === "📦Delivered"
                      ? "bg-green-100 text-green-800"
                      : timeStatus === "⏳Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {timeStatus}
                </span>
              </div>

              <div className="border-t border-gray-200 mb-4" />

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Order Date</p>
                  <p className="text-gray-800 font-semibold">{date}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm">Number of Items</p>
                  <p className="text-gray-800 font-semibold">{items}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-gray-600 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-[#FF6B00]">
                    ₹{totalAmount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#FF6B00] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#e65c00] transition">
                  View Details
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Reorder
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
