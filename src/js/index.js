document.addEventListener('DOMContentLoaded', () => {
    // Модальные окна
    const modalDelivery = document.getElementById('modal-delivery');
    const modalPayment = document.getElementById('modal-payment');

    // Кнопки открытия
    const openButtonDelivery = document.getElementById('openModalDelivery');
    const openButtonPayment = document.getElementById('openModalPayment');

    // Кнопки закрытия
    const closeButtons = document.querySelectorAll('.close-btn');

    // Функция открытия модального окна
    const openModal = (modal) => {
        document.body.style.overflow = 'hidden';
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'all';
        modal.classList.add('show');
    };

    // Функция закрытия модального окна
    const closeModal = (modal) => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            modal.classList.remove('hide');
            document.body.style.overflow = 'auto';
        }, 300);
    };

    // Обработчики открытия
    openButtonDelivery.addEventListener('click', () => openModal(modalDelivery));
    openButtonPayment.addEventListener('click', () => openModal(modalPayment));

    // Обработчики закрытия
    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });


});

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal'); // Все модальные окна
    const submitButtons = document.querySelectorAll('.submit-btn'); // Все кнопки отправки
    const hintReviews = document.querySelectorAll('.hintReviews'); // Все уведомления об успехе

    // Убираем текст ошибки при вводе текста
    function handleInputValidation(input, errorElement) {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                errorElement.textContent = ''; // Сбрасываем текст ошибки
                input.classList.remove('error');
            }
        });
    }

    // Валидация при отправке формы
    submitButtons.forEach((submitButton) => {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем отправку формы

            const form = submitButton.closest('form'); // Находим форму, к которой относится кнопка
            const modal = submitButton.closest('.modal'); // Находим модальное окно формы
            const hintReview = modal.nextElementSibling; // Уведомление об успехе

            // Поля формы
            const nameInput = form.querySelector('input[name="name"]');
            const reviewInput = form.querySelector('textarea[name="review"]');
            const fileInput = form.querySelector('input[type="file"]'); // Поле загрузки файла
            const nameError = form.querySelector('#nameError');
            const reviewError = form.querySelector('#reviewError');
            const fileError = form.querySelector('#file-error');

            let isValid = true;

            // Проверка имени
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Заполните название';
                nameInput.classList.add('error');
                isValid = false;
            } else {
                nameError.textContent = '';
                nameInput.classList.remove('error');
            }

            // Проверка отзыва
            if (reviewInput.value.trim() === '') {
                reviewError.textContent = 'Заполните описание';
                reviewInput.classList.add('error');
                isValid = false;
            } else {
                reviewError.textContent = '';
                reviewInput.classList.remove('error');
            }
            if(fileInput){
                // Проверка загруженного файла
                if (!fileInput.files || fileInput.files.length === 0) {
                    fileError.textContent = 'Пожалуйста, загрузите иконку.';
                    fileInput.classList.add('error');
                    isValid = false;
                } else {
                    fileError.textContent = '';
                    fileInput.classList.remove('error');
                }
            }
            
            if (isValid) {
                const formData = new FormData(form); // Собираем данные формы

                // Получаем тип действия из data-action кнопки
                const action = submitButton.getAttribute('data-action');
                let targetBlock;

                // В зависимости от действия определяем URL для отправки данных
                if (action === 'payment') {
                    targetBlock = document.querySelector('.payment-options');
                } else if (action === 'delivery') {
                    targetBlock = document.querySelector('.delivery-zones');
                }

                if (targetBlock) {
                    const name = nameInput.value.trim();
                    const review = reviewInput.value.trim();
                    
                    const hintReviews = document.querySelector('.hintReviews');
                    let newBlock = '';
    
                    if (action === 'payment') {
                        const file = fileInput.files[0]; // Файл иконки
                        const fileURL = URL.createObjectURL(file); // Создаём URL для файла
                        newBlock = `<div class="payment-option">
                            <div class="text">
                                <h3>${name}</h3>
                                <p>${review}</p>
                            </div>
                            <div class="img-svg-icon">
                                <img src="${fileURL}" alt="Icon" /> 
                            </div>
                        `;
                    } else if (action === 'delivery') {
                        newBlock = `
                            <div class="delivery-zone">
                                <h3>${name}</h3>
                                <p>${review}</p>
                            </div>
                        `;
                    }
    
                    // Добавляем новый блок в нужный контейнер
                    targetBlock.insertAdjacentHTML('beforeend', newBlock);
    
                    // Очищаем поля формы после успешного добавления
                    form.reset();
                    modal.classList.remove('show');
                    modal.classList.add('hide');
        
                    setTimeout(() => {
                        modal.style.opacity = '0';
                        modal.style.pointerEvents = 'none';
                        modal.classList.remove('hide');
                        document.body.style.overflow = 'auto';
                    }, 300);
        
                    hintReviews.style.display = 'flex';
        
                    setTimeout(() => {
                        hintReviews.style.display = 'none';
                        form.style.display = 'block';
                    }, 4000);
                }
   
            }
        });
    });

    // Добавляем обработчики ввода для всех форм
    modals.forEach((modal) => {
        const form = modal.querySelector('form');
        if (form) {
            const nameInput = form.querySelector('input[name="name"]');
            const reviewInput = form.querySelector('textarea[name="review"]');
            const nameError = form.querySelector('#nameError');
            const reviewError = form.querySelector('#reviewError');

            handleInputValidation(nameInput, nameError);
            handleInputValidation(reviewInput, reviewError);
        }
    });
});

