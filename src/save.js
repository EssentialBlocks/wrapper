/*
 * WordPress Dependencies
 *
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/*
 * Internal  Dependencies
 *
 */

const save = ({ attributes }) => {
	const { blockId, wrapperAlign, isWrapperWidth } = attributes;

	const alignmentClass =
		wrapperAlign === "center"
			? "eb-wrapper-align-center"
			: wrapperAlign === "right"
			? "eb-wrapper-align-right"
			: "";

	return (
		<div {...useBlockProps.save()}>
			<div
				className={`eb-wrapper-outer ${blockId}${
					isWrapperWidth ? ` ${alignmentClass}` : ""
				}`}
			>
				<div className="eb-wrapper-inner">
					<div
						className={`eb-wrapper-inner-blocks${
							!isWrapperWidth ? ` ${alignmentClass}` : ""
						}`}
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
};

export default save;
