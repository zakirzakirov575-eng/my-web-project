document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Навигация и переключение вкладок
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('app-sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            link.classList.add('active');
            const targetTab = link.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');

            if (window.innerWidth < 768 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // ==========================================================================
    // 2. Лабораторная работа №8: Кастомная валидация форм через RegExp
    // ==========================================================================
    const valForm = document.querySelector('#custom-val-form');
    const emailInput = document.querySelector('#val-email');
    const passwordInput = document.querySelector('#val-password');
    const phoneInput = document.querySelector('#val-phone');

    // Шаг 2: Строгие маски регулярных выражений (RegExp)
    const patterns = {
        // Проверка e-mail, наличия @ и домена второго уровня
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        
        // Мин. 8 символов, заглавная буква, цифра, спецсимвол
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        
        // Международный формат телефона (+7..., +380..., и т.д.)
        phone: /^\+?[1-9]\d{1,14}$/
    };

    // Сообщения об ошибках
    const errorMessages = {
        email: "Введите корректный E-mail (например, user@domain.com)",
        password: "Пароль должен содержать мин. 8 символов, 1 заглавную букву, 1 цифру и 1 спецсимвол",
        phone: "Введите телефон в международном формате (например, +77071234567)"
    };

    // Шаг 3: Алгоритм очистки прошлых ошибок из DOM
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    }

    // Шаг 5: Точечная вставка ошибки под инпутом
    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        
        const errorNode = document.createElement('span');
        errorNode.className = 'error-message';
        errorNode.textContent = message;

        // Вставка под поля ввода
        inputElement.parentNode.appendChild(errorNode);
    }

    // Шаг 1 & 4: Перехват submit и условная логика regex.test()
    if (valForm) {
        valForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Блокировка перезагрузки
            clearErrors(); // Очистка старых ошибок

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

            // Проверка Телефона (очищаем от пробелов для теста)
            const cleanPhone = phoneInput.value.replace(/\s+/g, '');
            if (!patterns.phone.test(cleanPhone)) {
                showError(phoneInput, errorMessages.phone);
                isValid = false;
            }

            // Успешная валидация
            if (isValid) {
                alert('Форма успешно прошла валидацию по RegExp! Данные отправлены.');
                valForm.reset();
            }
        });
    }

    // ==========================================================================
    // 3. Лабораторная работа №7: To-Do
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

// Модальное окно
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