/* ═══════════════════════════════════════════
   GENOS STUDIO — SHARED SCRIPTS
   ═══════════════════════════════════════════ */

// ─── CUSTOM CURSOR ───
const cur = document.getElementById('cur');
if (cur) {
  const dot  = cur.querySelector('.dot');
  const ring = cur.querySelector('.ring');
  let cx=0, cy=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
  (function loop() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    dot.style.left  = cx + 'px';
    dot.style.top   = cy + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('stuck', window.scrollY > 60));
}

// ─── MOBILE MENU ───
function toggleMob() { document.getElementById('nlm').classList.toggle('open'); }
function closeMob()  { document.getElementById('nlm').classList.remove('open'); }

// ─── SCROLL REVEAL ───
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el));

// ─── CTA FORM ───
function handleCTA() {
  const inp = document.getElementById('emailIn');
  if (!inp) return;
  const v = inp.value.trim();
  if (v && /\S+@\S+\.\S+/.test(v)) {
    inp.value = '';
    inp.placeholder = 'Got it — we will be in touch.';
    inp.style.borderColor = 'rgba(168,85,247,0.6)';
  } else {
    inp.style.borderColor = 'rgba(255,80,80,0.6)';
    inp.placeholder = 'Need a real email address.';
    setTimeout(() => { inp.style.borderColor = ''; inp.placeholder = 'your@email.com'; }, 2500);
  }
}

// ─── THREE.JS BACKGROUND ───
// Only runs if #threeCanvas exists on the page
(function initThree() {
  const canvas = document.getElementById('threeCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.z = 5;

  scene.fog = new THREE.FogExp2(0x000000, 0.035);

  // Tunnel rings
  const rings = [];
  const ringCount = 40;
  for (let i = 0; i < ringCount; i++) {
    const geo  = new THREE.TorusGeometry(4 + Math.random() * 3, 0.02 + Math.random() * 0.06, 4, 32 + Math.floor(Math.random() * 20));
    const mat  = new THREE.MeshBasicMaterial({ color: 0x7B2FBE, wireframe: true, transparent: true, opacity: 0.18 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z  = -i * 5;
    mesh.rotation.x  = Math.random() * Math.PI;
    mesh.rotation.y  = Math.random() * Math.PI;
    scene.add(mesh);
    rings.push(mesh);
  }

  // Central icosphere
  const icoGeo  = new THREE.IcosahedronGeometry(1.4, 2);
  const icoMat  = new THREE.MeshBasicMaterial({ color: 0xA855F7, wireframe: true, transparent: true, opacity: 0.55 });
  const ico     = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  // Outer shell
  const icoGeo2 = new THREE.IcosahedronGeometry(2.0, 1);
  const icoMat2 = new THREE.MeshBasicMaterial({ color: 0x7B2FBE, wireframe: true, transparent: true, opacity: 0.15 });
  const ico2    = new THREE.Mesh(icoGeo2, icoMat2);
  scene.add(ico2);

  // Scattered dots
  const dotGeo = new THREE.BufferGeometry();
  const dotPos = [];
  for (let i = 0; i < 600; i++) dotPos.push((Math.random()-0.5)*80, (Math.random()-0.5)*80, (Math.random()-0.5)*80);
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
  const dotMat = new THREE.PointsMaterial({ color: 0xA855F7, size: 0.04, transparent: true, opacity: 0.4 });
  const dots   = new THREE.Points(dotGeo, dotMat);
  scene.add(dots);

  // Grid floor
  const grid = new THREE.GridHelper(60, 40, 0x3D0088, 0x1a0040);
  grid.position.y = -8;
  scene.add(grid);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;
    const scrollY = window.scrollY;

    ico.rotation.x  = t * 0.4 + my * 0.3;
    ico.rotation.y  = t * 0.6 + mx * 0.3;
    ico2.rotation.x = -t * 0.2;
    ico2.rotation.y =  t * 0.3 + mx * 0.15;

    const sc = 1 + 0.06 * Math.sin(t * 1.5);
    ico.scale.set(sc, sc, sc);

    rings.forEach((r, i) => {
      r.position.z += 0.06;
      r.rotation.z += 0.002 + i * 0.0001;
      if (r.position.z > 10) r.position.z = -ringCount * 5 + 10;
      r.material.opacity = 0.08 + 0.10 * Math.sin(t + i * 0.4);
    });

    camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (-my * 0.5 - camera.position.y) * 0.04;
    camera.position.z  = 5 - scrollY * 0.003;

    const fade = Math.max(0, 1 - scrollY / 600);
    ico.material.opacity  = 0.55 * fade;
    ico2.material.opacity = 0.15 * fade;
    dots.material.opacity = 0.4 * Math.max(0.2, fade);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ─── COUNTER ANIMATION ───
function countUp(el, target, suffix) {
  let start = 0;
  const dur = 2000, step = 16;
  const inc = target / (dur / step);
  const timer = setInterval(() => {
    start = Math.min(start + inc, target);
    el.textContent = Math.floor(start) + (suffix || '');
    if (start >= target) clearInterval(timer);
  }, step);
}
const metricsGrid = document.querySelector('.metrics-grid');
if (metricsGrid) {
  const io2 = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => {
        countUp(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      });
      io2.disconnect();
    }
  }, { threshold: 0.3 });
  io2.observe(metricsGrid);
}

// ─── READING PROGRESS BAR (blog posts only) ───
const progressBar = document.getElementById('progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = pct + '%';
  });
}

