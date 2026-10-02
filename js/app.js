document.addEventListener('DOMContentLoaded', () => {

    // Данные для разных разделов
    const pagesData = {
        main: {
            title: "Каталог событий / Мониторинг",
            cards: [
                { title: "Аналист трафика", status: "OK", statusClass: "status-ok", desc: "Мониторинг сетевых пакетов в реальном времени.", info: "Статус: Активен", details: "Проанализировано 1.2 GB трафика. Аномалий и утечек данных не обнаружено." },
                { title: "Системные логи", status: "WARN", statusClass: "status-warn", desc: "Сбор событий с локальных и удаленных узлов.", info: "Записи: 1,240", details: "Обнаружено 3 предупреждения авторизации с IP 192.168.1.45." },
                { title: "Инциденты ИБ", status: "ALERT", statusClass: "status-danger", desc: "Обнаружение подозрительной активности в сети.", info: "Критичность: Высокая", details: "Попытка Brute-force атаки на SSH-порт. IP заблокирован фильтром." },
                { title: "База данных", status: "OK", statusClass: "status-ok", desc: "Проверка целостности и оптимизация запросов.", info: "Нагрузка: 12%", details: "Запросы выполняются штатно. Время отклика 4ms." }
            ]
        },
        analytics: {
            title: "Аналитика и Метрики SOC",
            cards: [
                { title: "Загрузка ЦП SIEM", status: "OK", statusClass: "status-ok", desc: "Загрузка процессора сервера Wazuh.", info: "Нагрузка: 24%", details: "Все ядра работают в штатном режиме." },
                { title: "Сетевой поток (PPS)", status: "OK", statusClass: "status-ok", desc: "Количество пакетов в секунду.", info: "Скорость: 4,500 pps", details: "Пиковая нагрузка зафиксирована в 14:00." }
            ]
        },
        logs: {
            title: "Журнал логов безопасности",
            cards: [
                { title: "Wazuh Agent #1", status: "OK", statusClass: "status-ok", desc: "Логи Windows 11 Workstation.", info: "Синхронизация: Да", details: "Последняя запись получена 1 секунду назад." },
                { title: "Wazuh Agent #2", status: "WARN", statusClass: "status-warn", desc: "Логи Ubuntu Server.", info: "Синхронизация: Задержка", details: "Небольшая задержка передачи логов по Syslog." }
            ]
        },
        settings: {
            title: "Настройки панели управления",
            cards: [
                { title: "Конфигурация Правил", status: "OK", statusClass: "status-ok", desc: "Активировано 142 правила корреляции.", info: "Версия: v2.4", details: "Правила обновлены вчера." }
            ]
        }
    };

    const cardsContainer = document.getElementById('cards-container');
    const pageTitle = document.getElementById('page-title');
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    // Функция отрисовки карточек
    function renderPage(pageKey) {
        const page = pagesData[pageKey];
        if (!page) return;

        pageTitle.textContent = page.title;
        cardsContainer.innerHTML = '';

        page.cards.forEach(card => {
            const cardEl = document.createElement('article');
            cardEl.className = 'card';
            cardEl.innerHTML = `
                <div class="card-header">
                    <h3>${card.title}</h3>
                    <span class="badge ${card.statusClass}">${card.status}</span>
                </div>
                <p class="card-body">${card.desc}</p>
                <div class="card-footer">
                    <span>${card.info}</span>
                    <button type="button" class="btn-details">Детали</button>
                </div>
            `;

            // Навешиваем клик на кнопку "Детали"
            const btn = cardEl.querySelector('.btn-details');
            btn.addEventListener('click', () => {
                modalTitle.textContent = card.title;
                modalBody.innerHTML = `
                    <p><strong>Статус:</strong> <span class="badge ${card.statusClass}">${card.status}</span></p><br>
                    <p><strong>Описание:</strong> ${card.desc}</p><br>
                    <p><strong>Подробные данные:</strong> ${card.details}</p>
                `;
                modal.classList.add('active');
            });

            cardsContainer.appendChild(cardEl);
        });
    }

    // Клик по пунктам меню
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            const pageKey = link.getAttribute('data-page');
            renderPage(pageKey);
        });
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Кнопка выпадающего профиля / выхода
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Выйти из панели управления?')) {
            alert('Вы успешно вышли.');
        }
    });

    // Первоначальная загрузка "Главная"
    renderPage('main');
});