import React, { useState, useEffect } from 'react';
import { getPessoa, updatePessoa } from '../../services/PessoaService';
import './EditPessoaModal.css';

const EditPessoaModal = ({ isOpen, selectedPessoa, onClose, onSave }) => {
  const [pessoa, setPessoa] = useState(null);
  const [name, setName] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('M');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const response = await getPessoa(selectedPessoa);
        setPessoa(response.data);
        setName(response.data.nome);
        setDataNasc(response.data.data_nasc);
        setCpf(response.data.cpf);
        setSexo(response.data.sexo);
        setAltura(response.data.altura);
        setPeso(response.data.peso);
      } catch (error) {
        setErrorMessage('Erro ao carregar dados da pessoa.');
        console.error('Error fetching pessoa:', error);
      }
    };

    if (selectedPessoa) {
      fetchPessoa();
    }
  }, [selectedPessoa]);


  const handleSave = async () => {
    const updatedPessoa = {
      nome: name,
      data_nasc: dataNasc,
      cpf,
      sexo,
      altura: parseFloat(altura),
      peso: parseFloat(peso),
    };


    try {
      await updatePessoa(selectedPessoa, updatedPessoa);
      onSave();
    } catch (error) {
      setErrorMessage('Erro ao atualizar pessoa.');
      console.error('Error updating pessoa:', error);
    }

    onClose();
  };


  if(!isOpen) return null;

  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Pessoa</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {pessoa && (
          <>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Data de Nascimento:
              <input
                type="date"
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />
            </label>
            <label>
              CPF:
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </label>
            <label>
              Sexo:
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </label>
            <label>
              Altura:
              <input
                type="number"
                step="0.01"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
              />
            </label>
            <label>
              Peso:
              <input
                type="number"
                step="0.1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </label>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPessoaModal;