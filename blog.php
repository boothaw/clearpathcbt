<?php
/**
 * Template Name: Blog Page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ClearPathCBT
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			$title = get_the_title();
			$img = get_the_post_thumbnail_url();

			?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="entry-header">
			<?php get_template_part( 'template-parts/default-hero' );  ?>
		</header><!-- .entry-header -->
			<div class="entry-content">
				<?php
				the_content();
					// Custom query for posts in the "treatments" category
					$args = array(
						'category_name'  => 'news', // slug of the category
						'posts_per_page' => -1,           // adjust as needed
						'order' => 'ASC'
					);
					
					$treatment_query = new WP_Query( $args );
					
					if ( $treatment_query->have_posts() ) : ?>
						<div class="treatments-loop default-section-padding">
							<?php while ( $treatment_query->have_posts() ) : $treatment_query->the_post(); ?>
								
								<article id="post-<?php the_ID(); ?>" class="blog-post-thumbnail <?php if ( ! has_post_thumbnail() ) : ?>no-thumbnail<?php endif; ?> <?php post_class(); ?>">
									<div class="thumbnail-content">
										<h2 class="entry-title">
											<?php wrap_parentheses_in_title(the_title()); ?>
										</h2>
					
										<div class="entry-excerpt">
											<?php the_excerpt(); ?>
										</div>
					
										<a class="post-button" href="<?php the_permalink(); ?>">Learn More</a>
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
					<div class="treatments-loop default-section-padding no-posts">
						<p class="mid-center">Calm is in progress. Our first post will be here shortly.</p>
					</div>
					<?php endif; 
				?>
			</div><!-- .entry-content -->
		</article><!-- #post-<?php the_ID(); ?> -->

		<?php
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
// get_sidebar();
get_footer();