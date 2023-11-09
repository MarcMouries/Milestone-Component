import '../src/x-snc-milestone';
import {TASK_LIST} from '../src/x-snc-milestone/sample_data';


const el = document.createElement('DIV');
document.body.appendChild(el);


el.innerHTML = `
    <div style="padding: 10px; border: solid">
        <x-snc-milestone table="x_snc_uib_examples_order" sys-id="5489078f1b567510b00dddf6b04bcb02"></x-snc-milestone>
    </div>
`;