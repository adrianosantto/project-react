import React, { useState } from "react";
import { Button } from 'reactstrap';

import axios from 'axios';
import { api } from '../../config/configApi';

export const Login = () =>{

  const [dadosUsuario, setUsuario] = useState ({
    usuario: '',
    pass: ''
  });

  const [status, setStatus] = useState({
    type:'',
    messagem:''

  });

  const valorInput = e => setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value});

  const loginSubmit = async e =>{

    e.preventDefault();
    console.log(dadosUsuario.usuario);
    console.log(dadosUsuario.pass);

    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post(api + "/login", dadosUsuario, {headers})
    .then((response) => {


      console.log(response.data.messagem);
      if(response.data.erro){
          setStatus({
            type: 'erro',
            messagem: response.data.messagem
          });
      }else{
        setStatus({
          type: 'success',
          messagem: response.data.messagem
        })
      }
    }).catch(() =>{
      setStatus({
        type: 'erro',
        messagem: "Error: Usuario ou senha incorretos"
      });
    });
   }

  return(
    <div className="row">

      <h1 className="col-6 d-flex justify-content-center">Login</h1>

      <div className="col-4 d-flex justify-content-center">
        {status.type === 'erro' ? <p >{status.messagem}</p> : ""}
        {status.type === 'success' ? <p className="alert alert-success col-md-2">{status.messagem}</p> : ""}

          <form className="row g-3" onSubmit={loginSubmit}>
            <div class="col-md-12">
              <label clclassNameass="form-label">Email</label>
              <input type="text" className="form-control" name="usuario" placeholder="Digite o Usuário" onChange={valorInput}/>
            </div>
            <div className="col-md-12">
              <label  className="form-label">Password</label>
              <input type="password" className="form-control" name="pass" placeholder="Digite a Senha" onChange={valorInput}/>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        </form>
      </div>

    </div>
  );
}