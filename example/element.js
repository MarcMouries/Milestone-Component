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

const items_str1 = `[{\"id\":\"1\",\"description\":\"Submission\"},{\"id\":2,\"description\":\"Triage\",\"status\":\"current\"},{\"id\":3,\"description\":\"Fulfillment\"},{\"id\":4,\"description\":\"Validation\"}]`;
const items_str2 = [{'id':'received','description':'New Lead'},{'id':'investigation','description':'Under Investigation'},{'id':'review','description':'Review'},{'id':'resolved','description':'Case Resolved'}];

console.log("items_str1");
console.log(items_str1);

console.log("items_str2");
console.log(items_str2);

//el.innerHTML = `<x-snc-milestone items="[]"></x-snc-milestone>`;     // Passing Empty:  WORKS
//el.innerHTML = `<x-snc-milestone items=${items}></x-snc-milestone>`;   // Passing object: Fails expected to be type array but received string.
//el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK


el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK




