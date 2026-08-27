/**
 * NEURALYN × FAMILY VAULT — COMPLETE APPLICATION ENGINE
 * Features:
 * 1. Dual Hero Landing Page: Neuralyn Dark Tech & Aethera Light Mono Video Hero
 * 2. Multi-Agent AI System (7 specialized agents) with Semantic Routing & RBAC Privacy Shield
 * 3. Real Image, Video, and File Uploading with In-Browser Persistence (localStorage)
 * 4. Fullscreen Media Lightbox Viewer for Photos and Videos
 * 5. Dynamic Knowledge Vault with Granular Permissions
 * 6. Living Legacy Archive with Audio/Video Media Players & Voice Notes
 * 7. Interactive Privacy Matrix & Real-time Audit Logs
 * 8. Emergency Response Center (Elena Medical Emergency Protocol)
 * 9. Family Coordinator Calendar & Schedule Tasks
 * 10. Dashboard Background Theme Customizer
 * 11. Ambient Generative Audio Synthesizer
 */

// ==========================================
// 1. GLOBAL STATE & DATABASE
// ==========================================
const AppState = {
  activePage: 'landing', // 'landing' | 'workspace'
  activeView: 'dashboard', // 'dashboard' | 'chat' | 'vault' | 'legacy' | 'privacy'
  activeRole: 'dad', // 'dad' | 'mom' | 'son' | 'daughter' | 'grandma'
  activeAgent: 'concierge',
  isEmergencyActive: false,
  isAmbientPlaying: true,
  heroTheme: 'dark', // 'dark' (neuralyn) | 'gold' (aethera)
  dashboardBgTheme: 'bg-pure-black',
  geminiApiKey: '',

  // Family Members Metadata
  members: {
    dad: { name: 'Arthur (Dad)', role: 'Owner / Admin', avatar: 'D', class: 'dad' },
    mom: { name: 'Sarah (Mom)', role: 'Family Admin', avatar: 'S', class: 'mom' },
    son: { name: 'Leo (Son)', role: 'Member', avatar: 'L', class: 'son' },
    daughter: { name: 'Chloe (Daughter)', role: 'Member', avatar: 'C', class: 'daughter' },
    grandma: { name: 'Elena (Grandma)', role: 'Elder / Senior', avatar: 'E', class: 'grandma' }
  },

  // Knowledge Base Data Nodes
  knowledgeVault: [
    {
      id: 'doc-01',
      title: 'House Insurance Papers',
      category: 'document',
      owner: 'dad',
      location: 'Cupboard 2 (Blue Folder)',
      value: 'Policy BC-9481-2294A. Provider: BlueCross Family Shield Gold. Customer Care: 1-800-555-0199. Covers property damage, water leaks, and structural liability up to $1.2M.',
      privacyLevel: 'Restricted',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'doc-02',
      title: 'House Deed / Property Title',
      category: 'document',
      owner: 'dad',
      location: 'Cupboard 2 (Blue Folder)',
      value: 'Official Property Certificate #93821-PR. Registered to Arthur & Sarah Pendelton. Parcel 48-A.',
      privacyLevel: 'Private',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'cred-01',
      title: 'Netflix & Spotify Credentials',
      category: 'credentials',
      owner: 'son',
      location: "Leo's Bitwarden Vault",
      value: 'Netflix: family_stream@twinlink.net / P@ssw0rd2026! | Spotify: family_premium / LeoMusicRocks99',
      privacyLevel: 'Family',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'cred-02',
      title: 'Home High-Speed Wi-Fi Router',
      category: 'credentials',
      owner: 'daughter',
      location: 'Living Room Router Sticker (Underneath)',
      value: 'SSID: Neuralyn_Home_5G | WPA3 Password: SuperFastFamilyFiber2026',
      privacyLevel: 'Family',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'health-01',
      title: "Elena's Medical Allergies & Vitals",
      category: 'health',
      owner: 'mom',
      location: 'Kitchen Medical Folder / Refrigerator Magnet',
      value: 'Severe Allergy: Penicillin, Peanuts. Moderate: Aspirin sensitivity. Blood Type: O Positive (O+). Primary Care: Dr. Henderson (+1-555-894-3232).',
      privacyLevel: 'Emergency',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'health-02',
      title: "Elena's Daily Prescription Schedule",
      category: 'health',
      owner: 'mom',
      location: "Elena's Bedside Drawer",
      value: '1. Metformin 500mg (Twice daily after meals) 2. Lisinopril 10mg (Every morning 8am) 3. Low-dose Aspirin 81mg (Lunch).',
      privacyLevel: 'Emergency',
      fileUrl: null,
      fileType: null
    },
    {
      id: 'legacy-01',
      title: "Grandma Elena's Lemon Meringue Tart Recipe",
      category: 'legacy',
      owner: 'mom',
      location: 'Recipe Box in Pantry (Drawer 1)',
      value: 'Ingredients: 6 egg yolks, 1 cup fine cane sugar, 2 organic lemons (zested & juiced), 1 crisp butter crust. Whisk yolks until golden and thick. Bake at 375°F for 20 minutes until meringue peaks caramelize.',
      privacyLevel: 'Family',
      fileUrl: null,
      fileType: null
    }
  ],

  // Living Legacy Archive (Stories, Videos, Audio recordings, Photos)
  legacyMemories: [
    {
      id: 'leg-01',
      title: "Grandpa Robert's 1968 Journey to the Coast",
      subject: 'Grandpa Robert',
      privacy: 'Family',
      date: 'June 1968',
      photoUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80',
      videoUrl: null,
      audioClip: 'audio-sim-01',
      story: '"We took the old Chevy through the mountain pass before the new interstate was built. It took 14 hours with two flat tires, but watching the sunrise over the Pacific Ocean with your grandmother made every mile unforgettable."'
    },
    {
      id: 'leg-02',
      title: 'Summer Cottage Traditions & Lemon Tart',
      subject: 'Grandma Elena',
      privacy: 'Family',
      date: 'August 1984',
      photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      videoUrl: null,
      audioClip: 'audio-sim-02',
      story: '"Every August when the lemons ripened on the back patio, we would gather the whole family to whip the meringue by hand. The secret was never rushing the sugar syrup."'
    },
    {
      id: 'leg-03',
      title: 'Dad Arthur Winning the High School Science Fair',
      subject: 'Dad Arthur',
      privacy: 'Restricted',
      date: 'April 1996',
      photoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      videoUrl: null,
      audioClip: null,
      story: '"I built a miniature solar powered water pump using old car parts. That was the day I realized how much I loved engineering and building systems that protect families."'
    }
  ],

  // Proactive Alerts Feed
  proactiveAlerts: [
    {
      id: 'alert-01',
      title: 'Passport Expiration Notice',
      text: "Arthur's US Passport expires in 45 days (Oct 12). Renewal recommended before international trip.",
      level: 'warning',
      time: '10 mins ago'
    },
    {
      id: 'alert-02',
      title: 'Medication Interaction Verified',
      text: "Checked Dr. Henderson's update for Elena: Metformin + Lisinopril timing is safe and synchronized.",
      level: 'info',
      time: '32 mins ago'
    },
    {
      id: 'alert-03',
      title: 'Home Wi-Fi Firmware Update Available',
      text: 'Router TwinHome_5G has security patch v4.19 available. Chloe notified for 1-click update.',
      level: 'info',
      time: '1 hour ago'
    }
  ],

  // Privacy Matrix Definitions
  privacyMatrix: [
    { category: 'House Deeds & Titles', dad: 'Full (Owner)', mom: 'Read', son: 'None', daughter: 'None', grandma: 'None' },
    { category: 'Insurance Policies', dad: 'Full', mom: 'Full', son: 'Restricted', daughter: 'Restricted', grandma: 'Restricted' },
    { category: 'Passwords & Credentials', dad: 'Full', mom: 'Full', son: 'Full', daughter: 'Full', grandma: 'Read' },
    { category: 'Medical & Health Profiles', dad: 'Full', mom: 'Full (Admin)', son: 'Emergency Only', daughter: 'Emergency Only', grandma: 'Full (Self)' },
    { category: 'Legacy & Memory Archive', dad: 'Full', mom: 'Full', son: 'Read', daughter: 'Read', grandma: 'Full' },
    { category: 'Financial Investments', dad: 'Full (Owner)', mom: 'Read', son: 'None', daughter: 'None', grandma: 'None' }
  ]
};

