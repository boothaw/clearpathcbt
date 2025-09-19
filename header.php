<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ClearPathCBT
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link href="https://fonts.cdnfonts.com/css/ranade" rel="stylesheet">
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Clear Path" />
	<link rel="manifest" href="/site.webmanifest" />
	<link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
    rel="stylesheet"
/>
<script src="https://unpkg.com/lenis@1.3.11/dist/lenis.min.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<!-- ScrollSmoother requires ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollToPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/TextPlugin.min.js"></script>

<link rel="preconnect" href="https://fonts.cdnfonts.com">
<link href="https://fonts.cdnfonts.com/css/ranade" rel="stylesheet">

	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'clearpathcbt' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="outer-wrapper site-header-inner">
			<div class="site-branding">
				<a href="/"><img src="/wp-content/uploads/2025/08/Clear-Path-CBT-Logo.svg" class="custom-logo" alt="Clear Path CBT" decoding="async"></a>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle menu-button" type="button" aria-controls="primary-menu" aria-expanded="false">
					<div class="nav-icon hamburger">
                            <!-- <span></span>
                            <span></span>
                            <span></span> -->
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.65322 5.89978L8.39235 0H7.36067L6.0998 5.89978C6.07859 5.99966 5.99991 6.07833 5.90003 6.09954L0 7.36036V8.392L5.90003 9.65281C5.99991 9.67402 6.07859 9.75269 6.0998 9.85257L7.41335 16H8.33899L9.65254 9.85257C9.67375 9.75269 9.75243 9.67402 9.85231 9.65281L16 8.33932V7.41372L9.85231 6.10022C9.75243 6.07901 9.67375 6.00034 9.65254 5.90046L9.65322 5.89978Z" fill="#083435"/>
						</svg>
                    </div>
					</button>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu-1',
					)
				);
				?>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->
