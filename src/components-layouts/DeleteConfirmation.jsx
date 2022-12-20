import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmation({ show, onHide, confirm, data }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className="alert alert-danger">This action is permanent. Are you sure you want to continue?</div></Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            confirm(data)
            onHide()
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation
