/**
 * Family Concierge AI - Living Legacy Memory Archive
 */

const LegacyModule = {
  activeAudioId: null,

  // Telemetry log callback hook
  logCallback: null,

  init(logCallback) {
    this.logCallback = logCallback;
  },

  log(message, detail = null) {
    if (this.logCallback) {
      this.logCallback({
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'agent-log',
        agent: 'Legacy Agent',
        message: message,
        data: detail
      });
    }
  },

  renderTimeline() {
    const container = document.getElementById('legacy-timeline-container');
    if (!container) return;

    const memories = McpSimulator.legacy.memories;
    container.innerHTML = '';

    memories.forEach(memory => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      
      // Perform security check
      const memoryCopy = {
        ...memory,
        owner: memory.owner || (memory.subject.toLowerCase().includes('grandma') ? 'grandma' : memory.subject.toLowerCase().includes('dad') ? 'dad' : memory.subject.toLowerCase().includes('mom') ? 'mom' : 'dad')
      };
      const accessCheck = SecurityModule.checkAccess(memoryCopy);

      if (!accessCheck.allowed) {
        // Locked Memory Card
        item.innerHTML = `
          <div class="timeline-marker" style="background:var(--accent-rose); box-shadow:0 0 10px var(--accent-rose);"></div>
          <div class="timeline-content" style="border-color:rgba(244,63,94,0.2); background:rgba(244,63,94,0.02);">
            <div class="timeline-header-meta">
              <span class="date">${memory.recordedDate}</span>
              <span class="badge" style="background-color:rgba(244,63,94,0.15); color:#fda4af; display:inline-flex; align-items:center; gap:0.25rem;">
                🔒 Private (${memory.privacyLevel})
              </span>
            </div>
            <h4 style="opacity:0.6;">${memory.title}</h4>
            <p style="margin-top:0.5rem; font-size:0.8rem; color:var(--accent-rose); font-style:italic; line-height:1.4;">
              ⚠️ Access Blocked by Privacy Agent. This memory is owned by ${SecurityModule.users[memoryCopy.owner].name}. (${accessCheck.reason})
            </p>
          </div>
        `;
      } else {
        // Allowed Memory Card
        const barsHtml = Array(35).fill(0).map((_, i) => `<div class="wave-bar ${i < 15 ? 'fill' : ''}"></div>`).join('');
        
        let photoHtml = "";
        if (memory.photo) {
          photoHtml = `
            <div class="memory-photo-container" style="margin-top:1rem; border-radius: var(--border-radius-sm); overflow:hidden; border: 1px solid var(--border-glass);">
              <img src="${memory.photo}" alt="Memory photo" style="width:100%; max-height:240px; object-fit:cover; display:block;">
            </div>
          `;
        }

        let videoHtml = "";
        if (memory.video) {
          videoHtml = `
            <div class="legacy-audio-player" style="margin-top:1rem; background-color: var(--bg-secondary); border-color: rgba(99,102,241,0.25);">
              <button class="audio-play-btn" style="background-color: var(--accent-indigo);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <div style="flex-grow:1; font-size:0.8rem; font-weight:600; color:var(--text-main); display:flex; align-items:center; gap:0.5rem;">
                <span>🎥 Video Record: <code>${memory.video}</code></span>
                <span style="font-size:0.7rem; background:rgba(255,255,255,0.06); padding:0.1rem 0.4rem; border-radius:4px;" class="text-muted">Simulated Playback</span>
              </div>
              <span class="audio-duration">1:12</span>
            </div>
          `;
        }

        const privacyBadgeColor = memory.privacyLevel === 'Family' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
        const privacyBadgeText = memory.privacyLevel === 'Family' ? 'Family Shared' : 'Restricted (Parents Only)';

        item.innerHTML = `
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-header-meta">
              <span class="date">${memory.recordedDate}</span>
              <div style="display:flex; gap:0.5rem;">
                <span class="badge" style="background-color:${privacyBadgeColor}; color:inherit;">
                  ${privacyBadgeText}
                </span>
                <span class="badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Verified (Conf: 100%)
                </span>
              </div>
            </div>
            <h4>${memory.title}</h4>
            <p class="story-text">"${memory.story}"</p>
            
            ${photoHtml}
            ${videoHtml}
            
            <div class="legacy-audio-player" id="audio-player-${memory.id}" style="margin-top:1rem;">
              <button class="audio-play-btn" onclick="LegacyModule.toggleAudio('${memory.id}')" id="play-btn-${memory.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" id="play-icon-${memory.id}"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <div class="waveform-viz">
                ${barsHtml}
              </div>
              <span class="audio-duration">0:45</span>
            </div>
            
            <div class="mt-2" style="font-size:0.7rem; color:var(--text-dark);">
              <span>Hash Integrity: <code>${memory.verificationHash}</code></span>
            </div>
          </div>
        `;
      }
      
      container.appendChild(item);
    });
  },

  toggleAudio(memoryId) {
    const playerEl = document.getElementById(`audio-player-${memoryId}`);
    const playBtn = document.getElementById(`play-btn-${memoryId}`);
    const playIcon = document.getElementById(`play-icon-${memoryId}`);
    
    if (this.activeAudioId && this.activeAudioId !== memoryId) {
      // Stop previous
      const prevPlayer = document.getElementById(`audio-player-${this.activeAudioId}`);
      const prevBtn = document.getElementById(`play-btn-${this.activeAudioId}`);
      const prevIcon = document.getElementById(`play-icon-${this.activeAudioId}`);
      if (prevPlayer) prevPlayer.classList.remove('playing');
      if (prevIcon) prevIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      this.log(`Stopped playing audio file for "${this.activeAudioId}"`);
    }

    if (playerEl.classList.contains('playing')) {
      // Pause
      playerEl.classList.remove('playing');
      playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      this.log(`Paused audio file: "${memoryId}"`);
      this.activeAudioId = null;
    } else {
      // Play
      playerEl.classList.add('playing');
      // Set pause icon
      playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
      this.log(`Playing verified legacy recording: "${memoryId}"`, `Source file: ${McpSimulator.legacy.memories.find(m => m.id === memoryId).mediaUrl}`);
      this.activeAudioId = memoryId;
    }
  }
};
