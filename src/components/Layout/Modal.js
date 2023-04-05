import { useDispatch } from 'react-redux';
import { closePopup } from '../../store/producterSlice';
import styled from './Modal.module.css';

const Modal = (props) => {
  const dispatch = useDispatch()
  const closes = () => {
    dispatch(closePopup());
  }
  return (
    <div className={styled.modal} onClick={closes}>
      {/* <div className={styled.content}>{props.children}</div> */}
    </div>
  )
};

export default Modal;
