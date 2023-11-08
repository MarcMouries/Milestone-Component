export default (state, { dispatch }) => {
	const { properties } = state;
    //console.log("Milestone Component: properties", properties);
	//console.log("Milestone Component: state", state);
	console.log("%c " + "Milestone Component", 'font-weight:bold');
	console.log("%c " + "table  : " + properties.table, 'font-weight:italic');
	console.log("%c " + "sysid  : " + properties.sysid, 'font-weight:italic');
	console.log("%c " + "current: " + properties.current, 'font-weight:italic');

	const currentIndex = properties.items.findIndex(step => step.label === properties.current);
	console.log("Milestone: currentIndex=" + currentIndex);

	function getClassName(itemIndex) {
		if (itemIndex === currentIndex) return 'milestone current';
		if (itemIndex < currentIndex) return 'milestone complete';
		return 'milestone'
	}

	if (false) {
		return (		<div className="container">	RIEN A VOIR	</div>)
	}

	return (
		<div className="container">
			<ul className="milestone-tracker">
				{
					properties.items.map((milestone, index) => (
						/*<li className={`milestone ${item.status == 'current' ? "current" : ""}`}><a href="">{item.id} - {item.label}</a></li>*/
						/*<li className={getClassName(index)}><a href="">{item.id} - {item.label}</a></li>*/
						<li className={getClassName(index)}>
							<a href="">{milestone.label}</a>
							<now-popover interaction-type="none" positions={[{ "target": "bottom-center", "content": "top-center" }]}>
								<now-button-bare slot="trigger" icon-start="ellipsis-v-outline" className="pop-icon"/>
								<milestone-details slot="content" milestone={milestone.label}/>
							</now-popover>
						</li>
					))
				}
			</ul>
		</div>)
};