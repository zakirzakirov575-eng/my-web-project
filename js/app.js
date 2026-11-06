document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 5. Лабораторная работа №9: Асинхронный Fetch API Виджет
    // ==========================================================================
    const fetchBtn = document.querySelector('#fetch-btn');
    const cityInput = document.querySelector('#city-input');
    const spinner = document.querySelector('#loading-spinner');
    const widgetResult = document.querySelector('#widget-result');

    // Асинхронная функция запроса данных (async/await + try/catch)
    async function fetchWeatherData(city) {
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

        // Шаг 5: Показываем индикатор загрузки (Spinner), очищаем результат
        spinner.style.display = 'flex';
        widgetResult.innerHTML = '';

        try {
            // Шаг 3: Отправка сетевого запроса методом fetch() с await
            const response = await fetch(url);

            // Шаг 4: Проверка статуса ответа сервера (например, 404 или 500)
            if (!response.ok) {
                throw new Error(`Ошибка сервера: статус ${response.status}`);
            }

            // Шаг 5: Десериализация JSON-строки методом response.json()
            const data = await response.json();

            // Извлекаем нужные данные из структуры wttr.in API
            const currentCondition = data.current_condition[0];
            const tempC = currentCondition.temp_C;
            const desc = currentCondition.weatherDesc[0].value;
            const humidity = currentCondition.humidity;
            const windSpeed = currentCondition.windspeedKmph;

            // Шаг 5: Динамическая инжекция свойств в дерево DOM
            widgetResult.innerHTML = `
                <h3>Погода в г. ${city}</h3>
                <p><strong>🌡 Температура:</strong> ${tempC} °C</p>
                <p><strong>☁️ Описание:</strong> ${desc}</p>
                <p><strong>💧 Влажность:</strong> ${humidity}%</p>
                <p><strong>💨 Скорость ветра:</strong> ${windSpeed} км/ч</p>
            `;

        } catch (error) {
            // Шаг 4: Централизованный перехват исключений сетевых сбоев
            console.error("Ошибка запроса:", error);
            widgetResult.innerHTML = `
                <p style="color: #f87171;"><strong>⚠️ Не удалось загрузить данные.</strong></p>
                <p style="color: var(--text-muted); font-size: 0.85rem;">Причина: ${error.message}. Проверьте подключение к сети или название города.</p>
            `;
        } finally {
            // Скрываем спиннер в любом случае (успех или ошибка)
            spinner.style.display = 'none';
        }
    }

    if (fetchBtn && cityInput) {
        fetchBtn.addEventListener('click', () => {
            const cityName = cityInput.value.trim();
            if (cityName) {
                fetchWeatherData(cityName);
            }
        });

        // Автоматическая загрузка погоды для Алматы при первом открытии вкладки
        fetchWeatherData("Almaty");
    }

    // ==========================================================================
    // 1. Мобильное меню (Гамбургер)
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('app-sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // ==========================================================================
    // 2. Блок переключения страниц / вкладок
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Скрываем все страницы и снимаем класс active у всех ссылок
            navLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Подсвечиваем нажатую ссылку
            link.classList.add('active');

            // Показываем ТОЛЬКО ту страницу, на которую кликнули
            const targetTabId = link.getAttribute('data-tab');
            const targetTab = document.getElementById(targetTabId);

            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Автоматически закрываем меню на мобилках после клика
            if (window.innerWidth < 768 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // ==========================================================================
    // 3. Лабораторная №8: Кастомный Валидатор Формы (RegExp)
    // ==========================================================================
    const valForm = document.querySelector('#custom-val-form');
    const emailInput = document.querySelector('#val-email');
    const passwordInput = document.querySelector('#val-password');
    const phoneInput = document.querySelector('#val-phone');

    // Маски регулярных выражений
    const patterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        phone: /^\+?[1-9]\d{1,14}$/
    };

    const errorMessages = {
        email: "Введите корректный E-mail (например, user@domain.com)",
        password: "Пароль должен содержать мин. 8 символов, 1 заглавную букву, 1 цифру и 1 спецсимвол",
        phone: "Введите телефон в международном формате (например, +77071234567)"
    };

    // Очистка старых ошибок из DOM
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    }

    // Вывод текста ошибки под инпутом
    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        const errorNode = document.createElement('span');
        errorNode.className = 'error-message';
        errorNode.textContent = message;
        inputElement.parentNode.appendChild(errorNode);
    }

    if (valForm) {
        valForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Блокировка перезагрузки
            clearErrors(); // Очистка ошибок

            let isValid = true;

            // Проверка Email
            if (!patterns.email.test(emailInput.value.trim())) {
                showError(emailInput, errorMessages.email);
                isValid = false;
            }

            // Проверка Пароля
            if (!patterns.password.test(passwordInput.value.trim())) {
                showError(passwordInput, errorMessages.password);
                isValid = false;
            }

            // Проверка Телефона
            const cleanPhone = phoneInput.value.replace(/\s+/g, '');
            if (!patterns.phone.test(cleanPhone)) {
                showError(phoneInput, errorMessages.phone);
                isValid = false;
            }

            if (isValid) {
                alert('Форма успешно прошла валидацию по RegExp! Данные отправлены.');
                valForm.reset();
            }
        });
    }

    // ==========================================================================
    // 4. Лабораторная №7: To-Do Менеджер
    // ==========================================================================
    const todoForm = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');

    function createAndAddTask(taskText) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = taskText;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-complete';
        completeBtn.textContent = '✓';
        completeBtn.setAttribute('data-action', 'complete');

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.textContent = '✕';
        deleteBtn.setAttribute('data-action', 'delete');

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actionsDiv);

        todoList.prepend(li);
    }

    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskText = todoInput.value.trim();
            if (taskText !== '') {
                createAndAddTask(taskText);
                todoInput.value = '';
            }
        });
    }

    // Делегирование событий на контейнере <ul>
    if (todoList) {
        todoList.addEventListener('click', (e) => {
            const actionButton = e.target.closest('button[data-action]');
            if (!actionButton) return;

            const item = actionButton.closest('.todo-item');
            const action = actionButton.getAttribute('data-action');

            if (action === 'complete') item.classList.toggle('completed');
            if (action === 'delete') item.remove();
        });
    }

});

// ==========================================================================
// 5. Модальное окно деталей карточек
// ==========================================================================
function showDetails(title, description) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = description;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) closeModal();
});