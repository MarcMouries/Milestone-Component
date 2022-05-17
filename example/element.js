import '../src/x-snc-milestone';
import {TASK_LIST} from '../src/x-snc-milestone/sample_data';


const el = document.createElement('DIV');
document.body.appendChild(el);


const style = document.createElement('style');
document.head.appendChild(style);
style.innerHTML = `
    html, body {
        margin: 10;
        padding: 10;
    }


`;

const items_OLD = [
    { id: "received", description: "New Lead"},
    { id: "investigation", description: "Under Investigation"}, 
    { id: "review", description: "Review"}, 
    { id: "resolved", description: "Case Resolved"}
];

const items = [
    {id: 'step1', label: 'Not started', progress: 'none'},
   {id: 'step2', label: 'Active', progress: 'partial'},
   {id: 'step3', label: 'In progress', progress: 'partial'},
   {id: 'step4', label: 'Complete', progress: 'done'}
   ];

console.log(TASK_LIST);
console.log("TASK_LIST");

console.log("items");
console.log(items);

const items_str1 = `[{\"id\":\"1\",\"label\":\"Submission\"},{\"id\":2,\"label\":\"Triage\",\"status\":\"current\"},{\"id\":3,\"label\":\"Fulfillment\"},{\"id\":4,\"label\":\"Validation\"}]`;
const items_str2 = [{'id':'received','label':'New Lead'},{'id':'investigation','label':'Under Investigation'},{'id':'review','label':'Review'},{'id':'resolved','label':'Case Resolved'}];

console.log("items_str1");
console.log(items_str1);

console.log("items_str2");
console.log(items_str2);

//el.innerHTML = `<x-snc-milestone items="[]"></x-snc-milestone>`;     // Passing Empty:  WORKS
//el.innerHTML = `<x-snc-milestone items=${items}></x-snc-milestone>`;   // Passing object: Fails expected to be type array but received string.
//el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK


el.innerHTML = `<x-snc-milestone items=${items_str1}></x-snc-milestone>`;// Passsing a string: OK


