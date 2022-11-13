export default (state, { dispatch }) => {

	/* 
	deconstructing syntax 
		const { properties } = state;
	is equivalent to:
		const properties     = state.properties;

	*/
	const { properties } = state;
	console.log("properties.current=" + properties.current);
	console.log(properties.items);
	const currentIndex = properties.items.findIndex(step => step.label === properties.current);
	console.log("currentIndex=" + currentIndex);

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