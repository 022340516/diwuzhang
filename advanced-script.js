// === 数据定义 ===
const chartData = {
    // 智能设备季度销量数据
    smartwearables: {
        quarters: ['第一季度', '第二季度', '第三季度', '第四季度'],
        smartwatch: [120, 150, 130, 180],
        headset: [200, 180, 220, 250]
    },
    
    // 社交平台用户性别分布数据
    userprofile: {
        platforms: ['微博', 'B站', '抖音', '小红书', '知乎'],
        male: [55, 45, 50, 30, 60],
        female: [45, 55, 50, 70, 40]
    },
    
    // 月度流量数据
    traffic: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        visits: [4.5, 5.2, 6.1, 5.8, 6.5, 7.2, 8.1, 9.8, 8.5, 7.8, 6.9, 6.1]
    },
    
    // 金融数据
    financial: {
        days: Array.from({length: 30}, (_, i) => `第${i + 1}天`),
        stockPrice: Array.from({length: 30}, () => Math.floor(Math.random() * 33) + 145),
        volume: Array.from({length: 30}, () => Math.floor(Math.random() * 33) + 250)
    },
    
    // 年度趋势数据
    annual: {
        years: ['2021', '2022', '2023', '2024'],
        revenue: [1200, 1500, 1800, 2200],
        profit: [300, 450, 600, 850],
        users: [500, 800, 1200, 1800]
    },
    
    // 院校招生数据
    enrollment: {
        colleges: ['计算机学院', '经济学院', '工程学院', '文学院', '理学院', '医学院'],
        counts: [1200, 800, 1000, 600, 700, 900]
    }
};

// === 图表实例存储 ===
const chartInstances = {};

// === 颜色配置 ===
const chartColors = {
    smartwearables: {
        primary: 'rgba(59, 130, 246, 0.8)',
        secondary: 'rgba(139, 92, 246, 0.8)',
        primaryBorder: 'rgba(59, 130, 246, 1)',
        secondaryBorder: 'rgba(139, 92, 246, 1)'
    },
    userprofile: {
        male: 'rgba(59, 130, 246, 0.8)',
        female: 'rgba(236, 72, 153, 0.8)',
        maleBorder: 'rgba(59, 130, 246, 1)',
        femaleBorder: 'rgba(236, 72, 153, 1)'
    },
    traffic: {
        primary: 'rgba(16, 185, 129, 0.8)',
        primaryBorder: 'rgba(16, 185, 129, 1)'
    },
    financial: {
        stock: 'rgba(239, 68, 68, 0.8)',
        volume: 'rgba(245, 158, 11, 0.8)',
        stockBorder: 'rgba(239, 68, 68, 1)',
        volumeBorder: 'rgba(245, 158, 11, 1)'
    },
    annual: {
        revenue: 'rgba(245, 158, 11, 0.8)',
        profit: 'rgba(16, 185, 129, 0.8)',
        users: 'rgba(6, 182, 212, 0.8)',
        revenueBorder: 'rgba(245, 158, 11, 1)',
        profitBorder: 'rgba(16, 185, 129, 1)',
        usersBorder: 'rgba(6, 182, 212, 1)'
    },
    enrollment: {
        colors: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(6, 182, 212, 0.8)'
        ]
    }
};

// === Chart.js 默认配置 ===
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = '#e2e8f0';
Chart.defaults.plugins.legend.position = 'top';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.title.font.size = 16;
Chart.defaults.plugins.title.font.weight = '600';

// === 图表创建函数 ===

// 创建智能手表销量图表
function createSmartwatchChart(type = 'bar') {
    const ctx = document.getElementById('smartwatch-chart').getContext('2d');
    
    if (chartInstances.smartwatch) {
        chartInstances.smartwatch.destroy();
    }
    
    const config = {
        type: type,
        data: {
            labels: chartData.smartwearables.quarters,
            datasets: [{
                label: '智能手表销量',
                data: chartData.smartwearables.smartwatch,
                backgroundColor: chartColors.smartwearables.primary,
                borderColor: chartColors.smartwearables.primaryBorder,
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: type !== 'radar'
                },
                title: {
                    display: false
                }
            },
            scales: type !== 'radar' ? {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '销量 (万台)'
                    }
                }
            } : {}
        }
    };
    
    if (type === 'radar') {
        config.data.datasets[0].fill = true;
        config.data.datasets[0].backgroundColor = 'rgba(59, 130, 246, 0.2)';
        config.data.datasets[0].borderColor = chartColors.smartwearables.primaryBorder;
        config.data.datasets[0].pointBackgroundColor = chartColors.smartwearables.primaryBorder;
        config.data.datasets[0].pointBorderColor = '#fff';
        config.data.datasets[0].pointHoverBackgroundColor = '#fff';
        config.data.datasets[0].pointHoverBorderColor = chartColors.smartwearables.primaryBorder;
    }
    
    chartInstances.smartwatch = new Chart(ctx, config);
}

