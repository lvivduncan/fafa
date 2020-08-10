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