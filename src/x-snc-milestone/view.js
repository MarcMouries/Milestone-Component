export default (state) => {
  const { currentStage, stages, hasError, errorMessage, isLoading } = state;

  const renderErrorMessages = () => {
    const errorMessages = ["Error Detected", "Configuration Issue", "Please Review Settings"];
    return errorMessages.map((message, index) => (
      <li key={`error-${index}`} className="stage error">{message}</li>
    ));
  };

  const renderStages = () => {
    if (isLoading) {
      return <div className="loading">Loading stages...</div>;
    }
    if (!stages || stages.length === 0) {
      return hasError ? renderErrorMessages() : <div className="error">No stages available.</div>;
    }
    const currentStageIndex = stages.findIndex(stage => stage === currentStage);
    return stages.map((stage, index) => (
      <li key={`stage-${index}`} className={getClassName(index, currentStageIndex)}><a href="#">{stage}</a></li>
    ));
  };

  return (
    <div className="container">
      <ul className="stage-tracker">
        {renderStages()}
      </ul>
      {hasError && <div className="error-message">{errorMessage}</div>}
    </div>
  );

  /**
   * Helper function to determine the CSS class for a stage.
   * Now accepts currentIndex as a parameter.
   */
  function getClassName(stageIndex, currentStageIndex) {
    if (stageIndex === currentStageIndex) {
      return "stage current";
    } else if (stageIndex < currentStageIndex) {
      return "stage complete";
    }
    return "stage";
  }
};



/* VERSIONS WITH THE POP OVER
  return (
    <div className="container">
      {state.hasError && <div className="error">{state.errorMessage}</div>}
      <ul className="stage-tracker">
        {stages.map((stage, index) => (
          <li className={getClassName(index)}><a href="#">{stage}</a>
          </li>
          
						<li className={getClassName(index)}>
							<a href="">{stage.label}</a>
							<now-popover interaction-type="none"
								 positions={[{ "target": "bottom-center", "content": "top-center" }]}>
								<now-button-bare slot="trigger" icon-start="ellipsis-v-outline" className="pop-icon"/>
								<stage-details slot="content" stage={stage.label}/>
							</now-popover>
						</li>
						 
        ))}
      </ul>
    </div>
  );
*/