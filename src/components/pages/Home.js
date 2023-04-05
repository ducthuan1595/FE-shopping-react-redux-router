//////////////////////////////
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showPopup, getProduct, getAllProduct } from "../../store/producterSlice";

import Popup from "../Layout/Popup";
import styled from "./HomePage.module.css";

export default function HomePage() {
  // const [products, setProducts] = useState([]);

  const showDetailProduct = useSelector(state=> state.products.showPopup);
  const products = useSelector(state=> state.products.products);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShopPage = () => {
    navigate("/shop");
  };

  const handleDetailProduct = (product) => {
    dispatch(showPopup());
    dispatch(getProduct(product));
  }

  return (
    <>
      {/* banner */}
      <section className={styled.banner}>
        <div className={styled.background}>
          <div className={styled.sale}>
            <h4>NEW INSPIRATION 2020</h4>
            <h2>20% OFF ON NEW SEASON</h2>
            <button onClick={handleShopPage}>Browse collections</button>
          </div>
        </div>
      </section>

      {/* list */}
      <section className={styled.category}>
        <div className={styled.title}>
          <div>CAREFULLY CREATED COLLECTIONS</div>
          <h4>BROWSE OUR CATEGORIES</h4>
        </div>
        <div className={styled.imgs}>
          <div className={styled.col1}>
            <Link to="/shop">
              <img src="./images/product_1.png" alt="product1" />
            </Link>
            <Link to="/shop">
              <img src="./images/product_2.png" alt="product2" />
            </Link>
          </div>
          <div className={styled.col2}>
            <Link to="/shop">
              <img src="./images/product_3.png" alt="product3" />
            </Link>
            <Link to="/shop">
              <img src="./images/product_4.png" alt="product4" />
            </Link>
            <Link to="/shop">
              <img src="./images/product_5.png" alt="product5" />
            </Link>
          </div>
        </div>
      </section>

      {/* list item */}
      <section className={styled['list-item']}>
        <div className={styled.title}>
          <div>MADE THE HARD WAY</div>
          <h4>TOP TRENDING PRODUCTS</h4>
        </div>
        <div className={styled.items}>
          {products[0] && products[0].map(p => {
            // format a price with dot
            let price = p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <div className={styled.item} key={p._id.$oid} onClick={handleDetailProduct.bind(null, p)}>
                <img src={p.img1} alt={p.name} />
                <h5>{p.name}</h5>
                <p>{price} VND</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* other information */}
      <section className={styled.inform}>
        <div className='container pt-5 pb-5'>
        <div className='row p-5' style={{backgroundColor: '#f8f9fa'}}>
          <div className='col text-center'>
            <h4>FREE SHIPPING</h4>
            <p style={{opacity: '0.7'}}>Free shipping worldwide</p>
          </div>
          <div className='col text-center'>
            <h4>24 X 7 SERVICE</h4>
            <p style={{opacity: '0.7'}}>Free shipping worldwide</p>
          </div>
          <div className='col text-center'>
            <h4>FESTIVAL OFFER</h4>
            <p style={{opacity: '0.7'}}>Free shipping worldwide</p>
          </div>
        </div>

        <div className='row pt-5 pb-5 justify-content-between'>
          <div className='col-6' style={{textAlign: 'left'}}>
            <h4>LET'S BE FRIENDS!</h4>
            <p style={{opacity: '0.7'}}>Nisi nisi tempor consequat labaris nisi.</p>
          </div>
          <div className='col-6 d-flex justify-content-end' style={{textAlign: 'right', padding: '0'}}>
            <input type='text' className='pt-3 pb-3 ps-3' style={{padding: '10px 10px', paddingRight: '14rem'}} placeholder="Enter your email address" />
            <button className='btn btn-dark p-3'>Subscribe</button>
          </div>
        </div>
        </div>
      </section>
      {showDetailProduct && <Popup />}
    </>
  );
}
