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

function create_block_wrapper_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/wrapper" block first.'
		);
	}
	$index_js     = 'build/index.js';
	wp_register_script(
		'create-block-wrapper-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-wrapper-block-editor',
		plugins_url($editor_css, __FILE__),
		array(),
		filemtime("$dir/$editor_css")
	);

  if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/wrapper')) {
	register_block_type( 'wrapper/wrapper', array(
		'editor_script' => 'create-block-wrapper-block-editor',
		'editor_style' => 'create-block-wrapper-block-editor',
	) );
  }
	
}
add_action( 'init', 'create_block_wrapper_block_init' );
