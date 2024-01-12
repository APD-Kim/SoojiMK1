document.addEventListener('DOMContentLoaded', () => searchInput.focus());

// -----exbtn, closebtn 클릭 시 main, more 보여주기 -----
function toggleDisplay(mainElement, moreElement) {
    mainElement.style.display = (mainElement.style.display === 'none') ? 'block' : 'none';
    moreElement.style.display = (moreElement.style.display === 'block') ? 'none' : 'block';
}

function setupToggleButton(buttonType, index) {
    const btn = document.getElementById(`${buttonType}${index}`);
    const main = document.getElementById(`main${index}`);
    const more = document.getElementById(`more${index}`);

    btn.addEventListener('click', function () {
        if (buttonType === 'exBtn') {
            toggleDisplay(main, more);
        } else if (buttonType === 'close') {
            toggleDisplay(more, main);
        }
    });
}

for (let i = 1; i <= 5; i++) {
    setupToggleButton('exBtn', i);
    setupToggleButton('close', i);
}



// -----mainbut 클릭 시 페이지 이동------

for (let i = 1; i <= 5; i++) {
    const mbtn = document.getElementById(`mbtn${i}`);

    mbtn.addEventListener('click', function () {
        const translationValue = -100 * (i - 1);
        center.style.transform = `translate(${translationValue}vw)`;
    });
}



// -----slidebutton 클릭 시 페이지 이동-----

let currentPosition = 0;

function updateSlide(direction) {
    if (direction === 'right') {
        currentPosition -= 100;
    } else if (direction === 'left') {
        currentPosition += 100;
    }

    document.querySelector('.center').style.transform = `translate(${currentPosition % 500}vw)`;
}

rightbtn.addEventListener('click', function () {
    updateSlide('right');
});

leftbtn.addEventListener('click', function () {
    updateSlide('left');
});



// -----nextbutton 클릭 시 페이지 이동-----

let nextPosition = 0;

function nextSlide(direction, liveNumber) {
    if (direction === 'right') {
        nextPosition -= 80;
    } else if (direction === 'left') {
        nextPosition += 80;
    }

    let live = document.getElementById('live' + liveNumber);
    live.style.transform = `translate(${nextPosition % 320}vw)`;
}

for (let i = 1; i <= 6; i++) {
    let NRB = document.getElementById('NRB' + i);
    let NLB = document.getElementById('NLB' + i);

    NRB.addEventListener('click', function () {
        nextSlide('right', i);
    });

    NLB.addEventListener('click', function () {
        nextSlide('left', i);
    });
}



// -----카테고리메뉴 보여주기-----

const cateButton = document.getElementById('cate');
const cateMenu = document.getElementById('cate_menu');

cateButton.addEventListener('click', function () {
    cateMenu.classList.toggle('active');
});



