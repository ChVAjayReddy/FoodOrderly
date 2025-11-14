const Cart = (props) => {
  const { cartitems } = props;
  return (
    <div>
      <table className="shadow-lg  m-10 w-3/4 mx-auto text-center border-2 border-black">
        <tr className="shadow-md bg-[#FF6B00] text-white">
          <th>S No</th>
          <th>Item Name</th>
          <th>Item Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
        {cartitems.map((recipe, index) => (
          <tr className="shadow-md bg-white " key={index}>
            <td>{index + 1}</td>
            <td>{recipe.name}</td>
            <td>{recipe.quantity}</td>
            <td>{recipe.price}</td>
            <td>{recipe.total}</td>
          </tr>
        ))}
      </table>
      <p>Total : {cartitems.reduce((recipe, num) => recipe.total + num, 0)}</p>
    </div>
  );
};
export default Cart;
// import React from "react";

// function Cart({ cartItems }) {
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         <img
//           src="/empty-cart.svg"
//           alt="Empty cart"
//           className="w-48 mb-4 opacity-70"
//         />
//         <h2 className="text-2xl font-semibold text-gray-700">
//           Your cart is empty 🍽️
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Add some delicious meals to your cart!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-4 text-orange-500">🛒 Your Cart</h1>

//       {cartItems.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-3"
//         >
//           <div className="flex items-center space-x-3">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 rounded-lg object-cover"
//             />
//             <div>
//               <h2 className="text-lg font-semibold">{item.name}</h2>
//               <p className="text-sm text-gray-500">₹{item.price}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//               className="px-2 bg-gray-200 rounded"
//             >
//               -
//             </button>
//             <span>{item.quantity}</span>
//             <button
//               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//               className="px-2 bg-gray-200 rounded"
//             >
//               +
//             </button>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-500 text-sm ml-3"
//             >
//               🗑️
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Summary Section */}
//       <div className="bg-white rounded-xl shadow-md p-4 mt-6">
//         <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>₹{total.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax (5%)</span>
//           <span>₹{(total * 0.05).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
//           <span>Total</span>
//           <span>₹{(total * 1.05).toFixed(2)}</span>
//         </div>
//         <button className="w-full bg-orange-500 text-white py-2 mt-4 rounded-lg hover:bg-orange-600 transition">
//           Proceed to Checkout →
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Cart;
