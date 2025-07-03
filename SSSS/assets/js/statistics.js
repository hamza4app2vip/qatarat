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

  // ===== تهيئة الرسوم البيانية =====
  
  // 1. رسم بياني لتوزيع التبرعات حسب المشاريع (دائري)
  const projectsChartCtx = document.getElementById('projectsChart').getContext('2d');
  const projectsChart = new Chart(projectsChartCtx, {
    type: 'doughnut',
    data: {
      labels: ['إغاثة غزة', 'دعم اليمن', 'دعم السودان', 'مشاريع تنموية', 'تمكين اقتصادي', 'أخرى'],
      datasets: [{
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#ffc107',
          '#17a2b8',
          '#6f42c1',
          '#fd7e14'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Cairo'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });

  // 2. رسم بياني لنمو التبرعات الشهري (خطي)
  const monthlyChartCtx = document.getElementById('monthlyChart').getContext('2d');
  const monthlyChart = new Chart(monthlyChartCtx, {
    type: 'line',
    data: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      datasets: [{
        label: 'التبرعات الشهرية (بالألف ر.س)',
        data: [120, 135, 180, 250, 210, 190, 205, 230, 280, 320, 350, 400],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Cairo'
            }
          }
        }
      }
    }
  });

  // 3. رسم بياني لتوزيع المستفيدين حسب الفئة (شريطي)
  const beneficiariesChartCtx = document.getElementById('beneficiariesChart').getContext('2d');
  const beneficiariesChart = new Chart(beneficiariesChartCtx, {
    type: 'bar',
    data: {
      labels: ['أطفال', 'نساء', 'كبار السن', 'ذوي الاحتياجات الخاصة', 'شباب'],
      datasets: [{
        label: 'عدد المستفيدين (بالألف)',
        data: [8.5, 6.2, 4.3, 2.8, 3.2],
        backgroundColor: [
          'rgba(0, 123, 255, 0.7)',
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(23, 162, 184, 0.7)',
          'rgba(111, 66, 193, 0.7)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Cairo'
            }
          }
        }
      }
    }
  });

  // 4. رسم بياني لتوزيع المشاريع حسب المناطق (شريطي أفقي)
  const regionsChartCtx = document.getElementById('regionsChart').getContext('2d');
  const regionsChart = new Chart(regionsChartCtx, {
    type: 'bar',
    data: {
      labels: ['غزة', 'اليمن', 'السودان', 'سوريا', 'لبنان', 'الصومال', 'أفغانستان'],
      datasets: [{
        label: 'عدد المشاريع',
        data: [35, 25, 18, 15, 12, 8, 7],
        backgroundColor: 'rgba(0, 123, 255, 0.7)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        },
        y: {
          ticks: {
            font: {
              family: 'Cairo'
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Cairo'
            }
          }
        }
      }
    }
  });

  // 5. رسم بياني لتوزيع المصروفات (دائري)
  const expensesChartCtx = document.getElementById('expensesChart').getContext('2d');
  const expensesChart = new Chart(expensesChartCtx, {
    type: 'pie',
    data: {
      labels: ['المستفيدين مباشرة', 'المصاريف التشغيلية', 'التطوير والاستدامة'],
      datasets: [{
        data: [85, 10, 5],
        backgroundColor: [
          '#28a745',
          '#007bff',
          '#ffc107'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Cairo'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
});