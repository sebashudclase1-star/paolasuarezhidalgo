const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    navAs.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + cur) a.style.background = 'var(--rose-light)';
      else a.style.background = '';
    });
  });

  // Project filter
  function filterProjects(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = (cat === 'todos' || card.dataset.cat === cat) ? 'block' : 'none';
    });
  }

  // Photo gallery
  let photos = [];
  function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        photos.push(ev.target.result);
        renderGallery();
      };
      reader.readAsDataURL(file);
    });
  }
  function renderGallery() {
    const gallery = document.getElementById('photoGallery');
    const empty = document.getElementById('photoEmpty');
    if (photos.length === 0) {
      empty.style.display = 'flex';
      gallery.innerHTML = '';
      gallery.appendChild(empty);
      return;
    }
    empty.style.display = 'none';
    gallery.innerHTML = '';
    photos.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.innerHTML = `<img src="${src}" alt="Foto ${i+1}" onclick="openLightbox('${src}')">
        <button class="photo-remove" onclick="removePhoto(${i})"><i class="fa-solid fa-xmark"></i></button>`;
      gallery.appendChild(item);
    });
  }
  function removePhoto(i) { photos.splice(i, 1); renderGallery(); }
  function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('open');
  }
  function closeLightbox(e) {
    if (!e || e.target !== document.getElementById('lightboxImg'))
      document.getElementById('lightbox').classList.remove('open');
  }

  // Drag and drop for photos
  const uploadZone = document.querySelector('.photo-upload-zone');
  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.style.borderColor = 'var(--gold)'; });
  uploadZone.addEventListener('dragleave', () => { uploadZone.style.borderColor = ''; });
  uploadZone.addEventListener('drop', e => {
    e.preventDefault(); uploadZone.style.borderColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => { photos.push(ev.target.result); renderGallery(); };
      reader.readAsDataURL(file);
    });
  });

  // Contact form
  function enviarFormulario() {
    const nombre = document.getElementById('cNombre').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const mensaje = document.getElementById('cMensaje').value.trim();
    if (!nombre || !email || !mensaje) { alert('Por favor completa los campos obligatorios.'); return; }
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }