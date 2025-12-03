// ======= AUTH SYSTEM =======
window.AUTH = {
  seedDemo: function() {
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify([
        {name:'My Love', email:'love@example.com', pass:'1234'}
      ]));
    }
  },
  register: function(name,email,pass){
    let users = JSON.parse(localStorage.getItem('users')||'[]');
    if(users.find(u=>u.email===email)) return {success:false,message:'Email already registered'};
    users.push({name,email,pass});
    localStorage.setItem('users', JSON.stringify(users));
    return {success:true};
  },
  login: function(email,pass){
    let users = JSON.parse(localStorage.getItem('users')||'[]');
    let user = users.find(u=>u.email===email && u.pass===pass);
    if(user){ localStorage.setItem('currentUser', JSON.stringify(user)); return {success:true}; }
    return {success:false,message:'Email or password incorrect'};
  },
  logout: function(){ localStorage.removeItem('currentUser'); }
};

AUTH.seedDemo();

// ======= HOME PAGE FILM =======
function initFilmRoll(){
  const items = document.querySelectorAll('.film-item');
  items.forEach(item=>{
    item.addEventListener('click',()=>{
      const page = item.dataset.page;
      if(page) window.location.href = page;
    });
  });
}

// ======= PHOTO DECK =======
function initPhotoDeck(){
  const holders = document.querySelectorAll('.photo-holder');
  holders.forEach(holder=>{
    const imgs = ['assets/img/photo1.jpg','assets/img/photo2.jpg','assets/img/photo3.jpg','assets/img/photo4.jpg'];
    imgs.forEach(src=>{
      const img = document.createElement('img');
      img.src = src;
      holder.appendChild(img);
    });
  });
}

// ======= PHOTOBOOTH =======
function initPhotoBooth(){
  const upload = document.getElementById('pbUpload');
  const select = document.getElementById('templateSelect');
  const previewBtn = document.getElementById('pbPreview');
  const canvas = document.getElementById('pbCanvas');
  const ctx = canvas.getContext('2d');
  let img = new Image();

  // Upload or take picture
  upload.addEventListener('change', e=>{
    const reader = new FileReader();
    reader.onload = ev=>{ img.src = ev.target.result; }
    reader.readAsDataURL(e.target.files[0]);
  });

  previewBtn.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);

    // Templates
    if(select.value==='christmas'){
      ctx.strokeStyle='red'; ctx.lineWidth=20; ctx.strokeRect(0,0,canvas.width,canvas.height);
    } else if(select.value==='halloween'){
      ctx.strokeStyle='orange'; ctx.lineWidth=20; ctx.strokeRect(0,0,canvas.width,canvas.height);
    } else if(select.value==='love'){
      ctx.strokeStyle='pink'; ctx.lineWidth=20; ctx.strokeRect(0,0,canvas.width,canvas.height);
    } else if(select.value==='fantasy'){
      ctx.strokeStyle='purple'; ctx.lineWidth=20; ctx.strokeRect(0,0,canvas.width,canvas.height);
    }
  });

  document.getElementById('pbDownload').addEventListener('click', ()=>{
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'photobooth.png';
    a.click();
  });
}

// ======= VIDEO PAGE =======
function initVideoPage(){
  const videoBoxes = document.querySelectorAll('.video-box');
  const popup = document.getElementById('videoPopup');
  const popupVid = document.getElementById('popupVid');
  const closeBtn = document.getElementById('closeVideo');

  videoBoxes.forEach(box=>{
    b
