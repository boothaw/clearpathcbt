// use a script tag or an external JS file
if (!window.gsapInitialized) {
  window.gsapInitialized = true;

  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      SplitText,
      TextPlugin
    );
    // gsap code here!

    function setupResponsiveNavigation() {
      const mediaQuery = window.matchMedia("(min-width: 1200px)");

      const deskopNav = document.querySelector(".desktop-nav");
      function handleMediaChange(e) {
        if (e.matches) {
          // Desktop view (1200px+)
          console.log("desktop", typeof deskopNav);
          if (typeof deskopNav !== "undefined" && deskopNav) {
            desktopMenu();
          }
        } else {
          // Mobile view (less than 1200px)
          console.log("mobile");
          if (typeof mobileMenu === "function") {
            mobileMenu();
            subMenus();
          }
        }
      }

      // Run initially
      handleMediaChange(mediaQuery);

      // Listen for changes
      mediaQuery.addListener(handleMediaChange);
    }

    setupResponsiveNavigation();

    // desktopMenu();
    // mobileMenu();
    // subMenus();
    //   mobileSubMenu();
    // handleMenu();

    lenisSmoothScroll();
    headingFadeIn();
    cardImageFade();
    logoImageFade();

    locationsToggle();
    therapiesToggle();

    locationsImageFade();
    locationScroll();
  });
}

function lenisSmoothScroll() {
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);
}

function headingFadeIn() {
  const texts = document.querySelectorAll(
    "h2, h3:not(.card-title), h4, .accordion-header-text"
  );

  texts.forEach((text) => {
    // Skip SplitText entirely and manually create the line div
    const originalText = text.textContent;
    const lineDiv = document.createElement("div");
    lineDiv.className = "line";
    lineDiv.textContent = originalText;
    lineDiv.style.cssText = `
		position: relative;
		display: block;
		text-align: inherit;
		opacity: 0;
		transform: translateY(20px);
	  `;

    text.innerHTML = "";
    text.appendChild(lineDiv);

    gsap.to(lineDiv, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.3,
      delay: i * 0.01,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
  });
}

function cardImageFade() {
  const images = document.querySelectorAll(".card-item img");

  images.forEach((image, index) => {
    // gsap.set(image, { scale: 0.5 });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "top 95%",
        // end: "top 20%",
        scrub: false,
      },
      delay: index * 0.2, // Stagger delay between different images
    });

    tl.fromTo(
      image,
      {
        scale: 1,
        transformOrigin: "center center", // Ensure scaling from center
      },
      {
        scale: 2, // Scale to 120% (adjust as needed)
        ease: "power2.inOut",
        duration: 0.3,
      }
    ).to(image, {
      scale: 1,
      ease: "power2.inOut",
      duration: 0.3,
    });
  });
}

function logoImageFade() {
  const images = document.querySelectorAll(
    ".accordion-columns .midnight-card img"
  );

  images.forEach((image, index) => {
    // gsap.set(image, { scale: 0.5 });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "top 85%",
        // end: "top 20%",
        scrub: false,
      },
      delay: index * 0.2, // Stagger delay between different images
    });

    tl.fromTo(
      image,
      {
        scale: 1,
        transformOrigin: "center center", // Ensure scaling from center
      },
      {
        scale: 1.1, // Scale to 120% (adjust as needed)
        ease: "power2.inOut",
        duration: 0.5,
      }
    ).to(image, {
      scale: 1,
      ease: "power2.inOut",
      duration: 0.5,
    });
  });
}

function locationScroll() {
  const scrollButtons = Array.from(document.querySelectorAll("a")).filter(
    (link) => {
      return link.textContent.includes("Areas We Serve"); // Or startsWith(), endsWith(), or a regex test
    }
  );

  scrollButtons.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default jump

      const targetId = link.getAttribute("href"); // "#locations"
      const target = document.querySelector(targetId);

      if (target) {
        // Check screen size and decide offset
        const isDesktop = window.matchMedia("(min-width: 1200px)").matches;
        const offsetY = isDesktop ? 0 : 80;

        gsap.to(window, {
          duration: 0.5, // scroll duration in seconds (adjust for speed)
          scrollTo: { y: target, offsetY },
          ease: "power3.out", // smooth easing
        });
      }
    });
  });
}

function locationsImageFade() {
  const sections = document.querySelectorAll(".multi-image-background-section");

  sections.forEach((section) => {
    // Step 1: Set up initial state
    section.style.backgroundSize = "cover";
    section.style.backgroundPosition = "center center";
    section.style.willChange = "transform";
    section.style.transform = "translateZ(0)";

    // Step 2: Small repaint hack for iOS
    section.offsetHeight;

    // Step 3: Set initial scale and animate
    gsap.set(section, { scale: 1.05 });

    gsap.to(section, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "10% 90%",
        end: "bottom 10%",
        scrub: true,
        // markers: true,
      },
    });
  });
}

