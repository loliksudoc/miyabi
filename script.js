
document.addEventListener('DOMContentLoaded', function() {
    animateFirstPage();
    
    initNavigation();
  
    initScroll();
});

function animateFirstPage() {
    const title = document.querySelector('.main-title');
    const image = document.querySelector('#page1 .character-image');
    
    title.style.opacity = '0';
    title.style.transform = 'translateX(-100px)';
    image.style.opacity = '0';
    image.style.transform = 'translateX(100px) rotate(5deg)';
 
    setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateX(0)';
    }, 300);
    
    setTimeout(() => {
        image.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        image.style.opacity = '1';
        image.style.transform = 'translateX(0) rotate(0)';
   
        setTimeout(() => {
            image.style.animation = 'float 6s ease-in-out infinite';
        }, 1500);
    }, 800);
}

function animateThirdPage() {
    const image = document.querySelector('#page3 .bio-image');
    const characteristics = document.querySelector('.characteristics');
    const charItems = document.querySelectorAll('.char-item');
    
    setTimeout(() => {
        image.style.transition = 'opacity 1s ease, transform 1s ease';
        image.style.opacity = '1';
        image.style.transform = 'translateX(0) rotate(0)';
    }, 300);
  
    setTimeout(() => {
        characteristics.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        characteristics.style.opacity = '1';
        characteristics.style.transform = 'translateY(0)';
    }, 800);
    
    charItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1200 + (index * 150));
    });

    startTypingEffect();
}

function startTypingEffect() {
    const bioText = `Мияби — наследница клана Хошими, известного своими мастерами боевых искусств. Её семья приписывает ей судьбу великой мечницы, и она носит семейное оружие — катану «Без хвоста» (Tailless), обладающую проклятой силой. Несмотря на свой статус, Мияби не занимается бюрократическими обязанностями Секции 6; эти задачи выполняет её заместитель, Цукиширо Янаги`;
    
    const typedTextElement = document.getElementById('typed-text');
    let i = 0;
    const speed = 20;
    
    function typeWriter() {
        if (i < bioText.length) {
            typedTextElement.innerHTML = bioText.substring(0, i + 1) + '<span class="typed-cursor">|</span>';
            i++;
            setTimeout(typeWriter, speed);
        } else {
            typedTextElement.innerHTML = bioText;
        }
    }
    
    setTimeout(typeWriter, 2000);
}

function animateFourthPage() {
    const links = document.querySelectorAll('.official-link');
    
    links.forEach((link, index) => {
        setTimeout(() => {
            link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const pages = document.querySelectorAll('.page');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');

            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(`page${targetPage}`).classList.add('active');

            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');

            switch(targetPage) {
                case '3':
                    setTimeout(animateThirdPage, 300);
                    break;
                case '4':
                    setTimeout(animateFourthPage, 300);
                    break;
            }

            window.scrollTo(0, 0);
        });
    });
}

function initScroll() {
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        isScrolling = true;
        
        const currentPage = document.querySelector('.page.active');
        const pages = document.querySelectorAll('.page');
        const navDots = document.querySelectorAll('.nav-dot');
        
        let currentIndex = Array.from(pages).indexOf(currentPage);
        let nextIndex;
        
        if (e.deltaY > 0) {
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
        } else {
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (nextIndex !== currentIndex) {
            pages.forEach(page => page.classList.remove('active'));
            pages[nextIndex].classList.add('active');

            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[nextIndex].classList.add('active');

            switch(nextIndex + 1) {
                case 3:
                    setTimeout(animateThirdPage, 300);
                    break;
                case 4:
                    setTimeout(animateFourthPage, 300);
                    break;
            }
            window.scrollTo(0, 0);
        }
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
    let startY;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startY) return;
        
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (Math.abs(diff) < 50) return;
        
        const currentPage = document.querySelector('.page.active');
        const pages = document.querySelectorAll('.page');
        const navDots = document.querySelectorAll('.nav-dot');
        
        let currentIndex = Array.from(pages).indexOf(currentPage);
        let nextIndex;
        
        if (diff > 0) {
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
        } else {
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (nextIndex !== currentIndex) {
            pages.forEach(page => page.classList.remove('active'));
            pages[nextIndex].classList.add('active');

            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[nextIndex].classList.add('active');

            switch(nextIndex + 1) {
                case 3:
                    setTimeout(animateThirdPage, 300);
                    break;
                case 4:
                    setTimeout(animateFourthPage, 300);
                    break;
            }

            window.scrollTo(0, 0);
        }
        
        startY = null;
    });
}

document.addEventListener('mousemove', function(e) {
    const pages = document.querySelectorAll('.page');
    const activePage = document.querySelector('.page.active');
    
    if (!activePage) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    activePage.style.backgroundPosition = `${50 + mouseX * 5}% ${50 + mouseY * 5}%`;
});