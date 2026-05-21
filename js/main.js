/* ============================================================
   main.js — Ignacio Zabaleta SL
   ============================================================ */

/* ── SCROLL ANIMAZIOAK ── */
/* .fade-up klasea duten elementuak scroll-ean agertzen dira */
const fadeElementuak = document.querySelectorAll('.fade-up');

function egiaztaScroll() {
  const muga = window.innerHeight * 0.88;
  fadeElementuak.forEach(function(el) {
    if (el.getBoundingClientRect().top < muga) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', egiaztaScroll);
window.addEventListener('load', egiaztaScroll);

/* ── SMOOTH SCROLL + NAVBAR ITXI MUGIKORREAN ── */
document.querySelectorAll('a[href^="#"]').forEach(function(lotura) {
  lotura.addEventListener('click', function(e) {
    const helburua = document.querySelector(this.getAttribute('href'));
    if (helburua) {
      e.preventDefault();
      helburua.scrollIntoView({ behavior: 'smooth' });
    }
    const navMenu = document.getElementById('navMenu');
    if (navMenu && navMenu.classList.contains('show')) {
      bootstrap.Collapse.getInstance(navMenu)?.hide();
    }
  });
});

/* ── LIGHTBOX ── */
const argazkiak = Array.from(document.querySelectorAll('.galeria-img'));
let oraingoa = 0;

function irekiLightbox(indizea) {
  oraingoa = indizea;
  eguneratuLightbox();
  document.getElementById('lightbox').classList.add('aktibo');
  document.body.style.overflow = 'hidden';
}

function itxiLightbox() {
  document.getElementById('lightbox').classList.remove('aktibo');
  document.body.style.overflow = '';
}

function aldatuArgazkia(norabidea) {
  oraingoa = (oraingoa + norabidea + argazkiak.length) % argazkiak.length;
  eguneratuLightbox();
}

function eguneratuLightbox() {
  document.getElementById('lightbox-img').src = argazkiak[oraingoa].src;
  document.getElementById('lightbox-zenbakia').textContent =
    (oraingoa + 1) + ' / ' + argazkiak.length;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') itxiLightbox();
  if (e.key === 'ArrowRight') aldatuArgazkia(1);
  if (e.key === 'ArrowLeft') aldatuArgazkia(-1);
});

/* Lightbox badago, atzekaldean klik → itxi */
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) itxiLightbox();
  });
}

/* MODAL */

// Ziurtatu formularioa orrialdean existitzen dela zerbait egin aurretik
const formularioa = document.getElementById('contactForm');

if (formularioa) {
  // Bootstrap modal-a hasieratu (bakarrik formularioa badago)
  const nireModala = new bootstrap.Modal(document.getElementById('eskerrikAskoModal'));

  formularioa.addEventListener('submit', async function(event) {
    event.preventDefault(); // Formspree-ko orrira joatea saihestu

    const data = new FormData(formularioa);
    
    // Mezua atzealdean bidali
    const response = await fetch(formularioa.action, {
      method: formularioa.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      nireModala.show(); // Modal-a erakutsi
      formularioa.reset(); // Formularioa hustu
    } else {
      alert('Akats bat gertatu da. Saiatu berriro beranduago.');
    }
  });
}