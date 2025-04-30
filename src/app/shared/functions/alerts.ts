import Swal from "sweetalert2";

export function mostrarAlertaSuccess(mensaje: string) {
  Swal.fire({
    title: "Sistema",
    text: mensaje,
    icon: "success",
    draggable: true
  });
}