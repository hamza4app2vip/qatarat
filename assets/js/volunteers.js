document.addEventListener('DOMContentLoaded', () => {
  // تفعيل عدادات الإحصائيات
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText.replace(/,/g, '');
      const increment = target / 200; // سرعة العد
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    
    updateCount();
  });

  // التحقق من صحة نموذج التطوع وإرساله
  const volunteerForm = document.getElementById('volunteer-registration-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // التحقق من صحة النموذج
      if (!volunteerForm.checkValidity()) {
        event.stopPropagation();
        volunteerForm.classList.add('was-validated');
        return;
      }
      
      // إظهار رسالة التأكيد
      const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
      confirmationModal.show();
      
      // إعادة تعيين النموذج
      volunteerForm.reset();
      volunteerForm.classList.remove('was-validated');
    });
  }

  // تفعيل التلميحات (tooltips)
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // تحريك الصفحة بسلاسة عند النقر على روابط داخلية
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});document.addEventListener("DOMContentLoaded", () => {
  // ======= 1. أنيميشن عداد الإحصائيات =======
  const counters = document.querySelectorAll(".counter");
  const speed = 2000; // مدة الأنيميشن بالميلي ثانية

  const animateCounter = (counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;
      const increment = Math.ceil(target / (speed / 20));

      if (count < target) {
        counter.innerText = count + increment > target ? target : count + increment;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  // تشغيل العدادات عند ظهورها في الشاشة (lazy load)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));

  // ======= 2. تأثيرات hover على بطاقات الإحصائيات، الفرص، والشهادات =======
  const hoverCards = document.querySelectorAll(".stat-card, .opportunity-card, .testimonial-card");
  hoverCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.03)";
      card.style.boxShadow = "0 20px 40px rgba(1, 149, 185, 0.5)";
      card.style.transition = "transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "";
    });
  });

  // ======= 3. نموذج التسجيل: تحقق من صحة البيانات مع أنيميشن تنبيه =======
  const form = document.getElementById("volunteer-registration-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // مسح التنبيهات السابقة
    const alerts = form.querySelectorAll(".input-alert");
    alerts.forEach(alert => alert.remove());

    let valid = true;

    // دالة لإظهار رسالة خطأ
    const showError = (input, message) => {
      valid = false;
      const alert = document.createElement("div");
      alert.className = "input-alert";
      alert.style.color = "#d9534f";
      alert.style.fontSize = "0.9rem";
      alert.style.marginTop = "0.2rem";
      alert.style.animation = "shake 0.3s ease";
      alert.textContent = message;
      input.parentElement.appendChild(alert);
      input.style.borderColor = "#d9534f";
      setTimeout(() => {
        alert.style.animation = "";
      }, 300);
    };

    // تحقق من الحقول المطلوبة
    const requiredFields = [
      { id: "fullName", msg: "الرجاء إدخال الاسم الكامل" },
      { id: "email", msg: "الرجاء إدخال البريد الإلكتروني" },
      { id: "phone", msg: "الرجاء إدخال رقم الهاتف" },
      { id: "birthdate", msg: "الرجاء إدخال تاريخ الميلاد" },
      { id: "nationalId", msg: "الرجاء إدخال رقم الهوية" },
      { id: "gender", msg: "الرجاء اختيار الجنس" },
      { id: "volunteerType", msg: "الرجاء اختيار مجال التطوع" },
      { id: "availability", msg: "الرجاء اختيار الوقت المتاح" },
      { id: "location", msg: "الرجاء اختيار موقع التطوع" },
      { id: "experience", msg: "الرجاء اختيار مستوى الخبرة" },
      { id: "motivation", msg: "الرجاء شرح دوافعك للتطوع" },
      { id: "termsAgreement", msg: "يجب الموافقة على الشروط والأحكام" },
    ];

    requiredFields.forEach(field => {
      const input = form.querySelector(`#${field.id}`);
      if (input) {
        if ((input.type === "checkbox" && !input.checked) ||
            (input.value.trim() === "") ||
            (input.selectedIndex === 0 && input.tagName === "SELECT")) {
          showError(input, field.msg);
        } else {
          input.style.borderColor = "";
        }
      }
    });

    // تحقق من صحة البريد الإلكتروني بصيغة بسيطة
    const emailInput = form.querySelector("#email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailPattern.test(emailInput.value)) {
      showError(emailInput, "الرجاء إدخال بريد إلكتروني صالح");
    }

    // تحقق من رقم الهاتف (أرقام فقط وطول مناسب)
    const phoneInput = form.querySelector("#phone");
    const phonePattern = /^[0-9]{7,15}$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value.replace(/\D/g, ""))) {
      showError(phoneInput, "الرجاء إدخال رقم هاتف صالح");
    }

    if (!valid) {
      // تحريك النموذج عند الخطأ (أنيميشن shake)
      form.style.animation = "shake 0.4s ease";
      form.addEventListener("animationend", () => {
        form.style.animation = "";
      }, { once: true });
      return;
    }

    // إذا كان النموذج صالحاً، عرض مودال التأكيد
    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();

    // إعادة تعيين النموذج بعد الإغلاق
    confirmationModal._element.addEventListener("hidden.bs.modal", () => {
      form.reset();
    }, { once: true });
  });

  // ======= 4. تأثيرات على الصور الدائرية في شهادات المتطوعين =======
  const testimonialImages = document.querySelectorAll(".testimonial-image img");
  testimonialImages.forEach(img => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.1) rotate(5deg)";
      img.style.transition = "transform 0.5s ease";
      img.style.boxShadow = "0 0 15px var(--main)";
      img.style.borderColor = "var(--main)";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotate(0deg)";
      img.style.boxShadow = "";
      img.style.borderColor = "";
    });
  });

  // ======= 5. تحريك الأكورديون في الأسئلة الشائعة =======
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
      // تأثير دوران السهم
      const icon = button.querySelector(".fas");
      if (icon) {
        icon.classList.toggle("fa-rotate-180");
        icon.style.transition = "transform 0.4s ease";
      }
    });
  });

  // ======= 6. انيميشن shake (تعريف keyframes) =======
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .fa-rotate-180 {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);

  // ======= 7. تحسين تجربة التمرير (Smooth Scroll للروابط الداخلية) =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});