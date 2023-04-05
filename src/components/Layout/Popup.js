import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { detailProduct } from "../../store/producterSlice";
import { closePopup } from "../../store/producterSlice";
import Modal from '../Layout/Modal';
import styled from './Popup.module.css';

const Popup = () => {
  // get detail product from store
  const product = useSelector((state)=> state.products.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log(product)
  // format price
  let price = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // close popup
  const handleClose = () => {
    dispatch(closePopup());
  }

  const handleDetail = () => {
    dispatch(closePopup());
    dispatch(detailProduct(product));
    navigate(`/detail/${product._id.$oid}`);
    window.scrollTo(0, 0);

  }

  return (
    <>
    <Modal />
    <div className={styled.popup}>
      <span className={styled.close} onClick={handleClose}><i className="far fa-times"></i></span>
      <img src={product.img1}  alt={product.name} />
      <div className={styled.content}>
        <h4>{product.name}</h4>
        <span>{price} VND</span>
        <p>{product.short_desc}</p>
        <button onClick={handleDetail}>
          <i className="fas fa-shopping-cart"></i>
           view Detail
          </button>
      </div>
    </div>
    </>
  );
};

export default Popup;
