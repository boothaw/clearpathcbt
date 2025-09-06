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
	<?php 	if ( has_category( 'treatments' ) ) {  ?>
	<div class="midnight-bg default-section-padding post-hero wp-block-group is-vertical is-content-justification-center is-layout-flex wp-block-group-is-layout-flex">
		<div class="outer-wrapper wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
			<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
				<h1 class="wp-block-heading"><?php echo get_the_title(); ?></h1>
				<p class=""><?php echo get_the_excerpt(); ?></p>
				<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
					<div class="wp-block-button"><a href="/schedule-intake/" class="wp-block-button__link wp-element-button"><i
								class="ri-calendar-fill"></i> Schedule Intake
						</a></div>
					<div class="wp-block-button"><a href="#locations" class="wp-block-button__link wp-element-button"><i
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
	<?php } elseif (has_post_thumbnail( get_the_ID())) { ?> 
	<div class="midnight-bg default-section-padding post-hero wp-block-group is-vertical is-content-justification-center is-layout-flex wp-block-group-is-layout-flex">
		<div class="outer-wrapper wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
			<div class="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow">
				<h1 class="wp-block-heading"><?php echo get_the_title(); ?></h1>
				<?php if (has_excerpt( get_the_ID() )) { ?> 
					<p class=""><?php echo get_the_excerpt(); ?></p>
				<?php } ?>
			</div>
			<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
				<figure class="wp-block-image size-full">
						<?php clearpathcbt_post_thumbnail(); ?>
					</figure>
			</div>
		</div>
	</div>
	<?php } else { ?> 
		<header class="entry-header">
			<?php get_template_part( 'template-parts/default-hero' );  ?>
		</header><!-- .entry-header -->
	<?php } ?>


	<div class="entry-content default-section-padding mid-center">
		<?php
		the_content();

		?>
	</div><!-- .entry-content -->

	<?php
	if ( has_category( 'treatments' ) ) { 
		// Example usage: grab first block with class from homepage (ID 2 in this example)
		// home and condition treated pages
		echo get_block_by_class( 8, 'areas-we-serve' );
		echo get_block_by_class( 221, 'embark-cta' );
		// echo get_block_by_class( 221, 'disclaimer' );

		?> 
		<div class="default-section-padding disclaimer wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">
		<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
		<p class="outer-wrapper">Our private therapy practice provides <?php echo the_title() ?> for a wide range of mental health conditions, serving discerning clients across California and the Pacific Northwest. We specialize in delivering personalized care to residents of the Seattle-Tacoma-Bellevue MSA, San Jose-Sunnyvale-Santa Clara MSA, San Francisco-Oakland-Berkeley MSA, and Anchorage MSA, where unique professional pressures and lifestyle demands require sophisticated therapeutic approaches.
		</p>
		</div>
		</div>
	 <?php } ?>

	<footer class="entry-footer">
		<!-- <?php clearpathcbt_entry_footer(); ?> -->
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->