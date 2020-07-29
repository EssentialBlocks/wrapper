const { __ } = wp.i18n;

const BACKGROUND_TYPES = [
	{ label: __("Fill"), value: "fill" },
	{ label: __("Gradient"), value: "gradient" },
	{ label: __("Image"), value: "image" }
];

const BACKGROUND_SIZES = [
	{ label: __("Auto"), value: "auto" },
	{ label: __("Cover"), value: "cover" },
	{ label: __("Contain"), value: "contain" }
];

const BORDER_STYLES = [
	{ label: __("None"), value: "none" },
	{ label: __("Dashed"), value: "dashed" },
	{ label: __("Solid"), value: "solid" },
	{ label: __("Dotted"), value: "dotted" },
	{ label: __("Double"), value: "double" },
	{ label: __("Groove"), value: "groove" },
	{ label: __("Inset"), value: "inset" },
	{ label: __("Outset"), value: "outset" },
	{ label: __("Ridge"), value: "ridge" }
];

const SHADOW_TYPES = [
	{ label: "Normal", value: "normal" },
	{ label: "Hover", value: "hover" }
];

const DEFAULT_BACKGROUND = "#e9ecef";

export {
	BACKGROUND_TYPES,
	BACKGROUND_SIZES,
	BORDER_STYLES,
	SHADOW_TYPES,
	DEFAULT_BACKGROUND
};