// ─── TOC ACTIVE STATE (blog posts only) ───
const tocList = document.querySelectorAll('.toc-list a');
const tocHeadings = document.querySelectorAll('.article-body h2[id]');
if (tocList.length && tocHeadings.length) {
  const tocObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocList.forEach(l => l.classList.remove('toc-active'));
        const active = document.querySelector(`.toc-list a[href="#${e.target.id}"]`);
        if (active) active.classList.add('toc-active');
      }
    });
  }, { threshold: 0.5, rootMargin: '-80px 0px -60% 0px' });
  tocHeadings.forEach(h => tocObs.observe(h));
}

// ─── SHARE BUTTONS (blog posts only) ───
function sharePost(platform) {
  const url = encodeURIComponent(location.href);
  const title = encodeURIComponent(document.title);
  if (platform === 'twitter')  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
  if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}
function copyLink() {
  navigator.clipboard.writeText(location.href).then(() => {
    const btn = document.querySelector('.share-btn:last-child');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

// ═══════════════════════════════════════════
// AUTO BLOG LOADER
// Reads posts-data.js (loaded before this script)
// and renders cards automatically on blog.html and the
// homepage's "From the Blog" section.
//
// TO ADD A NEW POST: write the post HTML file, then add
// ONE entry to posts-data.js. That's the whole workflow.
// ═══════════════════════════════════════════
(function renderBlogCards() {
  if (typeof BLOG_POSTS === 'undefined') return;

  // sort newest first
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Full blog index page (#blog-index-grid) ──
  const blogGrid = document.getElementById('blog-index-grid');
  if (blogGrid) {
    if (!sorted.length) {
      blogGrid.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:15px">No posts yet — check back soon.</p>';
    } else {
      const [first, ...rest] = sorted;
      let html = `<div class="blog-featured" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:2px">
        <a href="${first.file}" class="blog-card lg">
          <div class="bc-arrow">&nearr;</div>
          <div class="bc-cat">${first.cat}</div>
          <div class="bc-title">${first.title}</div>
          <p class="bc-excerpt">${first.desc || ''}</p>
          <div class="bc-meta"><span>${formatDate(first.date)}</span><span>${first.read}</span></div>
        </a>`;
      if (rest[0]) {
        html += `<a href="${rest[0].file}" class="blog-card md">
          <div class="bc-arrow">&nearr;</div>
          <div class="bc-cat">${rest[0].cat}</div>
          <div class="bc-title">${rest[0].title}</div>
          <p class="bc-excerpt">${rest[0].desc || ''}</p>
          <div class="bc-meta"><span>${formatDate(rest[0].date)}</span><span>${rest[0].read}</span></div>
        </a>`;
      }
      html += `</div><div class="blog-list" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">`;
      rest.slice(1).forEach(p => {
        html += `<a href="${p.file}" class="blog-card sm">
          <div class="bc-arrow">&nearr;</div>
          <div class="bc-cat">${p.cat}</div>
          <div class="bc-title">${p.title}</div>
          <div class="bc-meta"><span>${formatDate(p.date)}</span><span>${p.read}</span></div>
        </a>`;
      });
      html += `</div>`;
      blogGrid.innerHTML = html;
    }
  }

  // ── Homepage "From the Blog" preview (#blog-preview-grid) — latest 3 ──
  const previewGrid = document.getElementById('blog-preview-grid');
  if (previewGrid) {
    const latest = sorted.slice(0, 3);
    previewGrid.innerHTML = latest.map((p, i) => `
      <a href="${p.file}" class="blog-card${i === 0 ? ' featured' : ''} reveal" style="transition-delay:${i * 0.1}s">
        <div class="bc-arrow">&nearr;</div>
        <div class="bc-cat">${p.cat}</div>
        <div class="bc-title">${p.title}</div>
        <div class="bc-meta"><span>${formatDate(p.date)}</span><span>${p.read}</span></div>
      </a>`).join('');
    // re-observe new .reveal elements
    previewGrid.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ── Related posts on individual post pages (#related-grid, excludes current post) ──
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    const currentFile = location.pathname.split('/').pop();
    const others = sorted.filter(p => p.file !== currentFile).slice(0, 3);
    relatedGrid.innerHTML = others.map(p => `
      <a href="${p.file}" class="related-card">
        <div class="rc-arrow">↗</div>
        <div class="rc-cat">${p.cat}</div>
        <div class="rc-title">${p.title}</div>
        <div class="rc-meta"><span>${formatDate(p.date)}</span><span>${p.read}</span></div>
      </a>`).join('');
  }
})();

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
