const attributes = {
	contentWidth: {
		type: "number",
	},
	backgroundType: {
		type: "string",
		default: "fill",
	},
	backgroundColor: {
		type: "string",
	},
	gradientColor: {
		type: "string",
		default: "linear-gradient(45deg,#eef2f3,#8e92ab)",
	},
	imageURL: {
		type: "string",
	},
	imageID: {
		type: "string",
	},
	backgroundSize: {
		type: "string",
		default: "cover",
	},
	borderColor: {
		type: "string",
	},
	borderStyle: {
		type: "string",
		default: "solid",
	},
	borderWidth: {
		type: "number",
	},
	borderRadius: {
		type: "number",
	},
	radiusUnit: {
		type: "string",
		default: "px",
	},
	hOffset: {
		type: "number",
	},
	vOffset: {
		type: "number",
	},
	blur: {
		type: "number",
	},
	spread: {
		type: "number",
	},
	shadowColor: {
		type: "string",
	},
	inset: {
		type: "boolean",
		default: false,
	},
	marginUnit: {
		type: "string",
		default: "px",
	},
	marginTop: {
		type: "number",
	},
	marginRight: {
		type: "number",
	},
	marginBottom: {
		type: "number",
	},
	marginLeft: {
		type: "number",
	},
	paddingUnit: {
		type: "string",
		default: "px",
	},
	paddingTop: {
		type: "number",
	},
	paddingRight: {
		type: "number",
	},
	paddingBottom: {
		type: "number",
	},
	paddingLeft: {
		type: "number",
	},
	shadowType: {
		type: "string",
		default: "normal",
	},
	hoverHOffset: {
		type: "number",
	},
	hoverVOffset: {
		type: "number",
	},
	hoverBlur: {
		type: "number",
	},
	hoverSpread: {
		type: "number",
	},
	hoverShadowColor: {
		type: "string",
	},
	hoverInset: {
		type: "boolean",
		default: false,
	},
	isHover: {
		type: "boolean",
		default: false,
	},
};

export default attributes;
