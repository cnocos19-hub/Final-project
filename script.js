// ============================================
//  PORTFOLIO JAVASCRIPT BACKBONE
// ============================================

// ── 1. PROJECT DATA ──────────────────────────
const projects = [
  {
    title: "Personal Portfolio",
    description: "A personal portfolio website built as my Final Project for Web Development class.",
    image: "portfolio.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/cnocos19-hub/portfolio",
    live: "#"
  },
  {
    title: "TechNIk Solutions",
    description: "A project sample about a web with a separate style for CSS",
    image: "technik.jpg",
    tags: ["HTML", "CSS"],
    github: "https://github.com/cnocos19-hub/ITPC100-MIDTERM-NOCOS",
    live: "#"
  },
  {
    title: "Annoncement Board",
    description: "A Announcemnet board that will tell or show you and you can make some announcenet",
    image: "announcement.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/cnocos19-hub/announcement-board",
    live: "#"
  }
];

// ── 2. SKILLS DATA ───────────────────────────
const skills = ["HTML", "CSS", "JavaScript", "Git"];

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
        <h3>${project.title}<br><small style="font-weight:normal;color:#aaa;font-size:0.75rem;">div class="card"</small></h3>
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
  const list = document.getElementById("skillsList");
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="badge">${skill}</span>`;
    list.appendChild(li);
  });
}

// ── 5. HAMBURGER MENU ────────────────────────
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });
}

// ── 6. NAVBAR SCROLL EFFECT ──────────────────
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ── 7. ACTIVE NAV LINK ───────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section, footer");
  const links    = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.getAttribute("id");
      }
    });
    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
    });
  });
}

// ── 8. SCROLL REVEAL ─────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal, .project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ── 9. INIT ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initHamburger();
  initNavbarScroll();
  initActiveNav();
  setTimeout(initScrollReveal, 100);
});