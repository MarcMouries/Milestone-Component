export default (state, { dispatch }) => {

	/* 
	deconstructing syntax 
		const { properties } = state;
	is equivalent to:
		const properties     = state.properties;

	*/
	const { properties } = state;

	return (
		<div className="container">
			<ul className="milestone-tracker">
				{
					properties.items.map((item, index) => (
						<li className={`milestone ${item.status == 'current' ? "current" : ""}`}><a href="">{item.id} - {item.description}</a></li>
					))
				}
				</ul>
			</div>)
};