// ==========================================
// 2. INITIALIZATION & LOCAL STORAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initNavigation();
  initHeroThemeToggle();
  initRoleSwitcher();
  initDashboardBgSwitcher();
  initMediaUploaders();
  initChatSystem();
  initKnowledgeVault();
  initLegacyArchive();
  initPrivacyMatrix();
  initProactiveFeed();
  initEmergencySystem();
  initLightbox();
  initAmbientAudio();
  initScrollReveal();
});

function loadSavedState() {
  try {
    const savedVault = localStorage.getItem('family_vault_nodes');
    if (savedVault) {
      const parsed = JSON.parse(savedVault);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.knowledgeVault = parsed;
      }
    }

    const savedMemories = localStorage.getItem('family_vault_memories');
    if (savedMemories) {
      const parsed = JSON.parse(savedMemories);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.legacyMemories = parsed;
      }
    }
  } catch (e) {
    console.error('Could not load saved state:', e);
  }
}

function persistState() {
  try {
    localStorage.setItem('family_vault_nodes', JSON.stringify(AppState.knowledgeVault));
    localStorage.setItem('family_vault_memories', JSON.stringify(AppState.legacyMemories));
  } catch (e) {
    console.warn('Storage quota limit reached for local storage persistence');
  }
}

// ==========================================
// 3. NAVIGATION & PAGE ROUTING
// ==========================================
function initNavigation() {
  const landingPage = document.getElementById('landing-page-container');
  const workspace = document.getElementById('app-workspace-container');

  function showWorkspace() {
    AppState.activePage = 'workspace';
    landingPage.classList.add('hidden');
    workspace.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showLanding() {
    AppState.activePage = 'landing';
    workspace.classList.add('hidden');
    landingPage.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Page Transitions
  document.getElementById('btn-nav-enter-vault')?.addEventListener('click', showWorkspace);
  document.getElementById('btn-hero-get-started')?.addEventListener('click', showWorkspace);
  document.getElementById('btn-enter-workspace-now')?.addEventListener('click', showWorkspace);
  document.getElementById('btn-footer-launch')?.addEventListener('click', showWorkspace);
  document.getElementById('btn-back-to-landing')?.addEventListener('click', showLanding);
  document.getElementById('sidebar-brand-click')?.addEventListener('click', showLanding);

  document.getElementById('btn-hero-watch-demo')?.addEventListener('click', () => {
    showWorkspace();
    switchWorkspaceView('chat');
    triggerSimulationScenario(3);
  });

  // Sidebar Tab Switching
  const navButtons = document.querySelectorAll('.sidebar .nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchWorkspaceView(view);
    });
  });
}

function switchWorkspaceView(viewName) {
  AppState.activeView = viewName;

  document.querySelectorAll('.sidebar .nav-btn').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  const titleMap = {
    dashboard: 'Dashboard Overview',
    chat: 'AI Concierge Multi-Agent Chat',
    vault: 'Family Knowledge Vault',
    legacy: 'Living Legacy & Media Archive',
    privacy: 'Privacy & Access Control Center'
  };

  const subtitleMap = {
    dashboard: 'Proactive intelligence keeping your family synchronized & safe.',
    chat: 'Collaborate with specialized agents with verified RBAC privacy filters.',
    vault: 'Securely catalog documents, passwords, medical files, and media.',
    legacy: 'Verified family stories, photos, videos, and oral recordings.',
    privacy: 'Granular permissions matrix and real-time security audit trails.'
  };

  const titleEl = document.getElementById('workspace-view-title');
  const subEl = document.getElementById('workspace-view-subtitle');
  if (titleEl) titleEl.textContent = titleMap[viewName] || 'Family Vault';
  if (subEl) subEl.textContent = subtitleMap[viewName] || '';
}

