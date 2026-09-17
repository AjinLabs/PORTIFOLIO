document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DOM ELEMENTS QUERY (ALL INITIALIZED AT TOP TO PREVENT TDZ CRASHES)
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const logoLink = document.getElementById('nav-logo');
    const homeConnectBtn = document.getElementById('home-connect-btn');
    
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navbar = document.getElementById('navbar');
    
    const progressFills = document.querySelectorAll('.skill-bar-fill');
    
    const certRows = document.querySelectorAll('.cert-item-row');
    const certModal = document.getElementById('cert-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const modalCertCourse = document.getElementById('modal-cert-course-name');
    
    const demoTriggers = document.querySelectorAll('.demo-trigger');
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    /* ==========================================================================
       SPA PAGE VERTICAL SLIDER SYSTEM (CURTAIN STYLE)
       ========================================================================== */
    function switchSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const targetIndex = parseInt(targetSection.getAttribute('data-index'));

        // Update Nav Links active state
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Apply slide transitions based on index order
        sections.forEach(section => {
            const sectionIndex = parseInt(section.getAttribute('data-index'));

            if (sectionIndex === targetIndex) {
                section.className = 'section active-section';
            } else if (sectionIndex < targetIndex) {
                section.className = 'section slide-up-out';
            } else {
                section.className = 'section slide-down-out';
            }
        });

        // Trigger animations based on active section
        if (targetId === 'skills') {
            animateSkills();
        } else {
            resetSkills();
        }
    }

    // Nav Links event listener
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            switchSection(targetSection);
            
            // Close mobile menu if open
            if (navbar && navbar.classList.contains('mobile-active')) {
                navbar.classList.remove('mobile-active');
                if (mobileNavToggle) {
                    const toggleIcon = mobileNavToggle.querySelector('i');
                    if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
                }
            }
        });
    });

    // Logo click triggers Home transition
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('home');
        });
    }

    // Home "Connect With Me" button click triggers Contact transition
    if (homeConnectBtn) {
        homeConnectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('contact');
        });
    }

    // Initial Hash check (supports bookmarking and page refreshes)
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    } else {
        switchSection('home');
    }

    /* ==========================================================================
       TYPEWRITER EFFECT (HOME BANNER)
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["Data Science Intern", "Aspiring ML Engineer", "Python Developer"];
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const newTextDelay = 2200; // Delay between word cycles
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (typedTextSpan && charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 300);
        }
    }

    // Start typewriter effect
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       SKILL PROGRESS BARS ANIMATION
       ========================================================================== */
    // Store original widths on data-attributes and set initial width to 0
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.setAttribute('data-target-width', targetWidth);
        fill.style.width = '0';
    });

    function animateSkills() {
        progressFills.forEach(fill => {
            const target = fill.getAttribute('data-target-width');
            // Small delay to trigger smooth transition after page slide completes
            setTimeout(() => {
                fill.style.width = target;
            }, 300);
        });
    }

    function resetSkills() {
        progressFills.forEach(fill => {
            fill.style.width = '0';
        });
    }

    /* ==========================================================================
       THEME STATE MANAGEMENT (LIGHT & DARK SWITCH)
       ========================================================================== */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            // If theme is light, show moon icon (suggests dark theme)
            if (theme === 'light') {
                themeIcon.className = 'fa-solid fa-moon';
            } else {
                themeIcon.className = 'fa-solid fa-sun';
            }
        }
    }

    // Check cached preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    /* ==========================================================================
       MOBILE NAVIGATION HAMBURGER MENU
       ========================================================================== */
    if (mobileNavToggle && navbar) {
        mobileNavToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
            const toggleIcon = mobileNavToggle.querySelector('i');
            
            if (toggleIcon) {
                if (navbar.classList.contains('mobile-active')) {
                    toggleIcon.className = 'fa-solid fa-xmark';
                } else {
                    toggleIcon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    /* ==========================================================================
       CERTIFICATE OVERLAY MODAL SYSTEM
       ========================================================================== */
    certRows.forEach(row => {
        row.addEventListener('click', () => {
            const title = row.getAttribute('data-title');
            const issued = row.getAttribute('data-issued');
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalIssuer) modalIssuer.textContent = `Issued by ${issued}`;
            if (modalCertCourse) modalCertCourse.textContent = title.toUpperCase();
            
            if (certModal) certModal.classList.add('active');
        });
    });

    function closeModal() {
        if (certModal) certModal.classList.remove('active');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close modal on clicking outside content area
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });
    }

    // Close modal on Esc key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       INTERACTIVE PROJECTS DEMO TRIGGERS (FIXED DOM TRAVERSAL)
       ========================================================================== */
    demoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectRow = trigger.closest('.project-row-item');
            const projectTitle = projectRow ? projectRow.querySelector('.proj-meta-details h3').textContent : 'Project';
            
            alert(`Project Preview: Details for "${projectTitle}" are fully documented.\n\nNote: Interactive features are configured via live code bases on GitHub.`);
        });
    });

    /* ==========================================================================
       CUSTOM CURSOR FOLLOW ANIMATION (HIGH PERFORMANCE LERP)
       ========================================================================== */
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isMoving = false;

    // Select all cursor trigger targets
    const refreshCursorTriggers = () => {
        const targets = document.querySelectorAll('a, button, .cert-item-row, .social-icon, .modal-close');
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('hovered');
            });
            target.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('hovered');
            });
        });
    };

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;

            // Move the small dot instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Dynamic Lerp follow animation loop
        const animateCursorFollower = () => {
            if (isMoving) {
                const dx = mouseX - cursorX;
                const dy = mouseY - cursorY;

                // Move outer ring 15% closer to the mouse position on each frame
                cursorX += dx * 0.15;
                cursorY += dy * 0.15;

                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
            }
            requestAnimationFrame(animateCursorFollower);
        };
        
        animateCursorFollower();
        refreshCursorTriggers();
    } else {
        // Hide custom cursor nodes on mobile or tablet
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

});
