import { __ } from "@wordpress/i18n";

import Edit from "./edit";
import save from "./save";
import example from "./example";
import { WrapperIcon } from "./icon";
import attributes from "./attributes";
import metadata from "../block.json";
const { ebConditionalRegisterBlockType } = EBWrapperControls;

ebConditionalRegisterBlockType(metadata, {
	keywords: [
		__("wrapper", "wrapper"),
		__("eb essential", "wrapper"),
		__("container", "wrapper"),
	],
	icon: WrapperIcon,
	attributes,
	edit: Edit,
	save,
	example,
});
