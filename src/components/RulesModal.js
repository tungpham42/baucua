import React from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal và Button từ React Bootstrap

const RulesModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Luật chơi Bầu Cua Cá Cọp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Bầu Cua Cá Cọp là một trò chơi dân gian phổ biến ở Việt Nam. Dưới đây
          là các luật chơi:
        </p>
        <ul>
          <li>
            Trò chơi này sử dụng 3 viên xí ngầu với các hình ảnh Bầu, Cua, Tôm,
            Cá, Gà, Nai.
          </li>
          <li>
            Người chơi sẽ đặt cược vào các con vật xuất hiện trên mặt của viên
            xí ngầu.
          </li>
          <li>
            Sau khi cược xong, người chơi sẽ lắc xí ngầu. Các con vật xuất hiện
            trên mặt của xí ngầu là kết quả của ván chơi.
          </li>
          <li>
            Người chơi thắng cược nếu dự đoán đúng các con vật xuất hiện trên
            mặt của xí ngầu.
          </li>
          <li>
            Mỗi con vật có tỷ lệ thắng thua khác nhau tùy vào số lần xuất hiện.
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RulesModal;
