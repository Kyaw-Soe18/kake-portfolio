
  const menuToggle = document.getElementById("menuToggle");
  const navCollapse = document.getElementById("navbarContent");

  // Toggle open class on hamburger
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
  });

  // Sync with Bootstrap collapse
  navCollapse.addEventListener("shown.bs.collapse", () => {
    menuToggle.classList.add("open");
  });

  navCollapse.addEventListener("hidden.bs.collapse", () => {
    menuToggle.classList.remove("open");
  });

  // Theme toggle (keep your existing code)
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("theme")) {
    body.className = localStorage.getItem("theme");
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("light");
    body.classList.toggle("dark");

    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    toggle.classList.toggle("bi-moon-stars");
    toggle.classList.toggle("bi-brightness-high");
  });

  // ---------- DATA ARRAYS ----------

const skills = [
  { name: "Bootstrap", icon: "devicon-bootstrap-plain", level: 85, category: "tech" },
  { name: "JavaScript", icon: "devicon-javascript-plain", level: 80, category: "tech" },
  { name: "ReactJS", icon: "devicon-react-original", level: 70, category: "tech" },
  { name: "Django", icon: "devicon-django-plain", level: 65, category: "tech" },
  { name: "Laravel", icon: "devicon-laravel-plain", level: 75, category: "tech" },
  { name: "MySQL", icon: "devicon-mysql-plain", level: 80, category: "tech" },

  { name: "VS Code", icon: "devicon-vscode-plain", level: 90, category: "tools" },
  { name: "Git & GitHub", icon: "devicon-github-original", level: 70, category: "tools" },
  { name: "AI Tools", icon: "bi bi-robot", level: 80, category: "tools" },
];

const skillsContainer = document.getElementById("skillsContainer");

function renderSkills(type = "tech", btn = null) {

  document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  skillsContainer.innerHTML = "";

  const filtered = skills.filter(skill => skill.category === type);

  filtered.forEach(skill => {
    skillsContainer.innerHTML += `
      <div class="col-12 col-md-6">
        <div class="card-custom skill-card">
          <div class="d-flex align-items-center gap-3">
            <i class="${skill.icon} skill-icon"></i>
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <strong>${skill.name}</strong>
                <span>${skill.level}%</span>
              </div>
              <div class="progress mt-1">
                <div class="progress-bar" data-level="${skill.level}" style="width:0%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
animateSkills();
}

// Default load
const defaultBtn = document.querySelector(".btn-filter.active");
renderSkills("tech", defaultBtn);

function animateSkills() {
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    const level = bar.getAttribute("data-level");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.width = level + "%";
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.6 });

    observer.observe(bar);
  });
}


const projects = [
  {
    title: "Weather App",
    image: "./images/weather_api.png",
    desc: "A React.js weather application using the OpenWeather API",
    stack: "ReactJs | API",
    github: "https://github.com/Kyaw-Soe18/Weather_App",
    demo: "https://weather-app-alpha-beta.vercel.app/",
    type: "Frontend"
  },
  {
    title: "Spicy Vibes",
    image: "./images/pos.png",
    desc: "An E-commerce Website",
    stack: "Javascript | Laravel | MySql",
    github: "https://github.com/Kyaw-Soe18/POS_Project",
    type: "Fullstack"
  },
  {
    title: "Attendance Management System",
    image: "./images/python_project.png",
    desc: "4th Year | Semester VII Full Stack Project",
    stack: "Javascript | Django | SQLite",
    github: "https://github.com/Kyaw-Soe18/Python_Project",
    type: "Fullstack"
  }
];

const projectsContainer = document.getElementById("projectsContainer");

function renderProjects(filterType = "All") {
  
  projectsContainer.innerHTML = "";

  projects
    .filter(project => filterType === "All" || project.type.trim() === filterType)
    .forEach(project => {
      projectsContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4">
          <div class="card-custom project-card h-100">

            <div class="project-img-wrap">
              <img src="${project.image}" loading="lazy">
            </div>

            <div class="project-body">
              <h5 class="fw-bold mb-1">${project.title}</h5>
              <p class="project-des fw-boldc">${project.desc}</p>
              <p class="project-stack fw-bold">
                <strong>Tech : </strong> ${project.stack}
              </p>

              <div class="project-buttons mt-3 d-flex justify-content-between">
                <a href="${project.github}" target="_blank" class="btn-tech btn-github">
                  <i class="bi bi-github"></i> GitHub
                </a>

                ${
                  project.demo
                    ? `
                      <a href="${project.demo}" target="_blank" class="btn-tech btn-demo">
                        <i class="bi bi-box-arrow-up-right"></i> Demo
                      </a>
                    `
                    : `
                      <span class="btn-tech btn-type">
                        ${project.type}
                      </span>
                    `
                }
              </div>

            </div>
          </div>
        </div>
      `;
    });
}

renderProjects("All");

