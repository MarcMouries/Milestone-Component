import '../src/x-snc-milestone';
//import {DEFAULT_STAGE_LIST} from '../src/x-snc-milestone/sample_data';

const DEFAULT_STAGE_LIST = ["Element 1", "Element 2", "Element 3"];
const DEFAULT_CURRENT_STAGE = "Stage 2";

const el = document.createElement('DIV');
document.body.appendChild(el);


// Convert the array to a string and join elements with a comma
// did not work
//const stagesString = DEFAULT_STAGE_LIST.join('", "');
// did not work
// const example = '[\"Element 1\", \"Element 2\", \"Element 3\"]';

// Error: Parsing failed for property stages on component x-snc-milestone: expected to be type array but received string.

/*
el.innerHTML = `
    <div style="padding: 0px; border: solid">
    <p style="padding: 10px; font-family: sans-serif">Mode = STATIC</p>
    <x-snc-milestone
      mode="STATIC"
      stages=["${example}"]
      current-stage="Element 2">
    </x-snc-milestone>
`;
 */

// so we create teh element manually
// Create the custom element
const milestoneElement = document.createElement('x-snc-milestone');
milestoneElement.mode = "STATIC";
milestoneElement.stages = DEFAULT_STAGE_LIST; // Set the stages property directly
milestoneElement['current-stage'] = DEFAULT_CURRENT_STAGE;
// Append the custom element to the div
el.appendChild(milestoneElement);

/*
el.innerHTML = `
    <div style="padding: 0px; border: solid">
    <p style="padding: 10px; font-family: sans-serif">Mode = STATIC</p>
    <x-snc-milestone
      mode="STATIC"
      stages=["a", "b", "c"]
      current-stage="b">
    </x-snc-milestone>
     <p style="padding: 10px; font-family: sans-serif">Mode = RECORD</p>
        <x-snc-milestone
          mode = "RECORD"
          table="x_snc_uib_examples_order"
          sys-id="9cab58f31b96b910b00dddf6b04bcb98">
        </x-snc-milestone>
    </div>
`;

*/