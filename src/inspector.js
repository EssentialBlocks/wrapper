/**
 * WordPress dependencies
 *
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, ToggleControl } from "@wordpress/components";
import { select } from "@wordpress/data";
/**
 * Internal dependencies
 *
 */
import {
	WRAPPER_WIDTH,
	WRAPPER_BACKGROUND,
	WRAPPER_BORDER,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
} from "./constants";
import objAttributes from "./attributes";

// import {
// 	mimmikCssForResBtns,
// 	mimmikCssOnPreviewBtnClickWhileBlockSelected,
// } from "../../../util/helpers";
// import ResponsiveRangeController from "../../../util/responsive-range-control";
// import BackgroundControl from "../../../util/background-control";
// import BorderShadowControl from "../../../util/border-shadow-control";
// import ResponsiveDimensionsControl from "../../../util/dimensions-control-v2";

const {
	// mimmikCssForResBtns,
	// mimmikCssOnPreviewBtnClickWhileBlockSelected,

	//
	ResponsiveRangeController,
	BackgroundControl,
	BorderShadowControl,
	ResponsiveDimensionsControl,
} = window.EBWrapperControls;

const editorStoreForGettingPreivew =
	eb_style_handler.editor_type === "edit-site"
		? "core/edit-site"
		: "core/edit-post";

const Inspector = ({ attributes, setAttributes }) => {
	const { resOption, isWrapperWidth } = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select(editorStoreForGettingPreivew).__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// // this useEffect is for mimmiking css for all the eb blocks on resOption changing
	// useEffect(() => {
	// 	mimmikCssForResBtns({
	// 		domObj: document,
	// 		resOption,
	// 	});
	// }, [resOption]);

	// // this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	// useEffect(() => {
	// 	const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
	// 		domObj: document,
	// 		select,
	// 		setAttributes,
	// 	});
	// 	return () => {
	// 		cleanUp();
	// 	};
	// }, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: "general",
							title: __("General", "wrapper"),
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: __("Style", "wrapper"),
							className: "eb-tab styles",
						},
					]}
				>
					{(tab) => (
						<div className={`eb-tab-controls ${tab.name}`}>
							{tab.name === "general" && (
								<>
									<PanelBody>
										<ResponsiveRangeController
											baseLabel={__("Content Width", "wrapper")}
											controlName={WRAPPER_WIDTH}
											resRequiredProps={resRequiredProps}
											min={0}
											max={1600}
											step={1}
											noUnits
										/>
										<ToggleControl
											label={__("Use Width In Wrapper", "wrapper")}
											checked={isWrapperWidth}
											onChange={() => {
												setAttributes({
													isWrapperWidth: !isWrapperWidth,
												});
											}}
										/>
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_MARGIN}
											baseLabel={__("Margin", "wrapper")}
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_PADDING}
											baseLabel={__("Padding", "wrapper")}
										/>
									</PanelBody>
									<PanelBody title={__("Background", "wrapper")}>
										<BackgroundControl
											controlName={WRAPPER_BACKGROUND}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>
									<PanelBody title={__("Border & Shadow", "wrapper")}>
										<BorderShadowControl
											controlName={WRAPPER_BORDER}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
};
export default Inspector;
