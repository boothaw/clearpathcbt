// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin
  );
  // gsap code here!

  lenisSmoothScroll();
  headingFadeIn();
  cardImageFade();
  logoImageFade();
  //   textFadeIn();

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

  console.log(buttons);

  const images = [
    themeURL + "/wp-content/uploads/2025/08/Location-Washington.png",
    themeURL + "/wp-content/uploads/2025/08/Location-California.png",
    themeURL + "/wp-content/uploads/2025/08/Location-Alaska.png",
  ];

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      const index = buttonsArray.indexOf(btn);

      console.log(index);

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
