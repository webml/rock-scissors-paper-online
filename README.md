# Игра «Камень, ножницы, бумага»

Приложение работает с помощью команды `npx http-server`.

Архитектурно выбрана концепция SPA (Single Page Application) — когда приложение загружается по ссылке `[http://localhost:8080/](http://localhost:8080/)` и все переходы внутри осуществятся уже за счет JavaScript.
В проекте используется мобильный интерфейс.

## Список экранов проекта

### Экран авторизации

Экран, где предлагается ввести свой логин и нажать кнопку «Войти». После нажатия кнопки, когда сервер ответил с токеном, должен происходить переход в экран лобби.

### Экран лобби

Экран, где есть список всех онлайн-пользователей и кнопка «Начать игру».

### Экран ожидания игры

Если пока никто не создал игру, на этом экране ждем соперника.

### Экран игры

Когда в игре есть два соперника или после того, как оба сделали одинаковый ход (например, оба выбрали ножницы), рисуем экран выбора хода.  

### Экран ожидания хода соперника

Если игрок сделал ход, а соперник еще нет — рисуем экран ожидания хода соперника. 

### Экран исхода игры

Как только игроки сделали разные ходы — кто-то из них победил, а кто-то проиграл, рисуем соответствующий экран победы или поражения. Из него можно сразу создать игру или перейти в лобби.

## Основной сценарий

Интерфейс предлагает залогиниться. Введенный логин отправляется в ручку бэкенда для логина, в ответ приходит токен. Дальше опрашивается ручка статуса для игрока, и если в ответе «лобби», то отрисовывается экран с кнопкой-приглашением начать игру. После нажатия на кнопку отправляется запрос на ручку старта игры. В ответе ручки приходит id игры. Получив его, начинается ожидание соперника (опрашивается ручка статуса игры и отрисовывается экран ожидания). Когда в ответе бэкенда статус будет «ожидание вашего хода» — отрисовываются кнопки для хода. После нажатия на фигуру для хода отправляется ход на ручку play и приходит ответ со статусом. Если статус «ожидаем хода соперника», то начинается опрос статуса игры, когда он станет «победа», «поражение» или «ожидание хода игрока». «Ожидание хода игрока» будет в том случае, если соперник выбрал тот же ход. В этом случае снова показываются кнопки для хода. В случае победы/поражения отрисовывается соответствующий экран и даем возможность вернуться в лобби/начать новую игру.
