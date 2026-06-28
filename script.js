// --- 1. CLOUDINARY CONFIGURATION ---
const CLOUD_NAME = "dtjkyb8lt"; 

const wallpaperData = [
  {
    id: "The_Split_Self_wvuo11",
    title: "The Split Self",
    category: "Desktop"
  },
  {
    id: "Tides_of_Glass_rmsuec",
    title: "Tides of Glass",
    category: "Desktop"
  },
  {
    id: "Comfort_in_Chaos_lz6fyd",
    title: "Comfort in Chaos",
    category: "Desktop"
  },
  {
    id: "Blurred_Reality_tug0ql",
    title: "Blurred Reality",
    category: "Desktop"
  },
  {
    id: "The_Jaws_of_Trust_cbrwya",
    title: "The Jaws of Trust",
    category: "Desktop"
  },
  {
    id: "Pulled_Unde_unxq3f",
    title: "Pulled Under",
    category: "Desktop"
  },
  {
    id: "Shattered_Identity_ufpgra",
    title: "Shattered Identity",
    category: "Desktop"
  },
  {
    id: "Echoes_of_Numbness_klgtpo",
    title: "Echoes of Numbness",
    category: "Desktop"
  }
];

let currentFilter = "Desktop";
const gallery = document.getElementById('gallery');

// --- 2. GLASSY TAB SWITCH ANIMATION ---
function switchCategory(category, clickedButton) {
  if (currentFilter === category) return; 
  
  currentFilter = category;

  const navButtons = document.querySelectorAll('.nav-links button');
  navButtons.forEach(btn => btn.classList.remove('active'));
  clickedButton.classList.add('active');

  gallery.classList.add('gallery-hidden');

  setTimeout(() => {
    renderWallpapers();
    gallery.classList.remove('gallery-hidden');
  }, 400); 
}

// --- 3. RENDER GALLERY & COMING SOON ---
function renderWallpapers() {
  gallery.innerHTML = '';

  // English text for Mobile Coming Soon
  if (currentFilter === "Mobile") {
    gallery.style.display = "block";
    gallery.innerHTML = `
      <div class="coming-soon">
        <h2>✨ Coming Soon</h2>
        <p>Our premium mobile wallpaper collection is currently in the works. Check back soon!</p>
      </div>
    `;
    return;
  }

  gallery.style.display = "grid";
  const filteredData = wallpaperData.filter(wall => wall.category === currentFilter);

  filteredData.forEach(wall => {
    // Loaded with w_1080 parameter for higher quality on larger cards
    const imageUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_1080/${wall.id}`;
    
    // Using fl_attachment to force direct download popup instead of opening in a new tab
    const downloadUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/fl_attachment,q_auto,f_auto/${wall.id}`;

    const card = document.createElement('article');
    card.className = 'glass-card';

    card.innerHTML = `
      <div class="image-container">
        <img src="${imageUrl}" alt="${wall.title}" loading="lazy">
      </div>
      <div class="card-info">
        <div>
          <h3>${wall.title}</h3>
          <p>${wall.category}</p>
        </div>
        <a href="${downloadUrl}" class="dl-btn" aria-label="Download ${wall.title}" download>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Attach function to window so it can be called from HTML onclick attributes
window.switchCategory = switchCategory;

// Initial Render
renderWallpapers();