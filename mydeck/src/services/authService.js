import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db } from "../firebaseConfig"; // Importando Firestore, se precisar salvar usuários

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao sair:", error);
  }
};
