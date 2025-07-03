// JavaScript لصفحة تفاصيل الخبر

document.addEventListener('DOMContentLoaded', function() {
  // استخراج معرف الخبر من عنوان URL
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');
  
  // إذا لم يتم تحديد معرف الخبر، استخدم الافتراضي (1)
  const currentNewsId = newsId || '1';
  
  // بيانات الأخبار (في التطبيق الحقيقي، يمكن جلب هذه البيانات من قاعدة بيانات)
  const newsData = {
    '1': {
      title: 'بدء حملة إغاثة عاجلة في غزة',
      date: '15 يونيو 2025',
      category: 'حملات إغاثية',
      author: 'فريق قطرات الغيث',
      image: 'assets/img/news1.svg',
      content: document.getElementById('news-content-full').innerHTML
    },
    '2': {
      title: 'انضم إلى فريق المتطوعين الآن',
      date: '10 يونيو 2025',
      category: 'تطوع',
      author: 'قسم المتطوعين',
      image: 'assets/img/news2.svg',
      content: `
        <p>تعلن مؤسسة قطرات الغيث عن فتح باب التطوع للراغبين في المشاركة في مشاريعها الإنسانية المختلفة. نحن بحاجة إلى متطوعين في مختلف المجالات للمساعدة في تنفيذ مشاريعنا الإنسانية وإحداث فرق حقيقي في حياة المحتاجين.</p>
        
        <h2>مجالات التطوع المتاحة</h2>
        <ul>
          <li>الإغاثة الميدانية وتوزيع المساعدات</li>
          <li>الدعم اللوجستي والإداري</li>
          <li>التسويق والإعلام</li>
          <li>تنظيم الفعاليات والحملات</li>
          <li>الترجمة والتوثيق</li>
          <li>التصميم والمونتاج</li>
        </ul>
        
        <p>يقول مدير قسم المتطوعين، السيد خالد العمري: "المتطوعون هم العمود الفقري لعملنا الإنساني، وبفضلهم نستطيع الوصول إلى أكبر عدد ممكن من المستفيدين وتقديم المساعدة لهم بشكل فعال وسريع".</p>
        
        <h2>شروط التطوع</h2>
        <ul>
          <li>أن يكون المتقدم قد أتم 18 عاماً</li>
          <li>الالتزام بقيم ومبادئ المؤسسة</li>
          <li>القدرة على تخصيص وقت كافٍ للعمل التطوعي</li>
          <li>امتلاك المهارات اللازمة للمجال المتقدم له</li>
        </ul>
        
        <h2>مميزات التطوع معنا</h2>
        <ul>
          <li>اكتساب خبرات عملية في مجال العمل الإنساني</li>
          <li>التدريب المستمر وتطوير المهارات</li>
          <li>شهادات خبرة معتمدة</li>
          <li>فرصة للمشاركة في مشاريع دولية</li>
          <li>بناء شبكة علاقات مهنية واسعة</li>
        </ul>
        
        <div class="news-cta text-center my-5">
          <a href="volunteers.html" class="btn btn-primary btn-lg px-5"><i class="fas fa-users me-2"></i>سجل الآن كمتطوع</a>
        </div>
        
        <h2>صور من أنشطة المتطوعين</h2>
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <img src="assets/img/gallery1.jpeg" alt="صورة من أنشطة المتطوعين 1" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery2.jpeg" alt="صورة من أنشطة المتطوعين 2" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery3.jpeg" alt="صورة من أنشطة المتطوعين 3" class="img-fluid rounded">
          </div>
        </div>
      `
    },
    '3': {
      title: 'توزيع 5000 سلة غذائية في اليمن',
      date: '5 يونيو 2025',
      category: 'مشاريع إغاثية',
      author: 'فريق المشاريع',
      image: 'assets/img/news3.svg',
      content: `
        <p>أعلنت مؤسسة قطرات الغيث عن الانتهاء من توزيع 5000 سلة غذائية في اليمن ضمن مشروع الإغاثة العاجلة للأسر المتضررة. وقد استهدف المشروع المناطق الأكثر تضرراً في محافظات صنعاء، تعز، الحديدة، وحجة.</p>
        
        <p>وصرح مدير المشاريع في المؤسسة، المهندس سعيد الحارثي قائلاً: "تمكنا بفضل الله ثم بفضل دعم المتبرعين الكرام من توزيع 5000 سلة غذائية على الأسر المتضررة في اليمن خلال الأسبوع الماضي، وهذا جزء من خطتنا لتوزيع 20,000 سلة غذائية خلال الشهرين القادمين".</p>
        
        <h2>محتويات السلة الغذائية</h2>
        <ul>
          <li>25 كيلو أرز</li>
          <li>10 كيلو دقيق</li>
          <li>5 كيلو سكر</li>
          <li>4 لتر زيت طعام</li>
          <li>2 كيلو تمر</li>
          <li>2 كيلو عدس</li>
          <li>1 كيلو شاي</li>
          <li>علب حليب مجفف</li>
          <li>معلبات متنوعة</li>
        </ul>
        
        <h2>آلية التوزيع</h2>
        <p>تم تنفيذ عملية التوزيع وفق آلية محكمة لضمان وصول المساعدات إلى مستحقيها، حيث تم:</p>
        <ol>
          <li>حصر الأسر المتضررة بالتنسيق مع السلطات المحلية</li>
          <li>إعداد قوائم بأسماء المستفيدين</li>
          <li>تجهيز بطاقات استلام للمستفيدين</li>
          <li>تحديد نقاط توزيع في مناطق مختلفة</li>
          <li>تنفيذ عملية التوزيع بإشراف فريق متخصص</li>
          <li>توثيق عملية التوزيع بالصور والفيديو</li>
        </ol>
        
        <div class="news-cta text-center my-5">
          <a href="donate.html?cause=yemen" class="btn btn-primary btn-lg px-5"><i class="fas fa-hand-holding-heart me-2"></i>ساهم في مشروع إغاثة اليمن</a>
        </div>
        
        <h2>صور من عملية التوزيع</h2>
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <img src="assets/img/gallery1.jpeg" alt="صورة من عملية التوزيع 1" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery2.jpeg" alt="صورة من عملية التوزيع 2" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery3.jpeg" alt="صورة من عملية التوزيع 3" class="img-fluid rounded">
          </div>
        </div>
      `
    },
    '4': {
      title: 'افتتاح مركز طبي جديد في السودان',
      date: '1 يونيو 2025',
      category: 'مشاريع صحية',
      author: 'قسم المشاريع الصحية',
      image: 'assets/img/gallery4.jpeg',
      content: `
        <p>افتتحت مؤسسة قطرات الغيث مركزاً طبياً جديداً في منطقة نائية بولاية النيل الأزرق في السودان، وذلك ضمن مشاريعها الصحية الهادفة إلى تحسين الخدمات الطبية في المناطق المحرومة.</p>
        
        <p>وقال الدكتور محمد الأمين، مدير المشاريع الصحية في المؤسسة: "يأتي افتتاح هذا المركز استجابة للاحتياجات الملحة للسكان في هذه المنطقة التي تعاني من نقص حاد في الخدمات الصحية، حيث كان السكان يضطرون للسفر مسافات طويلة للحصول على الرعاية الطبية".</p>
        
        <h2>خدمات المركز الطبي</h2>
        <ul>
          <li>عيادات خارجية (باطنية، أطفال، نساء وولادة)</li>
          <li>قسم طوارئ يعمل على مدار 24 ساعة</li>
          <li>مختبر طبي مجهز</li>
          <li>صيدلية توفر الأدوية الأساسية مجاناً</li>
          <li>قسم للأشعة</li>
          <li>غرفة عمليات صغرى</li>
          <li>قسم للتطعيمات</li>
        </ul>
        
        <h2>الكادر الطبي</h2>
        <p>يضم المركز كادراً طبياً متكاملاً يتكون من:</p>
        <ul>
          <li>3 أطباء متخصصين</li>
          <li>5 ممرضين وممرضات</li>
          <li>فني مختبر</li>
          <li>فني أشعة</li>
          <li>صيدلي</li>
          <li>إداريين</li>
        </ul>
        
        <p>ويتوقع أن يستفيد من خدمات المركز حوالي 15,000 شخص من سكان المنطقة والقرى المجاورة.</p>
        
        <h2>خطط مستقبلية</h2>
        <p>وأضاف الدكتور الأمين: "نخطط لتوسيع خدمات المركز في المستقبل ليشمل عيادات تخصصية إضافية، وتنظيم قوافل طبية دورية للقرى النائية، وتنفيذ برامج توعوية صحية للسكان".</p>
        
        <div class="news-cta text-center my-5">
          <a href="donate.html?cause=sudan" class="btn btn-primary btn-lg px-5"><i class="fas fa-hand-holding-heart me-2"></i>ادعم مشاريعنا الصحية</a>
        </div>
        
        <h2>صور من المركز الطبي</h2>
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <img src="assets/img/gallery1.jpeg" alt="صورة من المركز الطبي 1" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery2.jpeg" alt="صورة من المركز الطبي 2" class="img-fluid rounded">
          </div>
          <div class="col-md-4">
            <img src="assets/img/gallery3.jpeg" alt="صورة من المركز الطبي 3" class="img-fluid rounded">
          </div>
        </div>
      `
    }
  };
  
  // تحديث محتوى الصفحة بناءً على معرف الخبر
  const newsItem = newsData[currentNewsId];
  if (newsItem) {
    // تحديث عنوان الصفحة
    document.title = `قطرات الغيث - ${newsItem.title}`;
    
    // تحديث عناصر الصفحة
    document.getElementById('news-title').textContent = newsItem.title;
    document.getElementById('news-title-breadcrumb').textContent = newsItem.title;
    document.getElementById('news-date').textContent = newsItem.date;
    document.getElementById('news-category').textContent = newsItem.category;
    document.getElementById('news-author').textContent = newsItem.author;
    document.getElementById('news-image').src = newsItem.image;
    document.getElementById('news-image').alt = newsItem.title;
    
    // إذا كان المعرف ليس 1 (الافتراضي)، استبدل المحتوى
    if (currentNewsId !== '1') {
      document.getElementById('news-content-full').innerHTML = newsItem.content;
    }
    
    // تحديث روابط المشاركة
    const shareLinks = document.querySelectorAll('.social-share a');
    const pageUrl = encodeURIComponent(window.location.href);
    const newsTitle = encodeURIComponent(newsItem.title);
    
    // تحديث روابط وسائل التواصل الاجتماعي
    shareLinks[0].href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`; // فيسبوك
    shareLinks[1].href = `https://twitter.com/intent/tweet?text=${newsTitle}&url=${pageUrl}`; // تويتر
    shareLinks[2].href = `https://api.whatsapp.com/send?text=${newsTitle} ${pageUrl}`; // واتساب
    shareLinks[3].href = `mailto:?subject=${newsTitle}&body=${pageUrl}`; // البريد الإلكتروني
  }
});