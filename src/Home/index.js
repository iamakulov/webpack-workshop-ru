import moment from 'moment';

const birthday = moment([2017, 10, 1]);

const updateDate = () => {
    const time = moment().diff(birthday, 'seconds', true);
    document.querySelector('#time').textContent = time.toFixed(3);

    requestAnimationFrame(updateDate);
};

updateDate();