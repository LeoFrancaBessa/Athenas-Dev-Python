import {React, useState, useEffect} from 'react';
import './PesoIdealModal.css';
import {getPesoIdeal} from '../../services/PessoaService';

const PesoIdealModal = ({ isOpen, onClose, selectedPessoa }) => {
    const [pesoIdeal, setPesoIdeal] = useState(null);

    useEffect(() => {
        const handleCalculatePesoIdeal = async () => {
            if (selectedPessoa) {
              try {
                const response = await getPesoIdeal(selectedPessoa);
                setPesoIdeal(response.data.peso_ideal);
              } catch (error) {
                console.error('Error calculating peso ideal:', error);
              }
            }
          };

        handleCalculatePesoIdeal();
    }, [selectedPessoa]);

    if (!isOpen) return null;

    return (
        <div className="peso-ideal-modal">
        <div className="modal-content">
            <h2>Peso Ideal</h2>
            {pesoIdeal !== null ? (
            <p>O peso ideal é: {pesoIdeal} kg</p>
            ) : (
            <p>Não foi possível calcular o peso ideal.</p>
            )}
            <button onClick={onClose}>Fechar</button>
        </div>
        </div>
    );
};

export default PesoIdealModal;