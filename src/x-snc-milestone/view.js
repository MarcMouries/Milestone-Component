export default (state, { updateState, dispatch }) => {
  const { currentStage, stages, size, hasError, errorMessage, isLoading, mode } = state;
  const renderErrorMessages = () => {
    const errorMessages = ["Error Detected", "Configuration Issue", "Please Review Settings"];
    return errorMessages.map((message, index) => (
      <li key={`error-${index}`} className="stage error">
        <a href="#">{message}</a>
      </li>
    ));
  };

  const handleClickOnStage = (e, stage, dispatch) => {
    console.log("handleClickOnStage: stage = ", stage);
    dispatch(({ properties: { name } }) => {
      return { type: "MILESTONE#CLICK", payload: { name, stage: { label: stage.label || stage, value: stage.value || stage } } };
    });
  };

  const renderStages = () => {
    if (isLoading) {
      return <div className="loading">Loading stages...</div>;
    }
    if (!stages || stages.length === 0) {
      return hasError ? renderErrorMessages() : <div className="error">No stages available.</div>;
    }
    const currentStageIndex = stages.findIndex((stage) => (stage.label || stage) === currentStage);
    return stages.map((stage, index) => (
      <li key={`stage-${index}`}
        className={getClassName(index, currentStageIndex, size)}
        on-click={(e) => handleClickOnStage(e, stage, dispatch)}>
        <a href="#">{stage.label || stage}</a>
      </li>
    ));
  };

  return (
    <div className="container">
      <ul className="stage-tracker">{renderStages()}</ul>
      {hasError && (
        <div className="error-message">
          <span className="error-message-icon">⚠️</span>
          {errorMessage}
        </div>
      )}
    </div>
  );

  function getClassName(stageIndex, currentStageIndex, size) {
    let className = "stage";
    if (stageIndex === currentStageIndex) {
      className += " current";
    } else if (stageIndex < currentStageIndex) {
      className += " complete";
    }
    className += ` ${size}`;
    return className;
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