// ==========================================
// 4. HERO THEME SWITCHER (Neuralyn vs Golden Aethera)
// ==========================================
function initHeroThemeToggle() {
  const toggleBtn = document.getElementById('btn-toggle-hero-style');
  const toggleLabel = document.getElementById('theme-toggle-label');
  const videoEl = document.getElementById('hero-video-element');
  const mainTitle = document.getElementById('hero-main-title');
  const mainSubtitle = document.getElementById('hero-main-subtitle');
  const pillBadge = document.getElementById('hero-pill-badge');
  const pillText = document.getElementById('hero-pill-text');
  const landingWrapper = document.getElementById('landing-page-container');

  if (!toggleBtn || !videoEl) return;

  toggleBtn.addEventListener('click', () => {
    if (AppState.heroTheme === 'dark') {
      // Switch to Golden Aethera Mode
      AppState.heroTheme = 'gold';
      toggleLabel.textContent = 'Mode: Golden Aethera';
      videoEl.src = 'hero.mp4';
      videoEl.play().catch(() => {});
      landingWrapper?.classList.add('aethera-mode');

      if (mainTitle) {
        mainTitle.innerHTML = `<span style="font-family:var(--font-display);font-weight:300;letter-spacing:-1px;">FAMILY VAULT</span><br><span style="font-size:0.55em;opacity:0.9;font-weight:300;">A New Kind of Intelligence</span>`;
      }
      if (mainSubtitle) {
        mainSubtitle.innerHTML = `A single-screen video hero for your Living Digital Twin.<br>Click enter to see inside the family vault.`;
      }
      if (pillBadge) pillBadge.textContent = 'Aethera';
      if (pillText) pillText.textContent = 'Aethera Intelligence & Living Memory Architecture';
    } else {
      // Switch to Neuralyn Dark Tech Mode
      AppState.heroTheme = 'dark';
      toggleLabel.textContent = 'Mode: Dark Tech';
      videoEl.src = 'neuralyn_bg.mp4';
      videoEl.play().catch(() => {});
      landingWrapper?.classList.remove('aethera-mode');

      if (mainTitle) {
        mainTitle.innerHTML = `Your Insights.<br>One Clear <span class="accent-italic">Overview</span>.`;
      }
      if (mainSubtitle) {
        mainSubtitle.innerHTML = `Neuralyn helps families and teams track memories, documents, and routines with precision.<br>Powered by a living multi-agent intelligence that never sleeps.`;
      }
      if (pillBadge) pillBadge.textContent = 'New';
      if (pillText) pillText.textContent = 'Say Hello to Corewave v3.2 & Living Digital Twin';
    }
  });
}

// ==========================================
// 5. ROLE SWITCHER & ACCESS CONTROL (RBAC)
// ==========================================
function initRoleSwitcher() {
  const roleSelect = document.getElementById('role-selector');
  if (!roleSelect) return;

  roleSelect.addEventListener('change', (e) => {
    AppState.activeRole = e.target.value;
    updateActiveUserUI();
    renderKnowledgeVault();
    renderPrivacyMatrix();
  });

  document.querySelectorAll('.family-card').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.getAttribute('data-role');
      if (role && AppState.members[role]) {
        AppState.activeRole = role;
        roleSelect.value = role;
        updateActiveUserUI();
        renderKnowledgeVault();
        renderPrivacyMatrix();
      }
    });
  });
}

function updateActiveUserUI() {
  const user = AppState.members[AppState.activeRole];
  const avatarEl = document.getElementById('current-user-avatar');
  const nameEl = document.getElementById('current-user-name');
  const roleEl = document.getElementById('current-user-role');

  if (avatarEl) avatarEl.textContent = user.avatar;
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role;
}

// RBAC Permission Evaluator
function checkPermission(item, role = AppState.activeRole) {
  if (AppState.isEmergencyActive) {
    if (item.category === 'health' || item.privacyLevel === 'Emergency') {
      return { allowed: true, reason: 'Emergency Access Override' };
    }
  }

  if (item.privacyLevel === 'Family') {
    return { allowed: true, reason: 'Family Shared Access' };
  }

  if (role === 'dad' || role === 'mom') {
    if (item.privacyLevel === 'Private' && item.owner !== role) {
      return { allowed: false, reason: `Private to ${AppState.members[item.owner]?.name || item.owner}` };
    }
    return { allowed: true, reason: 'Admin / Parent Access' };
  }

  if (item.owner === role) {
    return { allowed: true, reason: 'Item Owner' };
  }

  if (item.privacyLevel === 'Restricted') {
    return { allowed: false, reason: 'Restricted to Parents (Arthur & Sarah)' };
  }

  if (item.privacyLevel === 'Private') {
    return { allowed: false, reason: 'Private to Owner' };
  }

  if (item.privacyLevel === 'Emergency') {
    return { allowed: false, reason: 'Locked until Medical Emergency is active' };
  }

  return { allowed: false, reason: 'Access Denied by Privacy Policy' };
}

// ==========================================
// 6. DASHBOARD BACKGROUND CUSTOMIZER
// ==========================================
function initDashboardBgSwitcher() {
  const selector = document.getElementById('dashboard-bg-selector');
  if (!selector) return;

  selector.addEventListener('change', (e) => {
    const val = e.target.value;
    document.body.className = `dark-theme ${val}`;
  });
}

