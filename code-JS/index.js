document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".side-nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});

document.querySelectorAll('.info-box').forEach(box => {
    box.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});


// Фільтрація портфоліо (додано сертифікати та відгуки)
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Видаляємо клас active у всіх кнопок і додаємо лише до вибраної
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Отримуємо обраний фільтр
            const filter = this.getAttribute("data-filter");

            // Показуємо або ховаємо елементи
            portfolioItems.forEach(item => {
                if (item.classList.contains(filter)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Викликаємо перший фільтр за замовчуванням
    document.querySelector(".filter-btn.active").click();
});

   // Підсвічування кнопки активної секції
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Отримуємо всі секції
    const navLinks = document.querySelectorAll(".side-nav a"); // Отримуємо всі посилання в боковій навігації

    function activateNavLink() {
        let scrollPosition = window.scrollY + 200; // Отримуємо поточну позицію прокрутки (+200px для точності)

        sections.forEach(section => {
            let top = section.offsetTop; // Відстань секції від верху сторінки
            let height = section.offsetHeight; // Висота секції
            let id = section.getAttribute("id"); // ID секції

            if (scrollPosition >= top && scrollPosition < top + height) {
                // Видаляємо клас active у всіх посиланнях
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Додаємо клас active до відповідного посилання
                document.querySelector(`.side-nav a[href="#${id}"]`).classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", activateNavLink); // Викликаємо функцію при скролінгу
    activateNavLink(); // Викликаємо одразу при завантаженні
});

// Функція для відкриття модального вікна
function openModal(imgSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = imgSrc;
}

// Функція для закриття модального вікна
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Додаємо обробник кліку на всі зображення портфоліо
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".portfolio-item img").forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation(); // Щоб не спрацьовував onclick на блоці
            openModal(this.src);
        });
    });

    // Закриття модального вікна при кліку за межами зображення
    document.getElementById("imageModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Змінюй це значення, якщо потрібно підлаштувати відступ
                behavior: 'smooth'
            });
        }
    });
});



// Coments

document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let userName = document.getElementById('userName').value;
    let userComment = document.getElementById('userComment').value;
    let commentsList = document.getElementById('commentsList');

    if (userName.trim() === '' || userComment.trim() === '') {
        alert('Будь ласка, заповніть всі поля');
        return;
    }

    let commentBlock = document.createElement('div');
    commentBlock.classList.add('comment');
    commentBlock.innerHTML = `<strong>${userName}</strong>: ${userComment}`;
    
    commentsList.prepend(commentBlock); // Додає новий коментар на початок

    // Зберігаємо коментар у LocalStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.unshift({ name: userName, comment: userComment });
    localStorage.setItem('comments', JSON.stringify(comments));

    // Очищення полів вводу
    document.getElementById('userName').value = '';
    document.getElementById('userComment').value = '';
});

// Завантаження коментарів з LocalStorage при завантаженні сторінки
window.addEventListener('load', function () {
    let commentsList = document.getElementById('commentsList');
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach(comment => {
        let commentBlock = document.createElement('div');
        commentBlock.classList.add('comment');
        commentBlock.innerHTML = `<strong>${comment.name}</strong>: ${comment.comment}`;
        commentsList.appendChild(commentBlock);
    });
});
