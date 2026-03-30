/* ============================================================
   script.js - Portfolio Vanilla JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. NAVBAR SCROLL EFFECT
  ------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavScroll, { passive: true });

  /* -------------------------------------------------------
     2. ACTIVE NAV LINK (spy on scroll)
  ------------------------------------------------------- */
  const sections = ["introduction", "profile", "work-process", "portfolio", "contact"];
  const allNavLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavLink = () => {
    let current = "";
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 160) {
          current = id;
        }
      }
    });

    allNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === current) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  /* -------------------------------------------------------
     3. SMOOTH SCROLL for all anchor links
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || href === "#!") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 140;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });

        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobileMenu");
        mobileMenu.classList.remove("open");
      }
    });
  });

  /* -------------------------------------------------------
     4. MOBILE HAMBURGER MENU
  ------------------------------------------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("open");
    }
  });

  /* -------------------------------------------------------
     7. WORK STEP HOVER (icon color change)
  ------------------------------------------------------- */
  document.querySelectorAll(".work-step").forEach((step) => {
    const svgPaths = step.querySelectorAll(".step-svg path");

    step.addEventListener("mouseenter", () => {
      svgPaths.forEach((p) => p.setAttribute("fill", "#ffffff"));
    });

    step.addEventListener("mouseleave", () => {
      svgPaths.forEach((p) => p.setAttribute("fill", "#A53DFF"));
    });
  });

  /* -------------------------------------------------------
     8. SCROLL TO TOP BUTTON
  ------------------------------------------------------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* -------------------------------------------------------
     9. FOOTER COPYRIGHT YEAR
  ------------------------------------------------------- */
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------
     10. CONTACT FORM VALIDATION
  ------------------------------------------------------- */
  const form = document.getElementById("contactForm");

  if (form) {
    const fields = [
      { id: "formName", errorId: "nameError", label: "Name" },
      { id: "formEmail", errorId: "emailError", label: "Email" },
      { id: "formSubject", errorId: "subjectError", label: "Subject" },
      { id: "formMessage", errorId: "messageError", label: "Message" },
    ];

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const showError = (field, msg) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(field.errorId);
      input.classList.add("error");
      if (errEl) errEl.textContent = msg;
    };

    const clearError = (field) => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(field.errorId);
      input.classList.remove("error");
      if (errEl) errEl.textContent = "";
    };

    // Live validation
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (input) {
        input.addEventListener("input", () => {
          const value = input.value.trim();
          if (!value) {
            showError(field, `${field.label} is required.`);
          } else if (field.id === "formEmail" && !isValidEmail(value)) {
            showError(field, "Please enter a valid email.");
          } else {
            clearError(field);
          }
        });
      }
    });

    let submitted = false;

    // Listen to iframe load event to know when Google has received the post
    const hiddenIframe = document.getElementById("hidden_iframe");
    if (hiddenIframe) {
      hiddenIframe.addEventListener("load", function() {
        if (submitted) {
          // Show the success message
          const successMsg = document.getElementById("successMsg");
          if (successMsg) {
            successMsg.style.display = "block";
            successMsg.textContent = "Message Sent Successfully ✅";

            // Hide after 5 seconds and change button text
            setTimeout(() => {
              successMsg.style.display = "none";
              
              // Change button text to indicate they can submit again
              const submitText = document.getElementById("submitBtnText");
              if (submitText) {
                submitText.textContent = "Submit another query";
              }
            }, 5000);
          }
          
          form.reset();
          fields.forEach((f) => clearError(f));
          submitted = false; // reset flag
        }
      });
    }

    form.addEventListener("submit", (e) => {
      let valid = true;

      fields.forEach((field) => {
        const input = document.getElementById(field.id);
        if (!input) return;
        const value = input.value.trim();

        if (!value) {
          showError(field, `${field.label} is required.`);
          valid = false;
        } else if (field.id === "formEmail" && !isValidEmail(value)) {
          showError(field, "Please enter a valid email.");
          valid = false;
        } else {
          clearError(field);
        }
      });

      if (!valid) {
        e.preventDefault(); // Stop form submission if invalid
      } else {
        submitted = true; // Let it submit natively to the hidden iframe!
      }
    });
  }

  /* -------------------------------------------------------
     11. ADDRESS ITEM ICON HOVER EFFECT
  ------------------------------------------------------- */
  document.querySelectorAll(".address-item").forEach((item) => {
    const iconWrap = item.querySelector(".address-icon-wrap");

    item.addEventListener("mouseenter", () => {
      iconWrap.style.backgroundColor = "var(--picto-primary)";
      iconWrap.style.color = "#fff";
    });

    item.addEventListener("mouseleave", () => {
      iconWrap.style.backgroundColor = "rgba(237, 216, 255, 0.5)";
      iconWrap.style.color = "var(--picto-primary)";
    });
  });

  /* -------------------------------------------------------
     12. MARQUEE: ensure seamless by duplicating on narrow
  ------------------------------------------------------- */
  // Marquee animation is handled by CSS (50% translate on duplicated content)

});
