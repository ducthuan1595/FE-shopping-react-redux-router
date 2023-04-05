import { useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RelatedProducts from "./components/RelatedProducts";
import styled from "./DetailPage.module.css";
import { addCart } from '../../store/cartSlice';

export default function DetailPage() {
  const [quality, setQuality] = useState(1)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailProduct = useSelector((state) => state.products.detailProduct);
  let userCurr = JSON.parse(localStorage.getItem('userCrr')) ?? {};
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
  const handleAddCart = () => {
    if(quality > 0 && userCurr[0]) {
      const itemCart = {
        ...detailProduct,
        amount: quality,
        owner: userCurr[0]
      }
      dispatch(addCart(itemCart));;
    }else {
      navigate('/login')
    }
  }

  const handleIncrease = () => {
    setQuality(quality + 1)
  }

  const handleDecrease = () => {
    if(quality > 1) {
      setQuality(quality - 1)
    }
  }

  return (
    <div className={styled["detail-product"]}>

      <div className={styled.detail}>
        
        <img src={detailProduct.img1} alt={detailProduct.name} />
        <div className={styled.content}>
          <h3>{detailProduct.name}</h3>
          <span>{price} VND</span>
          <p>{detailProduct.short_desc}</p>
          <div className={styled.category}>
            <span>CATEGORY: </span>
            <span>{detailProduct.category}</span>
          </div>
          <div className={styled.actions}>
            <p>QUALITY</p>
            <div className={styled.action}>
              <div className={styled.group}>
                <i className="fas fa-caret-left" onClick={handleDecrease}></i>
                <span>{quality}</span>
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
      <RelatedProducts category={detailProduct.category} productId={detailProduct._id.$oid}/>
    </div>
  );
}
