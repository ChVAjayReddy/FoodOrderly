import { Link } from "react-router";
import { useCart } from "../data/CartContext";
import { useState } from "react";

import { auth } from "../firebase";
import { collection, addDoc, Timestamp, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CartPage = () => {
  const [address, setAddress] = useState(false);
  const { emptycart, finalcart, carting } = useCart();

  const grandTotal = finalcart.reduce((acc, item) => acc + item.total, 0);
  async function addDocument() {
    try {
      const utcTimestamp = Date.now();

      const dateObject = new Date(utcTimestamp);

      const indiaTime = dateObject.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const docRef = await addDoc(collection(db, "users"), {
        email: auth.currentUser ? auth.currentUser.email : "guest",
        orderItems: finalcart,
        totalAmount: grandTotal,
        createdAt: Timestamp.now(),
        timestamp: indiaTime,
        orderStatus: "Pending",
        orderBy: auth.currentUser ? auth.currentUser.email : "guest",
        ordertime: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-10">
      {finalcart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-1/2 m-6  px-4">
          <h2 className="text-3xl text-center mt-10 font-semibold">
            Your cart is empty! Please add some items to your cart.
          </h2>
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all   mt-6"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
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

                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.mealname}</p>
                  <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                  <p className="text-gray-800 font-medium">
                    Total: ₹{item.total}
                  </p>

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

          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">
              Grand Total: <span className="text-[#FF6B00]">₹{grandTotal}</span>
            </h2>
          </div>

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

              <div className="flex justify-center mt-6">
                <Link to="/order-success">
                  <button
                    onClick={() => {
                      emptycart();
                      addDocument();
                    }}
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
