document.addEventListener('DOMContentLoaded', () => {

    // 1. Переключение активных пунктов бокового меню
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку страницы
            
            // Удаляем класс active у всех ссылок и добавляем текущей
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            console.log(`Переход на раздел: ${link.textContent}`);
        });
    });

    // 2. Обработка кнопки "Выйти"
    const logoutBtn = document.querySelector('.user-profile button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmLogout = confirm('Вы действительно хотите выйти из системы?');
            if (confirmLogout) {
                alert('Вы успешно вышли из аккаунта.');
            }
        });
    }

    // 3. Обработка кнопок "Детали" на карточках
    const detailButtons = document.querySelectorAll('.card-footer button');
    
    detailButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Находим карточку, к которой принадлежит кнопка
            const card = e.target.closest('.card');
            const cardTitle = card.querySelector('.card-header h3').textContent;
            const cardStatus = card.querySelector('.badge').textContent;
            const cardBody = card.querySelector('.card-body').textContent;

            alert(`Подробности объекта: ${cardTitle}\nСтатус: [${cardStatus}]\nОписание: ${cardBody}`);
        });
    });

});