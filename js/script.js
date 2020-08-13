// анімація верхньої рекламної смуги
const topAdverty = document.getElementById('top-adverty');
topAdverty.insertAdjacentHTML('afterbegin', '<i></i>');

setTimeout(() => {
    topAdverty.classList.add('show');
}, 3000);

// кнопка закриття рекламної стрічки
const topAdvertyClose = topAdverty.getElementsByTagName('i')[0];

topAdvertyClose.addEventListener('click', () => {
    topAdverty.classList.remove('show');
});


// https://github.com/lvivduncan/levus-nav
{
    // обгортка меню
    const menu = document.querySelector('#levus-menu');

    // перевірка довжити усіх елементів 
    const allLis = document.querySelectorAll('#levus-menu ul');
    console.log(allLis.children);

    // перевіряємо, чи таке меню існує
    if (menu != null) {

        // обгортка для мобільного меню
        const wrapper = document.createElement('div');
        wrapper.className = 'levus-wrapper';

        // усі li в меню
        const lis = menu.querySelectorAll('li');

        // додаємо клас для батьківського елемента
        lis.forEach(li => li.children.length > 1 ? li.className = 'parent' : '');

        // міняємо тип меню при зміні розміру вікна
        window.addEventListener('resize', changeMenu);

        // визначаємо при завантаженні сторінки
        changeMenu();

        // додаємо елемент на сторінку
        menu.append(wrapper);

        // розкрити меню на мобільному
        wrapper.addEventListener('click', showMenu);

        // розкриваємо/ховаємо вкладені списки
        lis.forEach(li => {
            li.addEventListener('click', showUl);
        });

        // перемикаємо меню
        function changeMenu() {
            if (window.innerWidth < 1340) {
                menu.classList.remove('desktop');
                menu.classList.add('mobile');
            } else {
                menu.classList.remove('mobile');
                menu.classList.add('desktop');
            }
        }

        // показуємо/ховаємо мобільне меню
        function showMenu() {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            } else {
                menu.classList.add('show');
            }
        }

        // показати вкладені списки 
        function showUl(e) {
            e.stopPropagation();
            e.target.classList.contains('parent') ? this.classList.toggle('show') : '';
        }
    }

}

// https://github.com/lvivduncan/levus-onslide
class LevusOnslide {
    constructor(slider) {
        // слайдер
        this.slider = document.querySelector(slider);
        // слайди
        this.slides = this.slider.querySelectorAll('article');
        // вліво
        this.left = this.slider.querySelector('#levus-left');
        // вправо
        this.right = this.slider.querySelector('#levus-right');
        // кількість слайдів
        this.length = this.slides.length - 1;
        // 1 слайд
        this.first = this.slides[0];
        // лічильник
        this.cnt = 0;
    }

    // клік на кпоку вправо/вліво
    click() {
        // клік на ліву
        this.left.addEventListener('click', () => {
            setTimeout(() => {
                this.slides.forEach(slide => slide.removeAttribute('class'));
                this.cnt < this.length ? this.cnt++ : this.cnt = 0;
                this.slides[this.cnt].classList.add('show');
            }, 500);
        });

        // клік на праву кнопку
        this.right.addEventListener('click', () => {
            setTimeout(() => {
                this.slides.forEach(slide => slide.removeAttribute('class'));
                this.cnt === 0 ? this.cnt = this.length : this.cnt--;
                this.slides[this.cnt].classList.add('show');
            }, 500);
        });
    }

    arrow() {
        // ховаємо
        this.left.classList.add('hide');
        this.right.classList.add('hide');

        // показати стрілки при наведенні на слайдер
        this.slider.addEventListener('mouseover', () => {
            this.left.removeAttribute('class');
            this.right.removeAttribute('class');
        });

        // сховати стрілки
        this.slider.addEventListener('mouseout', () => {
            this.left.classList.add('hide');
            this.right.classList.add('hide');
        });
    }

    autoScroll() {
        setInterval(() => {
            this.slides.forEach(slide => slide.removeAttribute('class'));
            this.cnt < this.length ? this.cnt++ : this.cnt = 0;
            this.slides[this.cnt].classList.add('show');
        }, 8000);
    }

    init() {
        this.click();

        // присвоюємо клас 1 елементу
        this.first.classList.add('show');

        // показуємо стрілочки при завантаженні
        this.arrow();

        // автоскрол на всі екранах
        this.autoScroll();
    }
}

new LevusOnslide('#levus-slider').init();

// https://github.com/lvivduncan/levus-horizontal-scroll
{
    // scroll
    const scroll = document.querySelectorAll('.levus-horizontal-scroll');

    // if exists one scroll
    if (scroll.length === 1) {

        // wrapper
        const ul = scroll[0].querySelector('.levus-horizontal-scroll ul');
        // nodelist
        let li = ul.querySelectorAll('li');

        // if less than 5, cloned 
        if (li.length <= 5) {
            // cloned and append elements
            li.forEach(element => ul.append(element.cloneNode(true)));
            // new nodelist
            li = scroll[0].querySelectorAll('.levus-horizontal-scroll li');
        }

        scroll[0].innerHTML += '<span class="left"></span><span class="right"></span>';

        scroll[0].addEventListener('click', (e) => {
            const ul = scroll[0].querySelector('.levus-horizontal-scroll ul');
            if (e.target.className == 'left') {
                // move last element
                const last = ul.lastElementChild;
                ul.prepend(last);
                // destroy transition
                ul.style.transition = 'none';
                ul.classList.add('to-right');
                setTimeout(() => {
                    ul.classList.remove('to-right');
                    ul.style.transition = '.5s';
                }, 50);
            }
        });

        scroll[0].addEventListener('click', (e) => {
            const ul = scroll[0].querySelector('.levus-horizontal-scroll ul');
            if (e.target.className == 'right') {
                // move first element
                const first = ul.firstElementChild;
                ul.append(first);
                // destroy transition
                ul.style.transition = 'none';
                ul.classList.add('to-left');
                setTimeout(() => {
                    ul.classList.remove('to-left');
                    ul.style.transition = '.5s';
                }, 50);
            }
        });
    }

    // if exists more than one scroll
    if (scroll.length > 1) {

        scroll.forEach(item => {
            const ul = item.querySelector('.levus-horizontal-scroll ul');
            // elements
            let li = ul.querySelectorAll('li');

            // if less than 5, cloned 
            if (li.length <= 5) {
                // cloned and append elements
                li.forEach(element => ul.append(element.cloneNode(true)));
                // new nodelist
                li = item.querySelectorAll('.levus-horizontal-scroll li');
            }

            item.innerHTML += '<span class="left"></span><span class="right"></span>';

            item.addEventListener('click', (e) => {
                const ul = item.querySelector('.levus-horizontal-scroll ul');
                if (e.target.className == 'left') {
                    // move last element
                    const last = ul.lastElementChild;
                    ul.prepend(last);
                    // destroy transition
                    ul.style.transition = 'none';
                    ul.classList.add('to-right');
                    setTimeout(() => {
                        ul.classList.remove('to-right');
                        ul.style.transition = '.5s';
                    }, 50);
                }
            });

            item.addEventListener('click', (e) => {
                const ul = item.querySelector('.levus-horizontal-scroll ul');
                if (e.target.className == 'right') {
                    // move first element
                    const first = ul.firstElementChild;
                    ul.append(first);
                    // destroy transition
                    ul.style.transition = 'none';
                    ul.classList.add('to-left');
                    setTimeout(() => {
                        ul.classList.remove('to-left');
                        ul.style.transition = '.5s';
                    }, 50);
                }
            });
        });
    }
}