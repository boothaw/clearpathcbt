<?php
/**
 * Template Name: Providers/Therapists Page
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

			?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="entry-header">
			<?php get_template_part( 'template-parts/default-hero' );  ?>
		</header><!-- .entry-header -->
			<div class="entry-content">
				<?php
				echo do_shortcode('[therapists]');
				the_content();
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