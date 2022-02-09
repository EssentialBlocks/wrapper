<?php

/**
 * Plugin Name:     Wrapper
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     wrapper
 *
 * @package         wrapper
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
require_once __DIR__ . '/lib/style-handler/style-handler.php';
require_once __DIR__ . '/includes/helpers.php';

function create_block_wrapper_block_init()
{

	define('EB_WRAPPER_BLOCKS_VERSION', "0.1.0");
	define('EB_WRAPPER_BLOCKS_ADMIN_URL', plugin_dir_url(__FILE__));
	define('EB_WRAPPER_BLOCKS_ADMIN_PATH', dirname(__FILE__));

	$script_asset_path = EB_WRAPPER_BLOCKS_ADMIN_PATH . "/dist/index.asset.php";
	if (!file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "wrapper/wrapper" block first.'
		);
	}

	$index_js = EB_WRAPPER_BLOCKS_ADMIN_URL . '/dist/index.js';
	$script_asset = require($script_asset_path);
	$all_dependencies = array_merge($script_asset['dependencies'], array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-block-editor',
		'eb-wrapper-blocks-controls-util'
	));

	wp_register_script(
		'eb-wrapper-block-editor',
		$index_js,
		$all_dependencies,
		$script_asset['version']
	);

	if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/wrapper')) {
		register_block_type(
			Wrapper_Helper::get_block_register_path('wrapper/wrapper', EB_WRAPPER_BLOCKS_ADMIN_PATH),
			array(
				'editor_script' => 'eb-wrapper-block-editor',
			)
		);
	}
}
add_action('init', 'create_block_wrapper_block_init');
