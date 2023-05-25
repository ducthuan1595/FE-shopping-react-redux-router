import { useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RelatedProducts from "./components/RelatedProducts";
import styled from "./DetailPage.module.css";
import { addCart } from '../../store/cartSlice';
import { request } from '../../services/service';

export default function DetailPage() {
  const [quantity, setQuantity] = useState(1)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailProduct = useSelector((state) => state.products.detailProduct);
  let userCurr = useSelector((state) => state.auth.currUser)
  let price = detailProduct.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  // description products
  let descText = detailProduct.long_desc.replace(/\n•\t/g, ',');
  let descText1 = descText.replace(/\n\n•/g, ',');
  let descText2 = descText1.replace(/\n•/g, ',');
  let descText3 = descText2.replace(/\n-/g, ',');
  let filter = descText3.split(',')
  const text = filter.splice(0, 1)

  // handle add products to cart
  const handleAddCart = async() => {
    if(quantity > 0 && userCurr) {
      const res = await request.addCart(userCurr.userId, detailProduct._id, quantity)
      if(res.data.message === 'ok') {
        navigate('/cart');
        window.scrollTo(0,0);
      }
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className={styled["detail-product"]}>

      <div className={styled.detail}>
        
        <img src={detailProduct.images[0]} alt={detailProduct.name} />
        <div className={styled.content}>
          <h3>{detailProduct.name}</h3>
          <span>{price} VND</span>
          <p>{detailProduct.short_desc}</p>
          <div className={styled.category}>
            <span>CATEGORY: </span>
            <span>{detailProduct.category}</span>
          </div>
          <div className={styled.actions}>
            <p>QUANTITY</p>
            <div className={styled.action}>
              <div className={styled.group}>
                <i className="fas fa-caret-left" onClick={handleDecrease}></i>
                <span>{quantity}</span>
                <i className="fas fa-caret-right" onClick={handleIncrease}></i>
              </div>
              <button onClick={handleAddCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* description products */}
      <div className={styled.desc}>
        <div>DESCRIPTION</div>
        <h4>PRODUCT DESCRIPTION</h4>
        <h5>{text}</h5>
        <ul>
          {filter.map((t, i)=> {
            return (
              <li key={i}>- {t}</li>
            )
          })}
        </ul>
      </div>

      {/* related products */}
      <RelatedProducts category={detailProduct.category} productId={detailProduct._id}/>
    </div>
  );
}
