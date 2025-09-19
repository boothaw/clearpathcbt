<?php
/**
 * Template Name: Location Page
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
			<div class="entry-content">
				<div class="location-header">
					<div class="outer-wrapper location-header-inner">
						<div class="midnight-card">
							<h1 class="alt-heading">Areas We Serve</h1>
							<h1><?php echo insert_break_in_middle( $title ); ?></h1>
							<p>Let’s discuss your treatment goals and determine the appropriate symptom reduction plan for you.</p>
							<a class="blue-button" href="/schedule-intake/"><i class="ri-calendar-fill"></i> Schedule Intake</a>
						</div>
					</div>
					<div class="location-header-bg" style="background-image: url(<?php echo $img ?>);">
						<svg class="decoration-svg left" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M800 0H0L131.8 450.4C136.3 469.9 150.2 485.2 169.6 489L800 608V0Z" fill="#eeede7"></path></svg>
						<svg class="decoration-svg right" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M800 0H0L131.8 450.4C136.3 469.9 150.2 485.2 169.6 489L800 608V0Z" fill="#eeede7"></path></svg>
					</div>
					<!-- <img src="<?php echo $img ?>" alt="location" class="location-hero" /> -->
				</div>
				<?php
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