---
layout: post
title: "Проблема аутлайнов"
categories: internet-maintenance
lang: ru
---

<script>
    dzDelayed.push(function() {
        $('.input-demo').find('button, span, a').on('mouseup mousedown', function (e) {
            e.stopPropagation();
        });

        $('.magic-link').click(function(e) {
            e.preventDefault();
            alert('YARRR!');
        });
    });
</script>

<style>
    .input-demo button:hover {
        outline: initial;
    }

    .input-demo .custom-button {
        font-size: 1.2em;
        background: transparent;
        border: 1px solid #ccc;
        border-radius: 0.2em;
        color: #333;
        padding: 0.5em;
        transition: all 0.25s linear;
    }

    .input-demo .custom-button:hover {
        background: dodgerblue;
        border-color: dodgerblue;
        color: white;
        transition: all 0.1s linear;
    }
</style>

#Проблема аутлайнов

Три тысячи постов уже написано и докладов рассказано про то, как плохо отключать аутлайны у ссылок и кнопок, как это вредит доступности использования, но девелоперы в большинстве своем продолжают это делать.

Причина очень простая: гадкий аутлайн портит внешний вид ссылки или кнопки. Сделать свой стиль для `:focus`, такой, чтобы и фокусировка была явно видна, и чтобы это никак не портило дизайн и не мельтешило перед глазами, бывает очень сложно.

Ну, вот, например, самое легкое --- сделать стиль для тектового инпута или текстэрии:

<figure class="input-demo">
    <input type="text" placeholder="Привет, я инпут">
</figure>

С кнопками сложнее. Многое зависит от дизайна кнопки. Ну, скажем:

<figure class="input-demo">
    <button>Привет, я кнопка</button>
</figure>

<figure class="input-demo">
    <button class="custom-button">Привет, я кнопка</button>
</figure>

<figure class="input-demo">
    <button class="pseudo-link">Привет, я кнопка</button>
</figure>

<figure class="input-demo">
    <span class="pseudo-link" tabindex="0">Привет, я спан</span>
</figure>

<figure class="input-demo">
    <a href="#">Привет, я ссылка</a>
</figure>

<figure class="input-demo">
    <a href="#" class="magic-link">Привет, я магичная ссылка</a>
</figure>

<div class="table-holder">
    <table>
        <thead>
            <tr>
                <th>Браузер</th>
                <th>Кнопка</th>
                <th>Кастомная кнопка</th>
                <th>Спан</th>
                <th>Ссылка</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Chrome 35</td>
                <td class="true">Нет</td>
                <td class="false">Да</td>
                <td class="false">Да</td>
                <td class="true">Нет</td>
            </tr>
            <tr>
                <td>Firefox</td>
                <td class="false">Да</td>
                <td class="true">Нет</td>
                <td class="false">Да</td>
                <td class="false">Да</td>
            </tr>
            <tr>
                <td>Opera 12</td>
                <td class="false">Да</td>
                <td class="true">Нет</td>
                <td class="true">Нет</td>
                <td class="true">Нет</td>
            </tr>
            <tr>
                <td>IE 10, 11</td>
                <td class="true">Нет</td>
                <td class="true">Нет</td>
                <td class="true">Нет</td>
                <td class="true">Нет</td>
            </tr>
            <tr>
                <td>IE 9</td>
                <td class="false">Да</td>
                <td class="false">Да</td>
                <td class="false">Да</td>
                <td class="false">Да</td>
            </tr>
        </tbody>
    </table>
</div>
