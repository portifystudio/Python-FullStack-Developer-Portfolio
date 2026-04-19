document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 500);
        });
    }

    // 2. Typing Effect
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        "Python Full-Stack Developer",
        "AI & Machine Learning Enthusiast",
        "Data Science Specialist",
        "Automation & Scraper Expert",
        "Cloud & DevOps Learner"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingElement) return;

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next sentence
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // 3. Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars specifically when skills section is visible
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                if (skillBars.length > 0) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => sectionObserver.observe(el));

    // 4. Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                window.scrollTo({
                    top: targetContent.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Active Link Highlighting
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
