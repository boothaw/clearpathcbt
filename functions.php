<?php
/**
 * ClearPathCBT functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package ClearPathCBT
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function clearpathcbt_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on ClearPathCBT, use a find and replace
		* to change 'clearpathcbt' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'clearpathcbt', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'clearpathcbt' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'clearpathcbt_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'clearpathcbt_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function clearpathcbt_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'clearpathcbt_content_width', 640 );
}
add_action( 'after_setup_theme', 'clearpathcbt_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function clearpathcbt_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Socials', 'clearpathcbt' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'clearpathcbt' ),
			'before_widget' => '<div class="socials-container">',
			'after_widget'  => '</div>',
			// 'before_title'  => '<h2 class="widget-title">',
			// 'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'clearpathcbt_widgets_init' );

function clearpathcbt_widgets_init_1() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer 1', 'clearpathcbt' ),
			'id'            => 'footer-1',
			'description'   => esc_html__( 'Add widgets here.', 'clearpathcbt' ),
			'before_widget' => '',
			'after_widget'  => '',
		)
	);
}
add_action( 'widgets_init', 'clearpathcbt_widgets_init_1' );

function clearpathcbt_widgets_init_2() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer 2', 'clearpathcbt' ),
			'id'            => 'footer-2',
			'description'   => esc_html__( 'Add widgets here.', 'clearpathcbt' ),
			'before_widget' => '',
			'after_widget'  => '',
		)
	);
}
add_action( 'widgets_init', 'clearpathcbt_widgets_init_2' );


/**
 * Enqueue scripts and styles.
 */
