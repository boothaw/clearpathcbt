<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ClearPathCBT
 */

?>

	<footer id="footer" class="site-footer">
		<div class="footer-content outer-wrapper default-section-padding">
			<div class="footer-1-container widget-container">
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer-1") ) : 
             endif;?>
			</div>
			<div class="footer-2-container widget-container">
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("footer-2") ) : 
             endif;?>
			</div>
		</div>
		<div class="site-info copyright">
			<div class="outer-wrapper">
			<span>© Copyright 2025 | Clear Path CBT</span>
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("sidebar-1") ) : 
             endif;?>
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
