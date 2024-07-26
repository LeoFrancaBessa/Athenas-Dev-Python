import React from "react";
import './InfoCard.css'

const InfoCard = ({ pessoa, isSelected, onSelect }) => {
  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <h3>{pessoa.nome}</h3>
      <p>Data de Nascimento: {pessoa.data_nasc}</p>
      <p>CPF: {pessoa.cpf}</p>
      <p>Sexo: {pessoa.sexo}</p>
      <p>Altura: {pessoa.altura}</p>
      <p>Peso: {pessoa.peso}</p>
    </div>
  );
};
  
  export default InfoCard;