<script lang="ts">
	import { onMount } from 'svelte';

	let revealElements: HTMLElement[] = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);
		revealElements.forEach((el) => {
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	});

	function reveal(node: HTMLElement) {
		revealElements.push(node);
		return { destroy() {} };
	}
</script>

<svelte:head>
	<title>التلقين العربي — تلقين احترافي للمحتوى العربي</title>
	<meta name="description" content="تطبيق تلقين احترافي مصمم للغة العربية — يدعم التشكيل الكامل، الاتجاه ثنائي اللغة، والشاشة المزدوجة. مفتوح المصدر ويعمل بدون إنترنت." />
	<meta property="og:title" content="التلقين العربي — Arabic Teleprompter" />
	<meta property="og:description" content="أول تطبيق تلقين مصمم خصيصاً للمحتوى العربي. يدعم التشكيل، RTL، الشاشة المزدوجة. مجاني ومفتوح المصدر." />
	<meta property="og:url" content="https://arabicteleprompter.alsheikhmedia.com" />
	<meta property="og:image" content="https://arabicteleprompter.alsheikhmedia.com/og-image.png" />
	<meta name="twitter:title" content="التلقين العربي — Arabic Teleprompter" />
	<meta name="twitter:description" content="أول تطبيق تلقين مصمم خصيصاً للمحتوى العربي. يدعم التشكيل، RTL، الشاشة المزدوجة." />
	<meta name="twitter:image" content="https://arabicteleprompter.alsheikhmedia.com/og-image.png" />
	<link rel="canonical" href="https://arabicteleprompter.alsheikhmedia.com" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "التلقين العربي — Arabic Teleprompter",
		"applicationCategory": "MultimediaApplication",
		"operatingSystem": "macOS, Windows, Linux",
		"offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
		"inLanguage": "ar",
		"description": "تطبيق تلقين احترافي مصمم للغة العربية — يدعم التشكيل الكامل والاتجاه ثنائي اللغة",
		"url": "https://arabicteleprompter.alsheikhmedia.com",
		"license": "https://opensource.org/licenses/MIT",
		"datePublished": "2025-01-15",
		"author": {
			"@type": "Organization",
			"name": "الشيخ ميديا — AlSheikh Media",
			"url": "https://alsheikhmedia.com"
		}
	})}</script>`}
</svelte:head>

<a href="#main-content" class="skip-link">تخطي إلى المحتوى</a>
<main id="main-content" class="landing">
	<!-- ==================== HERO ==================== -->
	<section class="hero">
		<div class="hero-badge reveal" use:reveal>
			<span>v0.1</span> تطبيق سطح مكتب مجاني
		</div>
		<h1 class="reveal reveal-delay-1" use:reveal>التلقين العربي</h1>
		<p class="hero-subtitle reveal reveal-delay-1" use:reveal>تطبيق تلقين احترافي مصمم للعربية — يدعم التشكيل الكامل والنص ثنائي الاتجاه</p>
		<div class="hero-features reveal reveal-delay-2" use:reveal>
			<span>تشكيل</span>
			<span class="dot">•</span>
			<span>اتجاه ثنائي</span>
			<span class="dot">•</span>
			<span>شاشة مزدوجة</span>
			<span class="dot">•</span>
			<span>بدون إنترنت</span>
			<span class="dot">•</span>
			<span>مفتوح المصدر</span>
		</div>
		<div class="hero-ctas reveal reveal-delay-3" use:reveal>
			<a href="/app" class="btn btn-primary">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
				افتح نسخة الويب
			</a>
			<a href="#download" class="btn btn-ghost">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
				تحميل التطبيق
			</a>
			<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter" class="btn btn-ghost">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				GitHub
			</a>
		</div>

		<!-- App Mockup -->
		<div class="app-mockup reveal reveal-delay-4" use:reveal>
			<div class="mockup-toolbar">
				<div class="mockup-dots">
					<span></span><span></span><span></span>
				</div>
				<div class="mockup-toolbar-btns">
					<span>غ</span>
					<span>م</span>
					<span>خ</span>
				</div>
			</div>
			<div class="mockup-body">
				<div class="mockup-text">
					<span class="mockup-cursor"></span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ، أهلاً وسهلاً بكم في هذا البرنامج. هذا النص يظهر على شاشة التلقين ويتحرك تلقائياً أثناء التقديم. يمكنك التحكم في سرعة التمرير وحجم الخط واتجاه النص بكل سهولة.
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== BENTO GRID ==================== -->
	<section class="bento-section">
		<div class="container">
			<div class="section-label reveal" use:reveal>المميزات</div>
			<h2 class="section-title reveal reveal-delay-1" use:reveal>كل ما تحتاجه في تطبيق واحد</h2>
			<p class="section-desc reveal reveal-delay-2" use:reveal>صُمم التلقين العربي خصيصاً لتلبية احتياجات صنّاع المحتوى العربي — من المذيعين ومقدمي البرامج إلى صانعي المحتوى على يوتيوب والبودكاست. يجمع بين قوة التقنيات الحديثة وفهم عميق لخصائص اللغة العربية.</p>
			<div class="bento-grid">
				<!-- Large: Tashkeel -->
				<div class="bento-card large reveal reveal-delay-1" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
					</div>
					<h3>دعم التشكيل الكامل</h3>
					<p>الحروف العربية بكامل حركاتها — فتحة، ضمة، كسرة، شدة. اعرض أو أخفِ التشكيل بضغطة واحدة.</p>
					<div class="bento-visual">
						<div class="tashkeel-visual">
							بِسْمِ <span class="har">ٱ</span>للَّهِ <span class="har">ٱ</span>لرَّحْمَـٰنِ <span class="har">ٱ</span>لرَّحِيمِ
						</div>
					</div>
				</div>

				<!-- Large: Dual Screen -->
				<div class="bento-card large reveal reveal-delay-2" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
					</div>
					<h3>شاشة مزدوجة</h3>
					<p>نافذة للمقدم وأخرى للتحكم — كل شاشة مستقلة ومتزامنة في الوقت الحقيقي عبر BroadcastChannel.</p>
					<div class="bento-visual">
						<div class="dual-screen-visual">
							<div class="screen">
								<div class="screen-bar"></div>
								<div class="screen-lines">
									<div class="screen-line" style="width:90%"></div>
									<div class="screen-line" style="width:100%"></div>
									<div class="screen-line" style="width:70%"></div>
									<div class="screen-line" style="width:85%"></div>
								</div>
							</div>
							<div class="screen">
								<div class="screen-bar"></div>
								<div class="screen-lines">
									<div class="screen-line" style="width:90%"></div>
									<div class="screen-line" style="width:100%"></div>
									<div class="screen-line" style="width:70%"></div>
									<div class="screen-line" style="width:85%"></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Small: Rich Editor -->
				<div class="bento-card reveal reveal-delay-1" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
					</div>
					<h3>محرر نصوص غني</h3>
					<p>تنسيق، ألوان، تظليل — محرر TipTap متكامل بواجهة عربية.</p>
				</div>

				<!-- Small: Bidirectional -->
				<div class="bento-card reveal reveal-delay-2" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
					</div>
					<h3>اتجاه ثنائي</h3>
					<p>دعم كامل لـ RTL و LTR — بدّل اتجاه كل فقرة على حدة.</p>
				</div>

				<!-- Small: Offline -->
				<div class="bento-card reveal reveal-delay-3" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
					</div>
					<h3>يعمل بدون إنترنت</h3>
					<p>خصوصيتك محمية — لا اتصال بالشبكة، كل شيء يعمل محلياً.</p>
				</div>

				<!-- Small: Open Source -->
				<div class="bento-card reveal reveal-delay-4" use:reveal>
					<div class="bento-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
					</div>
					<h3>مفتوح المصدر</h3>
					<p>رخصة MIT — شارك، عدّل، وطوّر بحرية كاملة.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== TECH SPECS ==================== -->
	<section class="tech-section">
		<div class="tech-inner reveal" use:reveal>
			<span class="tech-label">مبني بأحدث التقنيات</span>
			<div class="tech-badge">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
				Tauri 2.0
			</div>
			<div class="tech-badge">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>
				SvelteKit 2
			</div>
			<div class="tech-badge">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
				Svelte 5
			</div>
			<div class="tech-badge">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
				TipTap 3
			</div>
			<div class="tech-badge">
				<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
				Rust
			</div>
		</div>
	</section>

	<!-- ==================== OPEN SOURCE ==================== -->
	<section class="oss-section">
		<div class="container">
			<div class="oss-brackets reveal" use:reveal>{"{ }"}</div>
			<h2 class="reveal reveal-delay-1" use:reveal>مفتوح المصدر بالكامل</h2>
			<p class="desc reveal reveal-delay-2" use:reveal>
				الكود متاح للجميع على GitHub تحت رخصة MIT. ساهم في التطوير، أبلغ عن مشاكل، أو أنشئ نسختك الخاصة. نؤمن بأن أفضل الأدوات تُبنى بشكل مفتوح وشفاف — ولهذا كل سطر من الكود مفتوح للمراجعة والتطوير. انضم إلى مجتمع المطورين العرب الذين يبنون أدوات احترافية بلغتهم الأم.
			</p>
			<div class="oss-stats reveal reveal-delay-3" use:reveal>
				<div class="oss-stat">
					<span class="num">MIT</span>
					<span class="label">الرخصة</span>
				</div>
				<div class="oss-stat">
					<span class="num">١٠٠٪</span>
					<span class="label">مجاني</span>
				</div>
				<div class="oss-stat">
					<span class="num">٣</span>
					<span class="label">أنظمة تشغيل</span>
				</div>
			</div>
			<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter" class="btn btn-primary reveal reveal-delay-4" use:reveal>
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				ساهم معنا
			</a>
		</div>
	</section>

	<!-- ==================== DOWNLOAD ==================== -->
	<section class="download-section" id="download">
		<div class="container">
			<div class="section-label reveal" use:reveal>التحميل</div>
			<h2 class="section-title reveal reveal-delay-1" use:reveal>اختر نظامك</h2>
			<div class="download-grid">
				<!-- Web Version -->
				<div class="download-card reveal reveal-delay-1" use:reveal>
					<div class="download-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
					</div>
					<h3>نسخة الويب</h3>
					<p class="arch">بدون تحميل</p>
					<a href="/app" class="btn btn-primary">
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
						افتح التطبيق
					</a>
				</div>

				<!-- macOS -->
				<div class="download-card reveal reveal-delay-2" use:reveal>
					<div class="download-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
					</div>
					<h3>macOS</h3>
					<p class="arch">Apple Silicon + Intel</p>
					<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/releases" class="btn btn-primary">
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						تحميل
					</a>
				</div>

				<!-- Windows -->
				<div class="download-card reveal reveal-delay-3" use:reveal>
					<div class="download-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
					</div>
					<h3>Windows</h3>
					<p class="arch">x64</p>
					<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/releases" class="btn btn-primary">
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						تحميل
					</a>
				</div>

				<!-- Linux -->
				<div class="download-card reveal reveal-delay-4" use:reveal>
					<div class="download-icon">
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
					</div>
					<h3>Linux</h3>
					<p class="arch">AppImage / deb</p>
					<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/releases" class="btn btn-primary">
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						تحميل
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== ABOUT / PRIVACY ==================== -->
	<section class="about-section" id="about">
		<div class="container">
			<div class="about-grid">
				<div class="about-block reveal" use:reveal>
					<h2>عن المشروع</h2>
					<p>التلقين العربي مشروع مفتوح المصدر من <a href="https://alsheikhmedia.com">الشيخ ميديا</a>، يهدف إلى توفير أداة تلقين احترافية مصممة خصيصاً لصنّاع المحتوى العربي. نؤمن بأن المحتوى العربي يستحق أدوات بنفس جودة الأدوات المتوفرة باللغة الإنجليزية.</p>
				</div>
				<div class="about-block reveal reveal-delay-1" use:reveal>
					<h2>الخصوصية</h2>
					<p>تطبيق التلقين العربي لا يجمع أي بيانات شخصية. جميع النصوص والإعدادات تُحفظ محلياً على جهازك فقط ولا تُرسل إلى أي خادم. لا نستخدم ملفات تعريف الارتباط، ولا أدوات تتبع، ولا تحليلات. خصوصيتك مضمونة بالكامل.</p>
				</div>
				<div class="about-block reveal reveal-delay-2" use:reveal>
					<h2>تواصل معنا</h2>
					<p>لديك اقتراح أو وجدت مشكلة؟ افتح تذكرة على <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/issues">صفحة المشروع في GitHub</a> أو تواصل معنا عبر <a href="https://alsheikhmedia.com">موقع الشيخ ميديا</a>.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== FOOTER ==================== -->
	<footer class="footer">
		<div class="footer-content">
			<p>صنع بواسطة <a href="https://alsheikhmedia.com">الشيخ ميديا</a></p>
			<nav class="footer-links" aria-label="روابط التذييل">
				<a href="/about">عن المشروع</a>
				<a href="/privacy">الخصوصية</a>
				<a href="/contact">تواصل معنا</a>
				<a href="https://github.com/AlsheikhMedia/ArabicTeleprompter">GitHub</a>
			</nav>
		</div>
	</footer>
</main>

<style>
	/* ===== Base ===== */
	.landing {
		font-family: 'Cairo', sans-serif;
		color: var(--text-primary);
		overflow-x: hidden;
		overflow-y: auto;
		height: 100vh;
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		line-height: 1.7;
	}

	h1, h2, h3 {
		font-family: 'Amiri', serif;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	/* ===== HERO ===== */
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80px 24px 60px;
		text-align: center;
		position: relative;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -40%;
		left: 50%;
		transform: translateX(-50%);
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(77, 166, 255, 0.06) 0%, transparent 70%);
		pointer-events: none;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 20px;
		background: rgba(26, 26, 46, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 100px;
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-bottom: 32px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.hero-badge span {
		color: var(--accent);
		font-weight: 600;
	}

	h1 {
		font-size: clamp(3rem, 7vw, 5.5rem);
		font-weight: 700;
		line-height: 1.2;
		color: var(--text-primary);
		margin-bottom: 24px;
		letter-spacing: -0.5px;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--text-secondary);
		max-width: 560px;
		margin: 0 auto 24px;
		line-height: 1.8;
	}

	.hero-features {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px 24px;
		font-size: 1.05rem;
		color: var(--text-secondary);
		margin-bottom: 40px;
		font-weight: 400;
	}

	.hero-features .dot {
		color: var(--accent);
		opacity: 0.5;
	}

	.hero-ctas {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 64px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 14px 32px;
		border-radius: 10px;
		font-family: 'Cairo', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: all 0.25s ease;
		min-height: 48px;
		min-width: 48px;
	}

	.btn-primary {
		background: var(--accent);
		color: #0f0f1a;
	}

	.btn-primary:hover {
		background: #6bb8ff;
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(77, 166, 255, 0.25);
	}

	.btn-ghost {
		background: transparent;
		color: var(--text-primary);
		border: 1px solid var(--border);
	}

	.btn-ghost:hover {
		border-color: var(--accent);
		color: var(--accent);
		transform: translateY(-2px);
	}

	/* ===== App Mockup ===== */
	.app-mockup {
		width: min(80%, 900px);
		aspect-ratio: 16 / 9.5;
		background: var(--bg-secondary);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		overflow: hidden;
		box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03);
	}

	.mockup-toolbar {
		height: 44px;
		background: var(--bg-tertiary);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		display: flex;
		align-items: center;
		padding: 0 16px;
		gap: 10px;
	}

	.mockup-dots {
		display: flex;
		gap: 7px;
		direction: ltr;
	}

	.mockup-dots span {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--border);
	}

	.mockup-dots span:nth-child(1) { background: #ff5f57; }
	.mockup-dots span:nth-child(2) { background: #ffbd2e; }
	.mockup-dots span:nth-child(3) { background: #28ca41; }

	.mockup-toolbar-btns {
		display: flex;
		gap: 6px;
		margin-right: auto;
		margin-left: 16px;
	}

	.mockup-toolbar-btns span {
		width: 28px;
		height: 24px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 5px;
		font-size: 0.7rem;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	.mockup-body {
		padding: 32px 40px;
		direction: rtl;
	}

	.mockup-text {
		font-family: 'Amiri', serif;
		font-size: 1.3rem;
		color: rgba(224, 224, 240, 0.35);
		line-height: 2;
		text-align: right;
	}

	.mockup-cursor {
		display: inline-block;
		width: 2px;
		height: 1.4em;
		background: var(--accent);
		vertical-align: text-bottom;
		animation: blink 1s step-end infinite;
		margin-right: 2px;
	}

	@keyframes blink {
		50% { opacity: 0; }
	}

	/* ===== BENTO GRID ===== */
	.bento-section {
		padding: 100px 24px;
	}

	.section-label {
		text-align: center;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 12px;
		font-family: 'Cairo', sans-serif;
	}

	.section-title {
		text-align: center;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		margin-bottom: 56px;
		color: var(--text-primary);
	}

	.section-desc {
		text-align: center;
		max-width: 640px;
		margin: -32px auto 56px;
		color: var(--text-secondary);
		font-size: 1.05rem;
		line-height: 1.8;
	}

	.bento-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		max-width: 1100px;
		margin: 0 auto;
	}

	.bento-card {
		background: rgba(26, 26, 46, 0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		padding: 36px 32px;
		transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		position: relative;
		overflow: hidden;
	}

	.bento-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(77, 166, 255, 0.0), transparent);
		transition: background 0.35s ease;
	}

	.bento-card:hover {
		transform: translateY(-4px);
		border-color: rgba(77, 166, 255, 0.25);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(77, 166, 255, 0.05);
	}

	.bento-card:hover::before {
		background: linear-gradient(90deg, transparent, rgba(77, 166, 255, 0.4), transparent);
	}

	.bento-card.large {
		grid-column: span 2;
	}

	.bento-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(77, 166, 255, 0.08);
		border-radius: 12px;
		margin-bottom: 20px;
		color: var(--accent);
	}

	.bento-icon svg {
		width: 24px;
		height: 24px;
	}

	.bento-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin-bottom: 8px;
		color: var(--text-primary);
	}

	.bento-card p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* Large card visuals */
	.bento-card.large .bento-visual {
		margin-top: 24px;
		height: 120px;
		border-radius: 10px;
		overflow: hidden;
	}

	.tashkeel-visual {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		padding: 20px 24px;
		font-family: 'Amiri', serif;
		font-size: 1.6rem;
		line-height: 2;
		color: rgba(224, 224, 240, 0.5);
		text-align: right;
	}

	.tashkeel-visual .har {
		color: var(--accent);
		opacity: 0.7;
	}

	.dual-screen-visual {
		display: flex;
		gap: 8px;
		height: 100%;
	}

	.dual-screen-visual .screen {
		flex: 1;
		background: rgba(0, 0, 0, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 10px;
		display: flex;
		flex-direction: column;
	}

	.dual-screen-visual .screen-bar {
		height: 6px;
		background: var(--bg-tertiary);
		border-radius: 3px;
		margin-bottom: 8px;
	}

	.dual-screen-visual .screen-lines {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.dual-screen-visual .screen-line {
		height: 4px;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 2px;
	}

	.dual-screen-visual .screen:first-child .screen-line {
		background: rgba(77, 166, 255, 0.12);
	}

	/* ===== TECH SPECS ===== */
	.tech-section {
		padding: 60px 24px;
		background: var(--bg-secondary);
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.tech-inner {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.tech-label {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-left: 16px;
		font-weight: 500;
	}

	.tech-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(26, 26, 46, 0.7);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 100px;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: all 0.25s ease;
		white-space: nowrap;
		font-family: 'Cairo', sans-serif;
	}

	.tech-badge:hover {
		border-color: rgba(77, 166, 255, 0.25);
		background: rgba(77, 166, 255, 0.06);
	}

	.tech-badge svg {
		width: 18px;
		height: 18px;
		color: var(--accent);
	}

	/* ===== OPEN SOURCE ===== */
	.oss-section {
		padding: 100px 24px;
		text-align: center;
		position: relative;
	}

	.oss-section::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(77, 166, 255, 0.04) 0%, transparent 70%);
		pointer-events: none;
	}

	.oss-brackets {
		font-family: 'Courier New', monospace;
		font-size: clamp(3rem, 6vw, 5rem);
		color: var(--accent);
		opacity: 0.12;
		margin-bottom: -20px;
		letter-spacing: 16px;
		direction: ltr;
	}

	.oss-section h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		margin-bottom: 16px;
	}

	.oss-section .desc {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 550px;
		margin: 0 auto 36px;
		line-height: 1.8;
	}

	.oss-stats {
		display: flex;
		justify-content: center;
		gap: 48px;
		margin-bottom: 40px;
		flex-wrap: wrap;
	}

	.oss-stat .num {
		font-size: 2rem;
		font-weight: 800;
		color: var(--accent);
		display: block;
		font-family: 'Cairo', sans-serif;
	}

	.oss-stat .label {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	/* ===== DOWNLOAD ===== */
	.download-section {
		padding: 100px 24px;
		background: var(--bg-secondary);
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.download-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		max-width: 960px;
		margin: 0 auto;
	}

	.download-card {
		background: rgba(26, 26, 46, 0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		padding: 40px 28px;
		text-align: center;
		transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.download-card:hover {
		transform: translateY(-4px);
		border-color: rgba(77, 166, 255, 0.25);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.download-icon {
		width: 56px;
		height: 56px;
		margin: 0 auto 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
	}

	.download-icon svg {
		width: 40px;
		height: 40px;
	}

	.download-card h3 {
		font-size: 1.15rem;
		font-weight: 700;
		margin-bottom: 6px;
	}

	.download-card .arch {
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-bottom: 20px;
	}

	.download-card .btn {
		width: 100%;
		padding: 12px 20px;
		font-size: 0.9rem;
	}

	/* ===== FOOTER ===== */
	.about-section {
		padding: 80px 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.about-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
		max-width: 1000px;
		margin: 0 auto;
	}

	.about-block h2 {
		font-size: 1.2rem;
		margin-bottom: 12px;
		color: var(--text-primary);
	}

	.about-block p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.8;
	}

	.about-block a {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: rgba(77, 166, 255, 0.3);
		text-underline-offset: 3px;
	}

	.about-block a:hover {
		text-decoration-color: var(--accent);
	}

	.footer {
		padding: 32px 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		text-align: center;
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1000px;
		margin: 0 auto;
	}

	.footer p {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.footer-links {
		display: flex;
		gap: 24px;
	}

	.footer-links a,
	.footer a {
		color: var(--text-secondary);
		font-size: 0.85rem;
		transition: color 0.2s;
	}

	.footer-links a:hover,
	.footer a:hover {
		color: var(--accent);
	}

	/* ===== ANIMATIONS ===== */
	.reveal {
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	:global(.reveal.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.reveal-delay-1 { transition-delay: 0.1s; }
	.reveal-delay-2 { transition-delay: 0.2s; }
	.reveal-delay-3 { transition-delay: 0.3s; }
	.reveal-delay-4 { transition-delay: 0.35s; }

	/* ===== RESPONSIVE ===== */
	@media (max-width: 900px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.bento-card.large {
			grid-column: span 2;
		}
		.download-grid {
			grid-template-columns: repeat(2, 1fr);
			max-width: 500px;
		}
		.about-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}
		.footer-content {
			flex-direction: column;
			gap: 16px;
		}
	}

	@media (max-width: 600px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}
		.bento-card.large {
			grid-column: span 1;
		}
		.download-grid {
			grid-template-columns: 1fr;
			max-width: 320px;
		}
		.hero {
			padding: 60px 20px 40px;
		}
		.app-mockup {
			width: 95%;
		}
		.mockup-body {
			padding: 20px;
		}
		.mockup-text {
			font-size: 1rem;
		}
		.hero-ctas {
			flex-direction: column;
			align-items: stretch;
			width: 100%;
			max-width: 320px;
		}
		.oss-stats {
			gap: 28px;
		}
		.tech-inner {
			gap: 8px;
		}
		.tech-label {
			width: 100%;
			text-align: center;
			margin-left: 0;
			margin-bottom: 8px;
		}
	}

	.skip-link {
		position: absolute;
		top: -100%;
		right: 0;
		background: var(--accent);
		color: var(--bg-primary);
		padding: 8px 16px;
		border-radius: 0 0 8px 8px;
		z-index: 9999;
		font-size: 14px;
		transition: top 0.2s;
	}

	.skip-link:focus {
		top: 0;
	}
</style>
