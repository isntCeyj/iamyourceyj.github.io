// ==========================
// AUTH SYSTEM
// ==========================
window.AUTH = {
  seedDemo: function() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([
        { name: 'My Love', email: 'love@example.com', pass: '1234' }
      ]));
    }
  },

  register: function(name, email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered' };
    users.push({ name, email, pass });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  },

  login: function(email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === email && u.pass === pass);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: 'Email or password incorrect' };
  },

  logout: function() {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: function() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
};

// Initialize demo user if needed
AUTH.seedDemo();

// ==========================
// PHOTOS PAGE (PHOTO DECK)
// ==========================
window.PhotoDeck = {
  init: function() {
    const holders = document.querySelectorAll('.photo-deck-holder img');
    holders.forEach(img => {
      img.addEventListener('click', () => {
        alert('This is just a memory placeholder. You cannot upload new pictures here.');
      });
    });
  }
};

// ==========================
// PHOTOBOOTH PAGE
// ==========================
window.PhotoBooth = {
  init: function() {
    const upload = document.getElementById('pbUpload');
    const canvas = document.getElementById('pbCanvas');
    const ctx = canvas.getContext('2d');
    const templateSelect = document.getElementById('templateSelect');
    const preview = document.getElementById('pbPreview');
    const downloadBtn = document.getElementById('pbDownload');
    let img = new Image();

    upload.addEventListener('change', e => {
      const reader = new FileReader();
      reader.onload = function(ev) { img.src = ev.target.result; }
      reader.readAsDataURL(e.target.files[0]);
    });

    preview.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Template overlay
      const val = templateSelect.value;
      if(val === 'love') {
        ctx.strokeStyle='pink'; ctx.lineWidth=20; ctx.strokeRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(255,182,193,0.2)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      } else if(val === 'christmas') {
        ctx.strokeStyle='green'; ctx.lineWidth=15; ctx.strokeRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(0,255,0,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      } else if(val === 'halloween') {
        ctx.strokeStyle='orange'; ctx.lineWidth=15; ctx.strokeRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(255,165,0,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      } else if(val === 'fantasy') {
        ctx.strokeStyle='purple'; ctx.lineWidth=15; ctx.strokeRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(128,0,128,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      }
    });

    downloadBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = 'photobooth.png';
      a.click();
    });
  }
};

// ==========================
// VIDEOS PAGE
// ==========================
window.Videos = {
  init: function() {
    const boxes = document.querySelectorAll('.video-box');
    const popup = document.getElementById('videoPopup');
    const popupVid = document.getElementById('popupVid');
    const closeBtn = document.getElementById('closeVideo');

    boxes.forEach(box => {
      box.addEventListener('click', () => {
        const src = box.dataset.src;
        popupVid.src = src;
        popup.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      popupVid.pause();
    });
  }
};

// ==========================
// UPLOAD GAME PAGE
// ==========================
window.UploadGame = {
  questions: [
    { q:"Where did we first meet?", choices:["A. Park","B. Mall","C. School","D. Other"], answer:"C" },
    { q:"What's my favorite color?", choices:["A. Red","B. Pink","C. Blue","D. Other"], answer:"B" }
  ],

  currentIndex:0,
  init: function() {
    const qTitle = document.getElementById('questionTitle');
    const options = document.querySelectorAll('.question-option input');
    const nextBtn = document.getElementById('nextQuestion');
    const backBtn = document.getElementById('backQuestion');
    const finishBtn = document.getElementById('finishGame');
    const giftPopup = document.getElementById('giftPopup');

    function renderQuestion() {
      const q = window.UploadGame.questions[window.UploadGame.currentIndex];
      qTitle.textContent = q.q;
      options.forEach((opt, i) => {
        opt.nextElementSibling.textContent = q.choices[i];
        opt.checked = false;
      });
    }

    nextBtn.addEventListener('click', () => {
      if(window.UploadGame.currentIndex < window.UploadGame.questions.length-1){
        window.UploadGame.currentIndex++;
        renderQuestion();
      }
    });

    backBtn.addEventListener('click', () => {
      if(window.UploadGame.currentIndex > 0){
        window.UploadGame.currentIndex--;
        renderQuestion();
      }
    });

    finishBtn.addEventListener('click', () => {
      giftPopup.style.display = 'flex';
    });

    renderQuestion();
  }
};

// ==========================
// INIT PAGES
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  // Redirect to login if not logged in
  if(!AUTH.getCurrentUser() && !document.body.classList.contains('auth-page')) location.href='login.html';

  if(document.body.classList.contains('photos-page')) PhotoDeck.init();
  if(document.body.classList.contains('photobooth-page')) PhotoBooth.init();
  if(document.body.classList.contains('videos-page')) Videos.init();
  if(document.body.classList.contains('upload-game-page')) UploadGame.init();
});

