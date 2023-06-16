import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { TbHandStop } from "react-icons/tb";

function Confirmacion({
  titulo,
  cuerpo,
  handleUpdate,
  showConfirm,
  setShowConfirm,
}) {
  return (
    <Modal
      contentClassName="border-0"
      show={showConfirm}
      onClose={() => setShowConfirm(false)}
      onHide={() => setShowConfirm(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-white">{titulo}</Modal.Header>
      <Modal.Body>
        <div className="row fw-bold">
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div className="fs-1 text-danger">
              <TbHandStop />
            </div>
          </div>
          <div className="col-10 d-flex align-items-center">
            {cuerpo}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-sm btn-danger"
          onClick={() => setShowConfirm(false)}
        >
          Cancelar
        </Button>
        <Button
          className="btn btn-sm"
          onClick={() => {
            handleUpdate();
            setShowConfirm(false);
          }}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmacion;
