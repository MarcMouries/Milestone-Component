import '../src/x-snc-milestone';
import {TASK_LIST} from '../src/x-snc-milestone/sample_data';


const el = document.createElement('DIV');
document.body.appendChild(el);

const items = [
    { id: "received", description: "New Lead" }, 
    { id: "investigation", description: "Under Investigation" }, 
    { id: "review", description: "Review" }, 
    { id: "resolved", description: "Case Resolved" }
];

console.log(items);
let items_str1 = JSON.stringify(items);
console.log(items_str1);

items_str1 = `[{\"id\":\"1\",\"description\":\"Lead\"},{\"id\":2,\"description\":\"Investigation\"}]`
console.log(items_str1);



const items_str = "[{\"id\":1,\"description\":\"Jane\"},{\"id\":2,\"description\":\"John\"}]"
console.log(items_str);
const items_obj = JSON.parse(items_str);
console.log(items_obj);
const items_str2 = JSON.stringify(items_obj);
console.log(items_str2);

//el.innerHTML = `<x-snc-milestone items="[]"></x-snc-milestone>`;     // Passing Empty:  WORKS
//el.innerHTML = `<x-snc-milestone items=${items}></x-snc-milestone>`;   // Passing object: Fails expected to be type array but received string.
//el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK


el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK




