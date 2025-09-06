<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ClearPathCBT
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="midnight-bg default-section-padding post-hero wp-block-group is-vertical is-content-justification-center is-layout-flex wp-block-group-is-layout-flex">
		<div class="outer-wrapper wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
			<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
				<h1 class="wp-block-heading"><?php echo get_the_title(); ?></h1>
				<p class=""><?php echo get_the_excerpt(); ?></p>
				<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
					<div class="wp-block-button"><a href="/schedule-intake/" class="wp-block-button__link wp-element-button"><i
								class="ri-calendar-fill"></i> Schedule Intake
						</a></div>
					<div class="wp-block-button"><a href="#areas-we-serve" class="wp-block-button__link wp-element-button"><i
								class="ri-map-pin-fill"></i>
							Areas We Serve</a></div>
				</div>
			</div>
			<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
				<figure class="wp-block-image size-full">
						<?php clearpathcbt_post_thumbnail(); ?>
					</figure>
			</div>
		</div>
	</div>

	<div class="entry-content default-section-padding mid-center">
		<?php
		the_content();

		// wp_link_pages(
		// 	array(
		// 		'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'clearpathcbt' ),
		// 		'after'  => '</div>',
		// 	)
		// );
		?>
	</div><!-- .entry-content -->

	<?php
	if ( has_category( 'treatments' ) ) { 
		// Example usage: grab first block with class from homepage (ID 2 in this example)
		// home and condition treated pages
		echo get_block_by_class( 8, 'areas-we-serve' );
		echo get_block_by_class( 221, 'embark-cta' );
		echo get_block_by_class( 221, 'disclaimer' );
	 } ?>

	<footer class="entry-footer">
		<!-- <?php clearpathcbt_entry_footer(); ?> -->
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->