import React, { useState, useEffect } from 'react';
import InfoCard from '../../components/InfoCard/InfoCard'
import ActionButton from '../../components/ActionButton/ActionButton'
import AddPessoaModal from '../../components/AddPessoaModal/AddPessoaModal';
import PesoIdealModal from '../../components/PesoIdealModal/PesoIdeialModal';
import EditPessoaModal from '../../components/EditPessoaModal/EditPessoaModal';
import { getAllPessoas, deletePessoa, getPessoasByNome } from '../../services/PessoaService';
import './HomePage.css';

const HomePage = () => {
  const [pessoas, setPessoas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPesoIdealModalOpen, setIsPesoIdealModalOpen] = useState(false);


  useEffect(() => {
    loadPessoas();
  }, []);


  const loadPessoas = async () => {
    try {
      const response = await getAllPessoas();
      setPessoas(response.data);
    } catch (error) {
      console.error('Error loading pessoas:', error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const response = await getPessoasByNome(searchTerm);
        if (response && response.data) {
          setPessoas(response.data);
          setHasSearched(true);
        } else {
          setPessoas([]);
          setHasSearched(false);
        }
      } else {
        await loadPessoas();
        setHasSearched(false);
      }
    } catch (error) {
      console.error('Error searching pessoas:', error);
      setPessoas([]); // Limpar lista em caso de erro
    }
  };


  const handleDeletePessoa = async (id) => {
    try {
      await deletePessoa(id);
      await loadPessoas();
      setSearchTerm('');
    } catch (error) {
      console.error('Error deleting pessoa:', error);
    }
  };


  const handleOpenEditModal = () => {
    if (selectedPessoa) {
      setIsEditModalOpen(true);
    }
  };


  const handleOpenPesoIdealModal = () => {
    if (selectedPessoa) {
      setIsPesoIdealModalOpen(true);
    }
  }


  const handleDelete = async () => {
    if (selectedPessoa) {
      handleDeletePessoa(selectedPessoa);
    }
  }


  return (
    <div className="home-page">
      <div className="action-buttons">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ActionButton
          color="#007bff"
          text="Pesquisar"
          onClick={handleSearch}
        />
        <ActionButton
          color="#28a745"
          text="Incluir"
          onClick={() => setIsAddModalOpen(true)}
        />
        {hasSearched && (
          <>
            <ActionButton
              color="#ffc107"
              text="Alterar"
              onClick={handleOpenEditModal}
            />
            <ActionButton
              color="#dc3545"
              text="Excluir"
              onClick={handleDelete}
            />
          </>
        )}
        <ActionButton
          color="#17a2b8"
          text="Calcular Peso Ideal"
          onClick={handleOpenPesoIdealModal}
        />
      </div>

      <div className="pessoa-list">
        {pessoas ? pessoas.map((pessoa) => (
          <InfoCard
            key={pessoa.id}
            pessoa={pessoa}
            isSelected={selectedPessoa === pessoa.id}
            onSelect={() => setSelectedPessoa(pessoa.id)}
          />
        )) : 'Carregando'}
      </div>
      <AddPessoaModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} OnSave={loadPessoas} />
      <EditPessoaModal
        isOpen={isEditModalOpen}
        selectedPessoa={selectedPessoa}
        onClose={() => setIsEditModalOpen(false)}
        onSave={loadPessoas}
      />
      <PesoIdealModal
        isOpen={isPesoIdealModalOpen}
        onClose={() => setIsPesoIdealModalOpen(false)}
        selectedPessoa={selectedPessoa}
      />
    </div>
  );
};

export default HomePage;