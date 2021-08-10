/*
 * WordPress Dependencies
 *
 */
const { __ } = wp.i18n;
const {
	InnerBlocks,
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;
const { useEffect } = wp.element;
const { select } = wp.data;

/*
 * Internal  Dependencies
 *
 */
import "./editor.scss";
import Inspector from "./inspector";
import {
	WRAPPER_WIDTH,
	WRAPPER_BACKGROUND,
	WRAPPER_BORDER,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
} from "./constants";

import {
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	softMinifyCssStrings,
	isCssExists,
	generateResponsiveRangeStyles,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
} from "../util/helpers";

const Edit = (props) => {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		wrapperAlign,
		isWrapperWidth,
	} = attributes;

	const innerBlockStyles = {
		maxWidth: WRAPPER_WIDTH ? WRAPPER_WIDTH : null,
	};

	// wrapper margin
	const {
		dimensionStylesDesktop: wrapperMarginDesktop,
		dimensionStylesTab: wrapperMarginTab,
		dimensionStylesMobile: wrapperMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_MARGIN,
		styleFor: "margin",
		attributes,
	});

	// wrapper padding
	const {
		dimensionStylesDesktop: wrapperPaddingDesktop,
		dimensionStylesTab: wrapperPaddingTab,
		dimensionStylesMobile: wrapperPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_PADDING,
		styleFor: "padding",
		attributes,
	});

	// wrapper background
	const {
		backgroundStylesDesktop,
		hoverBackgroundStylesDesktop,
		backgroundStylesTab,
		hoverBackgroundStylesTab,
		backgroundStylesMobile,
		hoverBackgroundStylesMobile,
		overlayStylesDesktop,
		hoverOverlayStylesDesktop,
		overlayStylesTab,
		hoverOverlayStylesTab,
		overlayStylesMobile,
		hoverOverlayStylesMobile,
		bgTransitionStyle,
		ovlTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: WRAPPER_BACKGROUND,
	});

	// wrapper border
	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: WRAPPER_BORDER,
		attributes,
	});

	// wrapper max-width
	const {
		rangeStylesDesktop: wrapperWidthDesktop,
		rangeStylesTab: wrapperWidthTab,
		rangeStylesMobile: wrapperWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: WRAPPER_WIDTH,
		property: "width",
		attributes,
	});

	const desktopStyles = `
		.eb-wrapper-align-center {
			margin-right: auto !important;
			margin-left: auto !important;
		}

		.eb-wrapper-align-right {
			margin-left: auto !important;
		}

		.eb-wrapper-outer.${blockId} {
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${backgroundStylesDesktop}
			${bdShadowStyesDesktop}
			${isWrapperWidth ? wrapperWidthDesktop : ""}
			max-width: 100%;
			transition: ${bgTransitionStyle}, ${bdShadowTransitionStyle};
		}

		.eb-wrapper-outer.${blockId} .eb-wrapper-inner-blocks {
			${!isWrapperWidth ? wrapperWidthDesktop : ""}
			max-width: 100%;
		}

		.eb-wrapper-outer.${blockId}:hover{	
			${hoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesDesktop}
			transition: ${ovlTransitionStyle};
		}

		.eb-wrapper-outer.${blockId}:hover:before{	
			${hoverOverlayStylesDesktop}
		}
	`;

	const tabStyles = `
		.eb-wrapper-outer.${blockId} {
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${backgroundStylesTab}
			${bdShadowStyesTab}
		}

		.eb-wrapper-outer.${blockId} .eb-wrapper-inner-blocks {
			${wrapperWidthTab}
		}

		.eb-wrapper-outer.${blockId}:hover{	
			${hoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesTab}
		}

		.eb-wrapper-outer.${blockId}:hover:before{	
			${hoverOverlayStylesTab}
		}
	`;

	const mobileStyles = `
		.eb-wrapper-outer.${blockId} {
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${backgroundStylesMobile}
			${bdShadowStyesMobile}
		}

		.eb-wrapper-outer.${blockId} .eb-wrapper-inner-blocks {
			${wrapperWidthMobile}
		}

		.eb-wrapper-outer.${blockId}:hover{	
			${hoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}

		.eb-wrapper-outer.${blockId}:before{
			${overlayStylesMobile}
		}

		.eb-wrapper-outer.${blockId}:hover:before{	
			${hoverOverlayStylesMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(desktopStyles) ? desktopStyles : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(tabStyles) ? tabStyles : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(mobileStyles) ? mobileStyles : " "}
	`);
	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-wrapper";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	useEffect(() => {
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: `eb-guten-block-main-parent-wrapper`,
	});

	const alignmentClass =
		wrapperAlign === "center"
			? "eb-wrapper-align-center"
			: wrapperAlign === "right"
			? "eb-wrapper-align-right"
			: "";

	return [
		isSelected && <Inspector {...props} />,
		<BlockControls>
			<AlignmentToolbar
				value={wrapperAlign}
				onChange={(wrapperAlign) => setAttributes({ wrapperAlign })}
			/>
		</BlockControls>,
		<div {...blockProps}>
			<style>
				{`
				 ${desktopAllStyles}
 
				 /* mimmikcssStart */
 
				 ${resOption === "Tablet" ? tabAllStyles : " "}
				 ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}
 
				 /* mimmikcssEnd */
 
				 @media all and (max-width: 1024px) {	
 
					 /* tabcssStart */			
					 ${softMinifyCssStrings(tabAllStyles)}
					 /* tabcssEnd */			
				 
				 }
				 
				 @media all and (max-width: 767px) {
					 
					 /* mobcssStart */			
					 ${softMinifyCssStrings(mobileAllStyles)}
					 /* mobcssEnd */			
				 
				 }
				 `}
			</style>
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
						<InnerBlocks />
					</div>
				</div>
			</div>
		</div>,
	];
};

export default Edit;
