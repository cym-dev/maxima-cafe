// Maxima Cafe JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Loading animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
      }
    });
  }, observerOptions);

  // Observe elements for loading animation
  const elementsToAnimate = document.querySelectorAll(
    ".menu-item, .gallery-item, .feature-item, .contact-item"
  );
  elementsToAnimate.forEach(el => {
    el.classList.add("loading");
    observer.observe(el);
  });

  // Contact form submission
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[placeholder="Your Name"]').value;
      const email = this.querySelector('input[placeholder="Your Email"]').value;
      const subject = this.querySelector('input[placeholder="Subject"]').value;
      const message = this.querySelector("textarea").value;

      // Simple validation
      if (!name || !email || !message) {
        showAlert("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address.", "error");
        return;
      }

      // Show success message (in a real application, you would send this to a server)
      showAlert(
        "Thank you for your message! We will get back to you soon.",
        "success"
      );
      this.reset();
    });
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Alert function
  function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector(".custom-alert");
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement("div");
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
            <div class="alert-content">
                <span>${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;

    // Add styles
    alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#28a745" : "#dc3545"};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
      alert.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 300);
    }, 5000);

    // Close button functionality
    alert.querySelector(".alert-close").addEventListener("click", () => {
      alert.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 300);
    });
  }

  // Add CSS animations for alerts
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
            padding: 0;
            line-height: 1;
        }
        
        .alert-close:hover {
            opacity: 0.7;
        }
    `;
  document.head.appendChild(style);

  // Scroll to top button
  const scrollTopBtn = document.createElement("div");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Scroll to top functionality
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Gallery image modal (simple implementation)
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach(item => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const modal = createImageModal(img.src, img.alt);
      document.body.appendChild(modal);
    });
  });

  function createImageModal(src, alt) {
    const modal = document.createElement("div");
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;

    modal.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%;">
                <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border-radius: 10px;">
                <button style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">&times;</button>
            </div>
        `;

    modal.addEventListener("click", function () {
      modal.remove();
    });

    return modal;
  }

  // Menu filter animation
  const menuTabs = document.querySelectorAll("#menuTabs button");
  const menuContent = document.querySelectorAll(".tab-pane");

  menuTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      // Add fade effect to menu items
      const activePane = document.querySelector(
        this.getAttribute("data-bs-target")
      );
      if (activePane) {
        const menuItems = activePane.querySelectorAll(".menu-item");
        menuItems.forEach((item, index) => {
          item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero-section");
    const speed = scrolled * 0.5;

    if (parallax) {
      parallax.style.backgroundPosition = `center ${speed}px`;
    }
  });

  // Counter animation for statistics (if you want to add them later)
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);

      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // Preloader (optional)
  const preloader = document.createElement("div");
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #023D27;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;

  preloader.innerHTML = `
        <div style="text-align: center; color: #6D814A;">
            <i class="fas fa-coffee fa-3x fa-spin"></i>
            <h3 style="margin-top: 20px; font-family: 'Playfair Display', serif;">Loading Maxima Cafe...</h3>
        </div>
    `;
  document.body.appendChild(preloader);

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });

  // Mobile menu close on link click
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });

  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  console.log("Maxima Cafe website loaded successfully! ☕");
});