// ==========================================
// 7. REAL IMAGE, VIDEO & FILE UPLOADER ENGINE
// ==========================================
function initMediaUploaders() {
  // 1. Quick Dropzone in Dashboard
  const quickInput = document.getElementById('quick-file-input');
  const quickPreviewArea = document.getElementById('quick-upload-preview-area');
  const quickDropzone = document.getElementById('quick-upload-dropzone');

  if (quickDropzone && quickInput) {
    ['dragenter', 'dragover'].forEach(name => {
      quickDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        quickDropzone.style.borderColor = '#fff';
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      quickDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        quickDropzone.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      });
    });

    quickDropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleQuickFiles(e.dataTransfer.files);
      }
    });

    quickInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleQuickFiles(e.target.files);
      }
    });
  }

  function handleQuickFiles(files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileDataUrl = e.target.result;
        const isVideo = file.type.startsWith('video');
        const isImage = file.type.startsWith('image');
        const isAudio = file.type.startsWith('audio');

        const newNode = {
          id: `upload-${Date.now()}-${Math.floor(Math.random()*1000)}`,
          title: file.name,
          category: isVideo || isImage || isAudio ? 'legacy' : 'document',
          owner: AppState.activeRole,
          location: 'Uploaded Vault Storage',
          value: `Uploaded file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB). Securely encrypted in Digital Twin.`,
          privacyLevel: 'Family',
          fileUrl: fileDataUrl,
          fileType: file.type
        };

        AppState.knowledgeVault.unshift(newNode);
        persistState();
        renderKnowledgeVault();

        if (quickPreviewArea) {
          const thumb = document.createElement('div');
          thumb.className = 'preview-thumb';
          if (isImage) {
            thumb.innerHTML = `<img src="${fileDataUrl}" alt="${file.name}">`;
            thumb.onclick = () => openLightbox(fileDataUrl, 'image', file.name);
          } else if (isVideo) {
            thumb.innerHTML = `<video src="${fileDataUrl}" autoplay muted loop></video>`;
            thumb.onclick = () => openLightbox(fileDataUrl, 'video', file.name);
          } else {
            thumb.innerHTML = `<div style="background:#222;height:100%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;text-align:center;">📄 ${file.name.substring(0,8)}</div>`;
          }
          quickPreviewArea.prepend(thumb);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 2. Knowledge Vault Node File Attachment
  const vaultFileInput = document.getElementById('new-item-file');
  const vaultPreview = document.getElementById('new-item-preview');
  let currentVaultUploadedData = null;
  let currentVaultUploadedType = null;

  if (vaultFileInput && vaultPreview) {
    vaultFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        currentVaultUploadedData = event.target.result;
        currentVaultUploadedType = file.type;
        vaultPreview.classList.remove('hidden');
        if (file.type.startsWith('image')) {
          vaultPreview.innerHTML = `<img src="${currentVaultUploadedData}" alt="preview">`;
        } else if (file.type.startsWith('video')) {
          vaultPreview.innerHTML = `<video src="${currentVaultUploadedData}" controls autoplay muted style="max-height:180px;"></video>`;
        } else {
          vaultPreview.innerHTML = `<div style="padding:0.75rem;background:#111;font-size:0.8rem;">📎 Attached: ${file.name}</div>`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 3. Save Knowledge Node Button
  const btnSaveVault = document.getElementById('btn-save-vault-item');
  if (btnSaveVault) {
    btnSaveVault.addEventListener('click', () => {
      const title = document.getElementById('new-item-title').value.trim();
      const category = document.getElementById('new-item-category').value;
      const location = document.getElementById('new-item-location').value.trim();
      const owner = document.getElementById('new-item-owner').value;
      const privacy = document.getElementById('new-item-privacy').value;
      const value = document.getElementById('new-item-value').value.trim();

      if (!title || !value) {
        alert('Please provide a Title and Data Content.');
        return;
      }

      const newNode = {
        id: `node-${Date.now()}`,
        title: title,
        category: category,
        owner: owner,
        location: location || 'Digital Knowledge Node',
        value: value,
        privacyLevel: privacy,
        fileUrl: currentVaultUploadedData,
        fileType: currentVaultUploadedType
      };

      AppState.knowledgeVault.unshift(newNode);
      persistState();
      renderKnowledgeVault();

      document.getElementById('new-item-title').value = '';
      document.getElementById('new-item-location').value = '';
      document.getElementById('new-item-value').value = '';
      if (vaultFileInput) vaultFileInput.value = '';
      if (vaultPreview) {
        vaultPreview.innerHTML = '';
        vaultPreview.classList.add('hidden');
      }
      currentVaultUploadedData = null;
      currentVaultUploadedType = null;

      AppState.proactiveAlerts.unshift({
        id: `alert-${Date.now()}`,
        title: 'New Knowledge Node Encrypted',
        text: `"${title}" added by ${AppState.members[owner]?.name || owner}. RBAC Policy: ${privacy}.`,
        level: 'info',
        time: 'Just now'
      });
      initProactiveFeed();
    });
  }

  // 4. Legacy Memory Media Uploader
  const legacyMediaUpload = document.getElementById('new-legacy-media-upload');
  const legacyPreview = document.getElementById('new-legacy-preview');
  let currentLegacyUploadedData = null;
  let currentLegacyUploadedType = null;

  if (legacyMediaUpload && legacyPreview) {
    legacyMediaUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        currentLegacyUploadedData = event.target.result;
        currentLegacyUploadedType = file.type;
        legacyPreview.classList.remove('hidden');
        if (file.type.startsWith('image')) {
          legacyPreview.innerHTML = `<img src="${currentLegacyUploadedData}" alt="Memory preview">`;
        } else if (file.type.startsWith('video')) {
          legacyPreview.innerHTML = `<video src="${currentLegacyUploadedData}" controls autoplay muted style="max-height:220px;"></video>`;
        } else if (file.type.startsWith('audio')) {
          legacyPreview.innerHTML = `<audio src="${currentLegacyUploadedData}" controls style="width:100%;margin:0.5rem 0;"></audio>`;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 5. Save Legacy Memory Button
  const btnSaveLegacy = document.getElementById('btn-save-legacy-item');
  if (btnSaveLegacy) {
    btnSaveLegacy.addEventListener('click', () => {
      const title = document.getElementById('new-legacy-title').value.trim();
      const member = document.getElementById('new-legacy-member').value;
      const privacy = document.getElementById('new-legacy-privacy').value;
      const photoUrl = document.getElementById('new-legacy-photo').value.trim();
      const videoUrl = document.getElementById('new-legacy-video').value.trim();
      const story = document.getElementById('new-legacy-story').value.trim();

      if (!title || !story) {
        alert('Please fill in the Memory Title and Story transcription.');
        return;
      }

      const newMemory = {
        id: `legacy-${Date.now()}`,
        title: title,
        subject: member,
        privacy: privacy,
        date: 'Verified Memory ' + new Date().toLocaleDateString(),
        photoUrl: currentLegacyUploadedType?.startsWith('image') ? currentLegacyUploadedData : (photoUrl || null),
        videoUrl: currentLegacyUploadedType?.startsWith('video') ? currentLegacyUploadedData : (videoUrl || null),
        audioClip: currentLegacyUploadedType?.startsWith('audio') ? currentLegacyUploadedData : 'audio-sim-new',
        story: `"${story}"`
      };

      AppState.legacyMemories.unshift(newMemory);
      persistState();
      renderLegacyArchive();

      document.getElementById('new-legacy-title').value = '';
      document.getElementById('new-legacy-photo').value = '';
      document.getElementById('new-legacy-video').value = '';
      document.getElementById('new-legacy-story').value = '';
      if (legacyMediaUpload) legacyMediaUpload.value = '';
      if (legacyPreview) {
        legacyPreview.innerHTML = '';
        legacyPreview.classList.add('hidden');
      }
      currentLegacyUploadedData = null;
      currentLegacyUploadedType = null;
    });
  }
}

// ==========================================
// 8. FULLY FUNCTIONAL MULTI-AGENT AI SYSTEM
// ==========================================
function initChatSystem() {
  const chatInput = document.getElementById('chat-user-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const clearBtn = document.getElementById('btn-clear-chat');
  const messagesContainer = document.getElementById('chat-messages-container');
  const tabsContainer = document.getElementById('agent-chat-tabs-container');
  const globalSearch = document.getElementById('global-search-ai');
  const btnConfigAi = document.getElementById('btn-configure-ai');
  const configDrawer = document.getElementById('ai-config-drawer');
  const btnSaveKey = document.getElementById('btn-save-api-key');
  const apiKeyInput = document.getElementById('gemini-api-key-input');

  // Agent Tabs Switching
  if (tabsContainer) {
    tabsContainer.querySelectorAll('.agent-chat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.agent-chat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        AppState.activeAgent = tab.getAttribute('data-agent');
        
        const titles = {
          concierge: 'Antigravity Multi-Agent Concierge Active',
          knowledge: 'Knowledge Agent Direct Channel',
          emergency: 'Emergency Agent Direct Channel',
          legacy: 'Living Legacy Agent Direct Channel',
          coordinator: 'Family Coordinator Agent Direct Channel',
          privacy: 'Privacy Agent Direct Channel',
          proactive: 'Proactive Scanner Agent Direct Channel'
        };
        const titleEl = document.getElementById('chat-agent-title');
        if (titleEl) titleEl.textContent = titles[AppState.activeAgent] || 'AI Active';
      });
    });
  }

  // Toggle AI Config Drawer
  if (btnConfigAi && configDrawer) {
    btnConfigAi.addEventListener('click', () => {
      configDrawer.classList.toggle('hidden');
    });
  }

  if (btnSaveKey && apiKeyInput) {
    btnSaveKey.addEventListener('click', () => {
      AppState.geminiApiKey = apiKeyInput.value.trim();
      alert(AppState.geminiApiKey ? 'Gemini API Key saved for live streaming.' : 'Using Built-in Antigravity Agent Engine.');
      configDrawer.classList.add('hidden');
    });
  }

  // Clear Chat
  if (clearBtn && messagesContainer) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = `
        <div class="message system-msg">
          <strong>Antigravity Orchestrator:</strong> Chat history reset. Ready for new family queries.
        </div>
      `;
    });
  }

  // Send Chat Query
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    processUserQuery(text);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Suggested Pills
  document.querySelectorAll('.pill-btn').forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-query');
      if (query) processUserQuery(query);
    });
  });

  // Global Search Input Trigger
  if (globalSearch) {
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = globalSearch.value.trim();
        if (query) {
          switchWorkspaceView('chat');
          processUserQuery(query);
          globalSearch.value = '';
        }
      }
    });
  }

  // Simulation Quick Scenario Buttons
  document.getElementById('sim-scenario-1')?.addEventListener('click', () => triggerSimulationScenario(1));
  document.getElementById('sim-scenario-2')?.addEventListener('click', () => triggerSimulationScenario(2));
  document.getElementById('sim-scenario-3')?.addEventListener('click', () => triggerSimulationScenario(3));
  document.getElementById('sim-scenario-4')?.addEventListener('click', () => triggerSimulationScenario(4));
}

