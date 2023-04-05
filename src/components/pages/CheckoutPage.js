import { useSelector } from "react-redux";
import styled from "./Checkout.module.css";

export default function CheckoutPage() {
  const items = useSelector(state => state.cart.listCart);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  let total = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styled.checkout}>
      <section className={styled["checkout-name"]}>
        <h2>CHECKOUT</h2>
        <h4>HOME / CART / CHECKOUT</h4>
      </section>
      <h3>BILLING DETAILS</h3>
      <section className={styled['form-checkout']}>
        <div className={styled.layout}>
          <form className='row' onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor='name' className="form-label">
                FULL NAME
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Your Name Here!"
              />
            </div>
            <div className="col-12">
              <label htmlFor='email' className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                class="form-control"
                id="name"
                placeholder="Enter Your Email Here!"
              />
            </div>
            <div className="col-12">
              <label htmlFor="phone-number" className="form-label">
                PHONE NUMBER
              </label>
              <input
                type="text"
                class="form-control"
                id="phone-number"
                placeholder="Enter Your Phone Number Here!"
              />
            </div>
            <div className="col-12">
              <label htmlFor="address" class="form-label">
                ADDRESS
              </label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter Your Address Here!"
              />
            </div>
            <div>
              <button>Place order</button>
            </div>
          </form>

          <div className={styled.order}>
            <h4>YOUR ORDER</h4>
            {items && items.map(item => {
              let price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              return (
                <div className={styled.group} key={item._id.$oid}>
                  <div>{item.name}</div>
                  <span>{price} VND x {item.amount}</span>
                </div>
              )
            })}
            <div className={styled.group} style={{borderBottom: 'none', marginTop: '15px'}}>
              <div>TOTAL</div>
              <div className={styled.total}>{total} VND</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
