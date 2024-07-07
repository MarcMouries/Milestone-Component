import '../src/x-snc-milestone';

const DEFAULT_STAGE_LIST = ["Element 1", "Element 2", "Element 3"];
const DEFAULT_CURRENT_STAGE = "Element 2";

const css = `
    * {
        font-family: 'Arial', sans-serif; 
    }

 .container {
    padding: 20px;
    border: 2px solid #0078d7;
    border-radius: 8px;
    max-width: 800px;
    margin: 20px auto;
}



.header {
    padding: 8px;
    font-size: 18px;
    border-radius: 4px 4px 0 0;  
    background-color: #C7C8CC;
    border-color: #C7C8CC;
    color: #333;  
    margin-bottom: 10px
}

.milestone-container {
    padding: 10px;
    border: 1px solid;  
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
el.appendChild(createMilestone({  }, 'Default Mode (No properties set)'));

// Example: Milestones of different sizes
const baseConfigStatic = {
  mode: "STATIC",
  stages: ["Submission", "Review", "Complete"],
  currentStage: "Review"
};

['small', 'medium', 'large'].forEach(size => {
  const configStatic = { ...baseConfigStatic, size: size };  // Create a copy of the base config and set the size
  el.appendChild(createMilestone(configStatic, `Mode = STATIC & Size = ${size}`));
});

// Example: Pointing to a valid record
const configValidRecord = {
  mode: "RECORD",
  table: 'x_snc_uib_examples_order',
  sysId: '9cab58f31b96b910b00dddf6b04bcb98'
};
el.appendChild(createMilestone(configValidRecord, 'Mode = RECORD - Valid record'));

// Example: Pointing to a table without a stage
const configInvalidRecord = {
  mode: "RECORD",
  table: 'task',
  sysId: '9cab58f31b96b910b00dddf6b04bcb98'
};
el.appendChild(createMilestone(configInvalidRecord, 'Mode = RECORD - table without a stage field'));

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
function createMilestone(config, headerText) {
  const container = document.createElement('div');
  container.className = 'milestone-container';

  // Create and append the header element to the container
  const header = createHeader(headerText, config.mode);
  container.appendChild(header);

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