import {
	WRAPPER_BACKGROUND,
	WRAPPER_WIDTH,
	WRAPPER_BORDER,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
} from "./constants";

import {
	generateResponsiveRangeAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateDimensionsAttributes,
} from "../util/helpers";

const attributes = {
	// responsive control attributes ⬇
	resOption: {
		type: "string",
		default: "Desktop",
	},
	// uniqueIdNumber attribute for making unique className
	uniqueIdNumber: {
		type: "number",
	},
	blockId: {
		type: "string",
	},
	blockRoot: {
		type: "string",
		default: "essential_block",
	},
	blockMeta: {
		type: "object",
	},
	wrapperAlign: {
		type: "string",
		default: "center",
	},
	isWrapperWidth: {
		type: "boolean",
		default: false,
	},
	// responsive range controller
	...generateResponsiveRangeAttributes(WRAPPER_WIDTH),
	// background control
	...generateBackgroundAttributes(WRAPPER_BACKGROUND),
	// border shadow control
	...generateBorderShadowAttributes(WRAPPER_BORDER),
	// dimension control
	...generateDimensionsAttributes(WRAPPER_MARGIN, {
		top: 28,
		right: 0,
		bottom: 28,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(WRAPPER_PADDING, {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20,
		isLinked: false,
	}),
};

export default attributes;
