import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import api from '../../services/api';

import './style.css';

const options = [
    'Bairro1', 'Bairro2', 'Bairro3', 'Outros'
  ];

const defaultOption = options[0];

export default function Profile(){
    const [property, setProperty] = useState([]);

    const Name = localStorage.getItem('Name');
    const Id = localStorage.getItem('Id');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: Id
            }
        }).then(response => {
            setProperty(response.data);
        })
    }, [Id]);

    async function handleDeleteProperty(id){
        try {
            await api.delete(`property/${id}`, {
                headers: {
                    Authorization: Id,
                }
            })
          setProperty(property.filter(property => property.id !== id));  
        } catch (error) {
            alert('Erro ao deletar imóvel');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className = "profile-container">
            <header>
                <span>Bem vind@, {Name}</span>

                <Link className = "button" to = "./property/new">Cadastrar novo imóvel</Link>
                <button onClick = {handleLogout} type = "button">
                    <FiPower size = {18} color = "green" />
                </button>
            </header>

            <h1>Imóveis cadastrados</h1>

                <div className = "bairros">
                    <Dropdown className = "dropdown"
                        id="bairroDropdown"
                        options={options} 
                        value={defaultOption} 
                        placeholder="Escolha um bairro" 
                        onChange={(value) => {
                            if(value?.value === "Outros") {
                                document.getElementById("outroBairro").disabled = false;
                            }
                        }}
                    />
                    <input 
                        id = "outroBairro"
                        placeholder = "Bairro"
                        disabled = "true"
                    />
                </div>

            <ul>
                {property.map(property => {(
                    <li key = {property.id}>
                       
                       <strong>VALOR DO ALUGUEL:</strong>
                       <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.aluguel)}</p>
   
                       <strong>DETALHES DO IMÓVEL:</strong>
                       <p>Tipo: {property.tipo}</p>
                       <p>Bairro: {property.bairo}</p>
                       <p>Endereço: {property.endereco}</p>
                       <p>Quartos: {property.quartos}</p>
                       <p>Suites: {property.suites}</p>
                       <p>Salas: {property.salas}</p>
                       <p>Vagas: {property.vagas}</p>
                       <p>Area: {property.area}</p>
                       <p>Armarios: {property.armarios}</p>
                       <p>Descricao: {property.descricao}</p>
                       <p>Aluguel: {property.aluguel}</p>
                       <p hidden = {!property.tipo === 'apartamento'}>Andar: {property.andar}</p>
                       <p hidden = {!property.tipo === 'apartamento'}>Portaria: {property.portaria}</p>
                       <p hidden = {!property.tipo === 'apartamento'}>Condominio: {property.condominio}</p>

                       <button onClick = {() => handleDeleteProperty(property.id)} type = "button">
                           <FiTrash2 size = {20} color = "#a8a8b3"/>
                       </button>
                   </li>
                
                )})} 
            </ul>
        </div>
    );
}