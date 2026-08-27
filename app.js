/**
 * Family Concierge AI & Lumora - Main Application Setup & Event Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroLanding();
  initNavigation();
  initRoleSwitcher();
  initChatSystem();
  initVault();
  initLegacy();
  initEmergency();
  initProactive();
  initAmbientAudio();
  initLightbox();

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initial Renders
  renderVaultList();
  if (window.LegacyModule) LegacyModule.renderTimeline();
  renderPrivacyMatrix();
  if (window.ProactiveScanner) ProactiveScanner.renderAlerts();
});

// ==========================================
// 1. MAINFRAME HERO LANDING & MOUSE SCRUB CONTROLLER
// ==========================================
function initHeroLanding() {
  const heroPage = document.getElementById('hero-landing-page');
  const appContainer = document.getElementById('app-container');
  const video = document.getElementById('mainframe-video');
  const typewriterOutput = document.getElementById('typewriter-output');
  const typewriterCursor = document.getElementById('typewriter-cursor');
  const actionPills = document.getElementById('action-pills-container');
  const hamburgerBtn = document.getElementById('btn-mainframe-hamburger');
  const mobileOverlay = document.getElementById('mainframe-mobile-overlay');
  const copyBtn = document.getElementById('btn-copy-email');
  const copyToast = document.getElementById('copy-toast');

  // --- Background Video Mouse-Scrub Controlled ---
  if (video) {
    let prevX = null;
    let targetTime = 0;
    let isSeeking = false;
    const SENSITIVITY = 0.8;

    video.addEventListener('seeked', () => {
      isSeeking = false;
      if (Math.abs(video.currentTime - targetTime) > 0.04) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, (targetTime || video.currentTime) + timeOffset));

      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    });
  }

  // --- Typewriter Text Animation ---
  const typewriterText = "Preserving what matters most. Securing memories, documents, and family heritage in one intelligent sanctuary.";
  const typeSpeed = 30; // ms per char for clean reading
  const startDelay = 500; // ms

  if (typewriterOutput) {
    typewriterOutput.textContent = "";
    setTimeout(() => {
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < typewriterText.length) {
          typewriterOutput.textContent += typewriterText.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          if (typewriterCursor) typewriterCursor.style.display = 'none';
        }
      }, typeSpeed);
    }, startDelay);
  }

  // --- Action Pill Buttons Appearance ---
  setTimeout(() => {
    if (actionPills) actionPills.classList.add('visible');
  }, 400);

  // --- Copy Email to Clipboard ---
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = "hello@familytwin.io";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email);
      }
      if (copyToast) {
        copyToast.classList.remove('hidden');
        setTimeout(() => {
          copyToast.classList.add('hidden');
        }, 2200);
      }
    });
  }

  // --- Mobile Hamburger Navigation ---
  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('open');
      mobileOverlay.classList.toggle('hidden', !isOpen);
    });

    mobileOverlay.querySelectorAll('.mobile-item').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileOverlay.classList.add('hidden');
      });
    });
  }

  // --- Vault Navigation Transitions with View Routing ---
  function enterVault(targetView = 'dashboard') {
    if (heroPage && appContainer) {
      heroPage.classList.add('hidden');
      appContainer.classList.remove('hidden');
      if (mobileOverlay) mobileOverlay.classList.add('hidden');
      if (hamburgerBtn) hamburgerBtn.classList.remove('open');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Start ambient music automatically on user entry
      if (window.startAmbientMusic) window.startAmbientMusic();

      // Switch to targeted view if provided
      if (typeof switchView === 'function' && targetView) {
        switchView(targetView);
      }
    }
  }

  function returnToHero() {
    if (heroPage && appContainer) {
      appContainer.classList.add('hidden');
      heroPage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Action Pills & Buttons that transition to Vault / Dashboard
  document.getElementById('btn-capsule-enter')?.addEventListener('click', () => enterVault('dashboard'));
  document.getElementById('btn-mobile-get-started')?.addEventListener('click', () => enterVault('dashboard'));
  document.getElementById('btn-enter-vault-action')?.addEventListener('click', () => enterVault('privacy'));
  document.getElementById('btn-hero-enter-vault-link')?.addEventListener('click', () => enterVault('dashboard'));
  document.getElementById('btn-mainframe-touch')?.addEventListener('click', () => enterVault('chat'));

  document.querySelectorAll('.pill-btn-white').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'knowledge') {
        enterVault('vault');
      } else if (action === 'legacy') {
        enterVault('legacy');
      } else if (action === 'emergency') {
        enterVault('dashboard');
        const overlay = document.getElementById('emergency-overlay');
        if (overlay) overlay.classList.add('active');
      } else if (action === 'agents') {
        enterVault('chat');
      } else if (action === 'operate') {
        enterVault('privacy');
      } else {
        enterVault('dashboard');
      }
    });
  });

  document.getElementById('btn-return-landing')?.addEventListener('click', returnToHero);
  document.getElementById('sidebar-logo-brand')?.addEventListener('click', returnToHero);
  document.getElementById('mainframe-logo-brand')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// 2. WORKSPACE VIEW NAVIGATION
// ==========================================
function initNavigation() {
  const navButtons = document.querySelectorAll('.sidebar .nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });
}

function switchView(viewName) {
  document.querySelectorAll('.sidebar .nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  const titles = {
    dashboard: { title: 'Dashboard Overview', sub: 'Proactive intelligence keeping your family in sync.' },
    chat: { title: 'AI Concierge Multi-Agent Chat', sub: 'Privacy-aware delegation across specialized family agents.' },
    vault: { title: 'Family Knowledge Vault', sub: 'Securely catalog documents, passwords, medical files, and media.' },
    legacy: { title: 'Living Legacy Memory Archive', sub: 'Authentic verified family stories, photos, videos, and voice recordings.' },
    privacy: { title: 'Privacy & Control Center', sub: 'Granular role-based access policy map enforced by Privacy Agent.' }
  };

  const topTitle = document.getElementById('topbar-title');
  const topSub = document.getElementById('topbar-subtitle');
  if (topTitle && titles[viewName]) topTitle.textContent = titles[viewName].title;
  if (topSub && titles[viewName]) topSub.textContent = titles[viewName].sub;

  if (viewName === 'vault') renderVaultList();
  if (viewName === 'legacy' && window.LegacyModule) LegacyModule.renderTimeline();
  if (viewName === 'privacy') renderPrivacyMatrix();
}

// ==========================================
// 3. ROLE SWITCHER (RBAC)
// ==========================================
function initRoleSwitcher() {
  const roleSelect = document.getElementById('role-selector');
  if (!roleSelect) return;

  roleSelect.addEventListener('change', (e) => {
    const userKey = e.target.value;
    SecurityModule.setActiveUser(userKey);
    updateUserBadge(userKey);
    renderVaultList();
    if (window.LegacyModule) LegacyModule.renderTimeline();
  });

  document.querySelectorAll('.family-card').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.getAttribute('data-role');
      if (role && SecurityModule.users[role]) {
        SecurityModule.setActiveUser(role);
        roleSelect.value = role;
        updateUserBadge(role);
        renderVaultList();
        if (window.LegacyModule) LegacyModule.renderTimeline();
      }
    });
  });
}

function updateUserBadge(userKey) {
  const user = SecurityModule.users[userKey];
  const avatar = document.getElementById('current-user-avatar');
  const name = document.getElementById('current-user-name');
  const role = document.getElementById('current-user-role');

  if (avatar) avatar.textContent = user.avatar;
  if (name) name.textContent = user.name;
  if (role) role.textContent = user.role;
}

// ==========================================
// 4. AI CONCIERGE CHAT
// ==========================================
let activeChatAgent = 'concierge';

function initChatSystem() {
  const chatInput = document.getElementById('chat-user-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const clearBtn = document.getElementById('btn-clear-chat');
  const globalSearch = document.getElementById('global-search-ai');
  const tabs = document.querySelectorAll('.agent-chat-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeChatAgent = tab.getAttribute('data-agent');
      
      const titles = {
        concierge: 'Antigravity Multi-Agent Concierge Active',
        knowledge: 'Knowledge Agent Direct Channel',
        emergency: 'Emergency Agent Direct Channel',
        legacy: 'Living Legacy Agent Direct Channel',
        coordinator: 'Coordinator Agent Direct Channel',
        privacy: 'Privacy Agent Direct Channel',
        proactive: 'Proactive Scanner Agent Direct Channel'
      };
      const titleEl = document.getElementById('chat-agent-title');
      if (titleEl) titleEl.textContent = titles[activeChatAgent] || 'AI Active';
    });
  });

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    sendChatMessage(text);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const container = document.getElementById('chat-messages-container');
      if (container) {
        container.innerHTML = `
          <div class="message system-msg">
            <strong>Antigravity Orchestrator:</strong> Chat history reset. Ask me anything about family files, recipes, passwords, or emergencies.
          </div>
        `;
      }
    });
  }

  document.querySelectorAll('.pill-btn').forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-query');
      if (query) sendChatMessage(query);
    });
  });

  if (globalSearch) {
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = globalSearch.value.trim();
        if (query) {
          switchView('chat');
          sendChatMessage(query);
          globalSearch.value = '';
        }
      }
    });
  }

  document.getElementById('sim-scenario-1')?.addEventListener('click', () => {
    switchView('chat');
    sendChatMessage('Where are the house insurance papers?');
  });
  document.getElementById('sim-scenario-2')?.addEventListener('click', () => {
    switchView('chat');
    sendChatMessage('Grandma collapsed on the living room floor!');
  });
  document.getElementById('sim-scenario-3')?.addEventListener('click', () => {
    switchView('chat');
    sendChatMessage("What was Grandpa's favorite story?");
  });
  document.getElementById('sim-scenario-4')?.addEventListener('click', () => {
    switchView('chat');
    sendChatMessage('Run daily proactive scan on family alerts.');
  });
}

async function sendChatMessage(query) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const currentUser = SecurityModule.getActiveUserObj();

  const userMsg = document.createElement('div');
  userMsg.className = 'message user-msg';
  userMsg.innerHTML = `<strong>${currentUser.name}:</strong> ${escapeHtml(query)}`;
  container.appendChild(userMsg);
  container.scrollTop = container.scrollHeight;

  const botMsg = document.createElement('div');
  botMsg.className = 'message bot-msg';
  botMsg.innerHTML = `<em>Antigravity AI is querying specialized agents...</em>`;
  container.appendChild(botMsg);
  container.scrollTop = container.scrollHeight;

  await new Promise(r => setTimeout(r, 600));

  let result;
  if (activeChatAgent === 'knowledge' && AgentSystem.knowledgeAgentReceive) {
    result = await AgentSystem.knowledgeAgentReceive(query);
  } else if (activeChatAgent === 'emergency' && AgentSystem.emergencyAgentReceive) {
    result = await AgentSystem.emergencyAgentReceive(query);
  } else if (activeChatAgent === 'legacy' && AgentSystem.legacyAgentReceive) {
    result = await AgentSystem.legacyAgentReceive(query);
  } else {
    result = await AgentSystem.conciergeReceive(query);
  }

  botMsg.innerHTML = formatBotResponse(result.text);
  container.scrollTop = container.scrollHeight;
}

function formatBotResponse(text) {
  if (!text) return '';
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
  return `<div>${formatted}</div>`;
}

// ==========================================
// 5. KNOWLEDGE VAULT & MEDIA UPLOAD
// ==========================================
let activeVaultFilter = 'all';

function initVault() {
  const filterBtns = document.querySelectorAll('.vault-filters .filter-tag');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeVaultFilter = btn.getAttribute('data-category');
      renderVaultList();
    });
  });

  const fileInput = document.getElementById('new-item-file');
  const preview = document.getElementById('new-item-preview');
  let uploadedDataUrl = null;
  let uploadedFileType = null;

  if (fileInput && preview) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedDataUrl = event.target.result;
        uploadedFileType = file.type;
        preview.classList.remove('hidden');
        if (file.type.startsWith('image')) {
          preview.innerHTML = `<img src="${uploadedDataUrl}" alt="preview">`;
        } else if (file.type.startsWith('video')) {
          preview.innerHTML = `<video src="${uploadedDataUrl}" controls autoplay muted style="max-height:180px;"></video>`;
        } else {
          preview.innerHTML = `<div style="padding:0.6rem;background:#111;font-size:0.8rem;">📎 Attached: ${file.name}</div>`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const saveBtn = document.getElementById('btn-save-vault-item');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const title = document.getElementById('new-item-title').value.trim();
      const category = document.getElementById('new-item-category').value;
      const location = document.getElementById('new-item-location').value.trim();
      const owner = document.getElementById('new-item-owner').value;
      const privacy = document.getElementById('new-item-privacy').value;
      const value = document.getElementById('new-item-value').value.trim();

      if (!title || !value) {
        alert('Please fill in Title and Secured Data Content.');
        return;
      }

      const newNode = {
        id: `doc-${Date.now()}`,
        title: title,
        category: category,
        owner: owner,
        location: location || 'Digital Node',
        value: value,
        privacyLevel: privacy,
        fileUrl: uploadedDataUrl,
        fileType: uploadedFileType
      };

      McpSimulator.storage.db.unshift(newNode);
      renderVaultList();

      document.getElementById('new-item-title').value = '';
      document.getElementById('new-item-location').value = '';
      document.getElementById('new-item-value').value = '';
      if (fileInput) fileInput.value = '';
      if (preview) { preview.innerHTML = ''; preview.classList.add('hidden'); }
      uploadedDataUrl = null;
      uploadedFileType = null;
    });
  }

  const quickInput = document.getElementById('quick-file-input');
  const quickDropzone = document.getElementById('quick-upload-dropzone');
  const quickPreviewArea = document.getElementById('quick-upload-preview-area');

  if (quickDropzone && quickInput) {
    quickDropzone.addEventListener('dragover', (e) => { e.preventDefault(); quickDropzone.style.borderColor = '#fff'; });
    quickDropzone.addEventListener('dragleave', (e) => { e.preventDefault(); quickDropzone.style.borderColor = 'rgba(255,255,255,0.2)'; });
    quickDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer.files?.length > 0) handleQuickFiles(e.dataTransfer.files);
    });
    quickInput.addEventListener('change', (e) => {
      if (e.target.files?.length > 0) handleQuickFiles(e.target.files);
    });
  }

  function handleQuickFiles(files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const isVideo = file.type.startsWith('video');
        const isImage = file.type.startsWith('image');

        const node = {
          id: `file-${Date.now()}`,
          title: file.name,
          category: isVideo || isImage ? 'legacy' : 'document',
          owner: SecurityModule.activeUser,
          location: 'Vault Upload Storage',
          value: `Encrypted Asset: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
          privacyLevel: 'Family',
          fileUrl: dataUrl,
          fileType: file.type
        };

        McpSimulator.storage.db.unshift(node);
        renderVaultList();

        if (quickPreviewArea) {
          const thumb = document.createElement('div');
          thumb.className = 'preview-thumb';
          if (isImage) {
            thumb.innerHTML = `<img src="${dataUrl}" alt="${file.name}">`;
            thumb.onclick = () => openLightbox(dataUrl, 'image', file.name);
          } else if (isVideo) {
            thumb.innerHTML = `<video src="${dataUrl}" autoplay muted loop></video>`;
            thumb.onclick = () => openLightbox(dataUrl, 'video', file.name);
          } else {
            thumb.innerHTML = `<div style="background:#222;height:100%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;">📄</div>`;
          }
          quickPreviewArea.prepend(thumb);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

function renderVaultList() {
  const container = document.getElementById('vault-list-container');
  if (!container) return;

  const items = McpSimulator.storage.db.filter(item => {
    if (activeVaultFilter === 'all') return true;
    return item.category === activeVaultFilter;
  });

  container.innerHTML = '';

  items.forEach(item => {
    const perm = SecurityModule.checkAccess(item);
    const card = document.createElement('div');
    card.className = 'vault-card';

    let mediaHtml = '';
    if (item.fileUrl && perm.allowed) {
      if (item.fileType?.startsWith('image') || item.fileUrl.includes('unsplash') || item.fileUrl.endsWith('.jpg') || item.fileUrl.endsWith('.png')) {
        mediaHtml = `<div class="vault-media-preview" onclick="openLightbox('${item.fileUrl}', 'image', '${escapeHtml(item.title)}')"><img src="${item.fileUrl}" alt="${item.title}"></div>`;
      } else if (item.fileType?.startsWith('video') || item.fileUrl.endsWith('.mp4') || item.fileUrl.endsWith('.webm')) {
        mediaHtml = `<div class="vault-media-preview"><video src="${item.fileUrl}" controls style="max-height:180px;width:100%;"></video></div>`;
      }
    }

    card.innerHTML = `
      <div class="vault-card-top">
        <span class="vault-category-badge">${item.category}</span>
        <span class="vault-privacy-pill ${item.privacyLevel}">${item.privacyLevel}</span>
      </div>
      <h4>${item.title}</h4>
      <p class="vault-loc">📍 Location: ${item.location} | Owner: ${SecurityModule.users[item.owner]?.name || item.owner}</p>
      <div class="vault-val-box">
        ${perm.allowed ? escapeHtml(item.value) : `<span style="color:#ef4444;">🔒 Access Restricted (${perm.reason})</span>`}
      </div>
      ${mediaHtml}
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 6. LEGACY VAULT MEDIA & STORY RECORDER
// ==========================================
function initLegacy() {
  const uploadInput = document.getElementById('new-legacy-media-upload');
  const preview = document.getElementById('new-legacy-preview');
  let legacyDataUrl = null;
  let legacyFileType = null;

  if (uploadInput && preview) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        legacyDataUrl = event.target.result;
        legacyFileType = file.type;
        preview.classList.remove('hidden');
        if (file.type.startsWith('image')) {
          preview.innerHTML = `<img src="${legacyDataUrl}" alt="preview">`;
        } else if (file.type.startsWith('video')) {
          preview.innerHTML = `<video src="${legacyDataUrl}" controls autoplay muted style="max-height:180px;"></video>`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const saveBtn = document.getElementById('btn-save-legacy-item');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const title = document.getElementById('new-legacy-title').value.trim();
      const member = document.getElementById('new-legacy-member').value;
      const privacy = document.getElementById('new-legacy-privacy').value;
      const photo = document.getElementById('new-legacy-photo').value.trim();
      const video = document.getElementById('new-legacy-video').value.trim();
      const story = document.getElementById('new-legacy-story').value.trim();

      if (!title || !story) {
        alert('Please fill in Memory Title and Story transcription.');
        return;
      }

      const newMem = {
        id: `legacy-${Date.now()}`,
        title: title,
        subject: member,
        recordedDate: 'Verified ' + new Date().toLocaleDateString(),
        privacyLevel: privacy,
        story: story,
        photo: legacyFileType?.startsWith('image') ? legacyDataUrl : (photo || null),
        video: legacyFileType?.startsWith('video') ? legacyDataUrl : (video || null),
        audio: 'audio-voice-sim.wav',
        verificationHash: 'v3-' + Math.random().toString(36).substring(2, 9)
      };

      McpSimulator.legacy.memories.unshift(newMem);
      if (window.LegacyModule) LegacyModule.renderTimeline();

      document.getElementById('new-legacy-title').value = '';
      document.getElementById('new-legacy-photo').value = '';
      document.getElementById('new-legacy-video').value = '';
      document.getElementById('new-legacy-story').value = '';
      if (uploadInput) uploadInput.value = '';
      if (preview) { preview.innerHTML = ''; preview.classList.add('hidden'); }
      legacyDataUrl = null;
      legacyFileType = null;
    });
  }
}

// ==========================================
// 7. EMERGENCY SYSTEM
// ==========================================
function initEmergency() {
  const triggerBtn = document.getElementById('btn-emergency-trigger');
  const resolveBtn = document.getElementById('btn-resolve-emergency');
  const overlay = document.getElementById('emergency-overlay');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      SecurityModule.setEmergencyMode(true);
      if (overlay) overlay.classList.add('active');
      renderVaultList();
    });
  }

  if (resolveBtn && overlay) {
    resolveBtn.addEventListener('click', () => {
      SecurityModule.setEmergencyMode(false);
      overlay.classList.remove('active');
      renderVaultList();
    });
  }
}

// ==========================================
// 8. PRIVACY MATRIX RENDERER
// ==========================================
function renderPrivacyMatrix() {
  const tbody = document.getElementById('privacy-matrix-body');
  if (!tbody) return;

  const matrix = SecurityModule.getPermissionMatrix();
  tbody.innerHTML = '';

  matrix.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${row.name}</strong></td>
      <td>${renderPermTag(row.permissions.dad)}</td>
      <td>${renderPermTag(row.permissions.mom)}</td>
      <td>${renderPermTag(row.permissions.son)}</td>
      <td>${renderPermTag(row.permissions.daughter)}</td>
      <td>${renderPermTag(row.permissions.grandma)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPermTag(val) {
  if (!val) return '';
  if (val.includes('Write') || val === 'Full') return `<span class="perm-badge perm-full">${val}</span>`;
  if (val === 'Read') return `<span class="perm-badge perm-read">${val}</span>`;
  if (val.includes('Emergency')) return `<span class="perm-badge perm-em">${val}</span>`;
  return `<span class="perm-badge perm-none">${val}</span>`;
}

// ==========================================
// 9. PROACTIVE SCANNER
// ==========================================
function initProactive() {
  if (window.ProactiveScanner) ProactiveScanner.init();
}

// ==========================================
// 10. AMBIENT AUDIO SYNTHESIZER (Audible & Rich)
// ==========================================
let globalAudioCtx = null;
let ambientSynthInterval = null;
let isAmbientPlaying = true;

function initAmbientAudio() {
  const dashBtn = document.getElementById('btn-ambient-music');
  const dashLabel = document.getElementById('ambient-label');
  const heroBtn = document.getElementById('btn-hero-ambience');
  const heroText = heroBtn ? heroBtn.querySelector('.ambience-text') : null;
  const audioTag = document.getElementById('bg-relaxing-music');

  function updateUi(isPlaying) {
    if (dashBtn) dashBtn.classList.toggle('playing', isPlaying);
    if (dashLabel) dashLabel.textContent = isPlaying ? 'Ambience: On' : 'Ambience: Off';
    if (heroBtn) heroBtn.classList.toggle('playing', isPlaying);
    if (heroText) heroText.textContent = isPlaying ? 'Ambience: On' : 'Ambience: Off';
    const heroIcon = heroBtn ? heroBtn.querySelector('.music-icon') : null;
    const dashIcon = dashBtn ? dashBtn.querySelector('.music-icon') : null;
    if (heroIcon) heroIcon.textContent = isPlaying ? '🔊' : '🔇';
    if (dashIcon) dashIcon.textContent = isPlaying ? '🔊' : '🔇';
  }

  window.startAmbientMusic = function() {
    isAmbientPlaying = true;
    updateUi(true);
    if (audioTag) {
      audioTag.play().catch(() => {
        // Fallback to Web Audio synthesized harmonies
        startSynthEngine();
      });
    }
    startSynthEngine();
  };

  window.stopAmbientMusic = function() {
    isAmbientPlaying = false;
    updateUi(false);
    if (audioTag) audioTag.pause();
    if (ambientSynthInterval) clearInterval(ambientSynthInterval);
  };

  function toggleMusic() {
    if (isAmbientPlaying) {
      window.stopAmbientMusic();
    } else {
      window.startAmbientMusic();
    }
  }

  if (dashBtn) dashBtn.addEventListener('click', toggleMusic);
  if (heroBtn) heroBtn.addEventListener('click', toggleMusic);

  // Auto-resume audio on first user click anywhere
  window.addEventListener('click', () => {
    if (isAmbientPlaying && !ambientSynthInterval) {
      if (audioTag && audioTag.paused) {
        audioTag.play().catch(() => {});
      }
      startSynthEngine();
    }
  }, { once: true });

  function startSynthEngine() {
    try {
      if (!globalAudioCtx) {
        globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
      }

      if (ambientSynthInterval) clearInterval(ambientSynthInterval);

      // Harmonious chord progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // C, E, G, B
        [220.00, 261.63, 329.63, 392.00], // A, C, E, G
        [174.61, 220.00, 261.63, 329.63], // F, A, C, E
        [196.00, 261.63, 293.66, 392.00]  // G, C, D, G
      ];

      let chordIdx = 0;
      function playNextChord() {
        if (!isAmbientPlaying || !globalAudioCtx) return;
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((note, i) => {
          const osc = globalAudioCtx.createOscillator();
          const gain = globalAudioCtx.createGain();
          const filter = globalAudioCtx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, globalAudioCtx.currentTime + i * 0.1);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, globalAudioCtx.currentTime);

          gain.gain.setValueAtTime(0.001, globalAudioCtx.currentTime + i * 0.1);
          gain.gain.linearRampToValueAtTime(0.08, globalAudioCtx.currentTime + i * 0.1 + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, globalAudioCtx.currentTime + i * 0.1 + 5.5);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(globalAudioCtx.destination);

          osc.start(globalAudioCtx.currentTime + i * 0.1);
          osc.stop(globalAudioCtx.currentTime + i * 0.1 + 5.8);
        });
      }

      playNextChord();
      ambientSynthInterval = setInterval(playNextChord, 4500);
    } catch (e) {
      console.log('Synth start');
    }
  }
}

// ==========================================
// 11. MEDIA LIGHTBOX
// ==========================================
function initLightbox() {
  const modal = document.getElementById('media-lightbox-modal');
  const closeBtn = document.getElementById('btn-lightbox-close');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  }
}

window.openLightbox = function(url, type, caption) {
  const modal = document.getElementById('media-lightbox-modal');
  const target = document.getElementById('lightbox-media-target');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !target) return;

  if (type === 'image') {
    target.innerHTML = `<img src="${url}" alt="Preview" style="max-width:100%;max-height:70vh;border-radius:12px;">`;
  } else {
    target.innerHTML = `<video src="${url}" controls autoplay style="max-height:70vh;border-radius:12px;"></video>`;
  }
  if (cap) cap.textContent = caption || '';
  modal.classList.remove('hidden');
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
}
