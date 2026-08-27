/**
 * Family Concierge AI - Proactive Monitoring Dashboard Module
 */

const ProactiveModule = {
  activeAlerts: [
    {
      id: "alert-passport-dad",
      title: "🚨 Urgent: Arthur's Passport Expiration in 48 Days",
      description: "Arthur's US Passport (#USA-982148192) expires on Oct 14, 2026. Most international airlines enforce the 6-month validity rule. Immediate renewal recommended.",
      category: "Passports & Travel",
      type: "critical",
      actionText: "Draft Renewal Appt"
    },
    {
      id: "alert-passport-chloe",
      title: "⚠️ Warning: Chloe's Passport Expiration in 70 Days",
      description: "Chloe's US Passport (#USA-662910482) expires on Nov 05, 2026. Schedule renewal before the upcoming holiday travel window.",
      category: "Passports & Travel",
      type: "warning",
      actionText: "Schedule Renewal"
    },
    {
      id: "alert-insurance-renewal",
      title: "📋 House & Flood Policy Renewal Due",
      description: "BlueCross Family Shield Gold (#BC-9481-2294A) annual renewal due on Nov 12, 2026. Policy covers $1.2M property & flood protection.",
      category: "Insurance",
      type: "info",
      actionText: "Review Policy Terms"
    },
    {
      id: "alert-elena-meds",
      title: "💊 Prescription Refill: Grandma Elena",
      description: "Metformin 500mg supply is at 6 days remaining. Automated refill request ready for CVS Pharmacy on 4th Ave.",
      category: "Health & Pharmacy",
      type: "critical",
      actionText: "Send CVS Refill Request"
    },
    {
      id: "alert-auto-fleet",
      title: "🚗 Fleet Insurance & Tesla Maintenance",
      description: "Geico Policy #GE-3392-1088 annual premium due Dec 01, 2026. 2024 Tesla Model Y tire rotation and cabin air filter due at 25,000 miles.",
      category: "Vehicles & Auto",
      type: "info",
      actionText: "Schedule Service"
    }
  ],

  // Telemetry log callback hook
  logCallback: null,

  init(logCallback) {
    this.logCallback = logCallback;
    this.renderAlerts(this.activeAlerts);
  },

  log(message, detail = null) {
    if (this.logCallback) {
      this.logCallback({
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'agent-log',
        agent: 'Proactive Agent',
        message: message,
        data: detail
      });
    }
  },

  renderAlerts(alertsList = this.activeAlerts) {
    this.activeAlerts = alertsList;
    const feed = document.getElementById('proactive-alerts-feed');
    if (!feed) return;

    if (alertsList.length === 0) {
      feed.innerHTML = `
        <div class="empty-alerts">
          <p class="text-muted">No pending alerts. Family security checks clear.</p>
        </div>
      `;
      return;
    }

    feed.innerHTML = '';
    alertsList.forEach(alert => {
      const card = document.createElement('div');
      card.className = `alert-card ${alert.type === 'critical' ? 'critical' : alert.type === 'info' ? 'info' : ''}`;
      card.id = alert.id;

      card.innerHTML = `
        <div class="alert-content">
          <h4>${alert.title}</h4>
          <p>${alert.description}</p>
          <div class="alert-meta">
            <span class="alert-badge">${alert.category}</span>
            <span class="text-muted">• Priority: ${alert.type.toUpperCase()}</span>
          </div>
        </div>
        <button class="alert-btn" onclick="ProactiveModule.resolveAlert('${alert.id}')">${alert.actionText}</button>
      `;
      feed.appendChild(card);
    });
  },

  resolveAlert(alertId) {
    const alert = this.activeAlerts.find(a => a.id === alertId);
    if (!alert) return;

    // Log the user action
    this.log(`Resolving Alert: "${alert.title}"`, `User clicked "${alert.actionText}"`);
    
    // Telemetry log from coordinator or proactive agent
    if (this.logCallback) {
      this.logCallback({
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'success-log',
        server: 'Coordinator Agent',
        message: `Task automation completed: ${alert.actionText} for ${alert.title}`
      });
    }

    // Dynamic UI visual effect
    const cardEl = document.getElementById(alertId);
    if (cardEl) {
      cardEl.style.transform = 'scale(0.95)';
      cardEl.style.opacity = '0';
      cardEl.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        this.activeAlerts = this.activeAlerts.filter(a => a.id !== alertId);
        this.renderAlerts(this.activeAlerts);
      }, 300);
    }
  }
};
