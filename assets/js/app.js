// Simple client-side auth using localStorage
window.AUTH = {
  // Initialize demo user if none exists
  seedDemo: function() {
    if(!localStorage.getItem('users')){
      const demoUsers = [{name:'My Love', email:'love@example.com', pass:'1234'}];
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }
  },

  // Register new user
  register: function(name, email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered' };
    users.push({ name, email, pass });
    localStorage.setItem('users', JSON.stringify(users));
    return { ok: true };
  },

  // Login user
  login: function(email, pass) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === email && u.pass === pass);
    if(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { ok: true };
    }
    return { ok: false, msg: 'Email or password incorrect' };
  },

  // Logout user
  logout: function() {
    localStorage.removeItem('currentUser');
  },

  // Get currently logged-in user
  getUser: function() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};

// Seed demo user on load
AUTH.seedDemo();
