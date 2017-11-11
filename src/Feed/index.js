import {render as renderMarkdownFeed} from '../FeedMarkdown/';
import {render as renderRawFeed} from '../FeedRaw/';

const render = () => {
    const hash = document.location.hash;
    const renderByHash = {
        '#markdown': renderMarkdownFeed,
        '#raw': renderRawFeed,
    };

    if (renderByHash[hash]) {
        renderByHash[hash]();
    }
};

window.addEventListener('hashchange', render);
render();