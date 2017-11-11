import _ from 'lodash';
import moment from 'moment';
import {markdown} from 'markdown';
import './index.css';

// 1. Fetch the new data
fetch('/data')
    .then(res => res.json())
    .then(data => {
        renderData(data);
    });

// 2. Setup adding new posts
const addPostForm = document.querySelector('#add-post');
addPostForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = addPostForm.querySelector('.add-post__textarea').value;
    addNewRecord(markdown.toHTML(content));
});

// 3. Methods
const renderData = (data) => {
    const target = document.querySelector('#records');

    const html = _.map(data.items, item => generateRecord(item.date, markdown.toHTML(item.content)))
        .join('');

    target.innerHTML += html;
};

const addNewRecord = (content) => {
    const target = document.querySelector('#records');
    const html = generateRecord(new Date(), content);
    target.innerHTML = html + target.innerHTML;
};

const generateRecord = (date, content) => {
    return `<section class="record">
        <div class="record__date">${moment(date).format('D MMM YYYY')}</div>
        <div class="record__content">${content}</div>
    </section>`;
}