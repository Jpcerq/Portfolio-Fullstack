import React, { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const projetos = [
  {
    numero: '01',
    titulo: 'Automação Google + TikTok',
    descricao: 'Pipeline para tratar dados de mídia das duas plataformas e enviá-los de forma confiável ao banco de dados.',
    tags: ['Python', 'APIs', 'Dados'],
    icone: 'fa-solid fa-arrows-rotate',
  },
  {
    numero: '02',
    titulo: 'Ponte',
    descricao: 'Aplicação para compartilhar arquivos e textos entre dispositivos conectados a redes diferentes.',
    tags: ['Fullstack', 'Redes', 'Em desenvolvimento'],
    icone: 'fa-solid fa-network-wired',
  },
  {
    numero: '03',
    titulo: 'Painel Eudora',
    descricao: 'Dashboard que transforma dados operacionais em uma visualização direta, clara e útil para decisão.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icone: 'fa-solid fa-chart-line',
  },
];

const competencias = [
  { titulo: 'Dados', texto: 'Python, Pandas e SQL para tratar, organizar e analisar dados.', icone: 'fa-solid fa-database' },
  { titulo: 'APIs REST', texto: 'Consumo e integração de APIs REST em fluxos e aplicações.', icone: 'fa-solid fa-plug' },
  { titulo: 'Business Intelligence', texto: 'Looker Studio e Power BI para dashboards e visualização de indicadores.', icone: 'fa-solid fa-chart-column' },
  { titulo: 'Git & GitHub', texto: 'Versionamento, colaboração e organização do desenvolvimento.', icone: 'fa-brands fa-github' },
  { titulo: 'Desenvolvimento Web', texto: 'HTML, CSS, JavaScript e React para construir interfaces responsivas.', icone: 'fa-solid fa-code' },
  { titulo: 'Cloud & Entrega', texto: 'Implantação em nuvem e acompanhamento do fluxo até a produção.', icone: 'fa-solid fa-cloud-arrow-up' },
];

const interesses = ['Tecnologia', 'Jogos', 'Modelagem 3D', 'Panificação'];

function classificarImc(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso adequado';
  if (imc < 30) return 'Sobrepeso';
  return 'Obesidade';
}

function CalculadoraImc() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [enviado, setEnviado] = useState(false);

  const imc = useMemo(() => {
    const alturaNumero = Number(altura);
    const pesoNumero = Number(peso);
    if (!alturaNumero || !pesoNumero || alturaNumero <= 0 || pesoNumero <= 0) return null;
    return pesoNumero / alturaNumero ** 2;
  }, [altura, peso]);

  function calcular(event) {
    event.preventDefault();
    setEnviado(true);
  }

  return (
    <main className="atividade-pagina">
      <a className="voltar" href="/">
        <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Voltar ao portfólio
      </a>
      <section className="calculadora-card" aria-labelledby="titulo-imc">
        <div className="calculadora-intro">
          <span className="secao-indice">Atividade 01</span>
          <h1 id="titulo-imc">Calculadora de IMC</h1>
          <p>Informe sua altura em metros e seu peso em quilogramas para obter uma estimativa.</p>
        </div>
        <form onSubmit={calcular} noValidate>
          <label htmlFor="altura">Altura</label>
          <div className="campo-com-unidade">
            <input type="number" id="altura" min="0.5" max="2.5" step="0.01" placeholder="1,75" value={altura} onChange={(event) => { setAltura(event.target.value); setEnviado(false); }} required />
            <span>m</span>
          </div>
          <label htmlFor="peso">Peso</label>
          <div className="campo-com-unidade">
            <input type="number" id="peso" min="1" max="500" step="0.1" placeholder="70" value={peso} onChange={(event) => { setPeso(event.target.value); setEnviado(false); }} required />
            <span>kg</span>
          </div>
          <button className="botao botao-primario" type="submit">Calcular IMC</button>
        </form>
        <div className={`resultado-imc ${enviado ? 'visivel' : ''}`} role="status" aria-live="polite">
          {enviado && imc ? (
            <><span>Seu resultado</span><strong>{imc.toFixed(1)}</strong><p>{classificarImc(imc)}</p></>
          ) : enviado ? <p>Preencha os dois campos com valores válidos.</p> : <p>Seu resultado aparecerá aqui.</p>}
        </div>
        <small>Esta calculadora tem finalidade educacional e não substitui orientação profissional.</small>
      </section>
    </main>
  );
}

const atividades = {
  imc: {
    titulo: 'Calculadora de IMC',
    descricao: 'Uma experiência simples em React para calcular e interpretar o índice de massa corporal.',
    componente: CalculadoraImc,
  },
};

