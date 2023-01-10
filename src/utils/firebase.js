import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { logIn, logOut } from "../redux/auth";
import { openModal } from "../redux/modal";
import { store } from "../redux/store";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEAUSEREMENT_ID,
  apiKey: "AIzaSyD0OPqpZSn4gVFw5zV2XZ9u1N3VmjSqzYE",
  apiKey: "AIzaSyD0OPqpZSn4gVFw5zV2XZ9u1N3VmjSqzYE",
  authDomain: "first-auth-25e48.firebaseapp.com",
  projectId: "first-auth-25e48",
  storageBucket: "first-auth-25e48.appspot.com",
  messagingSenderId: "638291193411",
  appId: "1:638291193411:web:a90ce65da99a3474a16ef6",
  measurementId: "G-Q6L37F52PE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export const registerProfile = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user) {
      toast.success("You successfully Signed Up");
    }
    return user;
  } catch (err) {
    toast.error(err.message);
  }
};

export const loginProfile = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      toast.success("You successfully has been loged In");
    }
    return user;
  } catch (err) {
    toast.error(err.message);
  }
};

export const signOutProfile = async () => {
  try {
    console.log(auth);
    await signOut(auth);
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile is updated");
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};

export const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(`Verification is sent to ${auth.currentUser.email}`);
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateParole = async (newPassword) => {
  try {
    await updatePassword(auth.currentUser, newPassword);
    toast.success("Password is updated");
    return true;
  } catch (err) {
    if (err.code === "auth/weak-password") {
      store.dispatch(
        openModal({
          name: "re-auth-modal",
        })
      );
    }
    toast.error(err.code);
  }
};

export const forgotPassword = async (email) => {
  try {
    console.log(auth);
    await sendPasswordResetEmail(auth, email);
    toast.success(`Reset is sent to ${email}`);
    return true;
  } catch (err) {
    toast.error(err.message);
  }
};

export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    return user;
  } catch (err) {
    toast.error(err.code);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is in");
    store.dispatch(
      logIn({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        emailVerified: user.emailVerified,
        email: user.email,
      })
    );
  } else {
    console.log("user is out");
    store.dispatch(logOut());
  }
});

export const addTodo = async (data) => {
  const result = await addDoc(collection(db, "todos"), data);
  console.log(result, result.id);
};

onSnapshot(doc(db, "todos", "SF"), (doc) => {
  doc.docs.map((todo) => {
    console.log(todo.data());
  });
  // console.log("Current data: ", doc.data());
});

export default app;
