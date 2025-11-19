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
