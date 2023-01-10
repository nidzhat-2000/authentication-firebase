import { closeModal } from "./redux/modal";
import { store } from "./redux/store";

export const modalCloser = () => {
  store.dispatch(closeModal());
};
