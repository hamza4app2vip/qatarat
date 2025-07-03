// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    /* =============================
       1. عداد الإحصاءات متحرك (Counter Up)
    ============================== */
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        const count = +counter.innerText.replace(/,/g, "");
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
  
  
    /* =============================
       2. تأثير ظهور العناصر عند التمرير (Scroll Reveal)
    ============================== */
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150; // نقطة الظهور قبل الدخول للشاشة
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // تفعيل عند التحميل
  
  
    /* =============================
       3. تأثير تمرير ناعم للروابط الداخلية
    ============================== */
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  
  
    /* =============================
       4. تأثير تظليل البطاقات عند المرور (Hover Animation)
       - يمكن تعزيزه عبر CSS، هنا إضافة ظل متحرك بسيط
    ============================== */
    const cards = document.querySelectorAll(".card, .project-card, .achievement-item");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        card.style.transform = "translateY(-8px)";
        card.style.boxShadow = "0 8px 30px rgba(0,123,255,0.3)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 4px 15px rgba(0,123,255,0.15)";
      });
    });
  
  
    /* =============================
       5. نموذج التبرع - تحقق أولي وإرسال وهمي مع تأثير تحميل
    ============================== */
    const donationForm = document.getElementById("online-donation");
    if (donationForm) {
      donationForm.addEventListener("submit", e => {
        e.preventDefault();
  
        // تحقق بسيط
        const amount = donationForm.amount.value.trim();
        const email = donationForm.email.value.trim();
        if (!amount || isNaN(amount) || amount <= 0) {
          alert("يرجى إدخال مبلغ تبرع صحيح.");
          donationForm.amount.focus();
          return;
        }
        if (!email || !email.includes("@")) {
          alert("يرجى إدخال بريد إلكتروني صالح.");
          donationForm.email.focus();
          return;
        }
  
        // عرض حالة تحميل
        const submitBtn = donationForm.querySelector("button[type=submit]");
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> جاري المعالجة...`;
  
        // محاكاة إرسال (يمكن ربط API حقيقي هنا)
        setTimeout(() => {
          alert(`شكرًا لتبرعك بقيمة ${amount} ر.س! سيتم التواصل معك عبر ${email}.`);
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fas fa-credit-card"></i> تبرع آمن عبر الإنترنت`;
          donationForm.reset();
        }, 2000);
      });
    }
  
  
    /* =============================
       6. نموذج الاتصال - تحقق أولي مع تأثيرات
    ============================== */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", e => {
        e.preventDefault();
  
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
  
        if (!name) {
          alert("يرجى إدخال اسمك الكامل.");
          contactForm.name.focus();
          return;
        }
        if (!email || !email.includes("@")) {
          alert("يرجى إدخال بريد إلكتروني صالح.");
          contactForm.email.focus();
          return;
        }
        if (!message) {
          alert("يرجى كتابة رسالتك.");
          contactForm.message.focus();
          return;
        }
  
        // عرض حالة تحميل
        const submitBtn = contactForm.querySelector("button[type=submit]");
        submitBtn.disabled = true;
        submitBtn.textContent = "جاري الإرسال...";
  
        // محاكاة إرسال
        setTimeout(() => {
          alert("تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا.");
          submitBtn.disabled = false;
          submitBtn.textContent = "إرسال";
          contactForm.reset();
        }, 2000);
      });
    }
  
  
    /* =============================
       7. إضافة تأثيرات على أزرار التبرع في المشاريع
    ============================== */
    const donateButtons = document.querySelectorAll('a[href*="donate.html"]');
    donateButtons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transition = "transform 0.2s ease";
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = "0 4px 12px rgba(0,123,255,0.4)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "none";
      });
    });
  
  
    /* =============================
       8. تحسين أداء الصور (lazy loading)
    ============================== */
    const lazyImages = document.querySelectorAll("img");
    lazyImages.forEach(img => {
      img.loading = "lazy";
    });
  
  
    /* =============================
       9. إضافة تأثير Fade-in عند تحميل الصفحة
    ============================== */
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 0.8s ease-in-out";
    window.onload = () => {
      document.body.style.opacity = 1;
    };
  
  });
  // reveal-on-scroll effect
const revealElements = document.querySelectorAll(".reveal-on-scroll");
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();