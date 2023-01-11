import { logIn } from "./redux/auth";
import { closeModal } from "./redux/modal";
import { store } from "./redux/store";
import { auth } from "./utils/firebase";

export const modalCloser = () => {
  store.dispatch(closeModal());
};

export const setUserData = () => {
  store.dispatch(
    logIn({
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
      emailVerified: auth.currentUser.emailVerified,
      email: auth.currentUser.email,
    })
  );
};
