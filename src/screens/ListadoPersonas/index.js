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
  Pagination,
} from "react-bootstrap";
import { useBorrarPersona, useListadoPersonas } from "../../querys/personas";
import Confirmacion from "../../components/Confirmacion";
import { NuevaPersona } from "./NuevaPersona";
import { formatoFecha } from "../../utils/utils";
import ReactPaginate from "react-paginate";

const ListadoPersonas = () => {
  const [tipo, setTipo] = useState("todos");
  const [nombre, setNombre] = useState("");
  const [persona, setPersona] = useState(null);
  const [titulo, setTitulo] = useState("Nueva Persona");
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

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Cantidad de elementos por página
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(data?.length / itemsPerPage);
  const displayedData = data
    ?.filter(
      (per) =>
        per.perNombre.includes(nombre) &&
        (per.perTipoDocumento === tipo || tipo === "todos")
    )
    .slice(pagesVisited, pagesVisited + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      {isLoading ? (
        <h5>Cargando...</h5>
      ) : isError || !data ? (
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
                    id="todos"
                    variant={"outline-success"}
                    value={"todos"}
                  >
                    Todos
                  </ToggleButton>
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
              {
                // data
                //   ?.filter(
                //     (per) =>
                //       per.perNombre.includes(nombre) &&
                //       (per.perTipoDocumento === tipo || tipo === "todos")
                //   )
                // ?.filter((per) => {
                //   const regex = new RegExp(`${nombre}`, "gi");
                //   const infoPer = `${per.perNombre} ${cliente.nombreape.trim()} ${cliente.razonsocial.trim()}`;
                //   return infoCliente.match(regex);
                // })
                displayedData?.map((persona) => (
                  <tr key={persona.id}>
                    <td className="text-uppercase">{persona.id}</td>
                    <td className="text-uppercase">{persona.perNombre}</td>
                    <td className="text-uppercase">{persona.perApellido}</td>
                    <td className="text-uppercase">
                      {persona.perTipoDocumento}
                    </td>
                    <td>{persona.perNumeroDocumento}</td>
                    <td>
                      {formatoFecha(
                        new Date(persona.perFechaNacimiento),
                        "dd-mm-yyyy"
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        className="btn-sm mx-2"
                        onClick={() => [
                          setPersona({ persona: persona }),
                          setTitulo("Editar Persona"),
                          setShow(true),
                        ]}
                      >
                        <TbEdit />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => setShowConfirm({ show: true, persona })}
                      >
                        <TbTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName={"page-item"}
              breakLinkClassName="page-link"
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={changePage}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>

          <Confirmacion
            titulo={"Borrar"}
            cuerpo={
              "Esta seguro que borrar a " + showConfirm.persona?.perNombre
            }
            handleUpdate={handleUpdate}
            showConfirm={showConfirm.show}
            setShowConfirm={() => setShowConfirm(defaultConfirm)}
          ></Confirmacion>
          <NuevaPersona
            show={show}
            setShow={setShow}
            persona={persona}
            titulo={titulo}
            setPersona={setPersona}
            setTitulo={setTitulo}
          ></NuevaPersona>
        </div>
      )}
    </div>
  );
};

export default ListadoPersonas;
