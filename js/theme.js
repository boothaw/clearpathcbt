// use a script tag or an external JS file
if (!window.gsapInitialized) {
  window.gsapInitialized = true;

  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      // ScrollToPlugin,
      SplitText,
      TextPlugin
    );
    // gsap code here!

    desktopMenu();
    mobileMenu();
    subMenus();
    //   mobileSubMenu();

    lenisSmoothScroll();
    headingFadeIn();
    cardImageFade();
    logoImageFade();

    locationsToggle();

    bgImageFade();
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
  const texts = document.querySelectorAll("h2, h3, h4, .accordion-header-text");

  texts.forEach((text) => {
    let split = new SplitText(text, { type: "words" });

    gsap.from(split.words, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      delay: i * 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text,
        start: "top 95%", // when element enters viewport
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

function bgImageFade() {
  const section = ".multi-image-background-section";

  // Make sure background is set to cover and center
  gsap.set(section, {
    backgroundSize: "100%", // start at normal size
    backgroundPosition: "center center",
  });

  gsap.to(section, {
    backgroundSize: "110%", // zoom to 110%
    ease: "none",
    scrollTrigger: {
      trigger: section, // animate when this section scrolls
      start: "10% 90%", // when top of section hits bottom of viewport
      end: "bottom top", // when bottom of section hits top of viewport
      scrub: true,
      //   markers: true,
    },
  });
}

function locationsToggle() {
  const themeURL = theme_data.template_uri;

  //   console.log(themeURL, "theme");

  const imageArea = document.querySelector(
    "#locations .image-background-section"
  );

  const buttons = document.querySelectorAll("#locations .wp-block-button");
  //   const backgrounds = document.querySelectorAll(".image-area .bg");
  const buttonsArray = Array.from(buttons);

  const images = [
    themeURL + "/wp-content/uploads/2025/08/Location-Washington.png",
    themeURL + "/wp-content/uploads/2025/08/Location-California.png",
    themeURL + "/wp-content/uploads/2025/08/Location-Alaska.png",
  ];

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      const index = buttonsArray.indexOf(btn);

      // fade out, change image, then fade back in
      gsap.to(imageArea, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          imageArea.style.backgroundImage = `url(${images[index]})`;
          gsap.to(imageArea, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          });
        },
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
    gsap.set(submenu, { height: 0, opacity: 0, overflow: "hidden" });
    let openTween;
    item.addEventListener("mouseenter", () => {
      // Kill any running animation
      if (openTween) openTween.kill();
      openTween = gsap.to(submenu, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
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
  console.log("mobile");
  if (document.querySelector(".mobile-nav")) {
    const nav = document.querySelector(".mobile-nav .main-navigation");
    const menuButton = document.querySelector(
      ".mobile-nav .menu-toggle.menu-button"
    );
    const menuContainer = document.querySelector(
      ".mobile-nav .main-navigation .menu-main-nav-container"
    );

    // Set initial state
    gsap.set(menuContainer, { height: 0, opacity: 0, overflow: "hidden" });

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
          e.preventDefault();
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
