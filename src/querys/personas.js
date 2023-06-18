import { useQuery, useMutation, useQueryClient } from "react-query";
import { conexion } from "../conexion";

// la funcion useClientList es un hook personalizado que usa la funcion conexion para traer los datos del server

function useListadoPersonas() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Personas"],
    queryFn: () =>
      conexion("personas", {
        method: "GET",
      }).then((data) => {
        return data;
      }),
    onSuccess(data) {
      for (const persona of data) {
        queryClient.setQueryData(["Persona", persona.id], persona);
      }
    },
  });
}

function useBorrarPersona() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id }) =>
      conexion(`borrar/${id}`, {
        method: "DELETE",
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(`Personas`);
      },
    }
  );
}

function useNuevapersona(id) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ nombre, apellido, fechanacimiento, nrodocumento, tipodocumento }) =>
      conexion("persona", {
        method: "POST",
        data: {
          perNombre: nombre,
          perApellido: apellido,
          perFechaNacimiento: fechanacimiento,
          perNumeroDocumento: nrodocumento,
          perTipoDocumento: tipodocumento,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(`Personas`, id);
      },
    }
  );
}

function useEditarpersona(id) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ nombre, apellido, fechanacimiento, nrodocumento, tipodocumento }) =>
      conexion(`persona/${id}`, {
        method: "PUT",
        data: {
          perNombre: nombre,
          perApellido: apellido,
          perFechaNacimiento: fechanacimiento,
          perNumeroDocumento: nrodocumento,
          perTipoDocumento: tipodocumento,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(`Personas`, id);
      },
    }
  );
}

export {
  useListadoPersonas,
  useBorrarPersona,
  useNuevapersona,
  useEditarpersona,
};
