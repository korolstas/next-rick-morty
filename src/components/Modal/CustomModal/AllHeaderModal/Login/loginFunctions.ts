import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, db } from "../../../../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { UseFormReturn } from "react-hook-form";
import { TForm } from "@/components/Form/InterfaceForm";
import {
  loadFavoritesHeroes,
  loading,
  setUser,
  setWindowError,
  setWindowSuccess,
} from "@/store/appSlice/appSlice";

const imageHandle = (files: any, dispatch: any) => {
  const file = files && files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target ? e.target.result : null;
    if (!result) return;
    dispatch(
      setUser({
        image: result as string,
      })
    );
  };
  reader.readAsDataURL(file);
};

export const SingUp = async (
  data: any,
  methods: UseFormReturn<TForm, any, undefined>,
  closeModal: () => void,
  dispatch: any
) => {
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, data.singUpEmail, data.singUpPassword)
    .then(({ user }) => {
      imageHandle(data.singUpImage, dispatch);
      updateProfile(user, {
        displayName: data.singUpName,
      })
        .then(() => {
          dispatch(
            setUser({
              id: user.uid,
              name: user.displayName,
            })
          );
        })
        .catch((error) => {
          dispatch(activeWindow(error));
        });

      const storage = getStorage();
      const storageRef = ref(storage, `${user.uid}.jpg`);
      uploadBytes(storageRef, data.singUpImage[0])
        .then((snapshot) => {
          dispatch(setWindowSuccess("Perfect Img"));
        })
        .catch((error) => {
          dispatch(setWindowError(error));
        });
      methods.reset();
      closeModal();
      dispatch(loading());
      dispatch(setWindowSuccess("Success sing up"));
    })
    .catch((error) => {
      dispatch(setWindowError(error));
    });
};

export const SingIn = async (
  data: any,
  methods: UseFormReturn<TForm, any, undefined>,
  closeModal: () => void,
  dispatch: any
) => {
  const auth = getAuth(app);

  const getInfo = async (id: string) => {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);
    dispatch(loadFavoritesHeroes(docSnap.data()));
  };

  signInWithEmailAndPassword(auth, data.singInEmail, data.singInPassword)
    .then(({ user }) => {
      const storage = getStorage();
      getDownloadURL(ref(storage, `${user.uid}.jpg`)).then((url) => {
        dispatch(setUser({ id: user.uid, name: user.displayName, image: url }));
      });
      getInfo(user.uid);
      methods.reset();
      closeModal();
      dispatch(loading());
      dispatch(setWindowSuccess("Success sing in"));
    })
    .catch((error) => {
      dispatch(setWindowError(error));
    });
};
function activeWindow(error: any): any {
  throw new Error("Function not implemented.");
}

