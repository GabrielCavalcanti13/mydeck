import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks } from "../../services/deckService";
import Card from "../Card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/swiper-bundle.css"; // CSS correto para Swiper 9

import "./Deck.css";

const Deck = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setDeck(selectedDeck);
      }
    };

    if (deckId) fetchDeck();
  }, [deckId]);

  return (
    <div className="deck-container">
      <div className="deck-header">
        <h2>{deck?.name?.name || deck?.name}</h2>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>

      <div className="card-carousel">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {deck?.cards?.map((card, index) => (
            <SwiperSlide key={index}>
              <Card
                name={card.name}
                image={card.image}
                attributes={deck.attributes}
                values={card.values}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Deck;
