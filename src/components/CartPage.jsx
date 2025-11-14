import { useContext, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../data/CartContext";
const CartPage = () => {
  const [address, setaddress] = useState(false);
  const { cartitems, cartindex, handleCart, handlelocalcart, addcart } =
    useCart();
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
        <tr>
          <td colSpan={4}> Grand Total</td>
          <td>{cartitems.reduce((acc, item) => acc + item.total, 0)}</td>
        </tr>
      </table>
      <div className="flex justify-center items-center">
        <button
          className="bg-[#FF6B00] border-2 cursor-pointer rounded-md text-2xl text-white justify-items-center justify-center items-center p-2 m-10 hover:bg-[#e65c00] transition-colors duration-300"
          onClick={() => setaddress(true)}
        >
          Proceed to Checkout
        </button>
      </div>
      <div
        style={{ display: address ? "block" : "none" }}
        className="border-2 rounded-md m-10 p-4 w-3/4 mx-auto justify-center items-center justify-items-center"
      >
        <h2 className="text-3xl mb-4">Enter your details</h2>
        <form className="flex flex-col gap-4 m-10 w-1/2">
          <label>Name</label>
          <input type="text" className="border-2"></input>
          <label>Mobile</label>
          <input className="border-2" type="tel"></input>
          <label>Email</label>
          <input className="border-2" type="email"></input>
          <label>Address</label>
          <textarea className="border-2"></textarea>
        </form>
        <div className="flex justify-center items-center">
          <Link to="/order-success">
            <button className="bg-[#FF6B00] cursor-pointer border-2 rounded-md text-2xl text-white justify-items-center justify-center items-center p-2 m-10 hover:bg-[#e65c00] transition-colors duration-300">
              Complete the Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
