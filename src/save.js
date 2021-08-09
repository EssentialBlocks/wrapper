/*
 * WordPress Dependencies
 *
 */
const { InnerBlocks, useBlockProps } = wp.blockEditor;

/*
 * Internal  Dependencies
 *
 */

const save = ({ attributes }) => {
	const { blockId } = attributes;

	return (
		<div className={`eb-wrapper-outer ${blockId}`}>
			<div className="eb-wrapper-inner">
				<div className="eb-wrapper-inner-blocks">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default save;