// 创建蓝牙耳机销量图表
function createHeadsetChart(type = 'line') {
    const ctx = document.getElementById('headset-chart').getContext('2d');
    
    if (chartInstances.headset) {
        chartInstances.headset.destroy();
    }
    
    const config = {
        type: type === 'area' ? 'line' : type,
        data: {
            labels: chartData.smartwearables.quarters,
            datasets: [{
                label: '蓝牙耳机销量',
                data: chartData.smartwearables.headset,
                backgroundColor: type === 'area' ? 'rgba(139, 92, 246, 0.2)' : chartColors.smartwearables.secondary,
                borderColor: chartColors.smartwearables.secondaryBorder,
                borderWidth: 2,
                tension: 0.4,
                fill: type === 'area'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '销量 (万台)'
                    }
                }
            }
        }
    };
    
    chartInstances.headset = new Chart(ctx, config);
}

// 创建男性用户分布图表
function createMaleUsersChart(type = 'horizontal') {
    const ctx = document.getElementById('male-users-chart').getContext('2d');
    
    if (chartInstances.maleUsers) {
        chartInstances.maleUsers.destroy();
    }
    
    const config = {
        type: type === 'horizontal' ? 'bar' : type,
        data: {
            labels: chartData.userprofile.platforms,
            datasets: [{
                label: '男性用户 (百万)',
                data: chartData.userprofile.male,
                backgroundColor: chartColors.userprofile.male,
                borderColor: chartColors.userprofile.maleBorder,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: type === 'horizontal' ? 'y' : 'x',
            plugins: {
                legend: {
                    display: type !== 'horizontal'
                }
            },
            scales: type !== 'pie' && type !== 'doughnut' ? {
                x: type === 'horizontal' ? {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '用户数 (百万)'
                    }
                } : {},
                y: type === 'horizontal' ? {} : {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '用户数 (百万)'
                    }
                }
            } : {}
        }
    };
    
    chartInstances.maleUsers = new Chart(ctx, config);
}

// 创建女性用户分布图表
function createFemaleUsersChart(type = 'horizontal') {
    const ctx = document.getElementById('female-users-chart').getContext('2d');
    
    if (chartInstances.femaleUsers) {
        chartInstances.femaleUsers.destroy();
    }
    
    const config = {
        type: type === 'horizontal' ? 'bar' : type === 'polar' ? 'polarArea' : type,
        data: {
            labels: chartData.userprofile.platforms,
            datasets: [{
                label: '女性用户 (百万)',
                data: chartData.userprofile.female,
                backgroundColor: chartColors.userprofile.female,
                borderColor: chartColors.userprofile.femaleBorder,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: type === 'horizontal' ? 'y' : 'x',
            plugins: {
                legend: {
                    display: type !== 'horizontal'
                }
            },
            scales: type !== 'pie' && type !== 'doughnut' && type !== 'polar' ? {
                x: type === 'horizontal' ? {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '用户数 (百万)'
                    }
                } : {},
                y: type === 'horizontal' ? {} : {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '用户数 (百万)'
                    }
                }
            } : {}
        }
    };
    
    chartInstances.femaleUsers = new Chart(ctx, config);
}

// 创建流量数据图表
function createTrafficChart(type = 'line') {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    
    if (chartInstances.traffic) {
        chartInstances.traffic.destroy();
    }
    
    const config = {
        type: type === 'area' ? 'line' : type,
        data: {
            labels: chartData.traffic.months,
            datasets: [{
                label: '月度访问量',
                data: chartData.traffic.visits,
                backgroundColor: type === 'area' ? 'rgba(16, 185, 129, 0.2)' : chartColors.traffic.primary,
                borderColor: chartColors.traffic.primaryBorder,
                borderWidth: 2,
                tension: 0.4,
                fill: type === 'area'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '访问量 (万次)'
                    }
                }
            }
        }
    };
    
    chartInstances.traffic = new Chart(ctx, config);
}

