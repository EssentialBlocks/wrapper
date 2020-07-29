import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";

registerBlockType("block/wrapper", {
	title: __("Wrapper", "wrapper"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"wrapper"
	),
	category: "widgets",
	icon: "smiley",
	attributes,
	edit: Edit,
	save,
});
