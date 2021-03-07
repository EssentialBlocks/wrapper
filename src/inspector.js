/**
 * WordPress dependencies
 *
 */
const { __ } = wp.i18n;
const {
	BaseControl,
	ButtonGroup,
	Button,
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
} = wp.components;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;

/**
 * Internal dependencies
 *
 */
import {
	BACKGROUND_TYPES,
	BACKGROUND_SIZES,
	BORDER_STYLES,
	SHADOW_TYPES,
} from "./constants";
import ImageAvater from "../util/image-avatar/ImageAvater";
import GradientColorController from "../util/gradient-color-controller";
import UnitControl from "../util/unit-control";
import DimensionsControl from "../util/dimensions-control";
import ColorControl from "../util/color-control";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		contentWidth,
		backgroundType,
		backgroundColor,
		gradientColor,
		imageURL,
		imageID,
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
		shadowType,
		hoverShadowColor,
		hoverHOffset,
		hoverVOffset,
		hoverBlur,
		hoverSpread,
		hoverInset,
	} = attributes;

	return (
		<InspectorControls key="controls">
			<PanelBody>
				<RangeControl
					label={__("Content Max Width (px)")}
					value={contentWidth}
					allowReset
					onChange={(contentWidth) => setAttributes({ contentWidth })}
					min={0}
					max={1600}
				/>

				<BaseControl label={__("Background Type")}>
					<ButtonGroup>
						{BACKGROUND_TYPES.map((item) => (
							<Button
								isPrimary={backgroundType === item.value}
								isSecondary={backgroundType !== item.value}
								onClick={() =>
									setAttributes({
										backgroundType: item.value,
									})
								}
							>
								{item.label}
							</Button>
						))}
					</ButtonGroup>
				</BaseControl>
			</PanelBody>

			{backgroundType === "fill" && (
				<PanelColorSettings
					title={__("Background Color")}
					initialOpen={false}
					colorSettings={[
						{
							label: "",
							value: backgroundColor,
							onChange: (backgroundColor) => setAttributes({ backgroundColor }),
						},
					]}
				/>
			)}

			{backgroundType === "gradient" && (
				<PanelBody title={__("Gradient")} initialOpen={false}>
					<GradientColorController
            gradientColor={gradientColor }
						onChange={(gradientColor) => setAttributes({ gradientColor })}
					/>
				</PanelBody>
			)}

			{backgroundType === "image" && (
				<PanelBody title={__("Background Image")}>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({
								imageURL: media.url,
								imgeID: media.id,
							})
						}
						type="image"
						value={imageID}
						render={({ open }) =>
							!imageURL && (
								<Button
									className="eb-wrapper-upload-button"
									label={__("Upload Image")}
									icon="format-image"
									onClick={open}
								/>
							)
						}
					/>

					{imageURL && (
						<ImageAvater
							imageUrl={imageURL}
							onDeleteImage={() => setAttributes({ imageURL: null })}
						/>
					)}

					{imageURL && (
						<BaseControl label={__("Background Size")}>
							<ButtonGroup>
								{BACKGROUND_SIZES.map((item) => (
									<Button
										isPrimary={backgroundSize === item.value}
										isSecondary={backgroundSize !== item.value}
										onClick={() =>
											setAttributes({
												backgroundSize: item.value,
											})
										}
									>
										{item.label}
									</Button>
								))}
							</ButtonGroup>
						</BaseControl>
					)}
				</PanelBody>
			)}

			<PanelBody title={__("Border")} initialOpen={false}>
				<RangeControl
					label={__("Border Width")}
					allowReset
					value={borderWidth}
					onChange={(borderWidth) => setAttributes({ borderWidth })}
					min={0}
					max={100}
				/>

				<UnitControl
					selectedUnit={radiusUnit}
					unitTypes={[
						{ label: "px", value: "px" },
						{ label: "%", value: "%" },
					]}
					onClick={(radiusUnit) => setAttributes({ radiusUnit })}
				/>

				<RangeControl
					label={__("Border Radius")}
					allowReset
					value={borderRadius}
					onChange={(borderRadius) => setAttributes({ borderRadius })}
					min={0}
					max={100}
				/>

				<SelectControl
					label={__("Border Style")}
					value={borderStyle}
					options={BORDER_STYLES}
					onChange={(borderStyle) => setAttributes({ borderStyle })}
				/>

				<ColorControl
					label={__("Border Color")}
					color={borderColor}
					onChange={(borderColor) => setAttributes({ borderColor })}
				/>
			</PanelBody>

			<PanelBody title={__("Shadow")} initialOpen={false}>
				<ButtonGroup className="eb-inspector-btn-group">
					{SHADOW_TYPES.map((item) => (
						<Button
							isLarge
							isPrimary={shadowType === item.value}
							isSecondary={shadowType !== item.value}
							onClick={() => setAttributes({ shadowType: item.value })}
						>
							{item.label}
						</Button>
					))}
				</ButtonGroup>

				{shadowType === "normal" && (
					<Fragment>
						<ColorControl
							label={__("Shadow Color")}
							color={shadowColor}
							onChange={(shadowColor) => setAttributes({ shadowColor })}
						/>

						<RangeControl
							label={__("Horizontal Offset")}
							allowReset
							value={hOffset}
							onChange={(hOffset) => setAttributes({ hOffset })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Vertical Offset")}
							value={vOffset}
							allowReset
							onChange={(vOffset) => setAttributes({ vOffset })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Shadow Blur")}
							value={blur}
							allowReset
							onChange={(blur) => setAttributes({ blur })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Shadow Spread")}
							value={spread}
							allowReset
							onChange={(spread) => setAttributes({ spread })}
							min={0}
							max={20}
						/>

						<ToggleControl
							label={__("Inset")}
							checked={inset}
							onChange={() => setAttributes({ inset: !inset })}
						/>
					</Fragment>
				)}

				{shadowType === "hover" && (
					<Fragment>
						<ColorControl
							label={__("Hover Shadow Color")}
							color={hoverShadowColor}
							onChange={(hoverShadowColor) =>
								setAttributes({ hoverShadowColor })
							}
						/>

						<RangeControl
							label={__("Horizontal Offset")}
							allowReset
							value={hoverHOffset}
							onChange={(hoverHOffset) => setAttributes({ hoverHOffset })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Vertical Offset")}
							value={hoverVOffset}
							allowReset
							onChange={(hoverVOffset) => setAttributes({ hoverVOffset })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Shadow Blur")}
							value={hoverBlur}
							allowReset
							onChange={(hoverBlur) => setAttributes({ hoverBlur })}
							min={0}
							max={20}
						/>

						<RangeControl
							label={__("Shadow Spread")}
							value={hoverSpread}
							allowReset
							onChange={(hoverSpread) => setAttributes({ hoverSpread })}
							min={0}
							max={20}
						/>

						<ToggleControl
							label={__("Inset")}
							checked={hoverInset}
							onChange={() => setAttributes({ hoverInset: !hoverInset })}
						/>
					</Fragment>
				)}
			</PanelBody>

			<PanelBody title={__("Margin & Padding")} initialOpen={false}>
				<UnitControl
					selectedUnit={marginUnit}
					unitTypes={[
						{ label: "px", value: "px" },
						{ label: "em", value: "em" },
						{ label: "%", value: "%" },
					]}
					onClick={(marginUnit) => setAttributes({ marginUnit })}
				/>

				<DimensionsControl
					label={__("Margin")}
					top={marginTop}
					right={marginRight}
					bottom={marginBottom}
					left={marginLeft}
					onChange={({ top, right, bottom, left }) =>
						setAttributes({
							marginTop: top,
							marginRight: right,
							marginBottom: bottom,
							marginLeft: left,
						})
					}
				/>

				<UnitControl
					selectedUnit={paddingUnit}
					unitTypes={[
						{ label: "px", value: "px" },
						{ label: "em", value: "em" },
						{ label: "%", value: "%" },
					]}
					onClick={(paddingUnit) => setAttributes({ paddingUnit })}
				/>

				<DimensionsControl
					label={__("Padding")}
					top={paddingTop}
					right={paddingRight}
					bottom={paddingBottom}
					left={paddingLeft}
					onChange={({ top, right, bottom, left }) =>
						setAttributes({
							paddingTop: top,
							paddingRight: right,
							paddingBottom: bottom,
							paddingLeft: left,
						})
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
export default Inspector;
