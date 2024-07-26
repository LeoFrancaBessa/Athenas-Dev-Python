import React, { useState } from 'react';
import { addPessoa } from '../../services/PessoaService';
import './AddPessoaModal.css';

const AddPessoaModal = ({ isOpen, onClose, OnSave }) => {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCpf] = useState('');
  const [sexo, setSexo] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const handleAddPessoa = async (pessoa) => {
    try {
      await addPessoa(pessoa);
      await OnSave();
      onClose();
    } catch (error) {
      console.error('Error adding pessoa:', error);
    }
  };

  const handleSave = () => {
    const newPessoa = {
      nome,
      data_nasc: dataNasc,
      cpf,
      sexo,
      altura: parseFloat(altura),
      peso: parseFloat(peso),
    };
    handleAddPessoa(newPessoa);
  };

  if(!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar Pessoa</h2>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <label>Data de Nascimento:</label>
        <input type="date" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} />
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <label>Sexo:</label>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Selecione</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <label>Altura:</label>
        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
        <label>Peso:</label>
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default AddPessoaModal;