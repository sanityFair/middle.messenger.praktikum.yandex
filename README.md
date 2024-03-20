## Описание

Курс профессиональной программы обучения мидл фронтенд-разработчика.

## Установка и запуск

-   `npm install` — установка зависимостей
-   `npm run build ` — сборка проекта
-   `npm run start` — запуск локальной версии на http://localhost:3000/

## Проект в интернете

Работающую версию можно просмотреть здесь:
[Netlify-App](https://deploy--resplendent-lamington-09b434.netlify.app/)

## Макеты

Прототип в [Figma](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-600&mode=design&t=ZrhM6YX70Q5OFtkP-0>)

## Ссылки на все свёрстанные страницы

-   [Авторизация](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-600&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [Регистрация](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-658&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [Чаты](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-2&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [Профиль](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-498&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [Смена пароля](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=12-35&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [Смена персональных данных](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-515&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [500](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-616&mode=design&t=jIZTNmlfPOy8NyJj-4>)
-   [400](<https://www.figma.com/file/IwpjO4IdUYca2gTCO89hQ0/Chat_external_link-(Copy)?type=design&node-id=1-612&mode=design&t=jIZTNmlfPOy8NyJj-4>)

## Описание работы

Открыв проект на локальном хосте или его интернет-версию, можно увидеть страницу авторизации.
При клике на кнопку "Нет аккаунта?" можно перейти на страницу регистрации, возврат с которой осуществляется по кнопке "Войти".
Кликнув на кнопку "Авторизоваться" можно попасть в список чатов. Выбор чата осуществляется кликом по чату в левом столбце.
Нажав на ссылку "Профиль >" можно перейти на страницу с настройками пользователя. Клик по стрелке слева вернет обратно к экрану выбора чата.
При наведении курсора на аватар, появляется возможность изменить картинку аватара пользователя.
"Изменить данные" направит на страницу изменения данных пользователя.
"Изменить пароль" - на форму смены пароля.
"Выйти" - на страницу авторизации.

Нажав на "Поменять аватар", можно увидеть окно загрузки картинки, закрытие которого происходит по клику на затененной области вне окна загрузки.
На странице изменения данных кнопка "Сохранить" возвращает на страницу информации о пользователе, так же как и кнопка со стрелкой в левой части.
Аналогично, на странице изменения пароля кнопки "Сохранить" и стрелка осуществляют возврат на страницу изменения данных.

Страницы с ошибками доступа и серверными ошибками можно увидеть набрав соответственно относительные адреса "/404.html" и "/500.html" на локальном хосте или в интернет версии
