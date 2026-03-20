<svelte:head>
	<title>تواصل معنا — التلقين العربي | Contact</title>
	<meta name="description" content="تواصل مع فريق التلقين العربي — أبلغ عن مشاكل أو اقترح مميزات جديدة." />
	<link rel="canonical" href="https://arabicteleprompter.alsheikhmedia.com/contact" />
</svelte:head>

<main class="page" dir="rtl">
	<div class="container">
		<a href="/" class="back-link">العودة للرئيسية</a>
		<h1>تواصل معنا</h1>

		<section>
			<h2>الدعم الفني والمشاكل</h2>
			<p>وجدت خطأ أو مشكلة في التطبيق؟ افتح تذكرة على <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/issues">صفحة المشاكل في GitHub</a>. سنرد في أقرب وقت ممكن.</p>
		</section>

		<section>
			<h2>اقتراح مميزات جديدة</h2>
			<p>لديك فكرة لتحسين التطبيق؟ نرحب باقتراحاتك. افتح تذكرة جديدة على <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/issues">GitHub</a> واشرح الميزة التي تود إضافتها.</p>
		</section>

		<section>
			<h2>المساهمة في التطوير</h2>
			<p>المشروع مفتوح المصدر ونرحب بالمساهمات. راجع <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter">مستودع المشروع</a> للبدء في المساهمة.</p>
		</section>

		<section>
			<h2>الشيخ ميديا</h2>
			<p>للتواصل التجاري أو الشراكات، زر <a href="https://alsheikhmedia.com">موقع الشيخ ميديا</a>.</p>
		</section>
		<nav class="page-links" aria-label="صفحات ذات صلة">
			<a href="/about">عن المشروع</a>
			<a href="/privacy">الخصوصية</a>
			<a href="/">الرئيسية</a>
		</nav>
	</div>
</main>

<style>
	.page {
		font-family: 'Cairo', sans-serif;
		color: var(--text-primary);
		min-height: 100vh;
		overflow-y: auto;
		padding: 60px 24px 80px;
		line-height: 1.8;
	}
	.container {
		max-width: 700px;
		margin: 0 auto;
	}
	.back-link {
		display: inline-block;
		color: var(--accent);
		margin-bottom: 32px;
		font-size: 0.9rem;
	}
	h1 {
		font-family: 'Amiri', serif;
		font-size: 2.5rem;
		margin-bottom: 32px;
	}
	section {
		margin-bottom: 32px;
	}
	h2 {
		font-family: 'Amiri', serif;
		font-size: 1.4rem;
		margin-bottom: 8px;
		color: var(--text-primary);
	}
	p {
		color: var(--text-secondary);
		font-size: 1rem;
	}
	a {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: rgba(77, 166, 255, 0.3);
		text-underline-offset: 3px;
	}
	a:hover {
		text-decoration-color: var(--accent);
	}
	.page-links {
		margin-top: 48px;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		display: flex;
		gap: 24px;
	}
	.page-links a {
		color: var(--text-secondary);
		font-size: 0.9rem;
		text-decoration: none;
	}
	.page-links a:hover {
		color: var(--accent);
	}
</style>