function Portfolio() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="marca" href="#inicio" aria-label="Início">JP<span>.</span></a>
        <button className="menu-botao" type="button" aria-expanded={menuAberto} aria-controls="navegacao" onClick={() => setMenuAberto((aberto) => !aberto)}>
          <span className="sr-only">Abrir menu</span>
          <i className={`fa-solid ${menuAberto ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
        </button>
        <nav id="navegacao" className={menuAberto ? 'aberto' : ''} aria-label="Navegação principal">
          <a href="#sobre" onClick={fecharMenu}>Sobre</a>
          <a href="#projetos" onClick={fecharMenu}>Projetos</a>
          <a href="#atividades" onClick={fecharMenu}>Atividades</a>
          <a className="nav-contato" href="#contato" onClick={fecharMenu}>Vamos conversar <i className="fa-solid fa-arrow-right" aria-hidden="true" /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="titulo-principal">
          <div className="hero-conteudo">
            <p className="eyebrow"><span /> Engenharia da Computação & Dados</p>
            <h1 id="titulo-principal">Olá, eu sou<br /><em>João Pedro.</em></h1>
            <p className="hero-resumo">Transformo dados e ideias em soluções digitais que funcionam — com técnica, clareza e atenção aos detalhes.</p>
            <div className="hero-acoes">
              <a className="botao botao-primario" href="#projetos">Conheça meu trabalho <i className="fa-solid fa-arrow-down" aria-hidden="true" /></a>
              <a className="botao botao-texto" href="mailto:joaopguima@gmail.com">joaopguima@gmail.com</a>
            </div>
          </div>

          <div className="retrato-area" aria-label="Retrato de João Pedro">
            <div className="retrato-moldura">
              <img src="/eu.png" alt="João Pedro Cerqueira Guimarães" />
              <span className="retrato-numero">01</span>
            </div>
          </div>

          <a className="hero-scroll" href="#sobre" aria-label="Rolar para a seção sobre mim">
            <span>Role para descobrir</span><i className="fa-solid fa-arrow-down-long" aria-hidden="true" />
          </a>
        </section>

        <section className="secao sobre" id="sobre">
          <div className="secao-cabecalho">
            <span className="secao-indice">01 — Sobre mim</span>
            <h2>Entre tecnologia,<br /><em>dados e pessoas.</em></h2>
          </div>
          <div className="sobre-conteudo">
            <div className="sobre-texto">
              <p className="texto-destaque">Sou estudante de Engenharia da Computação no SENAI CIMATEC e atuo com dados na Ideia 3.</p>
              <p>No dia a dia, trabalho principalmente com tratamento e conexões de dados de publicidade do Grupo Boticário. É nesse encontro entre análise e construção que encontrei meu caminho profissional.</p>
            </div>
            <dl className="sobre-dados">
              <div><dt>Formação</dt><dd>Engenharia da Computação</dd></div>
              <div><dt>Instituição</dt><dd>SENAI CIMATEC</dd></div>
              <div><dt>Atuação</dt><dd>Engenharia de Dados</dd></div>
              <div><dt>Localização</dt><dd>Salvador, Bahia</dd></div>
            </dl>
          </div>
          <div className="subsecao-cabecalho">
            <h3>Habilidades</h3>
            <p>Tecnologias e ferramentas que fazem parte do meu trabalho e da minha formação.</p>
          </div>
          <div className="competencias">
            {competencias.map((competencia, indice) => (
              <article className="competencia" key={competencia.titulo}>
                <span>0{indice + 1}</span>
                <i className={competencia.icone} aria-hidden="true" />
                <h3>{competencia.titulo}</h3>
                <p>{competencia.texto}</p>
              </article>
            ))}
          </div>
          <div className="interesses-bloco">
            <div>
              <span className="secao-indice">Além do trabalho</span>
              <h3>Interesses</h3>
            </div>
            <ul>
              {interesses.map((interesse) => <li key={interesse}>{interesse}</li>)}
            </ul>
          </div>
        </section>

        <section className="secao projetos" id="projetos">
          <div className="secao-cabecalho claro">
            <span className="secao-indice">02 — Projetos selecionados</span>
            <h2>Ideias que saíram<br /><em>do papel.</em></h2>
            <p>Uma seleção de projetos de dados e desenvolvimento que representam meu jeito de pensar e construir.</p>
          </div>
          <div className="projetos-lista">
            {projetos.map((projeto) => (
              <article className="projeto" key={projeto.titulo}>
                <div className="projeto-topo"><span>{projeto.numero}</span><i className={projeto.icone} aria-hidden="true" /></div>
                <div className="projeto-corpo">
                  <h3>{projeto.titulo}</h3>
                  <div><p>{projeto.descricao}</p><ul aria-label="Tecnologias e características">{projeto.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="secao atividades" id="atividades">
          <div className="secao-cabecalho">
            <span className="secao-indice">03 — Fullstack</span>
            <h2>Aprender fazendo,<br /><em>sempre.</em></h2>
          </div>
          <div className="atividade-lista">
            {Object.entries(atividades).map(([id, atividade], indice) => (
              <a className="atividade-item" href={`/?atividade=${id}`} target="_blank" rel="noreferrer" key={id}>
                <span className="atividade-numero">0{indice + 1}</span>
                <div><h3>{atividade.titulo}</h3><p>{atividade.descricao}</p></div>
                <span className="atividade-abrir">Abrir atividade <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="contato" id="contato">
          <p className="eyebrow"><span /> Entre em contato</p>
          <h2>Tem uma ideia?<br /><em>Vamos construir.</em></h2>
          <a className="contato-email" href="mailto:joaopguima@gmail.com">joaopguima@gmail.com <i className="fa-solid fa-arrow-up-right" aria-hidden="true" /></a>
          <div className="contato-rodape">
            <div className="redes">
              <a href="https://github.com/jpcerq" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" aria-hidden="true" /> GitHub</a>
              <a href="https://www.linkedin.com/in/joao-pedro-cerqueira-guimaraes/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /> LinkedIn</a>
            </div>
            <p>João Pedro Cerqueira © {new Date().getFullYear()}</p>
          </div>
        </section>
      </main>
    </>
  );
}

const atividadeAtual = new URLSearchParams(window.location.search).get('atividade');
const ComponenteDaAtividade = atividades[atividadeAtual]?.componente;

createRoot(document.getElementById('root')).render(
  <StrictMode>{ComponenteDaAtividade ? <ComponenteDaAtividade /> : <Portfolio />}</StrictMode>,
);
