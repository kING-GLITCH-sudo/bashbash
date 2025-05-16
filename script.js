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
