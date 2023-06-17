import { useState } from "react";
import { TbPlus, TbTrash, TbEdit, TbSearch } from "react-icons/tb";
import {
  Table,
  Button,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Row,
  Col,
} from "react-bootstrap";
import { useBorrarPersona, useListadoPersonas } from "../../querys/personas";
import Confirmacion from "../../components/Confirmacion";
import { NuevaPersona } from "./NuevaPersona";

const ListadoPersonas = () => {
  const [tipo, setTipo] = useState("dni");
  const [nombre, setNombre] = useState("");

  const personas = useListadoPersonas();
  const { isLoading, isError, data } = personas;

  const borrarPersona = useBorrarPersona();

  const defaultConfirm = {
    show: false,
    persona: null,
  };

  const [showConfirm, setShowConfirm] = useState(defaultConfirm);
  const [show, setShow] = useState(false);

  const handleUpdate = () => {
    borrarPersona.mutate({
      id: showConfirm.persona.id,
    });
  };

  return (
    <>
      {isLoading ? (
        <h5>Cargando...</h5>
      ) : isError || data.length === 0 ? (
        <h5 className="mt-2">Aún no hay personas cargadas.</h5>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Personas</h5>
            <Button
              variant="success"
              className="btn-sm mx-2"
              onClick={() => setShow(true)}
            >
              <TbPlus /> Nueva
            </Button>
          </div>
          <hr />
          <h5>Filtros</h5>
          <Form>
            <Row>
              <Col>
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder=""
                      autoComplete="off"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col>
                <p>Tipo documento</p>
                <ToggleButtonGroup
                  className="mb-3"
                  type="radio"
                  name="tipo"
                  size="sm"
                  value={tipo}
                  onChange={(value) => setTipo(value)}
                >
                  <ToggleButton
                    id="dni"
                    variant={"outline-success"}
                    value={"dni"}
                  >
                    DNI
                  </ToggleButton>
                  <ToggleButton
                    id="pasaporte"
                    variant={"outline-success"}
                    value={"pasaporte"}
                  >
                    Pasaporte
                  </ToggleButton>
                  <ToggleButton
                    id="cedula"
                    variant={"outline-success"}
                    value={"cedula"}
                  >
                    Cedula
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
            <div className="d-flex align-items-right">
              <Button variant="primary" type="submit" className="btn-sm">
                <TbSearch /> Buscar
              </Button>
            </div>
          </Form>
          <hr />
          <Table hover size="sm">
            <thead>
              <tr>
                <th className="fw-bold">Id</th>
                <th className="fw-bold">Nombre</th>
                <th className="fw-bold">Apellido</th>
                <th className="fw-bold">Número Documento</th>
                <th className="fw-bold">Tipo Documento</th>
                <th className="fw-bold">Fecha Nacimiento</th>
                <th className="fw-bold"></th>
                <th className="fw-bold"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((persona) => (
                <tr key={persona.id}>
                  <td>{persona.id}</td>
                  <td>{persona.perNombre}</td>
                  <td>{persona.perApellido}</td>
                  <td>{persona.perTipoDocumento}</td>
                  <td>{persona.perNumeroDocumento}</td>
                  <td>{persona.perFechaNacimiento}</td>
                  <td>
                    <Button variant="primary" className="btn-sm mx-2">
                      <TbEdit />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() =>
                        setShowConfirm({ show: true, persona: persona })
                      }
                    >
                      <TbTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Confirmacion
            titulo={"Borrar"}
            cuerpo={
              "Esta seguro que borrar a " + showConfirm.persona?.perNombre
            }
            handleUpdate={handleUpdate}
            showConfirm={showConfirm.show}
            setShowConfirm={() => setShowConfirm(defaultConfirm)}
          ></Confirmacion>
          <NuevaPersona show={show} setShow={setShow}></NuevaPersona>
        </div>
      )}
    </>
  );
};

export default ListadoPersonas;
