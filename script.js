function criarBarra(var_nome, var_avatar) {

  // Estilos CSS embutidos diretamente no JavaScript
const css = `
  #checkIcon { stroke-dasharray: 40; stroke-dashoffset: 40; }
  #checkIcon path:nth-child(1) { animation: showIcon 250ms ease forwards; animation-delay: 500ms; }
  #checkIcon path:nth-child(2) { animation: showIcon 250ms ease forwards; animation-delay: 400ms; }
  @keyframes showIcon { to { stroke-dashoffset: 0 } }

  .timeNow {animation: 300ms fadeIn;animation-fill-mode: forwards;visibility: hidden;}
  @keyframes fadeIn {99% {visibility: hidden;}100% {visibility: visible;}}

  audio::-webkit-media-controls-play-button, audio::-webkit-media-controls-panel { background-color: #fff; }
  audio::-webkit-media-controls-current-time-display { position: absolute; margin-top: 40px; margin-left: 50px; color: #666; }
  audio::-webkit-media-controls-time-remaining-display, audio::-internal-media-controls-download-button, video::-internal-media-controls-download-button { display: none; }
  .hide { display: none !important; }

  }
`;

// Verifica se o estilo já foi adicionado, senão, adiciona-o ao shadow DOM do typebot-standard
var cssId = 'myCss';  
if (!document.getElementById(cssId)) {
  var head = document.getElementsByTagName("typebot-standard")[0].shadowRoot.querySelector('.typebot-container');
  var styleSheet = document.createElement("style");
  styleSheet.id = cssId;
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  head.appendChild(styleSheet);
}

// Verifica se o bot está digitando ou gravando áudio e atualiza o status
setInterval(() => {
  const isTyping = botBody.querySelector('.bubble1');
  const sibling = isTyping?.parentElement?.parentElement?.nextSibling;

  const inputContainer = botBody.querySelector('.typebot-input-container');
  if (inputContainer){
    inputContainer.style.width = botBody.offsetWidth + "px"
  }

  if (isTyping && sibling?.src) {
    status.innerText = 'gravando áudio...';
  } else if (isTyping) {
    status.innerText = 'digitando...';
  } else {
    status.innerText = 'online';
  }

  // Atualiza o status das mensagens
  const allMessages = botBody.querySelector('.typebot-chat-view').querySelectorAll('.items-start.typebot-host-bubble');
  if (allMessages.length > mensagesLength) {
    if (!isTyping) {
      for (let i = mensagesLength; i < allMessages.length; i++) {
        const date = new Date();
        const hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        const timeNow = document.createElement('div');
        timeNow.innerHTML = `<div class="timeNow text-xs" style="position: relative; bottom: 0; right: 0px; color: #aaaaaa;">${hour}:${min}</div>`;
        const iconContainer = document.createElement('div');
        iconContainer.innerHTML = `
          <svg id="checkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.626 24.684" class="check-icon">
            <g transform="translate(-708.9 -601.383)">
              <path d="M728.035,623.468l1.382,1.482,17.929-20.334" fill="none" stroke="#36d075" stroke-linecap="round" stroke-width="3"></path>
              <path d="M712.017,616.07l7.088,8.039,17.757-20.14" fill="none" stroke="#36d075" stroke-linecap="round" stroke-width="3"></path>
            </g>
          </svg>`;
        allMessages[i].append(timeNow);
        allMessages[i].append(iconContainer);
      }
      mensagesLength = allMessages.length;
      audioNot.play();
    }
  }
}, 100);
}
