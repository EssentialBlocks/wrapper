/*
 * WordPress Dependencies
 *
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

/*
 * Internal  Dependencies
 *
 */
import Inspector from "./inspector";
import { DEFAULT_BACKGROUND } from "./constants";

const Edit = (props) => {
	const { isSelected, attributes, setAttributes } = props;
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
		isHover,
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
		boxShadow: isHover
			? `${hoverHOffset || 0}px ${hoverVOffset || 0}px ${hoverBlur || 0}px ${
					hoverSpread || 0
			  }px ${hoverShadowColor || "#000000"} ${hoverInset ? "inset" : ""}`
			: `${hOffset || 0}px ${vOffset || 0}px ${blur || 0}px ${spread || 0}px ${
					shadowColor || "#000000"
			  } ${inset ? "inset" : ""}`,
	};

	const innerBlockStyles = {
		maxWidth: contentWidth ? contentWidth : null,
	};

	return [
		isSelected && <Inspector {...props} />,
		<div
			className="eb-wrapper-outer"
			style={outerStyles}
			onMouseEnter={() => setAttributes({ isHover: true })}
			onMouseLeave={() => setAttributes({ isHover: false })}
		>
			<div className="eb-wrapper-inner">
				<div className="eb-wrapper-inner-blocks" style={innerBlockStyles}>
					<InnerBlocks />
				</div>
			</div>
		</div>,
	];
};

export default Edit;
