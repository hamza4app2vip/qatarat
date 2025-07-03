document.addEventListener('DOMContentLoaded', () => {
    // التحقق من تسجيل الدخول
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = 'login.html';
      return;
    }
  
    // الحصول على بيانات المستخدم
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const username = currentUser.name || 'المستخدم';
    const firstName = username.split(' ')[0];
    const email = currentUser.email || '';
    const joinDate = currentUser.joinDate ? new Date(currentUser.joinDate).toLocaleDateString('ar-SA') : '';
  
    // تحديث اسم المستخدم في الواجهة
    const usernameEls = [
      document.getElementById('username'),
      document.getElementById('sidebar-username'),
      document.getElementById('welcome-username')
    ];
    if (usernameEls[0]) usernameEls[0].textContent = username;
    if (usernameEls[1]) usernameEls[1].textContent = username;
    if (usernameEls[2]) usernameEls[2].textContent = firstName;
  
    // تحديث بيانات الملف الشخصي
    const profileNameInput = document.getElementById('profile-name');
    const profileEmailInput = document.getElementById('profile-email');
    const profilePhoneInput = document.getElementById('profile-phone');
    const profileAddressInput = document.getElementById('profile-address');
  
    if (profileNameInput) profileNameInput.value = username;
    if (profileEmailInput) profileEmailInput.value = email;
    if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || '';
    if (profileAddressInput) profileAddressInput.value = currentUser.address || '';
  
    // تحديث تاريخ الانضمام
    const joinDateElement = document.querySelector('.user-info .text-muted.small');
    if (joinDateElement && joinDate) {
      joinDateElement.textContent = `عضو منذ ${joinDate}`;
    } // <-- إغلاق الشرط هنا
  
    // معالجة تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('username');
          localStorage.removeItem('currentUser');
          alert('تم تسجيل الخروج بنجاح!');
          window.location.href = 'index.html';
        }
      });
    }
  
    // معالجة تحديث الملف الشخصي
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const currentPassword = document.getElementById('current-password').value;
  
        if (newPassword && newPassword !== confirmPassword) {
          alert('كلمات المرور غير متطابقة');
          return;
        }
  
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.id === currentUser.id);
  
        if (userIndex !== -1) {
          if (newPassword && currentPassword !== currentUser.password) {
            alert('كلمة المرور الحالية غير صحيحة');
            return;
          }
  
          const updatedUser = {
            ...users[userIndex],
            name: document.getElementById('profile-name').value.trim(),
            email: document.getElementById('profile-email').value.trim(),
            phone: document.getElementById('profile-phone').value.trim(),
            address: document.getElementById('profile-address').value.trim()
          };
  
          if (newPassword) {
            updatedUser.password = newPassword;
          }
  
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          localStorage.setItem('username', updatedUser.name);
  
          usernameEls.forEach(el => {
            if (el) el.textContent = el.id === 'welcome-username' ? updatedUser.name.split(' ')[0] : updatedUser.name;
          });
  
          alert('تم حفظ التغييرات بنجاح!');
        } else {
          alert('حدث خطأ أثناء تحديث البيانات');
        }
      });
    }
  
    // تفعيل عدادات الإحصاءات
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-count");
          const count = +counter.innerText.replace(/,/g, "");
          const increment = target / 200;
          if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
      });
    }
  
    // تعليم الإشعارات كمقروءة
    const markAllReadBtn = document.querySelector('#notifications button');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.list-group-item.unread');
        unreadItems.forEach(item => item.classList.remove('unread'));
  
        const notificationBadge = document.querySelector('.nav-link .badge');
        if (notificationBadge) {
          notificationBadge.textContent = '0';
          notificationBadge.style.display = 'none';
        }
  
        alert('تم تعليم جميع الإشعارات كمقروءة');
      });
    }
  
    // تفعيل/إيقاف التبرعات الدورية
    const recurringBtns = document.querySelectorAll('#recurring .btn-outline-danger, #recurring .btn-success');
    recurringBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.card');
        const statusBadge = card.querySelector('.badge');
        const isActive = statusBadge.classList.contains('bg-success');
  
        if (isActive) {
          statusBadge.classList.replace('bg-success', 'bg-secondary');
          statusBadge.textContent = 'متوقف';
          this.innerHTML = '<i class="fas fa-play me-1"></i> إعادة تفعيل';
          this.classList.replace('btn-outline-danger', 'btn-success');
          alert('تم إيقاف التبرع الدوري بنجاح');
        } else {
          statusBadge.classList.replace('bg-secondary', 'bg-success');
          statusBadge.textContent = 'نشط';
          this.innerHTML = '<i class="fas fa-pause me-1"></i> إيقاف مؤقت';
          this.classList.replace('btn-success', 'btn-outline-danger');
          alert('تم إعادة تفعيل التبرع الدوري بنجاح');
        }
      });
    });
  
    // تغيير التبويبات حسب الهاش
    const hashValue = window.location.hash;
    if (hashValue) {
      const tabId = hashValue.substring(1);
      const tabElement = document.querySelector(`a[href="#${tabId}"]`);
      if (tabElement) {
        tabElement.click();
      }
    }
  });