# 🌟 Neuralyn × Family Vault — Living Digital Twin AI

> **One Family. One Memory. One Intelligent Living Digital Twin.**

**Neuralyn × Family Vault** is a privacy-first, multi-agent AI web application that creates an authentic **Living Digital Twin** for families and teams. It merges a **high-end video hero landing page** with a **fully functional multi-agent AI system (7 agents)**, real **image & video uploading**, an **encrypted knowledge vault**, a **living legacy archive**, and an **instant medical emergency response center**.

---

## 🚀 Live Demo & Quick Launch

### 1. Open in Browser
If the local server is running:
👉 **[http://localhost:8080/](http://localhost:8080/)** (or `http://localhost:5173/`)

### 2. Run Locally in Any IDE / Terminal
No external dependencies or build tools needed! Simply serve the directory:

```bash
# Option A: Python Built-in Server
python -m http.server 8080

# Option B: Node.js (if installed)
npx serve .

# Option C: VS Code / IDE Live Server
# Right click `index.html` -> "Open with Live Server"
```

---

## ✨ Features Overview

### 🌌 1. Dual-Mode Video Hero Landing Page
- **Neuralyn Dark Tech Mode**:
  - Background video loop (`neuralyn_bg.mp4`).
  - Title: *"Your Insights. One Clear Overview."* with **Instrument Serif** italic accent.
  - Liquid Glass Capsule pill: *"Say Hello to Corewave v3.2 & Living Digital Twin"*.
- **Golden Aethera Mode**:
  - Background video loop (`hero.mp4`).
  - Title: **"FAMILY VAULT"** in **DM Mono 300** light display typography.
  - Floating glass link capsule navbar with real-time status.
- **Scroll-Driven Word Reveal**: Section 2 Testimonial quote with progressive word illumination on scroll.
- **Instant Entry Action**: *"Get Started for Free"* / *"Enter Vault"* button transitions directly into the Family Twin workspace.

---

### 🤖 2. Fully Functional Multi-Agent AI System
The AI assistant routes queries intelligently across **7 specialized sub-agents**:
1. 🛎️ **Concierge Agent**: Natural language router & central orchestrator.
2. 📖 **Knowledge Agent**: Instant semantic lookup across all family files with strict RBAC.
3. 🚨 **Emergency Agent**: Critical medical history, vitals, and hospital logistics.
4. ⏳ **Legacy Agent**: Authentic oral memories, transcripts, and recipes.
5. 🗓️ **Coordinator Agent**: Routine syncing, calendars, and family task delegation.
6. 🛡️ **Privacy Agent**: Granular permission verification and live audit trail.
7. 👁️ **Proactive Agent**: Autonomous risk and expiration scanner.

- **Explainable Responses**: Every answer includes physical/digital location coordinates (e.g. *Cupboard 2 (Blue Folder)*), verification badges, and confidence metrics.
- **Google Gemini API Connectivity**: Optional API key drawer to stream live responses from Google Gemini 1.5/2.0.

---

### 🎥 3. Real Image, Video & Audio File Uploading
- **Supported Formats**: Photos (`.png, .jpg, .webp`), videos (`.mp4, .webm`), voice notes (`.mp3, .wav`), and documents (`.pdf, .txt`).
- **Drag & Drop**: Drop files anywhere on the dashboard upload zone.
- **Fullscreen Lightbox**: Click any uploaded image or video to view in a high-resolution lightbox overlay with playback controls.
- **In-Browser Persistence**: Uploaded assets and newly created vault nodes persist in `localStorage`.

---

### 📂 4. Encrypted Knowledge Vault & Living Legacy
- **Knowledge Vault**: Categorized by *Documents, Passwords, Health, Legacy*. Role-Based Access Control (RBAC) dynamically locks content if the active user lacks permissions.
- **Living Legacy Archive**: Interactive memory timeline with custom waveform audio players, photo galleries, and video boxes.
- **Grandma Elena Emergency Mode**: One-click *"Grandma Collapsed"* trigger displaying Elena's blood type (O+), allergies (Penicillin, Peanuts), daily prescriptions, hospital distance, and automated coordinator tasks.

---

### 🎨 5. Customization & Ambiance
- **Dashboard Themes**: Switch between *Pure Black*, *Cyber Glow*, *Golden Aethera*, and *Deep Space* from the top bar.
- **Ambient Music Synthesizer**: Web Audio API soothing pentatonic background music generator.

---

## 📂 Project Structure

```text
family-twin/
├── index.html            # Main HTML with Hero Landing & Twin Workspace
├── style.css             # Liquid glass, typography, dark themes, lightbox
├── app.js                # Multi-agent AI engine, file uploaders, RBAC, state
├── hero.mp4              # Golden Aethera background video loop
├── neuralyn_bg.mp4       # Neuralyn Dark Tech background video loop
├── public/               # Static assets directory
│   ├── hero.mp4
│   └── neuralyn_bg.mp4
└── README.md             # Project documentation & guide
```

---

## 👥 Family Circle & Permissions Matrix

| Family Member | Default Role | Access Scope |
| :--- | :--- | :--- |
| **Arthur (Dad)** | Owner / Admin | Full access to deeds, insurance, passwords, and investments |
| **Sarah (Mom)** | Family Admin | Full access to health records, recipes, and insurance |
| **Leo (Son)** | Member | Full access to streaming & gaming passwords; restricted finance |
| **Chloe (Daughter)** | Member | Full access to Wi-Fi & streaming hub; restricted finance |
| **Elena (Grandma)** | Elder / Senior | Full access to medical profile & heritage stories |

---

## 📜 License
Developed for the **Concierge Agents Hackathon** powered by Antigravity Multi-Agent Architecture.
