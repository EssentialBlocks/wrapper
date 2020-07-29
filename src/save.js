/*
 * WordPress Dependencies
 *
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/*
 * Internal  Dependencies
 *
 */
import { DEFAULT_BACKGROUND } from "./constants";

const Save = (props) => {
	const { attributes } = props;
	const {
		contentWidth,
		backgroundType,
		backgroundColor,
		gradientColor,
		imageURL,
		backgroundSize,
		borderColor,
		borderStyle,
		borderWidth,
		borderRadius,
		radiusUnit,
		shadowColor,
		hOffset,
		vOffset,
		blur,
		spread,
		inset,
		marginUnit,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		paddingUnit,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		hoverShadowColor,
		hoverHOffset,
		hoverVOffset,
		hoverBlur,
		hoverSpread,
		hoverInset,
	} = attributes;

	const outerStyles = {
		marginTop: marginTop ? `${marginTop}${marginUnit}` : null,
		marginRight: marginRight ? `${marginRight}${marginUnit}` : null,
		marginBottom: marginBottom ? `${marginBottom}${marginUnit}` : null,
		marginLeft: marginLeft ? `${marginLeft}${marginUnit}` : null,
		paddingTop: paddingTop ? `${paddingTop}${paddingUnit}` : null,
		paddingRight: paddingRight ? `${paddingRight}${paddingUnit}` : null,
		paddingBottom: paddingBottom ? `${paddingBottom}${paddingUnit}` : null,
		paddingLeft: paddingLeft ? `${paddingLeft}${paddingUnit}` : null,
		backgroundImage:
			backgroundType === "image" && imageURL
				? `url("${imageURL}")`
				: backgroundType === "gradient"
				? gradientColor
				: "none",
		backgroundSize: backgroundSize,
		backgroundColor:
			(backgroundType === "fill" && backgroundColor) || DEFAULT_BACKGROUND,
		border: `${borderWidth || 0}px ${borderStyle} ${borderColor || "#000000"}`,
		borderRadius: `${borderRadius || 0}${radiusUnit}`,
		boxShadow: `${hOffset || 0}px ${vOffset || 0}px ${blur || 0}px ${
			spread || 0
		}px ${shadowColor || "#000000"} ${inset ? "inset" : ""}`,
	};

	const innerBlockStyles = {
		maxWidth: contentWidth ? contentWidth : undefined,
	};

	return (
		<div
			className="eb-wrapper-outer"
			style={outerStyles}
			data-shadow-color={shadowColor || "#000000"}
			data-hoffset={hOffset || 0}
			data-voffset={vOffset || 0}
			data-blur={blur || 0}
			data-spread={spread || 0}
			data-inset={inset}
			data-hover-shadow-color={hoverShadowColor || "#000000"}
			data-hover-hoffset={hoverHOffset || 0}
			data-hover-voffset={hoverVOffset || 0}
			data-hover-blur={hoverBlur || 0}
			data-hover-spread={hoverSpread || 0}
			data-hover-inset={hoverInset}
		>
			<div className="eb-wrapper-inner">
				<div className="eb-wrapper-inner-blocks" style={innerBlockStyles}>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default Save;
