import { useState, useEffect } from "react";
import { TbDeviceFloppy } from "react-icons/tb";
import {
  Modal,
  Button,
  Form,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Row,
} from "react-bootstrap";
import Datepicker from "../../components/Datepicker";
import { useEditarpersona, useNuevapersona } from "../../querys/personas";

function NuevaPersona({
  show,
  setShow,
  persona,
  setPersona,
  titulo,
  setTitulo,
}) {
  // console.log(persona);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechanacimiento, setFechanacimiento] = useState("");
  const [tipodocumento, setTipoDocumento] = useState("dni");
  const [nrodocumento, setNrodocumento] = useState("");
  const [mensajeError, setMensajeError] = useState();

  useEffect(() => {
    if (persona) {
      console.log("hay persona");
      setNombre(persona.persona.perNombre);
      setApellido(persona.persona.perApellido);
      setFechanacimiento(persona.persona.perFechaNacimiento);
      setTipoDocumento(persona.persona.perTipoDocumento);
      setNrodocumento(persona.persona.perNumeroDocumento);
    }
  }, [persona]);

  const resetPersona = () => {
    setNombre("");
    setApellido("");
    setFechanacimiento("");
    setTipoDocumento("dni");
    setNrodocumento("");
    setMensajeError();
    setPersona(null);
    setTitulo("Nueva Persona");
  };

  const nuevaPersona = useNuevapersona();

  const editaPersona = useEditarpersona();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isNaN(nombre) || nombre === "") {
      setMensajeError("Nombre no debe ser numero o vacío.");
    } else if (!isNaN(apellido) || apellido === "") {
      setMensajeError("Apellido no debe ser numero.");
    } else if (fechanacimiento === "") {
      setMensajeError("Fecha no puede ser vacía.");
    } else if (isNaN(nrodocumento) || nrodocumento === "") {
      setMensajeError("Número documento debe ser un número");
    } else {
      console.log({
        nombre: nombre,
        apellido: apellido,
        fechanacimiento: fechanacimiento,
        nrodocumento: nrodocumento,
        tipodocumento: tipodocumento,
      });
      if (persona === null) {
        nuevaPersona.mutate({
          nombre: nombre,
          apellido: apellido,
          fechanacimiento: fechanacimiento,
          nrodocumento: nrodocumento,
          tipodocumento: tipodocumento,
        });
        console.log("nueva");
      } else {
        editaPersona.mutate({
          id: persona.persona.id,
          nombre: nombre,
          apellido: apellido,
          fechanacimiento: fechanacimiento,
          nrodocumento: nrodocumento,
          tipodocumento: tipodocumento,
        });
        console.log("edita");
      }

      resetPersona();
      setShow(false);
    }
  };

  return (
    <Modal
      className="p-0"
      show={show}
      fullscreen
      onHide={() => [setShow(false), resetPersona()]}
    >
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <div>
            <Form.Group className="mb-3">
              <div className="row">
                <div className="col-12 col-md-4">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder=""
                    autoComplete="off"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="text-uppercase"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    placeholder=""
                    autoComplete="off"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="text-uppercase"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Form.Label>Fecha Nacimiento</Form.Label>
                  <Datepicker
                    fecha={fechanacimiento}
                    setFecha={setFechanacimiento}
                  ></Datepicker>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row className="row">
                <div className="col-12 col-md-4">
                  <Form.Label>Número Documento</Form.Label>
                  <Form.Control
                    type="text"
                    name="nrodocumento"
                    placeholder=""
                    autoComplete="off"
                    value={nrodocumento}
                    onChange={(e) => setNrodocumento(e.target.value)}
                    className="text-uppercase"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <p>Tipo Documento</p>
                  <ToggleButtonGroup
                    className="mb-3"
                    type="radio"
                    name="tipodocumento"
                    size="sm"
                    value={tipodocumento}
                    onChange={(value) => setTipoDocumento(value)}
                  >
                    <ToggleButton
                      id="nueva-dni"
                      variant={"outline-success"}
                      value={"dni"}
                    >
                      DNI
                    </ToggleButton>
                    <ToggleButton
                      id="nueva-pasaporte"
                      variant={"outline-success"}
                      value={"pasaporte"}
                    >
                      Pasaporte
                    </ToggleButton>
                    <ToggleButton
                      id="nueva-cedula"
                      variant={"outline-success"}
                      value={"cedula"}
                    >
                      Cedula
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Row>
            </Form.Group>
            <div className="d-flex mt-2 align-items-center justify-content-start">
              <Button className="btn-primary me-2" type="submit">
                <TbDeviceFloppy /> Guardar
                {/* {nuevaImputacion.isLoading && (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                )} */}
              </Button>
            </div>
          </div>
          {mensajeError && (
            <Alert variant="danger" className="mt-2 p-2 text-center fw-bold">
              {mensajeError}
            </Alert>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export { NuevaPersona };
