let filteredProjects = [];
const categories = ['all', 'uiux', 'websites', 'mobile apps'];

const projects = [
  {
    title: "Food App Website",
    description: "Cooking, Design",
    image: "assets/imgs/Screenshot 2025-10-18 163014.png",
    link: "projrct1.html",
    category: "websites"
  },
  {
    title: "Keep Notes Flutter",
    description: "Mobile, Design",
    image: "assets/imgs/Frame 45 (11).png",
    link: "projrct2.html",
    category: "mobile apps"
  },
  {
    title: "Real Estate in Homs",
    description: "Mobile, API",
    image: "assets/imgs/Frame 45 (13).png",
    link: "projrct3.html",
    category: "mobile apps"
  },
  {
    title: "UI/UX Design",
    description: "Figma, Prototype",
    image: "assets/imgs/Frame 45 (20).png",
    link: "projrct4.html",
    category: "uiux"
  }
];

// عرض المشاريع
function showProjects() {
    const portfolioSection = document.getElementsByClassName('project')[0];
    portfolioSection.innerHTML = "";
    filteredProjects.forEach(project => {
        const a = document.createElement('a');
        a.href = project.link;
        a.className = "portfolio-card";
        a.setAttribute('data-category', project.category);

        a.innerHTML = `
          <div class="project-img">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="projeect-content">
            <div class="content-text">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
          </div>
        `;
        portfolioSection.appendChild(a);
    });
}

// فلترة المشاريع وتحديث الزر النشط
function filterProjects(category, button) {
    const buttons = document.querySelectorAll('.portfolio-bottom-section button');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(button) button.classList.add('active');

    if(category === 'all'){
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }

    showProjects();
}

// التنقل بين الفئات باستخدام الأسهم
function navigateCategory(direction) {
    const buttons = Array.from(document.querySelectorAll('.portfolio-bottom-section button'));
    const activeBtn = document.querySelector('.portfolio-bottom-section button.active');
    let currentIndex = buttons.indexOf(activeBtn);

    if(direction === 'next'){
        currentIndex = (currentIndex + 1) % buttons.length;
    } else if(direction === 'prev'){
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    }

    const nextBtn = buttons[currentIndex];
    const category = nextBtn.getAttribute('onclick').match(/'([^']+)'/)[1];
    filterProjects(category, nextBtn);
}

// ربط أزرار الأسهم بعد التأكد من تحميل DOM
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prevCategory').addEventListener('click', () => navigateCategory('prev'));
    document.getElementById('nextCategory').addEventListener('click', () => navigateCategory('next'));
    
    // عرض جميع المشاريع عند بداية التحميل
    filteredProjects = projects;
    showProjects();
});
