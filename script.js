import { animate, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    initPageAnimations();
    initScrollAnimations();
    initImageModal();
} else {
    initImageModal();
}

function initPageAnimations() {
    animate(".custom-navbar", {
        translateY: [-24, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "outExpo"
    });

    animate(".hero-content > *", {
        translateY: [24, 0],
        opacity: [0, 1],
        delay: stagger(90, { start: 200 }),
        duration: 850,
        ease: "outExpo"
    });

    animate(".hero-img", {
        scale: [0.92, 1],
        opacity: [0, 1],
        rotate: [-2, 0],
        delay: 450,
        duration: 950,
        ease: "outExpo"
    });

    animate(".hero-mini-info span", {
        translateY: [14, 0],
        opacity: [0, 1],
        delay: stagger(80, { start: 650 }),
        duration: 650,
        ease: "outExpo"
    });

    animate(".social-links a", {
        scale: [0.7, 1],
        opacity: [0, 1],
        delay: stagger(70, { start: 820 }),
        duration: 600,
        ease: "outBack"
    });
}

function initScrollAnimations() {
    const revealItems = document.querySelectorAll(
        ".custom-card, .timeline-item, .gallery-card, .section-title, .section-intro"
    );

    revealItems.forEach((item) => {
        item.classList.add("is-hidden");
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const element = entry.target;
                element.classList.remove("is-hidden");
                element.classList.add("is-visible");

                animate(element, {
                    translateY: [28, 0],
                    opacity: [0, 1],
                    duration: 780,
                    ease: "outExpo"
                });

                obs.unobserve(element);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));

    const skillSections = document.querySelectorAll(".skills-grid");

    skillSections.forEach((section) => {
        const chips = section.querySelectorAll(".skill-chip");

        const skillObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animate(chips, {
                        translateY: [18, 0],
                        opacity: [0, 1],
                        delay: stagger(55),
                        duration: 600,
                        ease: "outExpo"
                    });

                    obs.unobserve(section);
                });
            },
            {
                threshold: 0.22
            }
        );

        skillObserver.observe(section);
    });
}

function initImageModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const galleryImages = document.querySelectorAll(".gallery-img");
    const closeModal = document.querySelector(".close-modal");

    if (!modal || !modalImg || !closeModal) return;

    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            modal.classList.add("active");
            modalImg.src = img.src;
            modalImg.alt = img.alt;

            if (!prefersReducedMotion) {
                animate(modalImg, {
                    scale: [0.96, 1],
                    opacity: [0, 1],
                    duration: 350,
                    ease: "outExpo"
                });
            }
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modal.classList.remove("active");
        }
    });
}