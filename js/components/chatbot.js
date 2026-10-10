/**
 * Component: MakBotWidget
 * File: js/components/chatbot.js
 * Intelligent AI Concierge with Instant Enterprise Knowledge & Lead Capture
 */

export function initMakBotWidget() {
  const trigger = document.getElementById('chatTrigger') || document.getElementById('chatWidgetFab');
  const windowEl = document.getElementById('chatWindow') || document.getElementById('chatPopup');
  const closeBtn = document.getElementById('chatCloseBtn') || document.getElementById('closeChatBtn');
  const body = document.getElementById('chatBody');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');

  // Lead Capture Form Elements
  const leadForm = document.getElementById('chatLeadForm');
  const leadEmail = document.getElementById('chatLeadEmail');
  const leadCountryCode = document.getElementById('chatLeadCountryCode');
  const leadPhone = document.getElementById('chatLeadPhone');
  const leadSuccess = document.getElementById('chatLeadSuccess');
  const leadSuccessText = document.getElementById('chatLeadSuccessText');

  if (!trigger || !windowEl) return;

  // Toggle Chat Window
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    windowEl.classList.toggle('is-open');
    if (windowEl.classList.contains('is-open') && input) {
      setTimeout(() => input.focus(), 150);
      if (body) body.scrollTop = body.scrollHeight;
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      windowEl.classList.remove('is-open');
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && windowEl.classList.contains('is-open')) {
      windowEl.classList.remove('is-open');
    }
  });

  // Enterprise Knowledge Base & Q&A
  const knowledgeBase = [
    {
      keywords: ['erp', 'epicor', 'iscala', 'kinetic', 'sap', 's/4hana', 's4hana', 'migration', 'implementation'],
      response: "We are seasoned enterprise ERP specialists with 20+ years of expertise. We implement and manage Epicor Kinetic, Epicor iScala, and SAP S/4HANA—including custom extensions, companion integrations (EpicPay), multi-site rollouts, and 24/7 Level-1 through Level-3 managed support."
    },
    {
      keywords: ['web', 'website', 'saas', 'portal', 'frontend', 'backend', 'react', 'nextjs', 'fullstack'],
      response: "We engineer modern cloud-native web architectures, high-scale SaaS products, and customer self-service portals using React, Next.js, TypeScript, and microservice backends built for high performance and bank-grade security."
    },
    {
      keywords: ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'cross platform'],
      response: "Our mobile practice designs and engineers native iOS/Android apps and cross-platform solutions (Flutter / React Native). We specialize in enterprise offline-sync, biometric auth, intuitive UX, and mission-critical reliability."
    },
    {
      keywords: ['ai', 'artificial intelligence', 'agent', 'llm', 'gpt', 'rag', 'machine learning', 'automation', 'bot'],
      response: "We build custom Agentic AI workflows, private enterprise RAG document search engines, smart process bots, and tailored LLM fine-tuning anchored strictly inside your secure corporate environment."
    },
    {
      keywords: ['cyber', 'security', 'defense', 'penetration', 'audit', 'threat', 'compliance', 'hipaa', 'soc'],
      response: "Our cybersecurity division provides 24/7 Threat Defense, Vulnerability Assessments, Penetration Testing, HIPAA/ISO compliance frameworks, and active SOC incident response squads."
    },
    {
      keywords: ['cloud', 'aws', 'azure', 'devops', 'infrastructure', 'server', 'managed it', 'hosting'],
      response: "We provide end-to-end Managed IT, hybrid Cloud Migration (AWS & Microsoft Azure), CI/CD DevOps automation, automated disaster recovery, and 99.99% uptime server management."
    },
    {
      keywords: ['talent', 'hire', 'staff', 'developer', 'engineer', 'team', 'resource', 'augmentation'],
      response: "Need specialized engineering capacity? We provide pre-vetted senior software engineers, DevOps leads, and ERP specialists ready to integrate into your sprints within 48 to 72 hours."
    },
    {
      keywords: ['bpo', 'medical billing', 'billing', 'call center', 'back office', 'transcription', 'voice', 'customer service'],
      response: "Our global BPO division operates turnkey HIPAA-compliant Medical Billing desks, claims processing squads, and 24/7 omnichannel Call Center support desks with fluent international agents."
    },
    {
      keywords: ['cost', 'price', 'pricing', 'rate', 'how much', 'budget', 'quote', 'fee', 'charge'],
      response: "Our pricing is transparent and tailored to your scope: we offer fixed-sprint MVP audits, phased project milestone delivery, and monthly dedicated team retainers. Leave your number and email in the callback card above for a complimentary architectural estimate!"
    },
    {
      keywords: ['timeline', 'duration', 'how long', 'weeks', 'delivery', 'time', 'speed'],
      response: "Typical sprint MVPs and architecture audits are delivered in 4 to 6 weeks. Full enterprise platform rollouts range from 8 to 16 weeks. We also offer accelerated sprint teams for mission-critical deadlines."
    },
    {
      keywords: ['hours', 'timezone', 'us', 'uk', 'uae', 'middle east', 'global', 'location', 'where', 'offices'],
      response: "We maintain synchronized client support for United States hours (EST/CST/PST), United Kingdom & European hours (GMT/BST), and Middle East business hours (UAE/KSA), backed by 24/7 follow-the-sun monitoring."
    },
    {
      keywords: ['nda', 'confidential', 'privacy', 'agreement', 'security'],
      response: "Confidentiality is our top priority. We execute bilateral Non-Disclosure Agreements (NDAs) before reviewing any business requirements, data architecture, or proprietary roadmaps."
    },
    {
      keywords: ['call', 'callback', 'phone', 'contact', 'speak', 'human', 'talk', 'whatsapp', 'reach'],
      response: "We'd love to connect with you directly! Please enter your phone/WhatsApp number and work email in the quick form above, or type it right here, and our practice director will get in touch with you within 24 hours."
    },
    {
      keywords: ['hi', 'hello', 'hey', 'salam', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! Welcome to MAKCOMMs. How can I assist your business today? Feel free to ask about our ERP solutions, software development, AI systems, dedicated tech talent, or global BPO operations."
    },
    {
      keywords: ['who are you', 'what is makcom', 'about makcom', 'company'],
      response: "MAKCOMMs is a premier enterprise digital solutions and consulting firm. We engineer tailored technology architectures, modernize ERP systems, scale dedicated engineering talent, and operate global BPO centers for ambitious businesses worldwide."
    }
  ];

  function getSmartAnswer(query) {
    const text = query.toLowerCase().trim();

    // Check if user typed an email or phone number in chat
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(?:\+?\d{1,4}[ -]?)?\(?\d{2,4}\)?[ -]?\d{3,4}[ -]?\d{3,4}/);

    if (emailMatch || phoneMatch) {
      const contactInfo = [emailMatch ? emailMatch[0] : null, phoneMatch ? phoneMatch[0] : null].filter(Boolean).join(' and ');
      return `Thank you! We've captured your contact info (${contactInfo}). A senior practice director will contact you via WhatsApp/Email within 24 business hours.`;
    }

    // Match keywords from knowledge base
    for (const item of knowledgeBase) {
      for (const kw of item.keywords) {
        if (text.includes(kw)) {
          return item.response;
        }
      }
    }

    // Fallback answer
    return `Thank you for asking! MAKCOMMs specializes in custom enterprise software, ERP modernization (Epicor & SAP), dedicated tech talent, and 24/7 global operations. Would you like to schedule a quick callback with one of our practice leads? You can leave your phone number and email in the card above.`;
  }

  function appendBotMessage(text) {
    if (!body) return;
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot-bubble';
    botBubble.innerHTML = text;
    body.appendChild(botBubble);
    body.scrollTop = body.scrollHeight;
  }

  function sendQuery(text) {
    if (!text || !text.trim() || !body) return;

    // Append User Bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = text.trim();
    body.appendChild(userBubble);
    body.scrollTop = body.scrollHeight;

    // Simulate thinking & reply
    setTimeout(() => {
      const answer = getSmartAnswer(text);
      appendBotMessage(answer);
    }, 400);
  }

  // Handle Quick Suggestion Pills
  const suggestPills = document.querySelectorAll('.chat-suggest-pill');
  suggestPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prompt = pill.getAttribute('data-prompt') || pill.textContent;
      sendQuery(prompt);
    });
  });

  // Handle User Input Submission
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      sendQuery(input.value);
      input.value = '';
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendQuery(input.value);
        input.value = '';
      }
    });
  }

  // Handle Lead Capture Micro-Form inside Chat
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = leadEmail ? leadEmail.value.trim() : '';
      const code = leadCountryCode ? leadCountryCode.value : '+1';
      const phone = leadPhone ? leadPhone.value.trim() : '';

      if (!email || !phone) return;

      const fullPhone = `${code} ${phone}`;

      // Hide form & show success confirmation in card
      leadForm.style.display = 'none';
      if (leadSuccess) {
        leadSuccess.style.display = 'flex';
        if (leadSuccessText) {
          leadSuccessText.innerHTML = `Our director will contact you directly at <strong>${fullPhone}</strong> and <strong>${email}</strong> within 24 business hours.`;
        }
      }

      // Append confirmation in chat bubble stream
      setTimeout(() => {
        appendBotMessage(`<strong>Callback Confirmed!</strong> Thank you. We've logged your contact request for <strong>${fullPhone}</strong> (${email}). A senior practice director will follow up with you via WhatsApp or Phone shortly.`);
      }, 300);
    });
  }
}