function locationsToggle() {
  const buttons = document.querySelectorAll("#locations .wp-block-button");
  const images = document.querySelectorAll(
    "#locations .multi-image-background-section"
  );
  const buttonsArray = Array.from(buttons);

  // Hide all images, show the first one (optional)
  gsap.set(images, { autoAlpha: 0 });
  gsap.set(images[0], { autoAlpha: 1 });

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      const index = buttonsArray.indexOf(btn);

      // Fade out all others
      gsap.to(images, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Fade in the one hovered — at the same time
      gsap.to(images[index], {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });
  });
}

function therapiesToggle() {
  const buttons = document.querySelectorAll("#therapies .wp-block-button");
  const images = document.querySelectorAll(
    "#therapies .multi-image-background-section"
  );
  const buttonsArray = Array.from(buttons);

  // Hide all images, show the first one (optional)
  gsap.set(images, { autoAlpha: 0 });
  gsap.set(images[0], { autoAlpha: 1 });

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      const index = buttonsArray.indexOf(btn);

      // Fade out all others
      gsap.to(images, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Fade in the one hovered — at the same time
      gsap.to(images[index], {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });
  });
}

function desktopMenu() {
  const menuItems = document.querySelectorAll(
    ".desktop-nav li.menu-item-has-children"
  );
  menuItems.forEach((item) => {
    const submenu = item.querySelector("ul.sub-menu");
    if (!submenu) return;
    // Set initial state
    // gsap.set(submenu, { height: 0, opacity: 0, overflow: "hidden" });
    let openTween;
    item.addEventListener("mouseenter", () => {
      // Kill any running animation
      if (openTween) openTween.kill();
      openTween = gsap.to(submenu, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        // ease: "power2.out",
      });
    });
    item.addEventListener("mouseleave", () => {
      if (openTween) openTween.kill();
      openTween = gsap.to(submenu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  });
}

function mobileMenu() {
  if (document.querySelector(".mobile-nav .main-navigation")) {
    const nav = document.querySelector(".mobile-nav .main-navigation");
    const menuButton = document.querySelector(
      ".mobile-nav .menu-toggle.menu-button"
    );
    const menuContainer = document.querySelector(
      ".mobile-nav .main-navigation .menu-main-nav-container"
    );

    // Set initial state
    // gsap.set(menuContainer, { height: 0, opacity: 0, overflow: "hidden" });

    let anim = null;

    function openMenu() {
      if (anim) anim.kill();
      anim = gsap.to(menuContainer, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      nav.classList.add("toggled");
      menuButton.classList.add("button-toggled");
      menuButton.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      if (anim) anim.kill();
      anim = gsap.to(menuContainer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          nav.classList.remove("toggled");
          menuButton.classList.remove("button-toggled");
          menuButton.setAttribute("aria-expanded", "false");
        },
      });
    }

    if (!menuButton.dataset.listener) {
      menuButton.addEventListener("click", (e) => {
        console.log("click", e);
        e.preventDefault();
        e.stopPropagation();

        if (nav.classList.contains("toggled")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Outside click closes the menu
      document.addEventListener("click", (event) => {
        const isClickInside = nav.contains(event.target);
        if (!isClickInside && nav.classList.contains("toggled")) {
          closeMenu();
        }
      });

      menuButton.dataset.listener = "true";
    }
  }
}

function subMenus() {
  if (document.querySelector(".mobile-nav")) {
    const parentMenus = document.querySelectorAll(
      ".mobile-nav .menu-item-has-children"
    );
    const subMenus = document.querySelectorAll(
      ".mobile-nav .menu-item-has-children .sub-menu"
    );
    // Set initial state
    subMenus.forEach((sub) => {
      gsap.set(sub, { height: 0, opacity: 0, overflow: "hidden" });
    });

    let anim = null;

    function openMenu(parentMenu) {
      let sub = parentMenu.querySelector(".sub-menu");

      if (anim) anim.kill();
      anim = gsap.to(sub, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      parentMenu.classList.add("sub-open");
    }

    function closeMenu(parentMenu) {
      let sub = parentMenu.querySelector(".sub-menu");

      if (anim) anim.kill();
      anim = gsap.to(sub, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          parentMenu.classList.remove("sub-open");
        },
      });
    }

    parentMenus.forEach((parentMenu) => {
      if (!parentMenu.dataset.listener) {
        parentMenu.addEventListener("click", (e) => {
          //   e.preventDefault();
          e.stopPropagation();

          if (parentMenu.classList.contains("sub-open")) {
            closeMenu(parentMenu);
          } else {
            openMenu(parentMenu);
          }
        });
      }
    });
  }
}
