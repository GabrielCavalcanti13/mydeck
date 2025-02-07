import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Criar um novo deck
export const createDeck = async (name) => {
  const docRef = await addDoc(collection(db, "decks"), { name, cards: [] });
  return docRef.id;
};

// Obter todos os decks
export const getDecks = async () => {
  const querySnapshot = await getDocs(collection(db, "decks"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Adicionar carta a um deck
export const addCardToDeck = async (deckId, card) => {
  const deckRef = doc(db, "decks", deckId);
  await updateDoc(deckRef, {
    cards: arrayUnion(card)
  });
};

// Deletar um deck
export const deleteDeck = async (deckId) => {
  await deleteDoc(doc(db, "decks", deckId));
};
