/* ==========================================================
   NAVALHA DE OURO BARBEARIA — main.js
   JavaScript puro, sem dependências. Comentários em PT-BR.
   Ordem: menu, cabeçalho, menu ativo, animações, galeria,
          depoimentos, status "aberto agora", formulário, ano.
   ========================================================== */

/* ÚNICO LUGAR ONDE TROCAR O WHATSAPP (além do index.html):
   número no formato 55 + DDD + número => 5521999999999 */
const NUMERO_WHATSAPP = '5521999999999';

/* Utilitário: reduz animações quando o usuário pede no sistema */
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const comportamentoRolagem = semAnimacao ? 'auto' : 'smooth';

/* ==========================================================
   1. MENU MOBILE (hambúrguer)
   ========================================================== */
const botaoMenu = document.querySelector('#btn-menu');
const listaMenu = document.querySelector('#menu');

function alternarMenu(abrir) {
  const vaiAbrir = typeof abrir === 'boolean' ? abrir : listaMenu.classList.toggle('aberta');
  botaoMenu.setAttribute('aria-expanded', String(vaiAbrir));
  listaMenu.classList.toggle('aberta', vaiAbrir);
  document.body.classList.toggle('menu-aberto', vaiAbrir);
}

if (botaoMenu && listaMenu) {
  botaoMenu.addEventListener('click', () => alternarMenu());

  // Fecha o menu ao clicar em um link (rolagem até a âncora)
  listaMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => alternarMenu(false));
  });

  // Fecha com a tecla Esc
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && listaMenu.classList.contains('aberta')) {
      alternarMenu(false);
      botaoMenu.focus();
    }
  });

  // Ao voltar para telas grandes, garante o menu sempre visível
  const mediaDesktop = window.matchMedia('(min-width: 900px)');
  const aoMudarTela = (evento) => { if (evento.matches) alternarMenu(false); };
  if (typeof mediaDesktop.addEventListener === 'function') {
    mediaDesktop.addEventListener('change', aoMudarTela);
  } else if (typeof mediaDesktop.addListener === 'function') {
    mediaDesktop.addListener(aoMudarTela); // navegadores mais antigos
  }
}

/* ==========================================================
   2. CABEÇALHO + BOTÃO FLUTUANTE DE WHATSAPP
   ========================================================== */
const cabecalho = document.querySelector('.cabecalho');
const zapFlutuante = document.querySelector('.zap-flutuante');

function aoRolar() {
  const rolou = window.scrollY > 40;
  if (cabecalho) cabecalho.classList.toggle('cabecalho--rolagem', rolou);
  // Mostra o botão fixo depois que a pessoa passa pelo topo
  if (zapFlutuante) zapFlutuante.classList.toggle('visivel', window.scrollY > 500);
}

window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

/* ==========================================================
   3. LINK ATIVO NA NAVEGAÇÃO (rolagem observando as seções)
   ========================================================== */
const linksAncora = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));

if ('IntersectionObserver' in window && linksAncora.length) {
  const mapaLink = new Map(linksAncora.map((link) => [link.getAttribute('href').slice(1), link]));

  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksAncora.forEach((link) => {
        link.classList.remove('ativo');
        link.removeAttribute('aria-current');
      });
      const linkAtivo = mapaLink.get(entrada.target.id);
      if (linkAtivo) {
        linkAtivo.classList.add('ativo');
        linkAtivo.setAttribute('aria-current', 'location');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  mapaLink.forEach((_, id) => {
    const secao = document.getElementById(id);
    if (secao) observadorSecoes.observe(secao);
  });
}

/* ==========================================================
   4. ANIMAÇÃO DE APARECER AO ROLAR (revelar)
   ========================================================== */
const elementosRevelar = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window && !semAnimacao) {
  const observadorRevelar = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        obs.unobserve(entrada.target); // anima uma única vez
      }
    });
  }, { threshold: .15 });

  elementosRevelar.forEach((el) => observadorRevelar.observe(el));
} else {
  // Sem suporte a observer ou com animações reduzidas: mostra tudo na hora
  elementosRevelar.forEach((el) => el.classList.add('visivel'));
}

/* ==========================================================
   5. GALERIA — visualização em tela cheia (<dialog>)
   ========================================================== */