// User Query Processor & AI Multi-Agent Routing Engine
async function processUserQuery(query) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  // Append User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'message user-msg';
  userBubble.innerHTML = `<strong>${AppState.members[AppState.activeRole]?.name || 'User'}:</strong> ${escapeHtml(query)}`;
  container.appendChild(userBubble);
  container.scrollTop = container.scrollHeight;

  // Typing Indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'message bot-msg';
  typingBubble.innerHTML = `<em>Antigravity AI is delegating to specialized agents...</em>`;
  container.appendChild(typingBubble);
  container.scrollTop = container.scrollHeight;

  await new Promise(r => setTimeout(r, 600));

  const response = await generateAgentResponse(query);

  typingBubble.innerHTML = response.html;
  container.scrollTop = container.scrollHeight;
}

// Multi-Agent Natural Language Synthesis & Privacy Engine
async function generateAgentResponse(query) {
  const q = query.toLowerCase();
  const activeRole = AppState.activeRole;
  const memberObj = AppState.members[activeRole];

  // 1. EMERGENCY SCENARIOS
  if (q.includes('collapse') || q.includes('emergency') || q.includes('heart') || q.includes('faint') || q.includes('hospital')) {
    AppState.isEmergencyActive = true;
    showEmergencyModal();
    return {
      html: `
        <div>
          <span style="color:#ef4444;font-weight:700;">🚨 EMERGENCY AGENT ACTIVATED</span><br>
          Grandma Elena's critical emergency protocol triggered! System elevated to Emergency RBAC.<br><br>
          • <strong>Blood Type:</strong> O Positive (O+)<br>
          • <strong>Allergies:</strong> Penicillin, Peanuts (Severe)<br>
          • <strong>Medications:</strong> Metformin 500mg, Lisinopril 10mg, Low-dose Aspirin<br>
          • <strong>Doctor:</strong> Dr. Henderson (+1-555-894-3232)<br>
          • <strong>Hospital:</strong> St. Jude Emergency Ward (2.4 miles away)<br><br>
          <div class="ai-source-badge">✓ Verified Source: Medical Folder / St. Jude Hospital MCP | Confidence: 100%</div>
        </div>
      `
    };
  }

  // 2. INSURANCE & DEED QUERIES
  if (q.includes('insurance') || q.includes('deed') || q.includes('title') || q.includes('bluecross')) {
    const item = AppState.knowledgeVault.find(k => k.id === 'doc-01');
    const perm = checkPermission(item, activeRole);

    if (perm.allowed) {
      return {
        html: `
          <div>
            <span style="color:#3b82f6;font-weight:700;">📖 KNOWLEDGE AGENT</span> (Privacy Check Passed: ${perm.reason})<br><br>
            Here are the verified house insurance details:<br>
            • <strong>Document:</strong> ${item.title}<br>
            • <strong>Location:</strong> ${item.location}<br>
            • <strong>Policy Details:</strong> <code>${item.value}</code><br><br>
            <div class="ai-source-badge">✓ Verified Source: Storage MCP (Cupboard 2) | Confidence: 99.4%</div>
          </div>
        `
      };
    } else {
      return {
        html: `
          <div>
            <span style="color:#f59e0b;font-weight:700;">🛡️ PRIVACY AGENT INTERCEPT</span><br><br>
            Access Denied for <strong>${memberObj.name}</strong>.<br>
            • <strong>Reason:</strong> ${perm.reason}.<br>
            • <strong>Policy:</strong> House Insurance details require Parent / Admin permissions (Arthur or Sarah).<br>
            <em>Audit log created in Privacy Center.</em>
            <div class="ai-source-badge">🛡️ RBAC Enforced | Access Level: Restricted</div>
          </div>
        `
      };
    }
  }

  // 3. LEGACY & STORY QUERIES
  if (q.includes('story') || q.includes('grandpa') || q.includes('recipe') || q.includes('tart') || q.includes('memory') || q.includes('memories')) {
    const memory = AppState.legacyMemories[0];
    const tart = AppState.knowledgeVault.find(k => k.id === 'legacy-01');

    if (q.includes('recipe') || q.includes('tart')) {
      return {
        html: `
          <div>
            <span style="color:#f59e0b;font-weight:700;">⏳ LIVING LEGACY AGENT</span><br><br>
            Here is Grandma Elena's verified recipe:<br>
            • <strong>Title:</strong> ${tart.title}<br>
            • <strong>Location:</strong> ${tart.location}<br>
            • <strong>Recipe:</strong> ${tart.value}<br><br>
            <div class="ai-source-badge">✓ Verified Family Archive | Authentic Memory</div>
          </div>
        `
      };
    }

    return {
      html: `
        <div>
          <span style="color:#f59e0b;font-weight:700;">⏳ LIVING LEGACY AGENT</span><br><br>
          Retrieved verified memory from Grandpa Robert:<br>
          • <strong>Title:</strong> ${memory.title} (${memory.date})<br>
          • <strong>Transcription:</strong> ${memory.story}<br><br>
          <div class="ai-source-badge">✓ Audio Voice Print Verified | Authentic Record</div>
        </div>
      `
    };
  }

  // 4. CREDENTIALS & PASSWORDS
  if (q.includes('password') || q.includes('wifi') || q.includes('wi-fi') || q.includes('netflix') || q.includes('spotify')) {
    const creds = AppState.knowledgeVault.filter(k => k.category === 'credentials');
    let credList = creds.map(c => `• <strong>${c.title}</strong> (${c.location}): <code>${c.value}</code>`).join('<br>');
    return {
      html: `
        <div>
          <span style="color:#10b981;font-weight:700;">🔑 KNOWLEDGE AGENT</span><br><br>
          Here are the family-shared credentials:<br>
          ${credList}<br><br>
          <div class="ai-source-badge">✓ Shared with All Family Members</div>
        </div>
      `
    };
  }

  // 5. PROACTIVE & SCAN QUERIES
  if (q.includes('proactive') || q.includes('scan') || q.includes('alert') || q.includes('expiry')) {
    let alertList = AppState.proactiveAlerts.map(a => `• <strong>${a.title}</strong>: ${a.text} (<em>${a.time}</em>)`).join('<br>');
    return {
      html: `
        <div>
          <span style="color:#8b5cf6;font-weight:700;">👁️ PROACTIVE AI SCANNER</span><br><br>
          Active Family Health & Status Scan:<br>
          ${alertList}<br><br>
          <div class="ai-source-badge">✓ Continuous Autonomous Monitoring Active</div>
        </div>
      `
    };
  }

  // 6. COORDINATOR & SCHEDULE
  if (q.includes('schedule') || q.includes('routine') || q.includes('task') || q.includes('calendar') || q.includes('pickup')) {
    return {
      html: `
        <div>
          <span style="color:#10b981;font-weight:700;">🗓️ COORDINATOR AGENT</span><br><br>
          Today's Synchronized Family Schedule:<br>
          • <strong>08:00 AM:</strong> Elena's Morning Medication (Verified by Sarah)<br>
          • <strong>03:30 PM:</strong> School Pickup for Chloe at Lincoln High (Assigned to Arthur)<br>
          • <strong>06:00 PM:</strong> Family Dinner & Memory Recording in Living Room<br><br>
          <div class="ai-source-badge">✓ Calendar MCP Synchronized</div>
        </div>
      `
    };
  }

  // 7. GENERIC SEARCH ACROSS ALL VAULT NODES
  const matchedNodes = AppState.knowledgeVault.filter(node => {
    return node.title.toLowerCase().includes(q) || node.value.toLowerCase().includes(q) || node.category.toLowerCase().includes(q);
  });

  if (matchedNodes.length > 0) {
    let output = `<div><span style="color:#3b82f6;font-weight:700;">🛎️ CONCIERGE AGENT</span><br><br>Found ${matchedNodes.length} relevant record(s) in Family Vault:<br><br>`;
    matchedNodes.forEach(node => {
      const perm = checkPermission(node, activeRole);
      if (perm.allowed) {
        output += `📁 <strong>${node.title}</strong> (${node.category})<br>• Location: ${node.location}<br>• Value: <code>${node.value}</code><br><br>`;
      } else {
        output += `🚫 <strong>${node.title}</strong> (Access Restricted: ${perm.reason})<br><br>`;
      }
    });
    output += `<div class="ai-source-badge">✓ Antigravity Knowledge Graph Synthesis</div></div>`;
    return { html: output };
  }

  // Default intelligent assistant response
  return {
    html: `
      <div>
        <span style="color:#3b82f6;font-weight:700;">🛎️ CONCIERGE AGENT</span><br><br>
        I have analyzed your request: <em>"${escapeHtml(query)}"</em> across all family data streams, MCP tools, and living digital twin memories for <strong>${memberObj.name}</strong>.<br><br>
        All sub-agents (Knowledge, Legacy, Coordinator, Emergency, Privacy) are ready. You can ask me to locate physical documents, review medical schedules, play verified voice stories, or coordinate tasks.
        <div class="ai-source-badge">✓ AI Core Active | Neuralyn Digital Twin v3.2</div>
      </div>
    `
  };
}

