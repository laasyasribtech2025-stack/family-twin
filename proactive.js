/**
 * Family Concierge AI - Proactive Monitoring Dashboard Module
 */

const ProactiveModule = {
  activeAlerts: [
    {
      id: "alert-1",
      title: "Passport Expiring Soon",
      description: "Leo's passport expires in 4 months (October 2026). Direct renewal takes 8 weeks.",
      type: "warning",
      category: "Travel",
      actionText: "Renew Passport"
    },
    {
      id: "alert-2",
      title: "Dangerous Drug Overlap",
      description: "Grandma Elena's medications (Lisinopril & Aspirin) overlap. Risk of minor blood pressure dips. Monitored.",
      type: "critical",
      category: "Health",
      actionText: "Consult Doctor"
    },
    {
      id: "alert-3",
      title: "High Electricity Usage Spike",
      description: "June electricity bill is $285 (35% higher than the historical summer average). Check HVAC filter.",
      type: "warning",
      category: "Bills",
      actionText: "Compare Usage"
    },
    {
      id: "alert-4",
      title: "Mom's Birthday Gift Alert",
      description: "Mom's birthday is on July 14. Flowers or gifts have not been scheduled yet.",
      type: "warning",
      category: "Calendar",
      actionText: "Order Flowers"
    },
    {
      id: "alert-5",
      title: "Unworn Items Audit",
      description: "Your favorite leather boots have not been worn or logged in 12 months. Relocate to attic?",
      type: "info",
      category: "Wardrobe",
      actionText: "Relocate"
    },
    {
      id: "alert-6",
      title: "Refrigerator Food Expiration",
      description: "Milk carton expires tomorrow. Suggested action: Make french toast or pudding tonight.",
      type: "info",
      category: "Kitchen",
      actionText: "View Recipe"
    },
    {
      id: "alert-passport-dad",
      title: "Arthur's Passport Expiration in 48 Days",
      description: "Arthur's US Passport (#USA-982148192) expires on Oct 14, 2026. Schedule renewal before international travel.",
      category: "Travel",
      type: "warning",
      actionText: "Draft Renewal Appt"
    },
    {
      id: "alert-insurance-renewal",
      title: "House & Flood Policy Renewal Due",
      description: "BlueCross Family Shield Gold (#BC-9481-2294A) annual renewal due on Nov 12, 2026. Coverage: $1.2M.",
      category: "Insurance",
      type: "info",
      actionText: "Review Terms"
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