const caixaLuz = document.querySelector('#lightbox');
const imagemLuz = document.querySelector('#lightbox-img');
const botaoFecharLuz = document.querySelector('#lightbox-fechar');
let gatilhoLuz = null;

if (caixaLuz && imagemLuz && typeof caixaLuz.showModal === 'function') {
  document.querySelectorAll('.galeria__item').forEach((botao) => {
    botao.addEventListener('click', () => {
      gatilhoLuz = botao;
      imagemLuz.src = botao.dataset.full || '';
      imagemLuz.alt = botao.dataset.alt || '';
      caixaLuz.showModal();
    });
  });

  botaoFecharLuz?.addEventListener('click', () => caixaLuz.close());

  // Clique fora da imagem fecha a caixa
  caixaLuz.addEventListener('click', (evento) => {
    if (evento.target === caixaLuz) caixaLuz.close();
  });

  // Devolve o foco para o cartão que abriu a imagem (acessibilidade)
  caixaLuz.addEventListener('close', () => {
    gatilhoLuz?.focus();
  });
}

/* ==========================================================
   6. DEPOIMENTOS — setas do carrossel (scroll horizontal)
   ========================================================== */
const trilhaDepoimentos = document.querySelector('.depoimentos__trilha');
const botaoAnterior = document.querySelector('#dep-anterior');
const botaoProximo = document.querySelector('#dep-proximo');

function moverDepoimentos(direcao) {
  if (!trilhaDepoimentos) return;
  const cartao = trilhaDepoimentos.querySelector('.depoimento');
  const passo = cartao ? cartao.getBoundingClientRect().width + 16 : 300;
  trilhaDepoimentos.scrollBy({ left: direcao * passo, behavior: comportamentoRolagem });
}

botaoAnterior?.addEventListener('click', () => moverDepoimentos(-1));
botaoProximo?.addEventListener('click', () => moverDepoimentos(1));

/* ==========================================================
   7. HORÁRIO — selo "aberto agora" calculado em tempo real
   ========================================================== */
const seloFuncionamento = document.querySelector('#status-funcionamento');

if (seloFuncionamento) {
  const agora = new Date();
  const diaSemana = agora.getDay();   // 0 = domingo ... 6 = sábado
  const hora = agora.getHours();

  const abertoAgora = diaSemana >= 1 && diaSemana <= 6 && hora >= 9 && hora < 20;

  seloFuncionamento.textContent = abertoAgora
    ? 'Aberto agora — até as 20h'
    : 'Fechado agora — voltamos às 9h';

  seloFuncionamento.classList.toggle('aberto', abertoAgora);
  seloFuncionamento.classList.toggle('fechado', !abertoAgora);
}

/* ==========================================================
   8. FORMULÁRIO DE CONTATO
   Monta a mensagem e abre o WhatsApp com tudo já digitado.
   ========================================================== */
const formulario = document.querySelector('#form-contato');
const statusFormulario = document.querySelector('#form-status');

if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Valida os campos nativos (required, pattern, type) antes de enviar
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      if (statusFormulario) {
        statusFormulario.textContent = 'Confira os campos destacados antes de continuar.';
        statusFormulario.className = 'formulario__status erro';
      }
      return;
    }

    const dados = new FormData(formulario);
    const nome = String(dados.get('nome') || '').trim();
    const telefone = String(dados.get('whatsapp') || '').trim();
    const servico = String(dados.get('servico') || '').trim();
    const dia = String(dados.get('dia') || '').trim();
    const mensagem = String(dados.get('mensagem') || '').trim();

    // Texto que o cliente já vai ver pronto na conversa
    const texto = [
      'Olá, Navalha de Ouro! Quero agendar um horário.',
      '',
      `Nome: ${nome}`,
      `WhatsApp: ${telefone}`,
      `Serviço: ${servico}`,
      dia ? `Melhor dia: ${dia}` : '',
      mensagem ? `Observação: ${mensagem}` : ''
    ].filter((linha, indice) => indice === 0 || linha !== '').join('\n');

    if (statusFormulario) {
      statusFormulario.textContent = 'Tudo certo! Abrindo o WhatsApp com a sua mensagem…';
      statusFormulario.className = 'formulario__status ok';
    }

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* ==========================================================
   9. ANO ATUAL NO RODAPÉ
   ========================================================== */
const anoAtual = document.querySelector('#ano-atual');
if (anoAtual) anoAtual.textContent = String(new Date().getFullYear());