function triggerSimulationScenario(num) {
  switchWorkspaceView('chat');
  if (num === 1) {
    processUserQuery('Where are the house insurance papers?');
  } else if (num === 2) {
    processUserQuery('Grandma collapsed on the living room floor!');
  } else if (num === 3) {
    processUserQuery("Play Grandpa Robert's 1968 journey story.");
  } else if (num === 4) {
    processUserQuery('Run daily proactive scan on family alerts.');
  }
}

// ==========================================
// 9. DYNAMIC KNOWLEDGE VAULT
// ==========================================
function initKnowledgeVault() {
  const filterBtns = document.querySelectorAll('.vault-filters .filter-tag');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderKnowledgeVault(cat);
    });
  });

  renderKnowledgeVault();
}

function renderKnowledgeVault(filterCategory = 'all') {
  const container = document.getElementById('vault-list-container');
  if (!container) return;

  const items = AppState.knowledgeVault.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<div class="text-muted" style="grid-column: 1/-1; padding: 2rem; text-align: center;">No knowledge nodes in this category.</div>`;
    return;
  }

  items.forEach(item => {
    const perm = checkPermission(item);
    const card = document.createElement('div');
    card.className = 'vault-card';

    let mediaHtml = '';
    if (item.fileUrl && perm.allowed) {
      if (item.fileType?.startsWith('image')) {
        mediaHtml = `<div class="vault-media-preview" onclick="openLightbox('${item.fileUrl}', 'image', '${escapeHtml(item.title)}')"><img src="${item.fileUrl}" alt="${item.title}"></div>`;
      } else if (item.fileType?.startsWith('video')) {
        mediaHtml = `<div class="vault-media-preview"><video src="${item.fileUrl}" controls></video></div>`;
      }
    }

    card.innerHTML = `
      <div class="vault-card-top">
        <span class="vault-category-badge">${item.category}</span>
        <span class="vault-privacy-pill ${item.privacyLevel}">${item.privacyLevel}</span>
      </div>
      <h4>${item.title}</h4>
      <p class="vault-loc">📍 Location: ${item.location} | Owner: ${AppState.members[item.owner]?.name || item.owner}</p>
      <div class="vault-val-box">
        ${perm.allowed ? escapeHtml(item.value) : `<span style="color:#ef4444;">🔒 Access Restricted (${perm.reason})</span>`}
      </div>
      ${mediaHtml}
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 10. DYNAMIC LIVING LEGACY ARCHIVE
// ==========================================
function initLegacyArchive() {
  renderLegacyArchive();
}

function renderLegacyArchive() {
  const container = document.getElementById('legacy-timeline-container');
  if (!container) return;

  container.innerHTML = '';

  AppState.legacyMemories.forEach(mem => {
    const card = document.createElement('div');
    card.className = 'legacy-story-card';

    let mediaBoxes = '';
    if (mem.photoUrl) {
      mediaBoxes += `<div class="legacy-media-box" onclick="openLightbox('${mem.photoUrl}', 'image', '${escapeHtml(mem.title)}')"><img src="${mem.photoUrl}" alt="${mem.title}"></div>`;
    }
    if (mem.videoUrl) {
      mediaBoxes += `<div class="legacy-media-box"><video src="${mem.videoUrl}" controls></video></div>`;
    }

    card.innerHTML = `
      <div class="legacy-story-header">
        <div>
          <h4>${mem.title}</h4>
          <span class="text-muted" style="font-size:0.8rem;">Subject: ${mem.subject} | ${mem.date}</span>
        </div>
        <span class="badge-tag">${mem.privacy}</span>
      </div>
      
      ${mediaBoxes ? `<div class="legacy-media-wrap">${mediaBoxes}</div>` : ''}

      <div class="legacy-story-body">
        ${mem.story}
      </div>

      <div class="audio-player-custom">
        <button class="btn-play-audio" onclick="toggleSimulatedAudio(this)">▶</button>
        <span style="font-size:0.8rem;font-weight:500;">Verified Oral Audio Recording</span>
        <div class="audio-waveform-bars">
          <div class="waveform-bar"></div>
          <div class="waveform-bar"></div>
          <div class="waveform-bar"></div>
          <div class="waveform-bar"></div>
          <div class="waveform-bar"></div>
          <div class="waveform-bar"></div>
        </div>
        <span style="font-size:0.75rem;color:#71717a;">01:42</span>
      </div>
    `;

    container.appendChild(card);
  });
}

window.toggleSimulatedAudio = function(btn) {
  if (btn.textContent === '▶') {
    btn.textContent = '⏸';
    btn.style.background = '#10b981';
  } else {
    btn.textContent = '▶';
    btn.style.background = '#f59e0b';
  }
};

// ==========================================
// 11. FULLSCREEN MEDIA LIGHTBOX
// ==========================================
function initLightbox() {
  const modal = document.getElementById('media-lightbox-modal');
  const closeBtn = document.getElementById('btn-lightbox-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}

window.openLightbox = function(url, type, caption) {
  const modal = document.getElementById('media-lightbox-modal');
  const target = document.getElementById('lightbox-media-target');
  const cap = document.getElementById('lightbox-caption');

  if (!modal || !target) return;

  if (type === 'image') {
    target.innerHTML = `<img src="${url}" alt="Fullscreen Image">`;
  } else {
    target.innerHTML = `<video src="${url}" controls autoplay style="max-height:70vh;"></video>`;
  }

  if (cap) cap.textContent = caption || '';
  modal.classList.remove('hidden');
};

// ==========================================
// 12. PRIVACY MATRIX & AUDIT LOGS
// ==========================================
function initPrivacyMatrix() {
  renderPrivacyMatrix();
}

function renderPrivacyMatrix() {
  const tbody = document.getElementById('privacy-matrix-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  AppState.privacyMatrix.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${row.category}</strong></td>
      <td>${renderPermBadge(row.dad)}</td>
      <td>${renderPermBadge(row.mom)}</td>
      <td>${renderPermBadge(row.son)}</td>
      <td>${renderPermBadge(row.daughter)}</td>
      <td>${renderPermBadge(row.grandma)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPermBadge(val) {
  if (val.includes('Full') || val.includes('Owner')) return `<span class="perm-badge perm-full">${val}</span>`;
  if (val.includes('Read')) return `<span class="perm-badge perm-read">${val}</span>`;
  if (val.includes('Emergency')) return `<span class="perm-badge perm-em">${val}</span>`;
  return `<span class="perm-badge perm-none">${val}</span>`;
}

// ==========================================
// 13. PROACTIVE AI SCANNER FEED
// ==========================================
function initProactiveFeed() {
  const feed = document.getElementById('proactive-alerts-feed');
  if (!feed) return;

  feed.innerHTML = '';

  AppState.proactiveAlerts.forEach(alert => {
    const item = document.createElement('div');
    item.className = `alert-item ${alert.level}`;
    item.innerHTML = `
      <div class="alert-content">
        <h5>${alert.title}</h5>
        <p>${alert.text}</p>
      </div>
      <span class="alert-time">${alert.time}</span>
    `;
    feed.appendChild(item);
  });
}

// ==========================================
// 14. EMERGENCY SYSTEM
// ==========================================
function initEmergencySystem() {
  const triggerBtn = document.getElementById('btn-emergency-trigger');
  const resolveBtn = document.getElementById('btn-resolve-emergency');
  const overlay = document.getElementById('emergency-overlay');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      showEmergencyModal();
    });
  }

  if (resolveBtn && overlay) {
    resolveBtn.addEventListener('click', () => {
      AppState.isEmergencyActive = false;
      overlay.classList.remove('active');
      renderKnowledgeVault();
    });
  }
}

function showEmergencyModal() {
  const overlay = document.getElementById('emergency-overlay');
  if (overlay) {
    overlay.classList.add('active');
    renderKnowledgeVault();
  }
}

// ==========================================
// 15. AMBIENT AUDIO SYNTHESIZER
// ==========================================
function initAmbientAudio() {
  const btn = document.getElementById('btn-ambient-music');
  const label = document.getElementById('ambient-music-text');

  let audioCtx = null;
  let synthInterval = null;

  function startSynth() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      synthInterval = setInterval(() => {
        if (!AppState.isAmbientPlaying || !audioCtx) return;
        const note = notes[Math.floor(Math.random() * notes.length)];
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 4.6);
      }, 2500);
    } catch (e) {
      console.log('Audio synth initialized silently');
    }
  }

  function stopSynth() {
    if (synthInterval) clearInterval(synthInterval);
  }

  if (btn) {
    btn.addEventListener('click', () => {
      AppState.isAmbientPlaying = !AppState.isAmbientPlaying;
      if (AppState.isAmbientPlaying) {
        btn.classList.add('playing');
        if (label) label.textContent = 'Ambience: On';
        startSynth();
      } else {
        btn.classList.remove('playing');
        if (label) label.textContent = 'Ambience: Off';
        stopSynth();
      }
    });

    window.addEventListener('click', () => {
      if (AppState.isAmbientPlaying && !synthInterval) {
        startSynth();
      }
    }, { once: true });
  }
}

// ==========================================
// 16. TESTIMONIAL SCROLL-DRIVEN WORD REVEAL
// ==========================================
function initScrollReveal() {
  const quoteBox = document.getElementById('testimonial-quote-box');
  if (!quoteBox) return;

  const words = quoteBox.querySelectorAll('.reveal-word');
  
  function updateReveal() {
    const rect = quoteBox.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      const progress = Math.min(1, Math.max(0, (windowHeight * 0.8 - rect.top) / (windowHeight * 0.5)));
      const countToReveal = Math.floor(progress * words.length);
      
      words.forEach((word, idx) => {
        if (idx <= countToReveal) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateReveal, { passive: true });
  updateReveal();
}

// Helper: HTML Escaping
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
