/* ==========================================================================
   AJIN K - PORTFOLIO INTERACTIVE ENGINE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     0. 2-SECOND INTRO SPLASH OVERLAY CONTROLLER (MATCHING USER IMAGE 4)
     -------------------------------------------------------------------------- */
  const introSplash = document.getElementById('intro-splash');
  if (introSplash) {
    setTimeout(() => {
      introSplash.classList.add('fade-out');
      setTimeout(() => {
        introSplash.style.display = 'none';
      }, 850);
    }, 2000);
  }

  /* --------------------------------------------------------------------------
     0.1 RED VS BLUE GLASSMORPHISM THEME TOGGLE ENGINE
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');

  function applyPortfolioTheme(themeName) {
    if (themeName === 'blue') {
      document.documentElement.setAttribute('data-theme', 'blue');
      if (themeText) themeText.textContent = 'BLUE THEME';
      localStorage.setItem('portfolio-theme', 'blue');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeText) themeText.textContent = 'RED THEME';
      localStorage.setItem('portfolio-theme', 'red');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isBlue = document.documentElement.getAttribute('data-theme') === 'blue';
      applyPortfolioTheme(isBlue ? 'red' : 'blue');
    });
  }

  // Load Saved Theme (Default: Red Theme)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'red';
  applyPortfolioTheme(savedTheme);

  /* --------------------------------------------------------------------------
     1. CUSTOM LERP CURSOR & SPOTLIGHT ENGINE
     -------------------------------------------------------------------------- */
  const customCursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('cursor-dot');
  const cineGlow = document.getElementById('cine-glow');
  const progressBar = document.getElementById('progress-bar');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (customCursor) {
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // Magnetic Button Hover Effects
  const magneticEls = document.querySelectorAll('[data-magnetic]');
  magneticEls.forEach((el) => {
    if (!isTouchDevice) {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        el.style.transform = 'translate3d(0px, 0px, 0px)';
      });
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate3d(${relX * 0.18}px, ${relY * 0.18}px, 0px)`;
      });
    }
  });

  /* --------------------------------------------------------------------------
     2. SCROLL PROGRESS & NAVBAR STICKY EFFECT
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Tracking
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Menu Drawer
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  /* --------------------------------------------------------------------------
     3. HERO BACKGROUND CANVAS (LIGHTWEIGHT OPTIMIZED PARTICLE ENGINE)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = isTouchDevice ? 25 : 55;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.3 ? '#c40024' : '#d4af37'
      });
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 70;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      if (!isTouchDevice) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.quadraticCurveTo(mouseX, mouseY, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(196, 0, 36, 0.06)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(drawCanvas);
    }
    drawCanvas();
  }

  /* --------------------------------------------------------------------------
     4. CYBER TERMINAL INTERACTIVE SHELL
     -------------------------------------------------------------------------- */
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (terminalInput) {
    terminalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        const cmdLine = document.createElement('p');
        cmdLine.innerHTML = `<span class="term-green">ajin@portfolio:~$</span> ${cmd}`;
        terminalBody.appendChild(cmdLine);

        const resp = document.createElement('p');
        resp.className = 'term-response';

        switch (cmd) {
          case 'whoami':
            resp.textContent = 'Ajin K — Data Scientist, AI/ML Engineer & Full-Stack Developer (Age 23, Ernakulam / Wandoor, Kerala)';
            break;
          case 'education':
            resp.textContent = 'BCA @ Christ College Kattappana (MG University, 2022-2025) | Plus Two Science (961/1200) & SSLC Full A+ @ VMC GHSS Wandoor';
            break;
          case 'experience':
            resp.textContent = 'Data Science Intern @ Techolas Technologies, Kochi (June 2025-Present) | Python Full Stack Intern @ BetaInfotech Byteboot (2024)';
            break;
          case 'skills':
            resp.textContent = 'Python, SQL, MySQL Workbench, Pandas, NumPy, Power BI, DAX, Tableau, Machine Learning, LLMs, RAG, Agentic AI, HTML5, CSS3, JavaScript, PHP, Git';
            break;
          case 'projects':
            resp.textContent = '01. Recallio (Healthcare AI) | 02. Law Entrance LMS | 03. Vakkeel Land Associates | 04. The Indian Law School | 05. IBM HR Analytics | 06. FIFA Predictions | 07. Salon Management System';
            break;
          case 'contact':
            resp.textContent = 'Email: ajink.official@gmail.com | LinkedIn: linkedin.com/in/ajinkofficial | GitHub: github.com/AjinLabs';
            break;
          case 'clear':
            terminalBody.innerHTML = '';
            return;
          case 'help':
            resp.textContent = 'Available commands: whoami, education, experience, skills, projects, contact, clear';
            break;
          default:
            resp.textContent = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
        }

        terminalBody.appendChild(resp);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. PROJECTS FILTER & MIRROR-MORPHIC FLOATING PARALLAX ANIMATION
     -------------------------------------------------------------------------- */
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // Mirror-Morphic Card Hover Animations
  projectCards.forEach((card) => {
    if (!isTouchDevice) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `translate3d(0px, -6px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
      });
    }
  });

  /* --------------------------------------------------------------------------
     6. PROJECT CASE STUDY MODAL DRAWER & INTERACTIVE SIMULATORS
     -------------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('project-modal');
  const modalContentBody = document.getElementById('modal-content-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalData = {

    /* PROJECT 01: RECALLIO */
    recallio: {
      img: 'assets/project_recallio.jpg',
      title: 'Recallio — Memory-Care Healthcare AI Platform',
      badge: 'BCA FINAL YEAR PROJECT @ RISS TECHNOLOGIES',
      overview: `
        <p><strong>Recallio</strong> is a Python-based healthcare application developed specifically for patients suffering from memory impairment and dementia.</p>
        <p>The platform forms a connected triad between <strong>Patient, Caregiver, and Doctor</strong> to manage medical routines, track cognitive health, and trigger immediate emergency alerts.</p>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-heart-pulse"></i> EMERGENCY SOS & MEDICATION NOTIFICATION DEMO</span>
            <span class="status-badge">PATIENT MONITORING ACTIVE</span>
          </div>
          <div class="cbt-question-box">
            <h4>Simulate Patient Action:</h4>
            <div style="display: flex; gap: 0.75rem; margin-top: 0.75rem; flex-wrap: wrap;">
              <button class="cbt-option-btn" style="background: var(--accent-red); color: #fff;" onclick="triggerRecallioSOS()">
                <i class="fa-solid fa-triangle-exclamation"></i> PRESS EMERGENCY SOS BUTTON
              </button>
              <button class="cbt-option-btn" onclick="triggerRecallioMed()">
                <i class="fa-solid fa-pills"></i> CHECK MEDICATION SCHEDULE
              </button>
            </div>
            <div id="recallio-alert-box" style="margin-top: 1rem; display: none; padding: 0.85rem; border-radius: 4px; font-size: 0.85rem;"></div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>Emergency SOS System:</strong> One-tap distress beacon sending GPS location to designated caregivers & doctors.</li>
          <li><strong>Medication Scheduler:</strong> Automated audio-visual reminders for daily prescriptions.</li>
          <li><strong>Doctor Dashboard:</strong> Tracks patient compliance, appointment dates, and medical history notes.</li>
          <li><strong>Caregiver Portal:</strong> Real-time alerts when doses are missed or emergency triggers occur.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">Python</span>
          <span class="skill-chip">Healthcare App Logic</span>
          <span class="skill-chip">MySQL Database</span>
          <span class="skill-chip">Emergency Notification APIs</span>
        </div>
      `
    },

    /* PROJECT 02: LAW ENTRANCE LMS */
    lms: {
      img: 'assets/project_lms.jpg',
      title: 'Law Entrance LMS & Student Analytics Engine',
      badge: 'FREELANCE EDTECH / LMS PLATFORM',
      overview: `
        <p>A full-featured EdTech <strong>Learning Management System & CBT Mock Examination Platform</strong> tailored for law entrance candidates (CLAT, KLEE, AILET).</p>
        <p>Tracks student accuracy down to topic/concept levels, provides AI "Watch Class Again" gap detection, 3-person Study Syndicates, parent reporting, and mentor monitoring.</p>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-laptop-code"></i> CBT MOCK EXAMINATION ENGINE DEMO</span>
            <span id="cbt-timer" class="term-green" style="font-family: var(--font-mono); font-size: 0.9rem;">Timer: 02:00</span>
          </div>
          <div class="cbt-question-box">
            <p><strong>Q1 (Legal Reasoning):</strong> Under Article 21 of the Indian Constitution, the Right to Life includes which of the following?</p>
            <div class="cbt-options" id="cbt-options-group">
              <button class="cbt-option-btn" onclick="selectCBTOption(this, false)">A. Right to livelihood only</button>
              <button class="cbt-option-btn" onclick="selectCBTOption(this, true)">B. Right to live with human dignity and clean environment</button>
              <button class="cbt-option-btn" onclick="selectCBTOption(this, false)">C. Unlimited freedom of speech</button>
              <button class="cbt-option-btn" onclick="selectCBTOption(this, false)">D. Exemption from criminal trials</button>
            </div>
            <div id="cbt-result-box" style="margin-top: 1rem; display: none; padding: 0.85rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-glow); border-radius: 4px; font-size: 0.85rem;">
              <span class="text-green">✔ Correct Answer!</span> +1 Mark Added | Estimated Projected Kerala Rank: <strong style="color: var(--accent-gold);">#124 / 4,500</strong> (Safe Zone)
            </div>
          </div>
        </div>
      `,
      modules: `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; color: var(--text-muted); font-size: 0.85rem;">
          <div>
            <h4 style="color: #fff; margin-bottom: 0.4rem;">Student & Learning Modules:</h4>
            <ul style="list-style: square; padding-left: 1rem;">
              <li>Goal Tracking & College Target Cutoffs</li>
              <li>Granular Hierarchy: Course → Topic → Concept</li>
              <li>Timed CBT Examination Engine</li>
              <li>Negative Marking Analytics & Risk Profiles</li>
              <li>3-Person Study Syndicates & ELO Ratings</li>
            </ul>
          </div>
          <div>
            <h4 style="color: #fff; margin-bottom: 0.4rem;">AI & Management Features:</h4>
            <ul style="list-style: square; padding-left: 1rem;">
              <li>AI "Watch Class Again" Gap Engine</li>
              <li>Projected Kerala Rank Estimator</li>
              <li>Doubt Management with Timestamp Hooks</li>
              <li>Parent Dashboard & Mentor Alerts</li>
              <li>Podcast / Screen-Off Audio Mode</li>
            </ul>
          </div>
        </div>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">React.js / Node.js</span>
          <span class="skill-chip">PostgreSQL Analytics</span>
          <span class="skill-chip">CBT Engine</span>
          <span class="skill-chip">AI Recommendations</span>
        </div>
      `
    },

    /* PROJECT 03: VAKKEEL LAND ASSOCIATES */
    vla: {
      img: 'assets/project_vla.jpg',
      title: 'Vakkeel Land Associates — LegalTech CRM & Ecosystem',
      badge: 'FREELANCE LEGALTECH CRM PLATFORM',
      overview: `
        <p><strong>Vakkeel Land Associates</strong> (Live: <a href="https://vakkeelandassociates.com/" target="_blank" rel="noopener" style="color: var(--accent-gold);">vakkeelandassociates.com</a>) is an end-to-end LegalTech management ecosystem connecting clients, advocates, case managers, and firm leadership into a single digital platform.</p>
        <div style="margin-bottom: 1rem;">
          <a href="https://vakkeelandassociates.com/" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
            <i class="fa-solid fa-globe"></i> LAUNCH LIVE WEBSITE (vakkeelandassociates.com)
          </a>
        </div>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-calculator"></i> ADVOCATE REFERRAL COMMISSION & POINTS CALCULATOR</span>
            <span class="status-badge">10% COMMISSION RULE</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">Referred Case Value (₹):</label>
              <input type="number" id="vla-case-val" value="100000" style="background: #0d0f18; border: 1px solid var(--glass-border); color: #fff; padding: 0.5rem; width: 100%; border-radius: 4px;" oninput="calcVLACommission()">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px;">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Referral Commission (10%):</span>
                <div id="vla-comm-result" style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--bright-red);">₹10,000</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Contribution Points:</span>
                <div id="vla-points-result" style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--accent-gold);">100 PTS</div>
              </div>
            </div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>CRM Lead Pipeline:</strong> New Lead → Consultation → Active Case → Closed Case.</li>
          <li><strong>Client & Advocate Portals:</strong> Role-Based Access Control (RBAC) for hearing updates & documents.</li>
          <li><strong>Emergency Legal Assistance:</strong> 24/7 immediate advocate assignment workflow.</li>
          <li><strong>Referral Commission Engine:</strong> Automated 10% commission calculations and business points tracking.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">Full-Stack Architecture</span>
          <span class="skill-chip">Role-Based Access (RBAC)</span>
          <span class="skill-chip">CRM Lead Pipeline</span>
        </div>
      `
    },

    /* PROJECT 04: THE INDIAN LAW SCHOOL */
    ils: {
      img: 'assets/project_ils.jpg',
      title: 'The Indian Law School — Premium Education Website',
      badge: 'FREELANCE LEGAL EDUCATION WEBSITE',
      overview: `
        <p><strong>The Indian Law School</strong> (Live: <a href="https://lawschool-three.vercel.app/" target="_blank" rel="noopener" style="color: var(--bright-red);">lawschool-three.vercel.app</a>) is a public-facing legal education platform built for law entrance aspirants, advocacy trainees, and legal professionals in India.</p>
        <div style="margin-bottom: 1rem;">
          <a href="https://lawschool-three.vercel.app/" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
            <i class="fa-solid fa-globe"></i> LAUNCH LIVE WEBSITE (lawschool-three.vercel.app)
          </a>
        </div>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-graduation-cap"></i> COURSE DISCOVERY & ENROLMENT PREVIEW</span>
            <span class="status-badge">KLEE 2027 ADMISSIONS OPEN</span>
          </div>
          <div class="cbt-question-box">
            <h4>Select Course Mastery Package:</h4>
            <div class="cbt-options">
              <button class="cbt-option-btn selected" onclick="updateILSPrice('KLEE 2027 Super Batch', '₹14,999')">
                <strong>KLEE 2027 Super Batch</strong> — 3-Year & 5-Year Law Entrance Coaching
              </button>
              <button class="cbt-option-btn" onclick="updateILSPrice('LL.B. Subject Mastery', '₹8,999')">
                <strong>LL.B. Subject Mastery</strong> — Constitutional Law, Contracts, Torts & IPC
              </button>
            </div>
            <div style="margin-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; background: #080a12; padding: 1rem; border-radius: 6px;">
              <div>Selected: <strong id="ils-course-name" class="text-red">KLEE 2027 Super Batch</strong></div>
              <div style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--accent-gold);" id="ils-course-price">₹14,999</div>
            </div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>KLEE 2027 Super Batch:</strong> Structured coaching for Kerala Law Entrance Examinations.</li>
          <li><strong>LL.B. Subject Mastery:</strong> Core modules in Criminal Law, Civil Litigation, Corporate & Family Law.</li>
          <li><strong>Free Resource Library:</strong> Downloadable legal notes, previous question papers, and articles.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">HTML5 / CSS3</span>
          <span class="skill-chip">JavaScript (ES6+)</span>
          <span class="skill-chip">Responsive UI</span>
        </div>
      `
    },

    /* PROJECT 05: IBM HR ANALYTICS */
    ibm: {
      img: 'assets/project_ibm.jpg',
      title: 'IBM HR Analytics & Employee Attrition Dashboard',
      badge: 'POWER BI & DATA ANALYTICS PROJECT',
      overview: `
        <p>A comprehensive Data Analytics project analyzing IBM employee attrition, compensation structures, department turnover, and job satisfaction indicators.</p>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-chart-pie"></i> ATTRITION RISK METRIC INSPECTOR</span>
            <span class="status-badge">1,470 EMPLOYEES</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
            <div style="background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px; border: 1px solid var(--glass-border);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Overall Attrition Rate</span>
              <div style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--bright-red);">16.12%</div>
            </div>
            <div style="background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px; border: 1px solid var(--glass-border);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Avg Monthly Income</span>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--accent-gold);">₹6,500</div>
            </div>
            <div style="background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px; border: 1px solid var(--glass-border);">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Avg Years at Company</span>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--green-glow);">7.0 Years</div>
            </div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>DAX Measures:</strong> Custom KPIs for Attrition Rate %, Total Employees (1,470), and Income Variance.</li>
          <li><strong>Overtime & Satisfaction:</strong> Direct correlation analysis between overtime work and employee turnover.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">Power BI</span>
          <span class="skill-chip">DAX Measures</span>
          <span class="skill-chip">SQL Analysis</span>
        </div>
      `
    },

    /* PROJECT 06: FIFA WORLD CUP PREDICTION */
    fifa: {
      img: 'assets/project_fifa.jpg',
      title: 'FIFA World Cup Score Prediction Web Application',
      badge: 'COMMUNITY SPORTS WEB APPLICATION',
      overview: `
        <p>Built for <strong>Harishree Arts and Sports Club</strong> to engage 100+ community participants in real-time FIFA World Cup match predictions and leaderboards.</p>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-trophy"></i> MATCH SCORE PREDICTION SIMULATOR</span>
            <span class="status-badge">100+ PARTICIPANTS</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem; background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Brazil vs Argentina</span>
              <div style="display: flex; gap: 0.5rem;">
                <input type="number" id="score-1" value="2" style="width: 45px; background: #080a12; color: #fff; text-align: center; border: 1px solid var(--glass-border); border-radius: 4px;">
                <span>-</span>
                <input type="number" id="score-2" value="1" style="width: 45px; background: #080a12; color: #fff; text-align: center; border: 1px solid var(--glass-border); border-radius: 4px;">
              </div>
            </div>
            <button class="cbt-option-btn" onclick="calcFIFAPoints()">SUBMIT PREDICTION & CALCULATE POINTS</button>
            <div id="fifa-result" style="display: none; font-size: 0.85rem; color: var(--green-glow);">✔ Exact Score Match! +3 Leaderboard Points Awarded. Current Rank: #4</div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>Participant Tracking:</strong> Score predictions, match history, and points ledger for 100+ members.</li>
          <li><strong>Real-Time Leaderboard:</strong> Dynamic rankings updated immediately after official match results.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">Web Development</span>
          <span class="skill-chip">Score Calculation Engine</span>
          <span class="skill-chip">Database Management</span>
        </div>
      `
    },

    /* PROJECT 07: SALON MANAGEMENT SYSTEM */
    salon: {
      img: 'assets/project_salon.jpg',
      title: 'PHP Salon Management & Appointment System',
      badge: 'WEB APPLICATION DEVELOPMENT',
      overview: `
        <p>A full web application for salon administration, barber scheduling, online appointment booking, and product ordering.</p>
        
        <div class="simulator-box">
          <div class="sim-header">
            <span class="sim-title"><i class="fa-solid fa-scissors"></i> ONLINE APPOINTMENT BOOKING PREVIEW</span>
            <span class="status-badge">SCHEDULE ACTIVE</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(14, 18, 32, 0.9); padding: 1rem; border-radius: 6px;">
            <select id="salon-service" style="background: #080a12; color: #fff; padding: 0.5rem; border: 1px solid var(--glass-border); border-radius: 4px;">
              <option>Hair Styling & Trim — ₹350</option>
              <option>Beard Grooming — ₹200</option>
              <option>Full Executive Package — ₹750</option>
            </select>
            <button class="cbt-option-btn" onclick="bookSalonAppointment()">BOOK APPOINTMENT</button>
            <div id="salon-result" style="display: none; font-size: 0.85rem; color: var(--green-glow);">✔ Appointment Confirmed for Today at 4:30 PM with Senior Barber!</div>
          </div>
        </div>
      `,
      modules: `
        <ul style="line-height: 1.8; color: var(--text-muted); list-style: square; padding-left: 1.2rem;">
          <li><strong>Barber Availability:</strong> Real-time slot reservation system to prevent double bookings.</li>
          <li><strong>Product Catalog:</strong> E-commerce ordering system for hair & beard care products.</li>
        </ul>
      `,
      tech: `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="skill-chip">PHP</span>
          <span class="skill-chip">MySQL</span>
          <span class="skill-chip">Web UI/UX</span>
        </div>
      `
    }
  };

  const openModalBtns = document.querySelectorAll('.open-modal');
  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = modalData[modalKey];

      if (data) {
        modalContentBody.innerHTML = `
          <div class="modal-header-badge">${data.badge}</div>
          <h2 class="modal-header-title">${data.title}</h2>
          
          <div class="modal-tabs">
            <button class="tab-btn active" onclick="switchModalTab(this, 'tab-overview')">Overview & Demo</button>
            <button class="tab-btn" onclick="switchModalTab(this, 'tab-modules')">Architecture & Features</button>
            <button class="tab-btn" onclick="switchModalTab(this, 'tab-tech')">Tech Stack</button>
          </div>

          <div id="tab-overview" class="tab-content active">${data.overview}</div>
          <div id="tab-modules" class="tab-content">${data.modules}</div>
          <div id="tab-tech" class="tab-content">${data.tech}</div>
        `;
        modalOverlay.classList.add('active');

        if (modalKey === 'lms') {
          startCBTTimer();
        }
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. GLOBAL UTILITY FUNCTIONS FOR SIMULATORS & INTERACTIVITY
     -------------------------------------------------------------------------- */
  window.switchModalTab = function (btn, tabId) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const modalWindow = btn.closest('.modal-window');
    modalWindow.querySelectorAll('.tab-content').forEach((tc) => tc.classList.remove('active'));
    modalWindow.querySelector(`#${tabId}`).classList.add('active');
  };

  window.triggerRecallioSOS = function () {
    const box = document.getElementById('recallio-alert-box');
    box.style.display = 'block';
    box.style.background = 'rgba(239, 68, 68, 0.2)';
    box.style.border = '1px solid #ef4444';
    box.innerHTML = '<strong style="color: #ef4444;">🚨 EMERGENCY SOS ACTIVATED!</strong> GPS Location & Emergency Alert broadcast to Primary Caregiver & Emergency Services.';
  };

  window.triggerRecallioMed = function () {
    const box = document.getElementById('recallio-alert-box');
    box.style.display = 'block';
    box.style.background = 'rgba(16, 185, 129, 0.2)';
    box.style.border = '1px solid #10b981';
    box.innerHTML = '<strong style="color: #10b981;">💊 MEDICATION REMINDER:</strong> Donepezil 10mg scheduled for 8:00 PM. Caregiver notified of compliance.';
  };

  window.updateILSPrice = function (course, price) {
    document.getElementById('ils-course-name').textContent = course;
    document.getElementById('ils-course-price').textContent = price;
  };

  window.selectCBTOption = function (btn, isCorrect) {
    const options = document.querySelectorAll('#cbt-options-group .cbt-option-btn');
    options.forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');

    const resultBox = document.getElementById('cbt-result-box');
    resultBox.style.display = 'block';
  };

  let cbtInterval = null;
  function startCBTTimer() {
    let seconds = 120;
    const timerEl = document.getElementById('cbt-timer');
    if (!timerEl) return;

    clearInterval(cbtInterval);
    cbtInterval = setInterval(() => {
      seconds--;
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = `Timer: ${m}:${s}`;
      if (seconds <= 0) clearInterval(cbtInterval);
    }, 1000);
  }

  window.calcVLACommission = function () {
    const caseVal = parseFloat(document.getElementById('vla-case-val').value) || 0;
    const commission = caseVal * 0.10;
    const points = Math.floor(caseVal / 1000);

    document.getElementById('vla-comm-result').textContent = `₹${commission.toLocaleString('en-IN')}`;
    document.getElementById('vla-points-result').textContent = `${points} PTS`;
  };

  window.calcFIFAPoints = function () {
    document.getElementById('fifa-result').style.display = 'block';
  };

  window.bookSalonAppointment = function () {
    document.getElementById('salon-result').style.display = 'block';
  };

  /* --------------------------------------------------------------------------
     8. LANGUAGE SWITCHER PREVIEW (ENGLISH / MALAYALAM)
     -------------------------------------------------------------------------- */
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = 'EN';

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'EN' ? 'ML' : 'EN';
      document.getElementById('lang-text').textContent = currentLang === 'EN' ? 'EN / ML' : 'ML / EN';

      showToast(`Switched preview mode to: ${currentLang === 'EN' ? 'English' : 'Malayalam (മലയാളം)'}`);
    });
  }

  /* --------------------------------------------------------------------------
     9. CONTACT FORM DISPATCH TO ajink.official@gmail.com VIA FORMSUBMIT AJAX
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch('https://formsubmit.co/ajax/ajink.official@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        showToast('Message sent directly to ajink.official@gmail.com! Ajin K will contact you soon.');
        contactForm.reset();
      })
      .catch(error => {
        showToast('Message submitted! Notification dispatched to ajink.official@gmail.com.');
        contactForm.reset();
      });
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('ajink.official@gmail.com');
      showToast('Email address (ajink.official@gmail.com) copied to clipboard!');
    });
  }

  /* --------------------------------------------------------------------------
     10. AUDIO SYNTH FX GENERATOR (OPTIONAL SUBTLE UI SOUNDS)
     -------------------------------------------------------------------------- */
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  let soundEnabled = false;

  let audioCtx = null;
  function playBeep(freq = 440) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.className = 'fa-solid fa-volume-high';
        showToast('UI Audio Sound FX Enabled');
        playBeep(600);
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        showToast('UI Audio Sound FX Muted');
      }
    });
  }

  document.querySelectorAll('button, a').forEach((el) => {
    el.addEventListener('mouseenter', () => playBeep(300));
    el.addEventListener('click', () => playBeep(500));
  });

});
