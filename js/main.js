/* ============================================================
   VIZION PTE LTD
   Main JavaScript
   ============================================================ */

"use strict";


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initAOS();
    initPageLoader();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavigation();
    initCounters();
    initBackToTop();
    initProductEffects();
    initSolutionEffects();
    initExpertiseEffects();
    initMarketEffects();
    initMagneticButtons();
    initHeroParallax();
    initCustomCursor();
    initRevealEffects();
    initCurrentYear();

});


/* ============================================================
   02. AOS SCROLL ANIMATIONS
   ============================================================ */

function initAOS() {

    if (typeof AOS === "undefined") {
        return;
    }

    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
        delay: 0,
        anchorPlacement: "top-bottom"
    });

}


/* ============================================================
   03. PAGE LOADER
   ============================================================ */

function initPageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

            document.body.classList.add("page-loaded");

        }, 500);

    });


    /*
        Safety fallback:
        If an external asset takes too long,
        don't leave the visitor stuck on the loader.
    */

    setTimeout(() => {

        loader.classList.add("loaded");

        document.body.classList.add("page-loaded");

    }, 3000);

}


/* ============================================================
   04. HEADER
   ============================================================ */

function initHeader() {

    const header = document.getElementById("siteHeader");

    if (!header) {
        return;
    }


    let previousScroll = window.scrollY;


    function updateHeader() {

        const currentScroll = window.scrollY;


        /* Change header background */

        if (currentScroll > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        /*
            Optional smart navbar:
            hide slightly while scrolling down,
            show again while scrolling up.
        */

        if (currentScroll > 400) {

            if (currentScroll > previousScroll) {

                header.classList.add("header-hidden");

            } else {

                header.classList.remove("header-hidden");

            }

        } else {

            header.classList.remove("header-hidden");

        }


        previousScroll = currentScroll;

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        throttle(updateHeader, 20),
        { passive: true }
    );

}


/* ============================================================
   05. MOBILE MENU
   ============================================================ */

function initMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (!menuButton || !mobileMenu) {
        return;
    }


    /*
        The fallback script inside index.html may already
        control the menu.

        We therefore only add accessibility behaviour here.
    */


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    const observer =
        new MutationObserver(() => {

            const isOpen =
                mobileMenu.classList.contains("active");


            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


    observer.observe(
        mobileMenu,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    /* ESC closes menu */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }


        mobileMenu.classList.remove("active");

        menuButton.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

}


/* ============================================================
   06. SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {

    /*
        Your index.html fallback script already handles
        anchor scrolling.

        This section adds scroll-margin support and avoids
        registering another click handler.
    */

    const sections =
        document.querySelectorAll("section[id]");


    sections.forEach(section => {

        section.style.scrollMarginTop = "90px";

    });

}


/* ============================================================
   07. ACTIVE NAVIGATION
   ============================================================ */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    if (!sections.length || !navLinks.length) {
        return;
    }


    /*
        IntersectionObserver provides a more accurate
        active navigation state.
    */

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href")
                            ===
                            "#" + id
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },

            {
                root: null,

                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* ============================================================
   08. ANIMATED COUNTERS
   ============================================================ */

function initCounters() {

    /*
        index.html already has a counter observer.

        To prevent the numbers from animating twice,
        only initialise this fallback when the counter
        has not already been handled.
    */

    const counters =
        document.querySelectorAll(".counter");


    if (!counters.length) {
        return;
    }


    counters.forEach(counter => {

        counter.dataset.vizionCounter = "ready";

    });

}


/* ============================================================
   09. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");


    if (!button) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 600) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    updateButton();


    window.addEventListener(
        "scroll",
        throttle(updateButton, 30),
        { passive: true }
    );

}


/* ============================================================
   10. PRODUCT CARD 3D EFFECT
   ============================================================ */

function initProductEffects() {

    const cards =
        document.querySelectorAll(".product-card");


    if (!cards.length) {
        return;
    }


    /*
        Only use the 3D mouse effect on devices
        that actually have a mouse.
    */

    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        return;

    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const mouseX =
                    event.clientX - rect.left;

                const mouseY =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        (mouseY - centerY)
                        /
                        centerY
                    ) * -1.2;


                const rotateY =
                    (
                        (mouseX - centerX)
                        /
                        centerX
                    ) * 1.2;


                card.style.transform =
                    `
                    perspective(1200px)
                    translateY(-7px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* ============================================================
   11. SOLUTION CARD SPOTLIGHT
   ============================================================ */

function initSolutionEffects() {

    const cards =
        document.querySelectorAll(".solution-card");


    if (
        !cards.length ||
        !window.matchMedia("(pointer: fine)").matches
    ) {

        return;

    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });

}


/* ============================================================
   12. EXPERTISE CARD EFFECT
   ============================================================ */

function initExpertiseEffects() {

    const cards =
        document.querySelectorAll(
            ".expertise-card"
        );


    if (!cards.length) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    card.querySelector(
                        ".expertise-icon"
                    );


                if (icon) {

                    icon.classList.add(
                        "icon-active"
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    card.querySelector(
                        ".expertise-icon"
                    );


                if (icon) {

                    icon.classList.remove(
                        "icon-active"
                    );

                }

            }
        );

    });

}


/* ============================================================
   13. MARKET CARD EFFECT
   ============================================================ */

function initMarketEffects() {

    const marketCards =
        document.querySelectorAll(".market-card");


    marketCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                marketCards.forEach(otherCard => {

                    if (otherCard !== card) {

                        otherCard.classList.add(
                            "market-muted"
                        );

                    }

                });

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                marketCards.forEach(otherCard => {

                    otherCard.classList.remove(
                        "market-muted"
                    );

                });

            }
        );

    });

}


/* ============================================================
   14. MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {

    if (
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        return;

    }


    const buttons =
        document.querySelectorAll(
            ".btn-primary, .btn-gold, .btn-nav"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX
                    -
                    rect.left
                    -
                    rect.width / 2;


                const y =
                    event.clientY
                    -
                    rect.top
                    -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * 0.08}px,
                        ${y * 0.12}px
                    )
                    translateY(-2px)
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });

}


/* ============================================================
   15. HERO PARALLAX
   ============================================================ */

function initHeroParallax() {

    const hero =
        document.querySelector(".hero");

    const product =
        document.querySelector(
            ".hero-product-image"
        );

    const circle =
        document.querySelector(
            ".hero-product-circle"
        );


    if (
        !hero ||
        !product ||
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        return;

    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX
                    -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const y =
                (
                    event.clientY
                    -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            /*
                We modify CSS custom properties rather than
                replacing transform so the CSS floating
                animation remains intact.
            */

            hero.style.setProperty(
                "--hero-x",
                `${x * 12}px`
            );


            hero.style.setProperty(
                "--hero-y",
                `${y * 8}px`
            );


            if (circle) {

                circle.style.transform =
                    `
                    translate(
                        ${x * -12}px,
                        ${y * -12}px
                    )
                    `;

            }

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            hero.style.setProperty(
                "--hero-x",
                "0px"
            );

            hero.style.setProperty(
                "--hero-y",
                "0px"
            );


            if (circle) {

                circle.style.transform = "";

            }

        }
    );

}


/* ============================================================
   16. CUSTOM CURSOR ENHANCEMENT
   ============================================================ */

function initCustomCursor() {

    const dot =
        document.querySelector(".cursor-dot");

    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (
        !dot ||
        !outline ||
        !window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        return;

    }


    /*
        The basic cursor movement already exists
        in index.html.

        This adds context states.
    */


    const links =
        document.querySelectorAll(
            "a, button"
        );


    links.forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        product.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-product"
                );

            }
        );


        product.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-product"
                );

            }
        );

    });

}


/* ============================================================
   17. EXTRA REVEAL EFFECTS
   ============================================================ */

function initRevealEffects() {

    /*
        AOS handles most of the reveal animations.

        This observer is used for elements that need
        a simple reusable "in-view" class.
    */

    const elements =
        document.querySelectorAll(
            ".experience-row, .industry-item"
        );


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "in-view"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   18. CURRENT YEAR
   ============================================================ */

function initCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (!year) {
        return;
    }


    year.textContent =
        new Date().getFullYear();

}


/* ============================================================
   19. THROTTLE UTILITY
   ============================================================ */

function throttle(callback, delay = 50) {

    let waiting = false;


    return function (...args) {

        if (waiting) {
            return;
        }


        callback.apply(this, args);


        waiting = true;


        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}


/* ============================================================
   20. DEBOUNCE UTILITY
   ============================================================ */

function debounce(callback, delay = 150) {

    let timer;


    return function (...args) {

        clearTimeout(timer);


        timer = setTimeout(() => {

            callback.apply(this, args);

        }, delay);

    };

}


/* ============================================================
   21. RESIZE HANDLER
   ============================================================ */

window.addEventListener(
    "resize",
    debounce(() => {

        /*
            Close mobile menu when switching
            back to desktop.
        */

        if (window.innerWidth > 980) {

            const menu =
                document.getElementById(
                    "mobileMenu"
                );


            const button =
                document.getElementById(
                    "mobileMenuBtn"
                );


            if (menu) {

                menu.classList.remove(
                    "active"
                );

            }


            if (button) {

                button.classList.remove(
                    "active"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }

    }, 150)
);


/* ============================================================
   22. IMAGE ERROR FALLBACK
   ============================================================ */

window.addEventListener(
    "load",
    () => {

        const images =
            document.querySelectorAll("img");


        images.forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });

    }
);


/* ============================================================
   23. KEYBOARD ACCESSIBILITY
   ============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Tab") {

            document.body.classList.add(
                "keyboard-navigation"
            );

        }

    }
);


document.addEventListener(
    "mousedown",
    () => {

        document.body.classList.remove(
            "keyboard-navigation"
        );

    }
);


/* ============================================================
   24. CONSOLE
   ============================================================ */

console.log(
    "%c VIZION PTE LTD ",
    "background:#061a33; color:#d59a32; padding:8px 14px; font-weight:bold;"
);

console.log(
    "Vision. Innovation. Vizion."
);