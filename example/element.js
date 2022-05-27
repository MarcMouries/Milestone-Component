import '../src/x-snc-milestone';
import {TASK_LIST} from '../src/x-snc-milestone/sample_data';


const el = document.createElement('DIV');
document.body.appendChild(el);


const style = document.createElement('style');
document.head.appendChild(style);
style.innerHTML = `
    html, body {
        margin: 10px;
        padding: 10px;
        background: white;
    }
    .container {
        background: white;
    }
`;

el.innerHTML = `<x-snc-milestone></x-snc-milestone>`;