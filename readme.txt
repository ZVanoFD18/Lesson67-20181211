Домашнее задание "Lesson67-20181211-homework".
1. Создание формы для ввода точек графика (x, y) нажатию кнопки получаем массив объектов в JSON формате.
Обязательным условием являеться использование паттерна Адаптер.



Для того, чтобы использовать код в браузере, нужно скомпилировать файлы *.ts в *.js и собрать в один index.js

0. Создаем котфиг "tsconfig.json" в корне проекта.
1. Устанавливаем компилятор typescript
npm install -g typescript
+ typescript@3.2.1
added 1 package from 1 contributor in 60.825s

2. Проверяем, что он установился и доступен
tsc -v
Version 3.2.1

3. Запускаем процесс, который будет следить за изменениями *.ts и компилировать index.js
tsc -w