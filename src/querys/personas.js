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
      // console.log(data);
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

export { useListadoPersonas, useBorrarPersona };
