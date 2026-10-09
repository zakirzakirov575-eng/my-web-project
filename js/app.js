document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Навигация и Мобильное меню
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('app-sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
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

            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // ==========================================================================
    // Лабораторная работа №7: Интерактивное To-Do Приложение
    // ==========================================================================

    // Шаг 2: Поиск ключевых интерактивных узлов через document.querySelector()
    const todoForm = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');

    // Базовый начальный массив задач
    const initialTasks = [
        "Настроить агенты Wazuh SIEM",
        "Проверить правила HTML5 валидации",
        "Оформить отчет по лабораторной работам"
    ];

    // Шаг 4: Функция создания и добавления узла <li>
    function createAndAddTask(taskText) {
        // Создание элемента <li>
        const li = document.createElement('li');
        li.className = 'todo-item';

        // Текстовый контейнер
        const span = document.createElement('span');
        span.className = 'todo-text';
        // Использование БЕЗОПАСНОГО свойства textContent (защита от XSS)
        span.textContent = taskText;

        // Контейнер кнопок действий
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

        // Инжектирование узла в дерево методом prepend() (новые задачи вверху)
        todoList.prepend(li);
    }

    // Загрузка начальных задач
    initialTasks.forEach(task => createAndAddTask(task));

    // Шаг 3: Слушатель события отправки формы с event.preventDefault()
    if (todoForm) {
        todoForm.addEventListener('submit', (event) => {
            // Блокировка стандартной перезагрузки страницы браузером
            event.preventDefault();

            const taskText = todoInput.value.trim();
            if (taskText !== '') {
                createAndAddTask(taskText);
                todoInput.value = ''; // Очистка поля ввода
                todoInput.focus();
            }
        });
    }

    // Шаг 5: ДЕЛЕГИРОВАНИЕ СОБЫТИЙ на общем родительском контейнере <ul>
    if (todoList) {
        todoList.addEventListener('click', (event) => {
            // Верификация целевой кнопки через event.target.closest()
            const actionButton = event.target.closest('button[data-action]');
            if (!actionButton) return;

            // Находим родительский узел задачи <li>
            const item = actionButton.closest('.todo-item');
            const action = actionButton.getAttribute('data-action');

            if (action === 'complete') {
                // Отметка выполнения / отмена
                item.classList.toggle('completed');
            } else if (action === 'delete') {
                // Динамическое удаление узла из DOM
                item.remove();
            }
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