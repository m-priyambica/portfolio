/* =========================================================
   Portfolio - M. Priyambica
   ES6+: const/let, arrow functions, arrays/objects,
   conditions/loops, DOM manipulation, event handling,
   form validation.
   ========================================================= */
"use strict";

document.documentElement.classList.add("js");

/* ---------- Data (arrays of objects) ---------- */
const skillData = [
  {
    id: "languages", label: "Languages", icon: "bi-code-slash",
    items: [
      { name: "Python", level: 90, icon: "bi-filetype-py" },
      { name: "C", level: 75, icon: "bi-terminal" },
      { name: "JavaScript", level: 70, icon: "bi-filetype-js" },
    ],
  },
  {
    id: "ai", label: "AI / ML", icon: "bi-cpu",
    items: [
      { name: "TensorFlow", level: 75, icon: "bi-diagram-3" },
      { name: "Scikit-learn", level: 80, icon: "bi-graph-up" },
      { name: "LangChain", level: 82, icon: "bi-link-45deg" },
      { name: "LangGraph", level: 70, icon: "bi-share" },
      { name: "Pandas", level: 85, icon: "bi-table" },
      { name: "NumPy", level: 85, icon: "bi-grid-3x3" },
    ],
  },
  {
    id: "databases", label: "Databases", icon: "bi-database",
    items: [
      { name: "RDBMS / SQL", level: 85, icon: "bi-database-fill" },
      { name: "PostgreSQL", level: 75, icon: "bi-database" },
      { name: "MySQL", level: 80, icon: "bi-database" },
      { name: "SQLite", level: 80, icon: "bi-database" },
    ],
  },
  {
    id: "web", label: "Web", icon: "bi-globe2",
    items: [
      { name: "HTML5", level: 85, icon: "bi-filetype-html" },
      { name: "CSS3", level: 80, icon: "bi-filetype-css" },
      { name: "Streamlit", level: 80, icon: "bi-window-stack" },
      { name: "REST APIs", level: 80, icon: "bi-hdd-network" },
    ],
  },
  {
    id: "tools", label: "Tools", icon: "bi-tools",
    items: [
      { name: "Git", level: 80, icon: "bi-git" },
      { name: "GitHub", level: 85, icon: "bi-github" },
      { name: "VS Code", level: 90, icon: "bi-code-square" },
      { name: "Postman", level: 80, icon: "bi-send" },
    ],
  },
];

/* ---------- Helpers ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   1. THEME SWITCHING (interactive feature #1)
   ========================================================= */
const root = document.documentElement;
const themeBtn = $("#themeToggle");

const applyTheme = (theme) => {
  root.setAttribute("data-bs-theme", theme);
  const icon = $("i", themeBtn);
  const isDark = theme === "dark";
  icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  $('meta[name="theme-color"]').setAttribute("content", isDark ? "#0b1020" : "#f6f7fd");
};

const getSavedTheme = () => {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
};

applyTheme(getSavedTheme() || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
});

/* =========================================================
   2. TYPING EFFECT
   ========================================================= */
const typedEl = $("#typed");
const roles = ["AI / ML Engineer", "GenAI Developer", "Backend Developer", "Software Engineer"];

const startTyping = () => {
  let roleIndex = 0, charIndex = 0, deleting = false;

  const tick = () => {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1600; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
  };
  tick();
};

if (prefersReducedMotion) typedEl.textContent = roles[0];
else startTyping();

/* =========================================================
   3. SKILLS: category tab switching (interactive feature #2)
   ========================================================= */
const tabsBox = $("#skillTabs");
const panel = $("#skillPanel");

