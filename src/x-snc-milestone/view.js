export default (state) => {
  console.log("%c " + "View Milestone Component", "font-weight:bold");
  const { currentStage, stages } = state;
  console.log("Milestone Component: state", state);
 // console.log("%c " + " • table    : " + properties.table, "font-style:italic");
 // console.log("%c " + " • sysId    : " + properties.sysId, "font-style:italic");
  console.log("%c " + " • isLoading: " + state.isLoading, "font-style:italic");
 // console.log("%c " + " • stages   : " + JSON.stringify(properties.stages), "font-style:italic");
 //console.log("%c " + " • stages   : " + JSON.stringify(stages), "font-style:italic");
 console.log("%c " + " • stages   : " + stages, "font-style:italic");
 console.log("%c " + " • current  : " + currentStage, "font-style:italic");

  const currentIndex = stages.findIndex((stage) => stage === currentStage);

  return (
    <div className="container">
      <ul className="stage-tracker">
        {stages.map((stage, index) => (
          <li className={getClassName(index)}><a href="#">{stage}</a>
          </li>
          /*
						<li className={getClassName(index)}>
							<a href="">{stage.label}</a>
							<now-popover interaction-type="none"
								 positions={[{ "target": "bottom-center", "content": "top-center" }]}>
								<now-button-bare slot="trigger" icon-start="ellipsis-v-outline" className="pop-icon"/>
								<stage-details slot="content" stage={stage.label}/>
							</now-popover>
						</li>
						 */
        ))}
      </ul>
      {state.hasError && <div className="error">{state.errorMessage}</div>}
    </div>
  );

  /**
   *  Helper function to determine the CSS class for a stage.
   */
  function getClassName(stageIndex) {
    if (stageIndex === currentIndex) {
      return "stage current";
    } else if (stageIndex < currentIndex) {
      return "stage complete";
    }
    return "stage";
  }
};