function clearpathcbt_scripts() {
	wp_enqueue_style( 'clearpathcbt-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'clearpathcbt-style', 'rtl', 'replace' );

	wp_enqueue_script( 'clearpathcbt-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'staffing-toolkit-theme-js', get_template_directory_uri() . '/js/theme.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'clearpathcbt_scripts' );

function custom_enqueue_scripts() {
	// Enqueue your script
	wp_enqueue_script(
		'my-custom-script', // Handle for your script
		get_template_directory_uri() . '/js/theme.js', // Path to your JS file
		array('jquery'), // Dependencies (e.g., jQuery)
		null, // Version (optional)
		true // Load in footer
	);

	// Localize script data
	wp_localize_script(
		'my-custom-script', // Handle of the script to localize for
		'theme_data', // Object variable name in JavaScript
		array(
			'template_uri' => wp_get_attachment_url() // Key-value pair for the URI
		)
	);
}
add_action('wp_enqueue_scripts', 'custom_enqueue_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

function allow_svg_uploads( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'allow_svg_uploads' );

function insert_break_in_middle( $text ) {
    $words = explode( ' ', $text );
    $count = count( $words );

    if ( $count < 3 ) {
        return $text; // Not enough words to split
    }

    $middle = ceil( $count / 2 );

    // First half
    $first_part = implode( ' ', array_slice( $words, 0, $middle ) );
    // Second half
    $second_part = implode( ' ', array_slice( $words, $middle ) );

    return $first_part . '<br>' . $second_part;
}

// this is for secondary excerpt -- if needed for treatments/services 

// // Add meta box
// function wb_add_secondary_excerpt_box() {
//     add_meta_box(
//         'secondary_excerpt',
//         'Secondary Excerpt',
//         'wb_secondary_excerpt_callback',
//         'post',
//         'normal',
//         'high'
//     );
// }
// add_action('add_meta_boxes', 'wb_add_secondary_excerpt_box');

// // Meta box callback
// function wb_secondary_excerpt_callback($post) {
//     $value = get_post_meta($post->ID, '_secondary_excerpt', true);
//     echo '<textarea style="width:100%;height:100px;" name="secondary_excerpt">' . esc_textarea($value) . '</textarea>';
// }

// // Save meta box data
// function wb_save_secondary_excerpt($post_id) {
//     if (array_key_exists('secondary_excerpt', $_POST)) {
//         update_post_meta(
//             $post_id,
//             '_secondary_excerpt',
//             sanitize_textarea_field($_POST['secondary_excerpt'])
//         );
//     }
// }
// add_action('save_post', 'wb_save_secondary_excerpt');

function wrap_parentheses_in_title( $title ) {
    // Only run on the frontend (avoid breaking admin or feeds)
    if ( is_admin() ) {
        return $title;
    }

    // Regex: find anything in parentheses
    $pattern = '/\((.*?)\)/';
    $replacement = '<span class="title-parentheses">($1)</span>';

    return preg_replace( $pattern, $replacement, $title );
}
add_filter( 'the_title', 'wrap_parentheses_in_title' );

function treatments() {
// Custom query for posts in the "treatments" category
$args = array(
    'category_name'  => 'treatments', // slug of the category
    'posts_per_page' => -1,           // adjust as needed
	'order' => 'ASC'
);

$treatment_query = new WP_Query( $args );

if ( $treatment_query->have_posts() ) : ?>
    <div class="treatments-loop default-section-padding">
        <?php while ( $treatment_query->have_posts() ) : $treatment_query->the_post(); ?>
            
            <article id="post-<?php the_ID(); ?>" class="treatment-post-thumbnail <?php post_class(); ?>">
				<div class="thumbnail-content">
					<h2 class="entry-title">
						<?php wrap_parentheses_in_title(the_title()); ?>
					</h2>

					<div class="entry-excerpt">
						<?php the_excerpt(); ?>
					</div>

					<a class="post-button" href="<?php the_permalink(); ?>">Explore Treatment</a>
				</div>

				<?php if ( has_post_thumbnail() ) : ?>
                    <div class="entry-thumbnail">
                            <?php the_post_thumbnail( 'medium' ); ?>
                    </div>
                <?php endif; ?>
            </article>

        <?php endwhile; ?>
    </div>

    <?php wp_reset_postdata(); ?>

<?php else : ?>
    <p>No treatments found.</p>
<?php endif; 
}
add_shortcode( 'treatments', 'treatments' );


function therapists() {
	// Custom query for posts in the "therapists" category
	$args = array(
		'category_name'  => 'provider', // slug of the category
		'posts_per_page' => -1,           // adjust as needed
		'order' => 'ASC'
	);
	
	$therapist_query = new WP_Query( $args );
	
	if ( $therapist_query->have_posts() ) : ?>
		<div class="therapists-loop default-section-padding">
			<?php while ( $therapist_query->have_posts() ) : $therapist_query->the_post(); ?>
				
				<article id="post-<?php the_ID(); ?>" class="therapist-post-thumbnail <?php post_class(); ?>">
					<div class="thumbnail-content">
						<h2 class="entry-title">
							<?php the_title(); ?>
						</h2>

						<?php if (has_excerpt( get_the_ID() )) { ?> 
							<div class="entry-excerpt">
								<?php the_excerpt(); ?>
							</div>						
						<?php } ?>
	
						<a class="post-button" href="<?php the_permalink(); ?>">More Details</a>
					</div>
	
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="entry-thumbnail">
								<?php the_post_thumbnail( 'medium' ); ?>
						</div>
					<?php endif; ?>
				</article>
	
			<?php endwhile; ?>
		</div>
	
		<?php wp_reset_postdata(); ?>
	
	<?php else : ?>
		<p>No therapists found.</p>
	<?php endif; 
	}
add_shortcode( 'therapists', 'therapists' );

function get_block_by_class( $page_id, $class_name ) {
    $page = get_post( $page_id );
    if ( ! $page ) {
        return '';
    }

    // Parse Gutenberg blocks
    $blocks = parse_blocks( $page->post_content );

    foreach ( $blocks as $block ) {
        // Render block HTML
        $content = render_block( $block );

        // Check if it contains the class
        if ( strpos( $content, $class_name ) !== false ) {
            return $content; // Return first match
        }
    }

    return '';
}


add_action('init', function() {
    $response = wp_remote_get('https://www.google.com');
    if (is_wp_error($response)) {
        error_log('WP cannot reach the internet: ' . $response->get_error_message());
    } else {
        error_log('WP internet check passed');
    }
});