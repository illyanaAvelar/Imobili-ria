import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';    
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

export default function Register(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const history = useHistory();
    
    async function handleRegister(e){
        debugger;
        e.preventDefault();

        const data = {
            name,
            email,
        };
        
    try{
        const response = await api.post('realestate', data);

        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');
    }catch(err){
        debugger;
        alert('Algo deu errado. Tente novamente');
    }
}

    return(
        <div className = "register-container">
            <div className = "content">
                <section>

                    <h1>Cadastro</h1>
                    
                    <Link className = "back-link" to = '/'>
                        <FiArrowLeft size = {16} color = "green"/>
                        Já possuo cadastro
                    </Link> 
                </section>
  
                <form onSubmit = {handleRegister}>
                    <input 
                        placeholder = "Nome da Imobiliaria" 
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                    <input
                        type = "email" 
                        placeholder = "E-mail" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                   
                    <button className = "button" type = "submit">Cadastrar</button>
                                      
                </form>
            </div>
        </div>
    )
}

