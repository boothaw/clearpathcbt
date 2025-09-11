// use a script tag or an external JS file
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
  //   mobileSubMenu();

  lenisSmoothScroll();
  headingFadeIn();
  cardImageFade();
  logoImageFade();

  locationsToggle();
});

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
  //   gsap.set("#locations .image-background-section", {
  //     backgroundSize: "cover",
  //   });
  //   gsap.to("#locations .image-background-section", {
  //     backgroundSize: "110% 110%", // zoom in
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".bg-section",
  //       start: "top 90%",
  //       end: "bottom 10%",
  //       scrub: true,
  //       markers: true,
  //     },
  //   });
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
  const nav = document.querySelector(".mobile-nav .main-navigation");
  const menuButton = document.querySelector(
    ".mobile-nav .menu-toggle.menu-button"
  );
  const menuContainer = document.querySelector(
    ".mobile-nav .main-navigation .menu-main-nav-container"
  );
  const body = document.body;

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
    // body.classList.toggle("nav-open");
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
        // body.classList.toggle("nav-open"); // Removed to match openMenu
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

// function mobileMenu() {
//   const menuButton = document.querySelector(".menu-toggle.menu-button");
//   // Only attach listener once
//   if (!menuButton.dataset.listener) {
//     menuButton.addEventListener("click", () => {
//       console.log("Menu button clicked", menuButton.dataset.listener);
//       gsap.fromTo(
//         ".nav-menu",
//         { height: 0, opacity: 0 },
//         {
//           height: "auto",
//           opacity: 1,
//           duration: 0.6,
//           ease: "power2.inOut",
//         }
//       );
//     });
//     menuButton.dataset.listener = "true";
//   }
// }

// function mobileSubMenu() {
//   const menuItems = document.querySelectorAll(
//     ".mobile-nav li.menu-item-has-children"
//   );

//   console.log("submenu");

//   menuItems.forEach((item) => {
//     if (item.dataset.listener) return; // skip if already initialized

//     const submenu = item.querySelector("ul.sub-menu");
//     console.log("submenu", submenu);
//     if (!submenu) return;

//     // Start hidden and ensure relative positioning
//     gsap.set(submenu, {
//       height: 0,
//       opacity: 0,
//       overflow: "hidden",
//       position: "relative",
//     });

//     // Track open/closed state
//     let isOpen = false;
//     let tween;

//     const toggleSubmenu = (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       // Kill any running tween
//       if (tween) tween.kill();

//       if (!isOpen) {
//         // Close all other open submenus first (optional)
//         // closeAllOtherSubmenus(item);

//         // Expand this submenu
//         tween = gsap.to(submenu, {
//           height: "auto",
//           opacity: 1,
//           duration: 0.5,
//           ease: "power2.out",
//         });
//         item.classList.add("submenu-open");
//       } else {
//         // Collapse this submenu
//         tween = gsap.to(submenu, {
//           height: 0,
//           opacity: 0,
//           duration: 0.3,
//           ease: "power2.inOut",
//         });
//         item.classList.remove("submenu-open");
//       }

//       isOpen = !isOpen;
//     };

//     // Function to close this specific submenu
//     const closeSubmenu = () => {
//       if (isOpen && tween) tween.kill();

//       gsap.to(submenu, {
//         height: 0,
//         opacity: 0,
//         duration: 0.3,
//         ease: "power2.inOut",
//       });

//       item.classList.remove("submenu-open");
//       isOpen = false;
//     };

//     // Store reference to close function for external access
//     item.closeSubmenu = closeSubmenu;

//     // Attach toggle on parent link
//     const parentLink = item.querySelector("a");
//     if (parentLink) {
//       parentLink.addEventListener("click", toggleSubmenu);
//     } else {
//       item.addEventListener("click", toggleSubmenu);
//     }

//     item.dataset.listener = "true"; // mark as initialized
//   });

//   // Helper function to close all other open submenus
//   //   function closeAllOtherSubmenus(currentItem) {
//   //     const allMenuItems = document.querySelectorAll(
//   //       ".mobile-nav li.menu-item-has-children"
//   //     );

//   //     allMenuItems.forEach((item) => {
//   //       if (
//   //         item !== currentItem &&
//   //         item.classList.contains("submenu-open") &&
//   //         item.closeSubmenu
//   //       ) {
//   //         item.closeSubmenu();
//   //       }
//   //     });
//   //   }
// }
