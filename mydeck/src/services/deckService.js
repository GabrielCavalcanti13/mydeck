import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

export const createDeck = async ({ name, attributes }) => {
  const docRef = await addDoc(collection(db, "decks"), { name, attributes, cards: [] });
  return { id: docRef.id, name, attributes, cards: [] };
};

export const getDecks = async () => {
  const querySnapshot = await getDocs(collection(db, "decks"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCardToDeck = async (deckId, card) => {
  const deckRef = doc(db, "decks", deckId);
  const deckSnap = await getDoc(deckRef);

  if (deckSnap.exists()) {
    await updateDoc(deckRef, { cards: arrayUnion(card) });  // Adiciona a carta sem sobrescrever

    return true;
  }

  return false;
};

export const deleteDeck = async (deckId) => {
  await deleteDoc(doc(db, "decks", deckId));
};

export const updateDeck = async (deckId, updatedData) => {
  const deckRef = doc(db, "decks", deckId);
  await updateDoc(deckRef, updatedData);
};
