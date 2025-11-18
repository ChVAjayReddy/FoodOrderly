// import { useContext, useState } from "react";
// import { Link } from "react-router";
// import { useCart } from "../data/CartContext";
// const CartPage = () => {
//   const [address, setaddress] = useState(false);
//   const {
//     cartitems,
//     cartindex,
//     handleCart,
//     handlelocalcart,
//     addcart,
//     cart,
//     setcart,
//   } = useCart();
//   return (
//     <div>
//       {cartitems.length === 0 ? (
//         <h2 className="text-3xl text-center m-10">Your cart is empty!</h2>
//       ) : (
//         <div>
//           {" "}
//           <table className="shadow-lg  m-10 w-3/4 mx-auto text-center border-2 border-black">
//             <tr className="shadow-md bg-[#FF6B00] text-white">
//               <th>S No</th>
//               <th>Item Name</th>
//               <th>Item Quantity</th>
//               <th>Price</th>
//               <th>Total Price</th>
//             </tr>
//             {cartitems.map((recipe, index) => (
//               <tr className="shadow-md bg-white " key={index}>
//                 <td>{index + 1}</td>
//                 <td>{recipe.name}</td>
//                 <td>{recipe.quantity}</td>
//                 <td>{recipe.price}</td>
//                 <td>{recipe.total}</td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan={4}> Grand Total</td>
//               <td>{cartitems.reduce((acc, item) => acc + item.total, 0)}</td>
//             </tr>
//           </table>
//           <div className="flex justify-center items-center">
//             <button
//               className="bg-[#FF6B00] border-2 cursor-pointer rounded-md text-2xl text-white justify-items-center justify-center items-center p-2 m-10 hover:bg-[#e65c00] transition-colors duration-300"
//               onClick={() => {
//                 setaddress(true);
//                 setcart(0);
//               }}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//           <div
//             style={{ display: address ? "block" : "none" }}
//             className="border-2 rounded-md m-10 p-4 w-3/4 mx-auto justify-center items-center justify-items-center"
//           >
//             <h2 className="text-3xl mb-4">Enter your details</h2>
//             <form className="flex flex-col gap-4 m-10 w-1/2">
//               <label>Name</label>
//               <input type="text" className="border-2"></input>
//               <label>Mobile</label>
//               <input className="border-2" type="tel"></input>
//               <label>Email</label>
//               <input className="border-2" type="email"></input>
//               <label>Address</label>
//               <textarea className="border-2"></textarea>
//             </form>
//             <div className="flex justify-center items-center">
//               <Link to="/order-success">
//                 <button className="bg-[#FF6B00] cursor-pointer border-2 rounded-md text-2xl text-white justify-items-center justify-center items-center p-2 m-10 hover:bg-[#e65c00] transition-colors duration-300">
//                   Complete the Order
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default CartPage;

import { useContext, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../data/CartContext";

const CartPage = () => {
  const [address, setAddress] = useState(false);
  const { cartitems, handlelocalcart, addcart, setcart, emptycart } = useCart();

  const grandTotal = cartitems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      {/* Empty Cart */}
      {cartitems.length === 0 ? (
        <h2 className="text-3xl text-center mt-10 font-semibold">
          Your cart is empty!
        </h2>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartitems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-4 flex gap-4 items-center hover:shadow-xl transition"
              >
                <img
                  src={item.img}
                  alt="food"
                  className="w-24 h-24 rounded-lg object-cover"
                />

                {/* ==== DETAILS ==== */}
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                  <p className="text-gray-800 font-medium">
                    Total: ₹{item.total}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="w-7 h-7 bg-red-400 text-white rounded-full flex items-center justify-center"
                      onClick={() => handlelocalcart(item.id, "sub")}
                    >
                      -
                    </button>

                    <p className="font-semibold">{item.quantity}</p>

                    <button
                      className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center"
                      onClick={() => handlelocalcart(item.id, "add")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total Section */}
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">
              Grand Total: <span className="text-[#FF6B00]">₹{grandTotal}</span>
            </h2>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#FF6B00] text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md hover:bg-[#e65c00] transition"
              onClick={() => {
                setAddress(true);
              }}
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Address Form */}
          {address && (
            <div className="mt-10 bg-white p-6 shadow-lg rounded-xl max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Enter Your Details
              </h2>

              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Mobile</label>
                  <input
                    type="tel"
                    className="w-full border p-2 rounded-md mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    className="w-full border p-2 rounded-md mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Address</label>
                  <textarea className="w-full border p-2 rounded-md mt-1 h-24"></textarea>
                </div>
              </form>

              {/* Complete Order Button */}
              <div className="flex justify-center mt-6">
                <Link to="/order-success">
                  <button
                    onClick={() => emptycart()}
                    className="bg-[#FF6B00] text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-[#e65c00] transition"
                  >
                    Complete Order
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
