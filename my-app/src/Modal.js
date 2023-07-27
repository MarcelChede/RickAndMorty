import React from "react";
import "./Modal.css";

const ModalCharacter = ({ character, closeModal }) => {
  return (
    <div className="ModalOverlay" onClick={closeModal}>
      <div className="ModalButton">
        <button onClick={closeModal}>Close</button>
      </div>

      <div className="ModalCard">
        <div className="ImageContainer">
          <img src={character.image} alt="name" />
          <div className="TextOnImage">
            <p className="ModalNameText">{character.name}</p>
            <p className="ModalSpeciesText">{character.species}</p>
          </div>
        </div>

        <div className="ModalDescription">
          <p className="title">ABOUT</p>
          <p className="title_text">
            {character.name} is a{" "}
            {character.gender === "unknown" || character.gender === ""
              ? character.species
              : character.gender}{" "}
            {character.species}. He is {character.status} and{" "}
            {character.status === "Alive" ? "well" : "not so well"}.
          </p>

          <p className="title">ORIGIN</p>
          <p className="OriginSubtitle">Planet</p>
          <p className="Sub">{character.origin_name}</p>
          <p className="title">LOCATION</p>
          <p className="OriginSubtitle">Planet</p>
          <p className="Sub">{character.location_name}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalCharacter;
