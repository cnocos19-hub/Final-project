// ============================================
//  CHARLES L. NOCOS — PORTFOLIO JS
// ============================================

// ── 1. PROJECT DATA ──────────────────────────
const projects = [
  {
    title: "Personal Portfolio",
    description: "A personal portfolio website built as my Final Project for Web Development class.",
    image: "portfolio.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/cnocos19-hub/Final-project",
    live: "#"
  },
  {
    title: "TechNIk Solutions",
    description: "A project sample about a web with a separate style for CSS.",
    image: "technik.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/cnocos19-hub/ITPC100-MIDTERM-NOCOS",
    live: "#"
  },
  {
    title: "Announcement Board",
    description: "An announcement board where you can post and view announcements in real time.",
    image: "announcement.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/cnocos19-hub/announcement-board",
    live: "#"
  }
];

// ── 2. SKILLS DATA ───────────────────────────
const skills = [
  { name: "HTML5",      icon: "fab fa-html5" },
  { name: "CSS3",       icon: "fab fa-css3-alt" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "GitHub",     icon: "fab fa-github" },
  
];

// ── 3. RENDER PROJECTS ───────────────────────
function renderProjects() {
  const grid = document.getElementById("projectsGrid");

  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const tagsHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join("");
    const liveBtn  = project.live !== "#"
      ? `<a href="${project.live}" target="_blank" class="card-btn live">Live →</a>`
      : "";

    card.innerHTML = `
      <div class="card-img">
        <img src="${project.image}" alt="${project.title}"
          onerror="this.parentElement.innerHTML='<div class=img-fallback>${project.title}</div>'" />
      </div>
      <div class="card-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${tagsHTML}</div>
        <div class="card-links">
          <a href="${project.github}" target="_blank" class="card-btn">GitHub →</a>
          ${liveBtn}
        </div>
      </div>
    `;

    card.style.transitionDelay = `${index * 0.15}s`;
    grid.appendChild(card);
  });
}

// ── 4. RENDER SKILLS ─────────────────────────
function renderSkills() {
  const grid = document.getElementById("skillsGrid");

  skills.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
    grid.appendChild(card);
  });
}

// ── 5. PRELOADER ─────────────────────────────
function initPreloader() {
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader.classList.add("hide"), 600);
  });
}

// ── 6. HAMBURGER MENU ────────────────────────
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ── 7. NAVBAR SCROLL EFFECT ──────────────────
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ── 8. ACTIVE NAV LINK ───────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section, footer");
  const links    = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute("id");
      }
    });
    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
  });
}

// ── 9. SCROLL REVEAL ─────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal, .project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ── 10. BACK TO TOP ──────────────────────────
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── 11. CONTACT FORM ─────────────────────────
function initContactForm() {
  const form = document.getElementById("contactForm");
  const msg  = document.getElementById("formMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = document.getElementById("nameInput").value.trim();
    const email   = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    if (!name || !email || !message) {
      msg.textContent = "Please fill in all fields.";
      msg.className = "form-msg error";
      return;
    }

    msg.textContent = `Thanks, ${name}! Your message has been received.`;
    msg.className = "form-msg success";
    form.reset();

    setTimeout(() => { msg.textContent = ""; }, 5000);
  });
}

// ── 12. INIT ALL ─────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  renderProjects();
  renderSkills();
  initHamburger();
  initNavbarScroll();
  initActiveNav();
  initBackToTop();
  initContactForm();
  setTimeout(initScrollReveal, 100);
});