const renderSkills = (categoryId) => {
  const category = skillData.find((c) => c.id === categoryId);
  if (!category) return;

  panel.innerHTML = "";
  category.items.forEach((skill, index) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="skill-card" style="animation-delay:${index * 70}ms">
        <div class="skill-top">
          <span><i class="bi ${skill.icon}" aria-hidden="true"></i>${skill.name}</span>
          <span>${skill.level}%</span>
        </div>
        <div class="progress" role="progressbar" aria-label="${skill.name} proficiency"
             aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" data-level="${skill.level}"></div>
        </div>
      </div>`;
    panel.appendChild(col);
  });

  // animate bars on next frame so the CSS transition runs
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      $$(".progress-bar", panel).forEach((bar) => { bar.style.width = `${bar.dataset.level}%`; });
    });
  });
};

const buildSkillTabs = () => {
  skillData.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "skill-tab" + (i === 0 ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.dataset.category = cat.id;
    btn.innerHTML = `<i class="bi ${cat.icon}" aria-hidden="true"></i>${cat.label}`;
    tabsBox.appendChild(btn);
  });

  tabsBox.addEventListener("click", (event) => {
    const btn = event.target.closest(".skill-tab");
    if (!btn) return;
    $$(".skill-tab", tabsBox).forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });
    renderSkills(btn.dataset.category);
  });

  renderSkills(skillData[0].id);
};
buildSkillTabs();

/* =========================================================
   4. PROJECT FILTERING (interactive feature #3)
   ========================================================= */
const filterButtons = $$(".btn-filter");
const projectItems = $$(".project-item");
const countEl = $("#projectCount");
const emptyMsg = $("#noProjects");

const filterProjects = (category) => {
  let visible = 0;

  projectItems.forEach((item) => {
    const categories = item.dataset.category.split(" ");
    const show = category === "all" || categories.includes(category);
    item.classList.toggle("hide", !show);
    if (show) {
      visible++;
      item.classList.remove("fade-in");
      void item.offsetWidth; // restart the animation
      item.classList.add("fade-in");
    }
  });

  countEl.textContent = `Showing ${visible} of ${projectItems.length} projects`;
  emptyMsg.classList.toggle("d-none", visible !== 0);
};

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProjects(btn.dataset.filter);
  });
});
filterProjects("all");

/* =========================================================
   5. NAVBAR, BACK-TO-TOP, REVEAL, COUNTERS
   ========================================================= */
const nav = $("#mainNav");
const toTop = $("#toTop");

const progressBar = $("#scrollProgress");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  toTop.classList.toggle("show", window.scrollY > 500);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0%";
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));

// close the mobile menu after choosing a link
$$("#navMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = $("#navMenu");
    if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// scroll reveal
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => revealObserver.observe(el));

// animated counters
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  if (prefersReducedMotion) { el.textContent = target.toFixed(decimals); return; }
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); }
  });
}, { threshold: 0.6 });
$$(".stat-number").forEach((el) => counterObserver.observe(el));

// mouse spotlight on cards + soft glow that follows the cursor
const cursorGlow = $("#cursorGlow");
document.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursorGlow.classList.add("on");
  const card = e.target.closest(".spot");
  if (card) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }
});
document.addEventListener("pointerleave", () => cursorGlow.classList.remove("on"));

$("#year").textContent = new Date().getFullYear();

/* =========================================================
   6. CONTACT FORM: EVENT HANDLING + VALIDATION
   ========================================================= */
const form = $("#contactForm");
const alertBox = $("#formAlert");
const messageField = $("#message");
const charCount = $("#charCount");

const validators = {
  name: (v) => {
    if (!v.trim()) return "Please enter your name.";
    if (v.trim().length < 2) return "Name must be at least 2 characters.";
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(v.trim())) return "Name can only contain letters, spaces, dots, hyphens and apostrophes.";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Enter a valid email, e.g. name@example.com.";
    return "";
  },
  phone: (v) => {
    if (!v.trim()) return ""; // optional
    const digits = v.replace(/[\s-]/g, "").replace(/^\+91/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) return "Enter a valid 10-digit Indian mobile number.";
    return "";
  },
  subject: (v) => (v ? "" : "Please choose a subject."),
  message: (v) => {
    const len = v.trim().length;
    if (!len) return "Please write a message.";
    if (len < 20) return `Message is too short (${len}/20 characters minimum).`;
    return "";
  },
};

const showFieldState = (field, error) => {
  const feedback = $(`#${field.id}Error`);
  const hasValue = field.value.trim() !== "";
  field.classList.toggle("is-invalid", Boolean(error));
  field.classList.toggle("is-valid", !error && hasValue);
  field.setAttribute("aria-invalid", error ? "true" : "false");
  feedback.textContent = error;
  feedback.classList.toggle("d-block", Boolean(error)); // message sits outside the input's sibling chain
};

const validateField = (field) => {
  const error = validators[field.name](field.value);
  showFieldState(field, error);
  return !error;
};

const showAlert = (type, icon, html) => {
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <i class="bi ${icon}" aria-hidden="true"></i>
      <div>${html}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
};

const fields = $$("#contactForm [name]");

// live validation: on leaving a field, then on every keystroke once touched
fields.forEach((field) => {
  field.addEventListener("blur", () => { field.dataset.touched = "true"; validateField(field); });
  const liveEvent = field.tagName === "SELECT" ? "change" : "input";
  field.addEventListener(liveEvent, () => { if (field.dataset.touched) validateField(field); });
});

messageField.addEventListener("input", () => {
  const len = messageField.value.length;
  charCount.textContent = `${len} / ${messageField.maxLength}`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alertBox.innerHTML = "";

  const results = fields.map((f) => { f.dataset.touched = "true"; return validateField(f); });
  const allValid = results.every(Boolean);

  if (!allValid) {
    showAlert("danger", "bi-exclamation-triangle-fill", "<strong>Please fix the highlighted fields</strong> and try again.");
    const firstInvalid = fields.find((f) => f.classList.contains("is-invalid"));
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  // Build an email to the portfolio owner so the message really reaches her inbox
  const data = Object.fromEntries(new FormData(form));
  const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\n${data.message}`;
  const mailto = `mailto:priyambica25@gmail.com?subject=${encodeURIComponent("[Portfolio] " + data.subject)}&body=${encodeURIComponent(body)}`;

  form.reset(); // the reset handler below clears states and any old alert
  showAlert("success", "bi-check-circle-fill",
    `<strong>Thank you, ${data.name.trim().split(" ")[0]}!</strong> Your message is ready. ` +
    `If your email app did not open, <a class="alert-link" href="${mailto}">click here to send it</a>.`);

  window.location.href = mailto;
});

form.addEventListener("reset", () => {
  alertBox.innerHTML = "";
  fields.forEach((f) => { f.classList.remove("is-valid", "is-invalid"); f.removeAttribute("aria-invalid"); delete f.dataset.touched; });
  $$(".invalid-feedback", form).forEach((el) => { el.textContent = ""; el.classList.remove("d-block"); });
  charCount.textContent = `0 / ${messageField.maxLength}`;
});
