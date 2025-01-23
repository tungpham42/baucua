import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditPlayerModal = ({
  show,
  onHide,
  name,
  balance,
  onNameChange,
  onBalanceChange,
  onSave,
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Sửa thông tin người chơi</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group>
        <Form.Label>Tên mới</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Nhập tên mới"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Số mồi/bia còn lại</Form.Label>
        <Form.Control
          type="text"
          value={balance}
          onChange={onBalanceChange}
          placeholder="Nhập số mồi/bia mới"
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Hủy
      </Button>
      <Button variant="primary" onClick={onSave}>
        Lưu
      </Button>
    </Modal.Footer>
  </Modal>
);
export default EditPlayerModal;
