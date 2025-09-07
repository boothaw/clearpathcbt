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
  headingfadeIn();
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

function headingfadeIn() {
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
