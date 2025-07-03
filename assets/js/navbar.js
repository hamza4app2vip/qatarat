document.addEventListener("DOMContentLoaded", () => {
  // التحقق من وجود شريط التبرع العاجل
  const hasUrgentBar = document.querySelector('.urgent-bar') !== null;
  
  // الحصول على اسم الصفحة الحالية لتحديد الرابط النشط
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // إنشاء شريط التبرع العاجل إذا لم يكن موجوداً
  if (!hasUrgentBar) {
    const urgentBar = document.createElement('div');
    urgentBar.className = 'urgent-bar d-flex justify-content-center align-items-center gap-3 glassmorph';
    urgentBar.innerHTML = `
      <span>تبرع الآن لإنقاذ حياة في غزة</span>
      <a href="donate.html#urgent" class="btn btn-light btn-sm">تبرع عاجل</a>
    `;
    document.body.insertBefore(urgentBar, document.body.firstChild);
  }
  
  // التحقق من وجود عنصر header
  let header = document.querySelector('header');
  if (!header) {
    header = document.createElement('header');
    document.body.insertBefore(header, document.body.firstChild.nextSibling);
  }
  
  // إنشاء محتوى شريط التنقل الموحد
  header.innerHTML = `
  <nav class="navbar navbar-expand-lg container">
    <a class="navbar-brand d-flex align-items-center" href="index.html">
      <img src="assets/img/logo.png" alt="شعار قطرات الغيث" />
      <div class="ms-2">
        <div class="fw-bold fs-5">قطرات الغيث</div>
        <small class="text-muted">Qatrat Alghaith</small>
      </div>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="تبديل التنقل">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link" href="index.html">الرئيسية</a></li>
        <li class="nav-item"><a class="nav-link" href="about.html">عن المؤسسة</a></li>
        <li class="nav-item"><a class="nav-link" href="projects.html">مشاريعنا</a></li>
        <li class="nav-item"><a class="nav-link" href="achievements.html">إنجازاتنا</a></li>
        <li class="nav-item"><a class="nav-link" href="donate.html">التبرعات</a></li>
        <li class="nav-item"><a class="nav-link" href="volunteers.html">المتطوعين</a></li>
        <li class="nav-item"><a class="nav-link" href="news.html">الأخبار</a></li>
        <li class="nav-item"><a class="nav-link" href="statistics.html">الإحصائيات</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">اتصل بنا</a></li>
      </ul>
      <!-- قسم تسجيل الدخول / لوحة التحكم -->
      <div class="d-flex align-items-center gap-2">
        <div id="guest-view">
          <a href="login.html" class="btn btn-outline-primary me-2"><i class="fas fa-sign-in-alt me-1"></i> تسجيل الدخول</a>
        </div>
        <div id="user-view" class="d-none">
          <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-user-circle me-1"></i>
              <span id="username">اسم المستخدم</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="dashboard.html"><i class="fas fa-tachometer-alt me-2"></i> لوحة التحكم</a></li>
              <li><a class="dropdown-item" href="dashboard.html#donations"><i class="fas fa-donate me-2"></i> تبرعاتي</a></li>
              <li><a class="dropdown-item" href="dashboard.html#profile"><i class="fas fa-user-edit me-2"></i> الملف الشخصي</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" id="logout-btn"><i class="fas fa-sign-out-alt me-2"></i> تسجيل الخروج</a></li>
            </ul>
          </div>
        </div>
        <a href="donate.html" class="btn btn-primary">تبرع الآن</a>
      </div>
    </div>
  </nav>
  `;
  
  // عناصر واجهة المستخدم للتسجيل
  const guestView = document.getElementById('guest-view');
  const userView = document.getElementById('user-view');
  const usernameElement = document.getElementById('username');
  const logoutBtn = document.getElementById('logout-btn');

  // تغيير خلفية Navbar عند التمرير
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".curved-navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(0, 191, 255, 0.25)";
        navbar.style.boxShadow = "0 0 25px #00bfff";
        navbar.style.backdropFilter = "blur(20px)";
      } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
        navbar.style.boxShadow = "0 8px 20px rgba(0, 191, 255, 0.3)";
        navbar.style.backdropFilter = "blur(12px)";
      }
    }
  });

  // التحقق من حالة تسجيل الدخول
  function checkLoginStatus() {
    // محاكاة التحقق من تسجيل الدخول (يمكن استبدالها بالتحقق الفعلي من localStorage أو API)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (guestView && userView && usernameElement) {
      if (isLoggedIn && username) {
        // إذا كان المستخدم مسجل الدخول
        guestView.classList.add('d-none');
        userView.classList.remove('d-none');
        usernameElement.textContent = username;
      } else {
        // إذا لم يكن المستخدم مسجل الدخول
        guestView.classList.remove('d-none');
        userView.classList.add('d-none');
      }
    }
  }

  // تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // حذف بيانات تسجيل الدخول
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      
      // تحديث واجهة المستخدم
      checkLoginStatus();
      
      // عرض رسالة نجاح
      showToast('تم تسجيل الخروج بنجاح', 'success');
      
      // إعادة التوجيه إلى الصفحة الرئيسية بعد تأخير قصير
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }

  // عرض رسالة توست
  function showToast(message, type = 'info') {
    // التحقق من وجود عنصر توست في الصفحة
    let toastContainer = document.querySelector('.toast-container');
    
    // إنشاء حاوية التوست إذا لم تكن موجودة
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // إنشاء عنصر التوست
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
        </div>
      </div>
    `;
    
    // إضافة التوست إلى الحاوية
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // تهيئة وعرض التوست
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // إزالة التوست بعد إغلاقه
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
  checkLoginStatus();
});