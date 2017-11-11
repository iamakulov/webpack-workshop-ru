import _ from 'lodash';
import moment from 'moment';
import {markdown} from 'markdown';
import './index.css';

export const render = () => {
    // 1. Fetch the new data
    fetch('/data')
        .then(res => res.json())
        .then(data => {
            renderData(data);
        });
};

// 2. Methods
const renderData = (data) => {
    const target = document.querySelector('#records');

    const html = _.map(data.items, item => generateRecord(item.date, markdown.toHTML(item.content)))
        .join('');

    target.innerHTML = html;
};

const generateRecord = (date, content) => {
    return `<section class="record_markdown">
        <div class="record_markdown__date">${moment(date).format('D MMM YYYY')}</div>
        <div class="record_markdown__content">${content}</div>
    </section>`;
}