// 创建金融数据图表
function createFinancialChart(type = 'mixed') {
    const ctx = document.getElementById('financial-chart').getContext('2d');
    
    if (chartInstances.financial) {
        chartInstances.financial.destroy();
    }
    
    const config = {
        type: type === 'mixed' ? 'bar' : type === 'candlestick' ? 'bar' : 'line',
        data: {
            labels: chartData.financial.days,
            datasets: [{
                label: '股价 (元)',
                data: chartData.financial.stockPrice,
                backgroundColor: chartColors.financial.stock,
                borderColor: chartColors.financial.stockBorder,
                borderWidth: 2,
                yAxisID: 'y',
                type: type === 'mixed' ? 'line' : type,
                tension: 0.4,
                order: 1
            }, {
                label: '成交量 (万股)',
                data: chartData.financial.volume,
                backgroundColor: chartColors.financial.volume,
                borderColor: chartColors.financial.volumeBorder,
                borderWidth: 2,
                yAxisID: 'y1',
                type: 'bar',
                order: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '股价 (元)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    title: {
                        display: true,
                        text: '成交量 (万股)'
                    }
                }
            }
        }
    };
    
    chartInstances.financial = new Chart(ctx, config);
}

// 创建年度营收图表
function createRevenueChart(type = 'line') {
    const ctx = document.getElementById('revenue-chart').getContext('2d');
    
    if (chartInstances.revenue) {
        chartInstances.revenue.destroy();
    }
    
    const config = {
        type: type,
        data: {
            labels: chartData.annual.years,
            datasets: [{
                label: '年度营收',
                data: chartData.annual.revenue,
                backgroundColor: type === 'line' ? 'rgba(245, 158, 11, 0.2)' : chartColors.annual.revenue,
                borderColor: chartColors.annual.revenueBorder,
                borderWidth: 2,
                tension: 0.4,
                fill: type === 'line'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type !== 'radar' ? {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '营收 (万元)'
                    }
                }
            } : {}
        }
    };
    
    chartInstances.revenue = new Chart(ctx, config);
}

// 创建增长率图表
function createGrowthChart(type = 'bar') {
    const ctx = document.getElementById('growth-chart').getContext('2d');
    
    if (chartInstances.growth) {
        chartInstances.growth.destroy();
    }
    
    const growthRates = chartData.annual.revenue.map((value, index) => {
        if (index === 0) return 0;
        return ((value - chartData.annual.revenue[index - 1]) / chartData.annual.revenue[index - 1] * 100).toFixed(1);
    });
    
    const config = {
        type: type,
        data: {
            labels: chartData.annual.years,
            datasets: [{
                label: '年度增长率 (%)',
                data: growthRates,
                backgroundColor: chartColors.annual.profit,
                borderColor: chartColors.annual.profitBorder,
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type !== 'radar' ? {
                y: {
                    title: {
                        display: true,
                        text: '增长率 (%)'
                    }
                }
            } : {}
        }
    };
    
    chartInstances.growth = new Chart(ctx, config);
}

// 创建招生人数图表
function createEnrollmentCountChart(type = 'bar') {
    const ctx = document.getElementById('enrollment-count-chart').getContext('2d');
    
    if (chartInstances.enrollmentCount) {
        chartInstances.enrollmentCount.destroy();
    }
    
    const config = {
        type: type,
        data: {
            labels: chartData.enrollment.colleges,
            datasets: [{
                label: '招生人数',
                data: chartData.enrollment.counts,
                backgroundColor: chartColors.enrollment.colors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: type === 'horizontal' ? 'y' : 'x',
            scales: type !== 'pie' && type !== 'doughnut' ? {
                y: type === 'horizontal' ? {} : {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '招生人数'
                    }
                },
                x: type === 'horizontal' ? {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '招生人数'
                    }
                } : {}
            } : {}
        }
    };
    
    chartInstances.enrollmentCount = new Chart(ctx, config);
}

// 创建招生占比图表
function createEnrollmentRatioChart(type = 'pie') {
    const ctx = document.getElementById('enrollment-ratio-chart').getContext('2d');
    
    if (chartInstances.enrollmentRatio) {
        chartInstances.enrollmentRatio.destroy();
    }
    
    const config = {
        type: type === 'polar' ? 'polarArea' : type,
        data: {
            labels: chartData.enrollment.colleges,
            datasets: [{
                label: '招生占比',
                data: chartData.enrollment.counts,
                backgroundColor: chartColors.enrollment.colors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    };
    
    chartInstances.enrollmentRatio = new Chart(ctx, config);
}

// === 初始化所有图表 ===
function initAllCharts() {
    createSmartwatchChart('bar');
    createHeadsetChart('line');
    createMaleUsersChart('horizontal');
    createFemaleUsersChart('horizontal');
    createTrafficChart('line');
    createFinancialChart('mixed');
    createRevenueChart('line');
    createGrowthChart('bar');
    createEnrollmentCountChart('bar');
    createEnrollmentRatioChart('pie');
}

// === 图表类型切换 ===
function setupChartTypeSelectors() {
    const selectors = document.querySelectorAll('.chart-type-select');
    
    selectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            const chartName = e.target.dataset.chart;
            const chartType = e.target.value;
            
            switch(chartName) {
                case 'smartwatch':
                    createSmartwatchChart(chartType);
                    break;
                case 'headset':
                    createHeadsetChart(chartType);
                    break;
                case 'male':
                    createMaleUsersChart(chartType);
                    break;
                case 'female':
                    createFemaleUsersChart(chartType);
                    break;
                case 'traffic':
                    createTrafficChart(chartType);
                    break;
                case 'financial':
                    createFinancialChart(chartType);
                    break;
                case 'revenue':
                    createRevenueChart(chartType);
                    break;
                case 'growth':
                    createGrowthChart(chartType);
                    break;
                case 'enrollment-count':
                    createEnrollmentCountChart(chartType);
                    break;
                case 'enrollment-ratio':
                    createEnrollmentRatioChart(chartType);
                    break;
            }
        });
    });
}

// === 主题切换 ===
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // 从本地存储加载主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // 重新创建图表以应用新主题
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        initAllCharts();
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// === 导航功能 ===
function setupNavigation() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // 移动端关闭侧边栏
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });
    
    // 滚动时更新导航高亮
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.module').forEach(module => {
        observer.observe(module);
    });
}

