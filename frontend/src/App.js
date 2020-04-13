import React from "react";

import "./styles/global.css";
import "./styles/repository.css";
import "./styles/repository-info.css";

import { useState, useEffect } from "react";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const data = {
      title,
      url,
      techs,
    }

    const response = await api.post('/repositories', data);

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository =>  repository.id !== id));
  }

  return (
    <div className="repository-list">
      <div className="repository-info">
        <input 
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input 
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <input 
          placeholder="Techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
        <button className="adicionar" onClick={handleAddRepository}>Adicionar</button>
      </div>

      <article>
        <ul data-testid="repository-list">
          {repositories.map(repository => 
            <div key={repository.id} className="repository">
              <li>
                <h1>
                  <span>Nome do Repositório </span>
                  <p>{repository.title}</p>
                </h1>
                  
                <h1>
                  <span>Site do Repositório </span>
                  <p>{repository.url}</p>
                </h1>
                <h1>
                  <span>Tecnologias </span>
                  <p>{repository.techs}</p>
                </h1>
                <h1>Likes: {repository.likes}</h1>
                <button className="remover" onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                </button>
              </li>
            </div>
              
            )
          }
        </ul>
      </article>
    </div>
  );
}

export default App;
