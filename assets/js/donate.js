function animateStat(el, to) {
  let start = 0, duration = 1200, startTime = null;
  function animate(time) {
    if (!startTime) startTime = time;
    let progress = Math.min((time - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (to - start) + start);
    if (progress < 1) requestAnimationFrame(animate);
    else el.textContent = to;
  }
  requestAnimationFrame(animate);
}
animateStat(document.getElementById('stat1'), 87);
animateStat(document.getElementById('stat2'), 15830);
animateStat(document.getElementById('stat3'), 24);
animateStat(document.getElementById('stat4'), 1237);

// طرق الدفع
document.querySelectorAll('.pay-method').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// تكرار التبرع
document.querySelectorAll('.freq-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// مبالغ سريعة
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    let amount = parseInt(document.getElementById('amount-input').value) || 0;
    amount += parseInt(this.dataset.amount);
    document.getElementById('amount-input').value = amount;
    updateProgress(amount);
  });
});

// تحديث العملة
document.getElementById('currency-select').addEventListener('change', function() {
  let sym = this.value === "USD" ? "$" : (this.value === "SAR" ? "ر.س" : "€");
  document.querySelector('.amount-box span').textContent = sym;
  document.getElementById('goal-num').textContent = sym + "1000";
  document.getElementById('goal-num2').textContent = sym + "1000";
  document.getElementById('raised-num').textContent = sym + "550";
  document.getElementById('match-max').textContent = sym + "100";
  document.getElementById('credit-num').textContent = sym + "10";
});

// شريط التقدم
function updateProgress(newAmount) {
  let raised = 550 + (parseInt(newAmount) - 50); // 50 هو الافتراضي
  let goal = 1000;
  let percent = Math.min(raised / goal * 100, 100);
  document.getElementById('raised-num').textContent = document.querySelector('.amount-box span').textContent + raised;
  let bar = document.getElementById('progress-bar');
  bar.style.width = percent + "%";
  bar.style.setProperty('--bar-width', percent + "%");
}
document.getElementById('amount-input').addEventListener('input', function() {
  document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('selected'));
  updateProgress(this.value);
});

// إهداء التبرع
document.getElementById('dedicate-check').addEventListener('change', function() {
  let input = document.getElementById('dedicate-input');
  if(this.checked) {
    input.classList.add('show');
    input.focus();
  } else {
    input.classList.remove('show');
    input.value = '';
  }
});

// زر التبرع
document.getElementById('donate-btn').addEventListener('click', function(e) {
  e.preventDefault();
  let amount = parseInt(document.getElementById('amount-input').value);
  if(!amount || amount < 1) {
    alert('يرجى إدخال مبلغ تبرع صحيح.');
    return;
  }
  this.disabled = true;
  this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري معالجة التبرع...';
  setTimeout(() => {
    this.disabled = false;
    this.innerHTML = '<i class="fa-solid fa-heart"></i> أكمل التبرع الآن';
    document.getElementById('success-msg').classList.add('show');
    setTimeout(() => {
      document.getElementById('success-msg').classList.remove('show');
    }, 5000);
  }, 2200);
});

// حركة عداد الرصيد
function animateCredit(num, el) {
  let start = 0, end = num, duration = 800, startTime = null;
  function animate(time) {
    if (!startTime) startTime = time;
    let progress = Math.min((time - startTime) / duration, 1);
    el.textContent = document.querySelector('.amount-box span').textContent + Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
animateCredit(10, document.getElementById('credit-num'));

// حركة عداد التقدم
setTimeout(() => {
  document.getElementById('progress-bar').style.width = "55%";
  document.getElementById('progress-bar').style.setProperty('--bar-width', "55%");
}, 500);

// أخبار ديناميكية
const newsArr = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "انطلاق حملة دفء الشتاء 2025",
    date: "2 يوليو 2025",
    desc: "بدأت حملة دفء الشتاء لتوفير البطانيات والملابس للأسر المحتاجة في المناطق الباردة.",
    link: "#"
  },
  {
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "نجاح جمع مليون ريال لمبادرة التعليم",
    date: "1 يوليو 2025",
    desc: "بفضل تبرعاتكم تم تمويل 10 مدارس جديدة للأطفال في القرى النائية.",
    link: "#"
  },
  {
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    title: "مبادرة الصحة للجميع",
    date: "28 يونيو 2025",
    desc: "توفير فحوصات طبية مجانية لأكثر من 2000 شخص في المناطق الريفية.",
    link: "#"
  }
];
let newsList = document.getElementById('news-list');
newsArr.forEach(n => {
  let card = document.createElement('div');
  card.className = 'news-card';
  card.innerHTML = `
    <img src="${n.img}" class="news-img" alt="${n.title}" />
    <div class="news-title2">${n.title}</div>
    <div class="news-date">${n.date}</div>
    <div class="news-desc">${n.desc}</div>
    <a href="${n.link}" class="news-link">اقرأ المزيد <i class="fa-solid fa-arrow-left"></i></a>
  `;
  newsList.appendChild(card);
});