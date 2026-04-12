// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 0. Logo Transition (Center to Corner)
    const logoContainer = document.querySelector('#floating-logo-container');
    const logo = document.querySelector('#floating-logo');
    const placeholder = document.querySelector('#logo-placeholder');
    const navbar = document.querySelector('#navbar');

    // Get the target position from the placeholder
    const updateLogoPosition = () => {
        const rect = placeholder.getBoundingClientRect();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '30% top',
                scrub: 1.2,
                invalidateOnRefresh: true,
            }
        });

        tl.to(logoContainer, {
            top: rect.top + (rect.height / 2),
            left: rect.left + (rect.width / 2),
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.18, // Slightly smaller for a cleaner nav fit
            ease: "power2.inOut"
        }, 0);

        // Animate the logo color from white to Sage Green (#7A937E) and back
        // This filter targets the specific sage-green brand color from a white source
        tl.fromTo(logo, {
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.05)) brightness(0) invert(1)"
        }, {
            filter: "invert(62%) sepia(12%) saturate(452%) hue-rotate(85deg) brightness(88%) contrast(85%)",
            ease: "power2.inOut"
        }, 0);

        // Fade in navbar background and blur
        tl.to(navbar, {
            backgroundColor: "rgba(245, 241, 232, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(125, 155, 125, 0.1)",
            ease: "none"
        }, 0.5);
    };

    window.addEventListener('load', updateLogoPosition);
    window.addEventListener('resize', updateLogoPosition);
    updateLogoPosition();

    // 2. Hero Section Animations (Simplified for instant load)
    gsap.set('.reveal-up, .reveal-left, .reveal-right', { opacity: 1, y: 0, x: 0 });

    // 3. Scroll Reveal Animations (Removed to ensure fast loading as per user request)
    // Only keeping critical parallax/interactivity

    // 4b. Horizontal Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = gsap.utils.toArray('.carousel-slide');
    
    if (track && slides.length) {
        // Simple Horizontal Scroller with GSAP
        gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".gallery-carousel",
                pin: false,
                scrub: 1.5,
                snap: 1 / (slides.length - 1),
                start: "top 80%",
                end: "bottom 20%",
            }
        });

        // Add Draggable for tactile feel
        Draggable.create(track, {
            type: "x",
            bounds: { minX: -track.scrollWidth + window.innerWidth, maxX: 0 },
            inertia: true,
            edgeResistance: 0.65,
            onDrag: function() {
                // Potential for additional scroll-sync logic here
            }
        });
    }

    // 5. Image Parallax Effect
    gsap.utils.toArray('section img').forEach((img) => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -20,
            ease: "none"
        });
    });

    // 6. Contact Form Magic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Message Sent! Thank you.';
                btn.style.backgroundColor = '#2C3E2E';
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 7. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
