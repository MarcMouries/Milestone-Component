import '../src/x-snc-milestone';
//import {DEFAULT_STAGE_LIST} from '../src/x-snc-milestone/sample_data';

const DEFAULT_STAGE_LIST = ["Element 1", "Element 2", "Element 3"];
const DEFAULT_CURRENT_STAGE = "Element 2";

const css = `
    * {
        font-family: 'Arial', sans-serif; 
    }

 .container {
    padding: 20px;
    border: 2px solid #0078d7;  // You may want to adjust this if it doesn't fit the new color scheme
    border-radius: 8px;
    max-width: 800px;
    margin: 20px auto;  // Centers the container
}

.paragraph {
    color: #333;
    font-size: 16px;
    margin-bottom: 15px;
    padding-top: 10px;
}

.header {
    padding: 8px;
    font-size: 18px;
    border-radius: 4px 4px 0 0;  
    border-left: 2px solid;  
    border-right: 2px solid;  
    border-top: 2px solid; 
    color: #333;  
}

.milestone-container {
    padding: 10px;
    border: 1px solid;  
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-top: none;
    margin-bottom: 20px;
}

/* Dynamic header colors based on mode */
.header.mode-static {
    background-color: #E3E1D9;
    border-color: #E3E1D9;
}

.header.mode-record {
    background-color: #F2EFE5;
    border-color: #F2EFE5;
}

.header.mode-default { 
    background-color: #C7C8CC;
    border-color: #C7C8CC;
}

`;

// Create a <style> element
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

/************************************************************************/
/*  Create the custom elements manually so we can pass data more easily */
/************************************************************************/

// Create the container div
const el = document.createElement('div');
document.body.appendChild(el);


// Title
const mainHeading = document.createElement('h1');
mainHeading.textContent = "Milestone Tracker Test Page";
mainHeading.style.textAlign = 'center'; // Center the heading
el.insertBefore(mainHeading, el.firstChild);

// Default Mode (No properties set)
el.appendChild(createHeader('Default Mode (No properties set)', 'default'));
const milestoneDefault = createMilestone({});
el.appendChild(milestoneDefault);


const baseConfigStatic = {
  mode: "STATIC",
  stages: ["Submission", "Review", "Complete"],
  currentStage: "Review"
};

// Example: Milestones of different sizes
['small', 'medium', 'large'].forEach(size => {
  el.appendChild(createHeader(`Mode = STATIC & Size = ${size}`, 'static'));

  const configStatic = { ...baseConfigStatic, size: size };  // Create a copy of the base config and set the size
  const milestone = createMilestone(configStatic);
  el.appendChild(milestone);
});

// Example: Pointing to a record
el.appendChild(createHeader('Mode = RECORD', 'record'));
const configRecord = {
  mode: "RECORD",
  table: 'x_snc_uib_examples_order',
  sysId: '9cab58f31b96b910b00dddf6b04bcb98'
};
const milestoneRecord = createMilestone(configRecord);
el.appendChild(milestoneRecord);

function createHeader(text, mode) {
  const header = document.createElement('div');
  header.className = 'header';
  header.textContent = text;
  if (mode) {
      header.classList.add('mode-' + mode.toLowerCase());
  }
  return header;
}

// Helper function to create and configure the milestone component
function createMilestone(config) {

  const container = document.createElement('div');
  container.className = 'milestone-container';

  // Create the milestone custom element
  const milestone = document.createElement('x-snc-milestone');
  container.appendChild(milestone);

  if (config.mode) {
    milestone.mode = config.mode;
    container.classList.add('mode-' + config.mode.toLowerCase());
  }

  if (config.size) milestone.size = config.size;
  if (config.stages) milestone.stages = config.stages;
  if (config.currentStage) milestone.currentStage = config.currentStage;
  if (config.table) milestone.table = config.table;
  if (config.sysId) milestone.sysId = config.sysId;
  return container;
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