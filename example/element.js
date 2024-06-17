import '../src/x-snc-milestone';
//import {DEFAULT_STAGE_LIST} from '../src/x-snc-milestone/sample_data';

const DEFAULT_STAGE_LIST = ["Element 1", "Element 2", "Element 3"];
const DEFAULT_CURRENT_STAGE = "Element 2";

const css = `
    .container {
        padding: 10px;
        border: solid;
    }

    .paragraph {
      padding-top: 10px;
      font-family: sans-serif;
      margin-bottom: 5px;
    }
`;

// Create a <style> element
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

// Append the <style> element to the <head>
document.head.appendChild(style);

/************************************************************************/
/*  Create the custom elements manually so we can pass data more easily */
/************************************************************************/

// Create the container div
const el = document.createElement('DIV');
el.style.padding = '10px';
el.style.border = 'solid';
document.body.appendChild(el);

// Default Mode (No properties set)
const paragraphDefault = createParagraph('Default Mode (No properties set)');
const milestoneDefault = document.createElement('x-snc-milestone');
el.appendChild(paragraphDefault);
el.appendChild(milestoneDefault);

// Create the first milestone element
const paragraphStatic = createParagraph('Mode = STATIC & Size = small');
const milestoneStatic = document.createElement('x-snc-milestone');
milestoneStatic.mode = "STATIC";
milestoneStatic.size = "small";
milestoneStatic.stages = ["Submission", "Review", "Complete"]; // Due on Feb 1, 2024
milestoneStatic.currentStage = "Review";
el.appendChild(paragraphStatic);
el.appendChild(milestoneStatic);

// Create a paragraph for the second component
const paragraphRecord = createParagraph('Mode = RECORD');
const milestoneRecord = document.createElement('x-snc-milestone');
milestoneRecord.mode = 'RECORD';
milestoneRecord.table = 'x_snc_uib_examples_order';
milestoneRecord.sysId = '9cab58f31b96b910b00dddf6b04bcb98';
el.appendChild(paragraphRecord);
el.appendChild(milestoneRecord);

function createParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.classList.add('paragraph');
  paragraph.textContent = text;
  return paragraph;
}

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