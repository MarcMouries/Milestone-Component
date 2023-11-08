import '../src/x-snc-milestone';
import {TASK_LIST} from '../src/x-snc-milestone/sample_data';


const el = document.createElement('DIV');
document.body.appendChild(el);


el.innerHTML = `
    <div style="padding: 10px; border: solid">
        <x-snc-milestone table="x_snc_uib_examples_example" sysid="b22fe03147a971105d6c8fd4f16d4328"></x-snc-milestone>
    </div>
`;