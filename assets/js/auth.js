// تبديل النماذج
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

showRegisterLink.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  clearErrors();
});

showLoginLink.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  clearErrors();
});

// التحقق من صحة النماذج
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
}

// التحقق من وجود مستخدمين مسجلين
function checkRegisteredUsers() {
  const users = localStorage.getItem('users');
  if (!users) {
    // إنشاء مصفوفة فارغة للمستخدمين إذا لم تكن موجودة
    localStorage.setItem('users', JSON.stringify([]));
  }
}

// إضافة مستخدم جديد
function addUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // التحقق من عدم وجود البريد الإلكتروني مسبقاً
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' };
  }
  
  // إنشاء كائن المستخدم مع بيانات إضافية
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // في تطبيق حقيقي يجب تشفير كلمة المرور
    joinDate: new Date().toISOString(),
    phone: '',
    address: '',
    donations: [],
    recurringDonations: [],
    profileImage: 'https://via.placeholder.com/100'
  };
  
  // إضافة المستخدم للمصفوفة
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true, user: newUser };
}

// التحقق من بيانات تسجيل الدخول
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // تخزين بيانات المستخدم في الجلسة
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user.name);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
}

// التحقق من وجود مستخدمين عند تحميل الصفحة
checkRegisteredUsers();

// معالجة نموذج تسجيل الدخول
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const email = loginForm['login-email'].value.trim();
  const password = loginForm['login-password'].value.trim();

  if (!validateEmail(email)) {
    document.getElementById('login-email-error').style.display = 'block';
    valid = false;
  }
  if (password.length === 0) {
    document.getElementById('login-password-error').style.display = 'block';
    valid = false;
  }

  if (valid) {
    const result = loginUser(email, password);
    if (result.success) {
      // تم تسجيل الدخول بنجاح
      alert('تم تسجيل الدخول بنجاح!');
      // توجيه المستخدم إلى لوحة التحكم
      window.location.href = 'dashboard.html';
    } else {
      // فشل تسجيل الدخول
      alert(result.message);
    }
  }
});

// معالجة نموذج إنشاء حساب
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const name = registerForm['register-name'].value.trim();
  const email = registerForm['register-email'].value.trim();
  const password = registerForm['register-password'].value.trim();
  const passwordConfirm = registerForm['register-password-confirm'].value.trim();

  if (name.length === 0) {
    document.getElementById('register-name-error').style.display = 'block';
    valid = false;
  }
  if (!validateEmail(email)) {
    document.getElementById('register-email-error').style.display = 'block';
    valid = false;
  }
  if (password.length < 6) {
    document.getElementById('register-password-error').style.display = 'block';
    valid = false;
  }
  if (password !== passwordConfirm) {
    document.getElementById('register-password-confirm-error').style.display = 'block';
    valid = false;
  }

  if (valid) {
    const result = addUser(name, email, password);
    if (result.success) {
      // تم إنشاء الحساب بنجاح
      alert('تم إنشاء الحساب بنجاح!');
      // تسجيل دخول المستخدم تلقائياً
      loginUser(email, password);
      // توجيه المستخدم إلى لوحة التحكم
      window.location.href = 'dashboard.html';
    } else {
      // فشل إنشاء الحساب
      alert(result.message);
    }
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}