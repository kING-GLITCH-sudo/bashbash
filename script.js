function criarBarra(var_nome, var_avatar) {
  // Localiza o container principal do Typebot
  var elementoPai = document.getElementsByTagName("typebot-standard")[0].shadowRoot.querySelector('.typebot-container');

  // Cria a barra de topo
  var userBar = document.createElement("div");
  userBar.className = "user-bar";

  // Botão Voltar
  var backButton = document.createElement("div");
  backButton.className = "back";
  backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
</svg>`;

  // Avatar
  var avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.innerHTML = `<img src="${var_avatar}">`;

  // Nome e status
  var varDivNameAndStatus = document.createElement("div");
  varDivNameAndStatus.className = "name-status-div";

  var varName = document.createElement("div");
  varName.className = "name";
  varName.innerHTML = `<div style="display: flex;">${var_nome}<span data-testid="psa-verified"><svg viewBox="0 0 18 18" height="18" width="18" preserveAspectRatio="xMidYMid meet"><polygon fill="#27a1f9" points="..."/><polygon fill="#FFFFFF" points="..."/></svg></span></div>`;

  var varStatus = document.createElement("span");
  varStatus.className = "status";
  varStatus.innerText = "Atendimento";

  varDivNameAndStatus.appendChild(varName);
  varDivNameAndStatus.appendChild(varStatus);

  userBar.appendChild(backButton);
  userBar.appendChild(avatar);
  userBar.appendChild(varDivNameAndStatus);

  if (elementoPai) {
    elementoPai.prepend(userBar);
  }

  const botBody = elementoPai;
  const status = varStatus;

  setInterval(() => {
    const isTyping = botBody.querySelector('.bubble1');
    const sibling = isTyping?.parentElement?.parentElement?.nextSibling;

    if (isTyping && sibling?.src) {
      status.innerText = 'gravando áudio...';
    } else if (isTyping) {
      status.innerText = 'digitando...';
    } else {
      status.innerText = 'Atendimento';
    }
  }, 100);
}
