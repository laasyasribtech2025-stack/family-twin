/**
 * Family Concierge AI - Living Legacy Memory Archive
 */

const LegacyModule = {
  activeAudioId: null,
  audioContext: null,
  activeOscillators: [],

  renderTimeline() {
    const container = document.getElementById('legacy-timeline-container');
    if (!container) return;

    const memories = McpSimulator.legacy.memories;
    container.innerHTML = '';

    memories.forEach(memory => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      
      const memoryCopy = {
        ...memory,
        owner: memory.owner || (memory.subject.toLowerCase().includes('grandma') ? 'grandma' : memory.subject.toLowerCase().includes('dad') ? 'dad' : memory.subject.toLowerCase().includes('mom') ? 'mom' : 'dad')
      };
      const accessCheck = SecurityModule.checkAccess(memoryCopy);

      if (!accessCheck.allowed) {
        // Locked Memory Card
        item.innerHTML = `
          <div class="timeline-marker" style="background:var(--accent-rose); box-shadow:0 0 10px var(--accent-rose);"></div>
          <div class="timeline-content" style="border-color:rgba(244,63,94,0.2); background:rgba(244,63,94,0.03);">
            <div class="timeline-header-meta">
              <span class="date">${memory.recordedDate}</span>
              <span class="badge" style="background-color:rgba(244,63,94,0.2); color:#fda4af; font-size:0.72rem; padding:0.2rem 0.5rem; border-radius:4px;">
                🔒 Private (${memory.privacyLevel})
              </span>
            </div>
            <h4 style="opacity:0.6; margin-top:0.35rem;">${memory.title}</h4>
            <p style="margin-top:0.5rem; font-size:0.8rem; color:#fca5a5; font-style:italic;">
              ⚠️ Access Blocked by Privacy Agent. This memory is owned by ${SecurityModule.users[memoryCopy.owner].name}. (${accessCheck.reason})
            </p>
          </div>
        `;
      } else {
        // Allowed Memory Card
        let photoHtml = "";
        if (memory.photo) {
          photoHtml = `
            <div class="legacy-media-box" onclick="openLightbox('${memory.photo}', 'image', '${escapeHtml(memory.title)}')">
              <img src="${memory.photo}" alt="${memory.title}">
            </div>
          `;
        }

        let videoHtml = "";
        if (memory.video) {
          videoHtml = `
            <div class="legacy-media-box">
              <video src="${memory.video}" controls poster="" style="max-height:220px;"></video>
            </div>
          `;
        }

        const privacyBadgeColor = memory.privacyLevel === 'Family' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)';
        const privacyBadgeText = memory.privacyLevel === 'Family' ? 'Family Shared' : 'Restricted (Parents Only)';

        item.innerHTML = `
          <div class="timeline-marker"></div>
          <div class="legacy-story-card">
            <div class="legacy-story-header">
              <div>
                <h4>${memory.title}</h4>
                <span class="text-muted" style="font-size:0.8rem;">Subject: <strong>${memory.subject}</strong> | Recorded: ${memory.recordedDate}</span>
              </div>
              <span class="vault-privacy-pill ${memory.privacyLevel}">${privacyBadgeText}</span>
            </div>

            <div class="legacy-story-body">
              ${memory.story}
            </div>

            ${(photoHtml || videoHtml) ? `<div class="legacy-media-wrap">${photoHtml}${videoHtml}</div>` : ''}

            <div class="audio-player-custom">
              <button class="btn-play-audio" onclick="LegacyModule.playAudioSnippet(this, '${memory.id}')">▶</button>
              <div style="flex:1;">
                <div style="font-size:0.8rem; font-weight:600;">Verified Audio Voice Clip: <code>${memory.mediaUrl}</code></div>
                <div class="audio-waveform-bars" style="margin-top:0.25rem;">
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                  <div class="waveform-bar"></div>
                </div>
              </div>
              <span class="text-muted" style="font-size:0.75rem;">1:42</span>
            </div>
          </div>
        `;
      }
      container.appendChild(item);
    });
  },

  // Generative Synthesizer that plays audible speech melody for voice clips
  playAudioSnippet(btn, id) {
    if (this.activeAudioId === id) {
      this.stopAudio();
      btn.textContent = '▶';
      btn.style.background = '#f59e0b';
      this.activeAudioId = null;
      return;
    }

    this.stopAudio();
    this.activeAudioId = id;
    btn.textContent = '⏸';
    btn.style.background = '#10b981';

    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Play rich harmonious melody
      const pitches = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C, E, G, C, A, F
      pitches.forEach((freq, index) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.4);
        
        gain.gain.setValueAtTime(0.001, this.audioContext.currentTime + index * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.12, this.audioContext.currentTime + index * 0.4 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + index * 0.4 + 1.8);
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.start(this.audioContext.currentTime + index * 0.4);
        osc.stop(this.audioContext.currentTime + index * 0.4 + 2.0);
        this.activeOscillators.push(osc);
      });

      setTimeout(() => {
        if (this.activeAudioId === id) {
          btn.textContent = '▶';
          btn.style.background = '#f59e0b';
          this.activeAudioId = null;
        }
      }, 3500);
    } catch (e) {
      console.log('Audio played');
    }
  },

  stopAudio() {
    this.activeOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.activeOscillators = [];
  }
};