// === 侧边栏控制 ===
function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // 点击外部关闭侧边栏
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// === 全屏功能 ===
function setupFullscreen() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    const fullscreenBtns = document.querySelectorAll('.fullscreen-btn');
    
    fullscreenToggle.addEventListener('click', toggleGlobalFullscreen);
    
    fullscreenBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const moduleId = e.currentTarget.dataset.module;
            toggleModuleFullscreen(moduleId);
        });
    });
}

function toggleGlobalFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function toggleModuleFullscreen(moduleId) {
    const module = document.getElementById(moduleId);
    
    if (module.classList.contains('fullscreen-mode')) {
        module.classList.remove('fullscreen-mode');
        document.body.style.overflow = '';
    } else {
        // 关闭其他全屏模块
        document.querySelectorAll('.fullscreen-mode').forEach(m => {
            m.classList.remove('fullscreen-mode');
        });
        
        module.classList.add('fullscreen-mode');
        document.body.style.overflow = 'hidden';
        module.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // 重新渲染图表
    setTimeout(() => {
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    }, 300);
}

// === 返回顶部按钮 ===
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === 响应式处理 ===
function setupResponsive() {
    const handleResize = () => {
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            content.classList.remove('expanded');
        }
        
        // 重新调整图表大小
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    };
    
    window.addEventListener('resize', handleResize);
    
    // 初始检查
    handleResize();
}

// === 键盘快捷键 ===
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ESC键关闭全屏或侧边栏
        if (e.key === 'Escape') {
            document.querySelectorAll('.fullscreen-mode').forEach(module => {
                module.classList.remove('fullscreen-mode');
            });
            document.body.style.overflow = '';
            
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
        
        // Ctrl+D 切换主题
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            document.getElementById('themeToggle').click();
        }
    });
}

// === 页面加载完成后初始化 ===
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    initAllCharts();
    setupChartTypeSelectors();
    setupThemeToggle();
    setupNavigation();
    setupSidebar();
    setupFullscreen();
    setupBackToTop();
    setupResponsive();
    setupKeyboardShortcuts();
    
    // 显示加载完成动画
    document.body.classList.add('loaded');
    
    // 延迟显示图表以增强效果
    setTimeout(() => {
        Object.values(chartInstances).forEach(chart => {
            if (chart) {
                chart.update('active');
            }
        });
    }, 500);
});

// === 页面卸载时清理 ===
window.addEventListener('beforeunload', () => {
    Object.values(chartInstances).forEach(chart => {
        if (chart) {
            chart.destroy();
        }
    });
});

// === 导出功能（可选） ===
function exportChartData() {
    const exportData = {
        timestamp: new Date().toISOString(),
        data: chartData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chart-data-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// === 性能优化：防抖函数 ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === 性能优化：节流函数 ===
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}