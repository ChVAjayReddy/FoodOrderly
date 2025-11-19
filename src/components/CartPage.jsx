import { Link } from "react-router";
import { useCart } from "../data/CartContext";
import { useState } from "react";

const CartPage = () => {
  const [address, setAddress] = useState(false);
  const { emptycart, finalcart, carting } = useCart();

  const grandTotal = finalcart.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      {/* Empty Cart */}
      {finalcart.length === 0 ? (
        <h2 className="text-3xl text-center mt-10 font-semibold">
          Your cart is empty!
        </h2>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalcart.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-4 flex gap-4 items-center hover:shadow-xl transition"
              >
                <img
                  src={item.ingurl}
                  alt="food"
                  className="w-24 h-24 rounded-lg object-cover"
                />

                {/* ==== DETAILS ==== */}
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.mealname}</p>
                  <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                  <p className="text-gray-800 font-medium">
                    Total: ₹{item.total}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="w-7 h-7 bg-red-400 text-white rounded-full flex items-center justify-center"
                      onClick={() =>
                        carting(
                          item.id,
                          item.mealname,
                          item.ingurl,
                          item.price,
                          "sub"
                        )
                      }
                    >
                      -
                    </button>

                    <p className="font-semibold">{item.quantity}</p>

                    <button
                      className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center"
                      onClick={() =>
                        carting(
                          item.id,
                          item.mealname,
                          item.imgurl,
                          item.price,
                          "add"
                        )
                      }
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
            <div className="mt-10 bg-white p-6 shadow-lg rounded-xl max-w-2xl mx-auto ">
              <h2 className="text-3xl font-semibold mb-6 text-center ">
                Enter Your Details
              </h2>

              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md mt-1 required:*:"
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
