//////////////////////////////
import ListCart from "./components/ListCart";
import TotalCart from "./components/TotalCart";
import styled from "./CartPage.module.css";

export default function CartPage() {
  return (
    <div className={styled.cart}>
      <section className={styled["cart-name"]}>
        <h2>CART NAME</h2>
        <h4>cart</h4>
      </section>
      <h3>SHOPPING CART</h3>
      <div className={styled.layout}>
        <ListCart />
        <TotalCart />
      </div>
    </div>
  );
}
