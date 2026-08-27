/**
 * Family Concierge AI - MCP Simulator
 * Simulates Model Context Protocol servers: Storage MCP, Medical MCP, Legacy MCP, Calendar MCP.
 */

const McpSimulator = {
  logCallback: null,

  setLogCallback(callback) {
    this.logCallback = callback;
  },

  log(server, method, params, responsePayload) {
    if (this.logCallback) {
      this.logCallback({
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'mcp-log',
        server: server,
        message: `MCP CALL [${method}]`,
        params: JSON.stringify(params),
        response: JSON.stringify(responsePayload)
      });
    }
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // ==========================================
  // STORAGE MCP (Documents, Passwords, Health, Legacy, Videos)
  // ==========================================
  storage: {
    db: [
      {
        id: "doc-passport-dad",
        title: "Arthur's US Passport",
        category: "document",
        owner: "dad",
        location: "Master Bedroom Safe (Drawer A)",
        value: "Passport No: USA-982148192. Issued: Oct 15, 2016. Expiration: Oct 14, 2026 (⚠️ Expires in 48 days!). Status: Renewal Required for Travel.",
        privacyLevel: "Restricted",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-passport-mom",
        title: "Sarah's US Passport",
        category: "document",
        owner: "mom",
        location: "Master Bedroom Safe (Drawer A)",
        value: "Passport No: USA-441928371. Issued: July 23, 2018. Expiration: July 22, 2028. Status: Active & Valid.",
        privacyLevel: "Restricted",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-passport-son",
        title: "Leo's US Passport",
        category: "document",
        owner: "son",
        location: "Master Bedroom Safe (Drawer A)",
        value: "Passport No: USA-882719203. Issued: March 11, 2022. Expiration: March 10, 2027. Status: Active & Valid.",
        privacyLevel: "Family",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-passport-daughter",
        title: "Chloe's US Passport",
        category: "document",
        owner: "daughter",
        location: "Master Bedroom Safe (Drawer A)",
        value: "Passport No: USA-662910482. Issued: Nov 06, 2021. Expiration: Nov 05, 2026 (⚠️ Expires in 70 days). Status: Schedule Renewal.",
        privacyLevel: "Family",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-license-dad",
        title: "Arthur's Real ID Driver's License",
        category: "document",
        owner: "dad",
        location: "Arthur's Wallet / Digital Twin Backup",
        value: "DL No: D-48192048 (California Real ID). Class C. Expiration: Jan 15, 2027. Organ Donor: Yes.",
        privacyLevel: "Restricted",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-01",
        title: "House Insurance Papers",
        category: "document",
        owner: "dad",
        location: "Cupboard 2 (Blue Folder)",
        value: "Policy BC-9481-2294A. Provider: BlueCross Family Shield Gold. Renewal Date: Nov 12, 2026. Phone: 1-800-555-0199. Coverage: $1.2M property & flood.",
        privacyLevel: "Restricted",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-auto-ins",
        title: "Auto Insurance Policy (Geico)",
        category: "document",
        owner: "dad",
        location: "Glove Compartment / Digital Twin",
        value: "Policy No: GE-3392-1088. Vehicles: 2024 Tesla Model Y & Honda Odyssey. Annual Renewal: Dec 01, 2026. Roadside Assist: Active (1-800-841-3000).",
        privacyLevel: "Family",
        fileUrl: null,
        fileType: null
      },
      {
        id: "doc-02",
        title: "House Deed & Title Register",
        category: "document",
        owner: "dad",
        location: "Cupboard 2 (Blue Folder)",
        value: "Official property deed under Arthur & Sarah Pendelton Family Trust. Cert ID: 93821-PR. County Clerk Registered.",
        privacyLevel: "Private",
        fileUrl: null,
        fileType: null
      },
      {
        id: "cred-01",
        title: "Netflix & Spotify Passwords",
        category: "credentials",
        owner: "son",
        location: "Leo's Bitwarden Vault",
        value: "Netflix: chloe_leo_stream@gmail.com / TwinMems2026. Spotify: family_premium / LeoMusicRules!",
        privacyLevel: "Family",
        fileUrl: null,
        fileType: null
      },
      {
        id: "cred-02",
        title: "Wi-Fi Router Password",
        category: "credentials",
        owner: "daughter",
        location: "Living Room Router Sticker",
        value: "SSID: TwinHome_5G / Key: ChloeWifiNetAdmin55 (WPA3-PSK Security)",
        privacyLevel: "Family",
        fileUrl: null,
        fileType: null
      },
      {
        id: "health-01",
        title: "Elena's Medical Allergies Card",
        category: "health",
        owner: "mom",
        location: "Kitchen Fridge / Medical Folder",
        value: "Severe Allergy: Penicillin, Peanuts (Anaphylaxis risk). Moderate: Aspirin sensitivity. Blood Type: O Positive (O+).",
        privacyLevel: "Emergency",
        fileUrl: null,
        fileType: null
      },
      {
        id: "health-02",
        title: "Grandma Elena's Pharmacy File",
        category: "health",
        owner: "mom",
        location: "Elena's Medicine Cabinet",
        value: "Pharmacy ID: Rx-99482. CVS Pharmacy 4th Ave. Prescriptions: Metformin 500mg (Refill in 6 days), Lisinopril 10mg.",
        privacyLevel: "Emergency",
        fileUrl: null,
        fileType: null
      },
      {
        id: "legacy-01",
        title: "Grandma's Lemon Tart Recipe",
        category: "legacy",
        owner: "mom",
        location: "Recipe Drawer (Box 1)",
        value: "Ingredients: 6 egg yolks, 1 cup sugar, 2 lemons, 1 pie crust. Beat yolks until thick, add lemon zest, bake 375F for 20m.",
        privacyLevel: "Family",
        fileUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
        fileType: "image/jpeg"
      },
      {
        id: "video-vault-01",
        title: "Summer Lake Memories (1998 Video)",
        category: "legacy",
        owner: "dad",
        location: "Family Video Vault",
        value: "Preserved VHS footage of Arthur & Sarah teaching Leo how to swim at Lake Tahoe.",
        privacyLevel: "Family",
        fileUrl: "hero.mp4",
        fileType: "video/mp4"
      }
    ],

    async search(query) {
      await McpSimulator.delay(300);
      const matches = McpSimulator.storage.db.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.value.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      McpSimulator.log("Storage MCP", "search_documents", { query: query }, matches);
      return matches;
    },

    async retrieve(id) {
      await McpSimulator.delay(200);
      const matched = McpSimulator.storage.db.find(item => item.id === id);
      McpSimulator.log("Storage MCP", "retrieve_document_by_id", { id: id }, matched);
      return matched;
    },

    async insert(item) {
      await McpSimulator.delay(400);
      const newItem = {
        id: `doc-${Date.now()}`,
        ...item
      };
      McpSimulator.storage.db.unshift(newItem);
      McpSimulator.log("Storage MCP", "insert_document", item, newItem);
      return newItem;
    }
  },

  // ==========================================
  // MEDICAL MCP
  // ==========================================
  medical: {
    profiles: {
      grandma: {
        id: "med-elena",
        name: "Elena (Grandma)",
        bloodGroup: "O Positive (O+)",
        allergies: ["Penicillin (Severe)", "Peanuts (Anaphylaxis)", "Aspirin (Mild)"],
        doctor: "Dr. Henderson (+1-555-894-3232)",
        hospital: "St. Jude Community Hospital Emergency Ward (2.4 miles)",
        insuranceProvider: "BlueCross Family Shield Gold",
        insurancePolicyNumber: "BC-9481-2294A",
        insuranceLocation: "Cabinet 1, Top Drawer (Yellow Folder)"
      }
    },

    medications: {
      grandma: [
        { name: "Metformin 500mg", schedule: "Twice daily after meals", purpose: "Blood Sugar" },
        { name: "Lisinopril 10mg", schedule: "Every morning 8:00 AM", purpose: "Blood Pressure" },
        { name: "Aspirin 81mg", schedule: "Daily Low-Dose (Lunch)", purpose: "Cardiovascular" }
      ]
    },

    async getProfile(userKey) {
      await McpSimulator.delay(250);
      const profile = McpSimulator.medical.profiles[userKey] || null;
      McpSimulator.log("Medical MCP", "get_emergency_profile", { subject: userKey }, profile);
      return profile;
    },

    async getMedications(userKey) {
      await McpSimulator.delay(250);
      const meds = McpSimulator.medical.medications[userKey] || [];
      McpSimulator.log("Medical MCP", "get_medication_schedule", { subject: userKey }, meds);
      return meds;
    }
  },

  // ==========================================
  // LEGACY MCP (Memories, Stories, Voice, Videos)
  // ==========================================
  legacy: {
    memories: [
      {
        id: "legacy-story-01",
        subject: "Grandpa Robert",
        title: "Grandpa's 1968 Journey to the Coast",
        story: "We took the old Chevy through the mountain pass before the new interstate was built. It took 14 hours with two flat tires, but watching the sunrise over the Pacific Ocean with your grandmother made every mile unforgettable.",
        recordedDate: "1968-06-20",
        mediaType: "Audio Voice Clip",
        mediaUrl: "grandpa_coast_journey.wav",
        verificationHash: "sha256-8f432194bb8e84a29a0021c4598129a0",
        verifiable: true,
        confidenceScore: 1.00,
        owner: "grandpa",
        privacyLevel: "Family",
        photo: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&auto=format&fit=crop",
        video: "hero.mp4"
      },
      {
        id: "legacy-story-02",
        subject: "Grandma Elena",
        title: "Summer Cottage & Hand-whipped Lemon Tart",
        story: "Every August when the lemons ripened on the back patio, we would gather the whole family to whip the meringue by hand. The secret was never rushing the sugar syrup. 6 egg yolks, beaten until golden and thick.",
        recordedDate: "1984-08-15",
        mediaType: "Audio Voice Clip",
        mediaUrl: "grandma_lemon_tart.wav",
        verificationHash: "sha256-91e8432187f592aa12b48900142cba91",
        verifiable: true,
        confidenceScore: 1.00,
        owner: "grandma",
        privacyLevel: "Family",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
        video: ""
      },
      {
        id: "legacy-story-03",
        subject: "Grandma Elena",
        title: "Grandma's Wedding Ring Secret",
        story: "On the night of our wedding in 1968, Robert lost the rings. We spent 2 hours looking in the bushes behind the chapel. We ended up using two blades of woven grass. It was the most romantic mistake of my life.",
        recordedDate: "1968-09-12",
        mediaType: "Audio Voice Clip",
        mediaUrl: "grandma_wedding_rings.wav",
        verificationHash: "sha256-42bbde9c8d11629faee155d045c2f90a",
        verifiable: true,
        confidenceScore: 1.00,
        owner: "grandma",
        privacyLevel: "Private",
        photo: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop",
        video: ""
      },
      {
        id: "legacy-story-04",
        subject: "Dad Arthur",
        title: "Dad's First Truck & Transmissions",
        story: "I bought a broken down 1985 Ford truck for two hundred dollars. Robert and I spent three months rebuilding the transmission in the garage. When we finally got it running, it was the proudest day of my teenage years.",
        recordedDate: "1996-05-10",
        mediaType: "Audio Voice Clip",
        mediaUrl: "dad_first_truck.wav",
        verificationHash: "sha256-55aa88fc9143a18a994775d04581f109",
        verifiable: true,
        confidenceScore: 1.00,
        owner: "dad",
        privacyLevel: "Restricted",
        photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop",
        video: "neuralyn_bg.mp4"
      }
    ],

    async searchStories(query) {
      await McpSimulator.delay(300);
      const q = query.toLowerCase();
      const matches = McpSimulator.legacy.memories.filter(story => 
        story.title.toLowerCase().includes(q) || 
        story.story.toLowerCase().includes(q) ||
        story.subject.toLowerCase().includes(q)
      );
      McpSimulator.log("Legacy MCP", "get_verified_voice_recordings", { keyword: query }, matches);
      return matches;
    }
  },

  // ==========================================
  // CALENDAR MCP
  // ==========================================
  calendar: {
    events: [
      { id: "cal-01", title: "Mom's Birthday", date: "2026-07-14", assignedTo: "family", notes: "Order flower bouquet" },
      { id: "cal-02", title: "Leo's Passport Expiry", date: "2026-10-26", assignedTo: "son", notes: "Requires renewal paperwork" },
      { id: "cal-03", title: "Electricity Bill Due", date: "2026-06-30", assignedTo: "dad", notes: "Charge is unusually high: $285" }
    ],
    tasks: [],

    async getEvents() {
      await McpSimulator.delay(200);
      return McpSimulator.calendar.events;
    },

    async addTask(task) {
      await McpSimulator.delay(300);
      const newTask = {
        id: `task-${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
        ...task
      };
      McpSimulator.calendar.tasks.push(newTask);
      return newTask;
    },

    async getTasks() {
      return McpSimulator.calendar.tasks;
    }
  }
};
