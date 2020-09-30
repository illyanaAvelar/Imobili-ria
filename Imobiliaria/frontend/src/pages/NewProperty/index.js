import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function NewProperty(){
    const [apartamento, setApartamento] = useState(false);
    const [casa, setCasa] = useState(false);
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [quartos, setQuartos] = useState('');
    const [suites, setSuites] = useState('');
    const [salas, setSalas] = useState('');
    const [vagas, setVagas] = useState('');
    const [area, setArea] = useState('');
    const [armarios, setArmarios] = useState('');
    const [descricao, setDescricao] = useState('');
    const [aluguel, setAluguel] = useState('');
    const [andar, setAndar] = useState('');
    const [condominio, setCondominio] = useState('');
    const [portaria, setPortaria] = useState('');
   
    const history = useHistory();

    const Id = localStorage.getItem('Id');

    async function handleNewProperty(e){
        e.preventDefault();

        const data = {
           bairro,
           endereco,
           quartos,
           suites,
           salas,
           vagas,
           area,
           armarios,
           descricao,
           aluguel,
           andar,
           condominio, 
           portaria
        };

        try {
            await api.post('property', data, {
                headers: {
                    Authorization: Id,
                }
            })
        
            history.push('/profile');
            
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente');           
        }

    }

    return(
        <div className = "new-property-container">
        <div className = "content">
            <section>

                <h1>Cadastrar novo imóvel</h1>
                <p>Insira as informações sobre o imóvel conforme  formulário abaixo</p>
               
                <Link className = "back-link" to = '/profile'>
                    <FiArrowLeft size = {16} color = "green"/>
                    Voltar para home
                </Link> 

                <form on onSubmit = {handleNewProperty}>
                    <div className = "checkboxes">
                        <input 
                            type="checkbox"
                            id="checkBoxApartamento" 
                            checked={apartamento}
                            onClick={() => {
                                if(casa)
                                    setCasa(false);
                                setApartamento(!apartamento);
                            }}
                            >
                        </input>
                        <h3>Apartamento</h3>
                        <input 
                            type="checkbox" 
                            id="cs" 
                            checked={casa}
                            onClick={() => {
                                if(apartamento)
                                    setApartamento(false);
                                    setCasa(!casa);
                                    setCondominio('');
                                    setPortaria('');
                                    setAndar('');
                            }}>
                        </input>
                        <h3>Casa</h3>
                    </div>
                    <input 
                        placeholder = "Bairro"
                        value = {bairro}
                        onChange = {e => setBairro (e.target.value)} 
                    />
                    <input 
                        placeholder = "Endereço Completo"
                        value = {endereco}
                        onChange = {e => setEndereco (e.target.value)} 
                    />
                    <input 
                        placeholder = "Quartos"
                        value = {quartos}
                        onChange = {e => setQuartos (e.target.value)} 
                    />
                    <input 
                        placeholder = "Suítes"
                        value = {suites}
                        onChange = {e => setSuites (e.target.value)} 
                    />
                    <input 
                        placeholder = "Salas de Estar"
                        value = {salas}
                        onChange = {e => setSalas (e.target.value)} 
                    />
                    <input 
                        placeholder = "Vagas"
                        value = {vagas}
                        onChange = {e => setVagas (e.target.value)} 
                    />
                    <input 
                        placeholder = "Área em m^2"
                        value = {area}
                        onChange = {e => setArea (e.target.value)} 
                    />
                    <input 
                        placeholder = "Quantidade de Armários"
                        value = {armarios}
                        onChange = {e => setArmarios (e.target.value)} 
                    />
                    <input 
                        placeholder = "Descrição"
                        value = {descricao}
                        onChange = {e => setDescricao (e.target.value)} 
                    />
                    <input 
                        placeholder = "Valor do Aluguel"
                        value = {aluguel}
                        onChange = {e => setAluguel (e.target.value)} 
                    />
                    <input 
                        placeholder = "Andar"
                        id = "campo_apartamento"
                        value = {andar}
                        disabled = {!apartamento}
                        onChange = {e => setAndar (e.target.value)} 
                    />
                    <input 
                        placeholder = "Valor do Condomínio"
                        value = {condominio}
                        disabled = {!apartamento}
                        onChange = {e => setCondominio (e.target.value)} 
                    />
                    <input 
                        placeholder = "Possui portaria 24h"
                        value = {portaria}
                        disabled = {!apartamento}
                        onChange = {e => setPortaria (e.target.value)} 
                    />
                   
                    <button className = "button" type = "submit">Cadastrar</button>
                                    
                </form>
            </section>
        </div>
    </div>
    )

}