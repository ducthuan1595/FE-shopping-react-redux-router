import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateCart, deleteCart } from "../../../store/cartSlice";
import styled from "./ListCart.module.css";

const ListCart = () => {
  const listCart = useSelector(state => state.cart.listCart);
  console.log('list cart', listCart)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigateShop = () => {
    navigate('/shop');
    window.scrollTo(0, 0);
  }

  const handleNavigateCheck = () => {
    navigate('/checkout');
    window.scrollTo(0, 0);

  }

  // update item cart
  const handleDecrease = (item) => {
    if(item.amount > 1) {
      const amount = item.amount - 1;
      const items = {...item, amount}
      dispatch(updateCart(items));
    }
  }
  const handleIncrease = (item) => {
    const amount = item.amount + 1;
    const items = {...item, amount}
    dispatch(updateCart(items));
  }

  // handle remove product
  const handleRemove = (item) => {
    dispatch(deleteCart(item))
  }

  return (
    <section className={styled.lists}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">IMAGE</th>
            <th scope="col">PRODUCTS</th>
            <th scope="col">PRICE</th>
            <th scope="col">QUALITY</th>
            <th scope="col">TOTAL</th>
            <th scope="col">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {listCart && listCart.map(item => {
            let price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            let total = (item.price * item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
          <tr key={item._id.$oid} className={styled.inform}>
            <td><img src={item.img1} /></td>
            <td style={{fontWeight: 'bold'}}>{item.name}</td>
            <td>{price} VND</td>
            <td>
              <div className={styled.group}>
                <i className="fas fa-caret-left" onClick={handleDecrease.bind(null, item)}></i>
                  <span>{item.amount}</span>
                <i className="fas fa-caret-right" onClick={handleIncrease.bind(null, item)}></i>
              </div>
            </td>
            <td>{total} VND</td>
            <td><i className="fas fa-trash-alt" style={{cursor: 'pointer'}} onClick={handleRemove.bind(null, item)}></i></td>
          </tr>
            )
          })}
          
        </tbody>
      </table>

      <div className={styled.navigate}>
        <div className={styled.left} onClick={handleNavigateShop}>
        <i className="fas fa-long-arrow-alt-left"></i>
        <span>Continue shopping</span>
        </div>
        <div className={styled.right} onClick={handleNavigateCheck}>
        <span>Proceed to checkout</span>
        <i className="fas fa-long-arrow-alt-right"></i>
        </div>
      </div>

    </section>
  );
};

export default ListCart;
