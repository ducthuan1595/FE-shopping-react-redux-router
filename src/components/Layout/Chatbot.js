import { useState } from "react";
import styled from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    width: "fit-content",
    maxWidth: "300px",
    backgroundColor: "#48b0f7",
    color: "#fff",
    padding: "8px 6px",
    margin: "20px 0",
    marginLeft: "355px",
    borderRadius: '4px'
  };

  const handleToggleChat = () => {
    setIsOpen((prev)=> !prev)
  }

  return (
    <div className={styled.chatbot}>

      <div className={styled.bubble} onClick={handleToggleChat}>
        <img src='images/chat.png' />
      </div>

      {isOpen && <div className={styled.content}>
        <div className={styled.head}>
          <h4>Customer Support</h4>
          <button>let's Chat App</button>
        </div>
        <div className={styled.center}>
          <div className="d-flex justify-content-end" style={{ ...style }}>
            Xin chào
          </div>
          <div className={styled.message2}>Làm thế nào để xem các sản phẩm</div>
          <div className={styled.message1}>
          <img src='./images/user.webp' />
            <div>ADMIN: Chào bạn</div>
          </div>
          <div className={styled.message1}>
            <img src='./images/user.webp' />
            <div>ADMIN: Bạn có thể vào mục shop để xem các sản phẩm</div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>

        <div className={styled.bottom}>
          <img src="./images/user.webp" />
          <input type="text" placeholder="Enter Message!" />
          <div>
            <i className="fas fa-paperclip"></i>
          </div>
          <div>
            <i className="fas fa-smile"></i>
          </div>
          <div>
            <i className="fas fa-paper-plane" style={{color: '#48b0f7'}}></i>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Chatbot;
