const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import Edit from "./edit";
import save from "./save";
import icon from "./icon";
import attributes from "./attributes";

registerBlockType("wrapper/wrapper", {
	title: __("Wrapper", "wrapper"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"wrapper"
	),
	category: "widgets",
	icon,
	attributes,
	edit: Edit,
	save,
});
