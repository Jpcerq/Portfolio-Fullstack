import React, { StrictMode, useState, type ComponentType, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type AtividadeProps = { titulo: string; descricao: string; href: string };
type AtividadeDefinicao = Omit<AtividadeProps, 'href'> & { componente: ComponentType };

function CartaoAtividade({ titulo, descricao, href }: AtividadeProps) {
  return <article className="atividade"><h3>{titulo}</h3><p>{descricao}</p><a href={href} target="_blank" rel="noreferrer">Abrir atividade</a></article>;
}

function CalculadoraImc() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState('...');
  function calcularImc(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setResultado(`Seu IMC é: ${Number(peso) / (Number(altura) ** 2)}`); }
  return <main className="atividade-pagina"><a className="voltar" href="/">← Voltar ao portfólio</a><h1>Calculadora de IMC</h1><form onSubmit={calcularImc}><input type="number" id="altura" placeholder="Altura em M" value={altura} onChange={(event) => setAltura(event.target.value)} /><input type="number" id="peso" placeholder="Peso em Kg" value={peso} onChange={(event) => setPeso(event.target.value)} /><button id="butaos" type="submit">teste</button><div id="resultado">{resultado}</div></form></main>;
}

function ListaParticipantes() {
  const [nome, setNome] = useState('');
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState('');
  function adicionarParticipante(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const nomeLimpo = nome.trim(); if (!nomeLimpo) { setMensagem('Digite o nome do participante.'); return; } setParticipantes((lista) => [...lista, nomeLimpo]); setNome(''); setMensagem(''); }
  function removerParticipante(indice: number) { setParticipantes((lista) => lista.filter((_, indiceAtual) => indiceAtual !== indice)); }
  return <main className="atividade-pagina"><a className="voltar" href="/">← Voltar ao portfólio</a><h1>Lista de participantes</h1><p>Cadastre os visitantes da mostra de tecnologia.</p><form onSubmit={adicionarParticipante}><input type="text" placeholder="Nome do participante" value={nome} onChange={(event) => setNome(event.target.value)} /><button type="submit">Adicionar</button></form>{mensagem && <p className="mensagem-erro" role="alert">{mensagem}</p>}<p className="contador-participantes">Participantes cadastrados: {participantes.length}</p><ul className="lista-participantes">{participantes.map((participante, indice) => <li key={`${participante}-${indice}`}><span>{participante}</span><button type="button" onClick={() => removerParticipante(indice)}>Excluir</button></li>)}</ul></main>;
}

const atividades: Record<string, AtividadeDefinicao> = {
  imc: { titulo: 'Calculadora de IMC', descricao: 'Cálculo de índice de massa corporal.', componente: CalculadoraImc },
  participantes: { titulo: 'Lista de participantes', descricao: 'Cadastro e controle de visitantes de um evento.', componente: ListaParticipantes },
};

function Portfolio() {
  return <><header id="h1"><div className="links"><a href="#eu">Sobre mim</a></div><div className="links"><a href="#projetos2">Projetos</a></div><div className="links"><a href="#atividades-fullstack">Atividades-Fullstack</a></div><div className="links"><a href="#contato">Contato</a></div></header><main><section id="topo" aria-label="Apresentação"><article className="cartao-apresentacao habilidades"><h2>Habilidades</h2><ul><li>SQL</li><li>Python & Pandas</li><li>Git</li><li>Gerenciamento e Implantação em Nuvem</li></ul></article><img id="eu" src="/eu.png" alt="Foto de João Pedro" /><article className="cartao-apresentacao interesses"><h2>Interesses</h2><ul><li>Tecnologia</li><li>Jogos</li><li>Modelagem 3D</li><li>Panificação</li></ul></article></section><div id="introducao"><p>Me chamo João Pedro Cerqueira Guimarães, sou estudante de Engenharia da Computação no Senai Cimatec no 7º semestre. Atualmente estágio na Ideia3 dentro da área de dados, trabalho principalmente com tratamento e conexões de dados relacionados a publicidade do grupo Boticário. Procuro seguir dentro da área de dados, buscando sempre oportunidades para me aperfeiçoar como profissional.</p></div></main><div id="projetos1"><h1>Alguns projetos</h1></div><div id="projetos2"><div className="projeto"><i className="fa-brands fa-google" /><i className="fa-brands fa-tiktok" /><h3>Automação Google TikTok</h3><p>Tratamento de dados das plataformas e envio para o banco de dados.</p></div><div className="projeto"><i className="fa-solid fa-network-wired" /><i className="fa-solid fa-file-arrow-up" /><h3>Ponte</h3><p>Envio de arquivos e textos entre dispositivos em redes diferentes.</p><p>(Em desenvolvimento)</p></div><div className="projeto"><i className="fa-solid fa-chart-line" /><i className="fa-solid fa-table" /><h3>Painel Eudora</h3><p>Dashboard desenvolvido com HTML, CSS e JavaScript.</p></div></div><section id="atividades-fullstack"><h1>Atividades-Fullstack</h1><div className="atividades-lista">{Object.entries(atividades).map(([id, atividade]) => <CartaoAtividade key={id} titulo={atividade.titulo} descricao={atividade.descricao} href={`/?atividade=${id}`} />)}</div></section><div id="contato"><h1 id="conversar">Vamos conversar!</h1><footer><div className="links-contato"><a href="mailto:joaopguima@gmail.com"><i className="fa-solid fa-envelope" /> E-mail</a><a href="https://github.com/jpcerq"><i className="fa-brands fa-github" /> GitHub</a><a href="https://www.linkedin.com/in/joao-pedro-cerqueira-guimaraes/"><i className="fa-brands fa-linkedin" /> LinkedIn</a></div></footer></div></>;
}

const atividadeAtual = new URLSearchParams(window.location.search).get('atividade');
const ComponenteDaAtividade = atividadeAtual ? atividades[atividadeAtual]?.componente : undefined;
createRoot(document.getElementById('root')!).render(<StrictMode>{ComponenteDaAtividade ? <ComponenteDaAtividade /> : <Portfolio />}</StrictMode>);
