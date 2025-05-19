import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(text: string, options?: Partial<Toastify.Options>) {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "center",
    // backgroundColor: "#ab49de",
    ...options, // allow overrides
  }).showToast();
}