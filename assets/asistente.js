/*
 * Asistente Web — Conéctate por Fibra
 * ------------------------------------------------------------------
 * Este widget se CONFIGURA desde el CRM (Panel360 ISP → Asistente Web):
 * nombre, subtítulo, color, avatar, mensaje de bienvenida, posición y
 * los departamentos a los que enruta. Aquí va incrustado en la web pública.
 *
 * EN PRODUCCIÓN: cuando el CRM esté instalado en el hosting del ISP, este
 * archivo se reemplaza por el embed real del CRM, que conecta el chat con
 * la bandeja omnicanal y la IA:
 *
 *     <script src="https://crm.conectateporfibra.com/chat/1/embed.js" defer></script>
 *
 * Mientras tanto, este es el mismo widget en modo demostración (respuestas
 * locales + derivación real a WhatsApp).
 */
(function () {
  // === Configuración (equivalente a la del CRM) ===
  var CFG = {
    nombre: 'Asistente Conéctate',
    subtitulo: 'Normalmente responde al instante',
    bienvenida: '¡Hola! 👋 Soy el asistente de Conéctate por Fibra. ¿En qué te ayudo hoy?',
    color: '#0078d7',
    posicion: 'right',            // right | left
    whatsapp: '56949130098',      // WhatsApp oficial de Conéctate por Fibra
    // Departamentos (enrutamiento, igual que en el CRM)
    opciones: [
      { id: 'ventas',    label: '📶 Contratar internet', resp: '¡Genial! Tenemos planes de fibra desde <b>$25.000/mes</b> con WiFi 6, MAX Cine y deportes. ¿Me dices tu <b>comuna y dirección</b> para verificar factibilidad? Te dejo con un ejecutivo por WhatsApp para agendar la instalación.' },
      { id: 'soporte',   label: '🛠️ Soporte técnico',    resp: 'Lamento el inconveniente. Para revisar tu conexión necesito tu <b>RUT o número de cliente</b>. Si es urgente, te derivo con un técnico ahora mismo por WhatsApp.' },
      { id: 'cobranza',  label: '💳 Pagar mi cuenta',     resp: 'Puedes pagar por <b>transferencia, Webpay o en oficina</b>. El servicio se reactiva automáticamente al confirmar el pago. ¿Quieres que te envíe los datos de pago por WhatsApp?' },
      { id: 'retencion', label: '📄 Planes y precios',    resp: 'Tenemos <b>Sport</b> (600/750/900 MB) y <b>Cine</b> (140 canales FULL HD). ¿Buscas más velocidad o más canales? Con gusto te asesoro.' }
    ]
  };

  var side = CFG.posicion === 'left' ? 'left:20px' : 'right:20px';
  var css = '' +
  '.cw-fab{position:fixed;bottom:20px;' + side + ';z-index:9998;background:' + CFG.color + ';color:#fff;border:0;border-radius:999px;padding:13px 18px;font:600 15px Inter,system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,60,120,.35);cursor:pointer;display:flex;align-items:center;gap:8px;transition:transform .15s}' +
  '.cw-fab:hover{transform:translateY(-2px)}' +
  '.cw-panel{position:fixed;bottom:88px;' + side + ';z-index:9999;width:min(370px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));background:#fff;border-radius:18px;box-shadow:0 24px 60px rgba(0,30,70,.32);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif}' +
  '.cw-panel.open{display:flex;animation:cwIn .22s ease}' +
  '@keyframes cwIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
  '.cw-head{background:linear-gradient(135deg,' + CFG.color + ',#00479f);color:#fff;padding:15px 16px;display:flex;align-items:center;gap:11px}' +
  '.cw-av{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex:0 0 auto}' +
  '.cw-head b{display:block;font-size:15px}.cw-head span{font-size:12px;opacity:.85;display:flex;align-items:center;gap:5px}' +
  '.cw-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block}' +
  '.cw-x{margin-left:auto;background:0;border:0;color:#fff;font-size:22px;cursor:pointer;opacity:.85;line-height:1}' +
  '.cw-body{flex:1;overflow-y:auto;padding:16px;background:#f4f7fb;display:flex;flex-direction:column;gap:10px}' +
  '.cw-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45}' +
  '.cw-bot{background:#fff;color:#1a2b40;align-self:flex-start;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.06)}' +
  '.cw-me{background:' + CFG.color + ';color:#fff;align-self:flex-end;border-bottom-right-radius:4px}' +
  '.cw-quick{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 6px}' +
  '.cw-chip{background:#fff;border:1.5px solid ' + CFG.color + ';color:' + CFG.color + ';border-radius:999px;padding:8px 12px;font:600 13px Inter,sans-serif;cursor:pointer;transition:.12s}' +
  '.cw-chip:hover{background:' + CFG.color + ';color:#fff}' +
  '.cw-foot{border-top:1px solid #e6edf5;padding:9px;display:flex;gap:7px;background:#fff}' +
  '.cw-foot input{flex:1;border:1px solid #d5deea;border-radius:999px;padding:10px 14px;font-size:14px;outline:0}' +
  '.cw-foot input:focus{border-color:' + CFG.color + '}' +
  '.cw-send{background:' + CFG.color + ';border:0;color:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:16px}' +
  '.cw-wa{display:inline-block;margin-top:4px;background:#25d366;color:#fff;text-decoration:none;padding:8px 13px;border-radius:10px;font-weight:600;font-size:13px}' +
  '.cw-credit{text-align:center;font-size:10.5px;color:#9fb0c4;padding:5px}';

  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var fab = document.createElement('button');
  fab.className = 'cw-fab';
  fab.innerHTML = '<span style="font-size:18px">💬</span> ¿Necesitas ayuda?';

  var panel = document.createElement('div');
  panel.className = 'cw-panel';
  panel.innerHTML =
    '<div class="cw-head"><div class="cw-av">💬</div><div><b>' + CFG.nombre + '</b>' +
    '<span><i class="cw-dot"></i> ' + CFG.subtitulo + '</span></div>' +
    '<button class="cw-x" aria-label="Cerrar">&times;</button></div>' +
    '<div class="cw-body" id="cwBody"></div>' +
    '<div class="cw-quick" id="cwQuick"></div>' +
    '<form class="cw-foot" id="cwForm"><input id="cwInput" placeholder="Escribe tu mensaje..." autocomplete="off">' +
    '<button class="cw-send" type="submit" aria-label="Enviar">➤</button></form>' +
    '<div class="cw-credit">Asistente por Panel360 ISP</div>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var body = panel.querySelector('#cwBody');
  var quick = panel.querySelector('#cwQuick');
  var started = false;

  function waLink(txt) {
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(txt || 'Hola, vengo de la web de Conéctate por Fibra');
  }
  function add(html, who) {
    var m = document.createElement('div');
    m.className = 'cw-msg ' + (who === 'me' ? 'cw-me' : 'cw-bot');
    m.innerHTML = html;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }
  function renderQuick() {
    quick.innerHTML = '';
    CFG.opciones.forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'cw-chip'; b.textContent = o.label;
      b.onclick = function () { pick(o); };
      quick.appendChild(b);
    });
  }
  function pick(o) {
    add(o.label, 'me');
    quick.innerHTML = '';
    setTimeout(function () {
      add(o.resp + '<br><a class="cw-wa" target="_blank" href="' + waLink('Hola, quiero ayuda con: ' + o.label) + '">💬 Seguir por WhatsApp</a>', 'bot');
      setTimeout(renderQuick, 400);
    }, 550);
  }
  function open() {
    panel.classList.add('open');
    if (!started) {
      started = true;
      add(CFG.bienvenida, 'bot');
      renderQuick();
    }
  }
  fab.onclick = function () { panel.classList.contains('open') ? panel.classList.remove('open') : open(); };
  panel.querySelector('.cw-x').onclick = function () { panel.classList.remove('open'); };
  panel.querySelector('#cwForm').onsubmit = function (e) {
    e.preventDefault();
    var inp = panel.querySelector('#cwInput'); var v = inp.value.trim();
    if (!v) return;
    add(v, 'me'); inp.value = '';
    setTimeout(function () {
      add('¡Gracias! Un ejecutivo continuará tu consulta. Para atenderte más rápido, escríbenos por WhatsApp 👇<br><a class="cw-wa" target="_blank" href="' + waLink('Hola, ' + v) + '">💬 Abrir WhatsApp</a>', 'bot');
    }, 600);
  };
})();
