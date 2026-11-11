/**
 * WEBSITE PROFIL RPL - SMK NUSANTARA TEKNOLOGI
 * Main Interactive Script & Navigation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNav();
  initHeaderScroll();
  initContactForm();
  initKaryaSiswaFilters();
});

/* --------------------------------------------------------------------------
   1. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (!drawer) return;

  // Create or retrieve backdrop
  let backdrop = document.querySelector('.mobile-drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('active');
      if (isOpen) closeDrawer(); else openDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  backdrop.addEventListener('click', closeDrawer);

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link inside drawer
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   2. ACTIVE NAVIGATION HIGHLIGHTER
   -------------------------------------------------------------------------- */
function initActiveNav() {
  // Determine current active page
  let activePage = document.body.getAttribute('data-page');

  if (!activePage) {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('fasilitas-kurikulum')) activePage = 'fasilitas-kurikulum';
    else if (path.includes('karya-siswa')) activePage = 'karya-siswa';
    else if (path.includes('tenaga-pendidik')) activePage = 'tenaga-pendidik';
    else if (path.includes('kontak')) activePage = 'kontak';
    else activePage = 'beranda';
  }

  // Highlight desktop nav
  document.querySelectorAll(`.desktop-nav .nav-link[data-path="${activePage}"]`).forEach(link => {
    link.classList.add('active');
  });

  // Highlight mobile drawer links
  document.querySelectorAll(`.drawer-nav .drawer-link[data-path="${activePage}"]`).forEach(link => {
    link.classList.add('active');
  });

  // Highlight footer links
  document.querySelectorAll(`footer li[data-path="${activePage}"] a`).forEach(link => {
    link.classList.add('text-[#F5B400]', 'font-bold');
    link.classList.remove('text-white/80');
  });
}

/* --------------------------------------------------------------------------
   3. HEADER SCROLL SHADOW
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   4. KURIKULUM SEMESTER TABS (FOR fasilitas-kurikulum.html)
   -------------------------------------------------------------------------- */
