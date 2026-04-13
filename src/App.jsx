import { useState } from "react";
import Button from "./components/Button";

export default function App() {
  const [atividade, setAtividade] = useState("");
  const [listaAtividade, setListaAtividades] = useState([]);

  function atualizarAtividade(e) { 
    setAtividade(e.target.value);
  }

  function adicionarAtividade(){ 
    if (atividade.trim() === "") return;

    const novaAtividade = {
      id: Date.now(),
      texto: atividade,
      feita: false
    };

    setListaAtividades([...listaAtividade, novaAtividade]);
    setAtividade(""); 
  }

  function marcarFeita(id) {
    const novaLista = listaAtividade.map(item =>
      item.id === id ? { ...item, feita: !item.feita } : item
    );

    setListaAtividades(novaLista);
  }

  function removerAtividade(id) {
    const novaLista = listaAtividade.filter(item => item.id !== id);
    setListaAtividades(novaLista);
  }

  return(
    <div>
      <h1>Lista de Atividades</h1>

      <input 
        type="text" 
        value={atividade} 
        onChange={atualizarAtividade}
      />

      <Button funcao={adicionarAtividade} btnText="Adicionar" />

      <ul>
        {listaAtividade.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.feita}
              onChange={() => marcarFeita(item.id)}
            />

            <span style={{
              textDecoration: item.feita ? "line-through" : "none"
            }}>
              {item.texto}
            </span>

            <Button 
              funcao={() => removerAtividade(item.id)} 
              btnText="Remover" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