window.switchTab = function(semNumber) {
  const buttons = document.querySelectorAll('#semester-tab-bar .tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-[#0B3A66]', 'text-white', 'border-b-2', 'border-primary-container');
    btn.classList.add('bg-white', 'text-[#0B3A66]', 'border', 'border-[#E5E7EB]', 'border-b-0');
    btn.setAttribute('aria-selected', 'false');
  });

  const activeBtn = document.getElementById(`tab-sem-${semNumber}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-[#0B3A66]', 'border', 'border-[#E5E7EB]', 'border-b-0');
    activeBtn.classList.add('bg-[#0B3A66]', 'text-white', 'border-b-2', 'border-primary-container');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    panel.classList.add('hidden');
    panel.classList.remove('flex');
  });

  const targetPanel = document.getElementById(`panel-sem-${semNumber}`);
  if (targetPanel) {
    targetPanel.classList.remove('hidden');
    targetPanel.classList.add('flex');
  }
};

/* --------------------------------------------------------------------------
   5. KARYA SISWA GALLERY & MODAL (FOR karya-siswa.html)
   -------------------------------------------------------------------------- */
const projectData = {
  siakad: {
    title: "SIAKAD Mini Sekolah",
    category: "Web Application",
    year: "Tahun Ajaran 2024/2025",
    desc: "Sistem informasi akademik berbasis web untuk mengelola absensi, rekap nilai rapor, dan agenda sekolah secara realtime. Mengimplementasikan arsitektur database relasional ternormalisasi dan UI responsif ramah seluler.",
    tech: ["Laravel 11", "MySQL 8.0", "Tailwind CSS", "RESTful API", "Docker"],
    author: "Aldi Pratama",
    class: "Kelas XII RPL 1",
    mentor: "Budi Santoso, S.Kom., M.T."
  },
  kasir: {
    title: "Aplikasi Kasir UMKM",
    category: "Aplikasi POS & Mobile",
    year: "Tahun Ajaran 2024/2025",
    desc: "Aplikasi point-of-sale offline-first dengan sinkronisasi cloud otomatis, mendukung pencetakan nota bluetooth dan pencatatan laba harian untuk toko kelontong dan kuliner.",
    tech: ["Flutter", "Dart", "SQLite", "Firebase Cloud", "Bluetooth SDK"],
    author: "Nabila Putri",
    class: "Kelas XI RPL 2",
    mentor: "Rina Kusuma, S.T."
  },
  pos: {
    title: "Sistem Kasir Pintar (POS Retail)",
    category: "Web & Desktop",
    year: "Tahun Ajaran 2024/2025",
    desc: "Aplikasi kasir multi-cabang berbasis cloud dengan fitur sinkronisasi offline-first, pencetakan struk termal bluetooth, dan laporan analisis laba-rugi otomatis.",
    tech: ["Laravel 11", "Vue.js 3", "Tailwind CSS", "MySQL", "IndexedDB"],
    author: "Rafi Arya & Tim",
    class: "Kelas XII RPL 1",
    mentor: "Budi Santoso, S.Kom., M.T."
  },
  puskesmas: {
    title: "Aplikasi Antrean Pasien Puskesmas",
    category: "Aplikasi Mobile",
    year: "Tahun Ajaran 2024/2025",
    desc: "Sistem reservasi nomor antrean fasilitas kesehatan tingkat pertama dengan estimasi waktu tunggu real-time berbasis WebSocket dan notifikasi WhatsApp Gateway.",
    tech: ["Flutter 3", "Node.js", "Express", "PostgreSQL", "Socket.io"],
    author: "Nabila Putri",
    class: "Kelas XI RPL 2",
    mentor: "Rina Kusuma, S.T."
  },
  jaringan: {
    title: "Monitoring Jaringan Lab",
    category: "Jaringan & Monitoring",
    year: "Tahun Ajaran 2023/2024",
    desc: "Sistem pendeteksi utilisasi bandwidth router Mikrotik dan alert sistem otomatis via Telegram Bot ketika terjadi lonjakan traffic atau downtime pada workstation laboratorium sekolah.",
    tech: ["Python", "MikroTik RouterOS API", "Telegram Bot API", "Chart.js"],
    author: "Fajar Ramadhan",
    class: "Kelas XII RPL 2",
    mentor: "Bambang Wijaya, M.Kom."
  },
  batik: {
    title: "Katalog Batik Online",
    category: "Web E-Commerce",
    year: "Tahun Ajaran 2024/2025",
    desc: "Platform katalog digital interaktif dengan visualisasi tekstil resolusi tinggi dan integrasi payment gateway sandbox Midtrans untuk pengrajin batik binaan daerah.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Midtrans Snap"],
    author: "Salsa Maharani",
    class: "Kelas XI RPL 1",
    mentor: "Siti Rahmawati, S.Kom."
  },
  absensi: {
    title: "Aplikasi Absensi QR Code",
    category: "Aplikasi Mobile",
    year: "Tahun Ajaran 2023/2024",
    desc: "Aplikasi pencatat kehadiran mandiri siswa berbasis pemindaian QR code dinamis yang berganti tiap 30 detik guna mencegah kecurangan titip absen antarsiswa.",
    tech: ["React Native", "Node.js", "Express", "JWT", "MongoDB"],
    author: "Dimas Saputra",
    class: "Kelas XII RPL 1",
    mentor: "Budi Santoso, S.Kom., M.T."
  },
  pengaduan: {
    title: "Portal Pengaduan Siswa",
    category: "Web Pelayanan",
    year: "Tahun Ajaran 2024/2025",
    desc: "Platform suara siswa anonim untuk pelaporan fasilitas rusak, masukan kantin, dan konseling dengan enkripsi identitas ujung-ke-ujung (end-to-end encryption).",
    tech: ["PHP 8.3", "Bootstrap 5", "PostgreSQL", "OpenSSL"],
    author: "Rizka Amelia",
    class: "Kelas XII RPL 2",
    mentor: "Rina Kusuma, S.T."
  },
  "smart-trash": {
    title: "Smart Trash IoT Dashboard",
    category: "Jaringan & IoT",
    year: "Tahun Ajaran 2024/2025",
    desc: "Hardware smart trash terhubung dengan sensor ultrasonik HC-SR04 dan ESP32, mengirimkan data volume sampah secara berkala ke dashboard staf kebersihan sekolah.",
    tech: ["C++ Arduino", "ESP32", "MQTT Protocol", "Node-RED", "HTML5"],
    author: "Kevin Sanjaya",
    class: "Kelas XI RPL 1",
    mentor: "Bambang Wijaya, M.Kom."
  },
  elibrary: {
    title: "E-Library Mobile App",
    category: "Aplikasi Mobile",
    year: "Tahun Ajaran 2023/2024",
    desc: "Aplikasi perpustakaan saku dengan fitur pembaca e-book terproteksi DRM, perpanjangan masa pinjam otomatis, dan barcode digital kartu anggota perpustakaan.",
    tech: ["Kotlin Android", "Room Database", "Retrofit", "PDF.js"],
    author: "Amanda Zahra",
    class: "Kelas XII RPL 1",
    mentor: "Siti Rahmawati, S.Kom."
  },
  "desa-wisata": {
    title: "Website Profil Desa Wisata",
    category: "Web CMS",
    year: "Tahun Ajaran 2024/2025",
    desc: "Portal informasi desa wisata binaan yang menampilkan peta rute interaktif, direktori homestay, kalender festival budaya lokal, dan formulir booking pengunjung.",
    tech: ["WordPress Headless", "Tailwind CSS", "Leaflet.js Map", "REST API"],
    author: "Bagas Wicaksono",
    class: "Kelas XI RPL 2",
    mentor: "Budi Santoso, S.Kom., M.T."
  }
};

window.openDetailModal = function(key) {
  const data = projectData[key];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('hidden');

  const setTitle = document.getElementById('modal-title');
  const setBadge = document.getElementById('modal-badge');
  const setYear = document.getElementById('modal-year');
  const setDesc = document.getElementById('modal-desc');
  const setAuthor = document.getElementById('modal-author');
  const setClass = document.getElementById('modal-class');
  const setMentor = document.getElementById('modal-mentor');
  const techContainer = document.getElementById('modal-tech');

  if (setTitle) setTitle.textContent = data.title;
  if (setBadge) setBadge.textContent = data.category;
  if (setYear) setYear.textContent = data.year;
  if (setDesc) setDesc.textContent = data.desc;
  if (setAuthor) setAuthor.textContent = data.author;
  if (setClass) setClass.textContent = data.class;
  if (setMentor) setMentor.textContent = data.mentor;

  if (techContainer) {
    techContainer.innerHTML = '';
    data.tech.forEach(techName => {
      const span = document.createElement('span');
      span.className = "px-3 py-1 bg-[#f8f9ff] border border-[#E5E7EB] text-label-sm font-label-sm text-[#0B3A66] rounded-[2px] font-mono text-xs";
      span.textContent = techName;
      techContainer.appendChild(span);
    });
  }

  document.body.style.overflow = 'hidden';
};

window.dismissPreview = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

function initKaryaSiswaFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectCountLabel = document.getElementById('project-count');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.className = "filter-btn h-10 md:h-11 px-4 md:px-6 text-label-sm font-label-sm font-semibold rounded-[4px] transition-all bg-white text-[#0B3A66] border border-[#E5E7EB] hover:bg-[#eff4ff] flex items-center gap-2 whitespace-nowrap";
        const badge = b.querySelector('span:last-child');
        if (badge) {
          badge.className = "text-caption font-caption bg-[#eff4ff] text-[#0B3A66] px-1.5 py-0.5 rounded-[2px] ml-1";
        }
      });

      btn.className = "filter-btn h-10 md:h-11 px-4 md:px-6 text-label-sm font-label-sm font-semibold rounded-[4px] transition-all bg-[#0B3A66] text-white shadow-sm flex items-center gap-2 whitespace-nowrap";
      const activeBadge = btn.querySelector('span:last-child');
      if (activeBadge) {
        activeBadge.className = "text-caption font-caption bg-white/20 px-1.5 py-0.5 rounded-[2px] ml-1";
      }

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (projectCountLabel) {
        projectCountLabel.textContent = `Menampilkan ${visibleCount} Hasil`;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM HANDLER (FOR kontak.html)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-jurusan-form');
  const banner = document.getElementById('contact-success-banner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (banner) {
      banner.classList.remove('hidden');
      banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
  });
}
