<svelte:head>
	<title>عن المشروع — التلقين العربي | About</title>
	<meta name="description" content="التلقين العربي مشروع مفتوح المصدر من الشيخ ميديا — أداة تلقين احترافية مصممة لصنّاع المحتوى العربي." />
	<link rel="canonical" href="https://arabicteleprompter.alsheikhmedia.com/about" />
</svelte:head>

<main class="page" dir="rtl">
	<div class="container">
		<a href="/" class="back-link">العودة للرئيسية</a>
		<h1>عن التلقين العربي</h1>

		<section>
			<h2>المشروع</h2>
			<p>التلقين العربي هو تطبيق تلقين احترافي مفتوح المصدر، صُمم خصيصاً لتلبية احتياجات صنّاع المحتوى باللغة العربية. من المذيعين ومقدمي البرامج التلفزيونية إلى صانعي محتوى يوتيوب والبودكاست — نوفر أداة تفهم خصائص اللغة العربية وتدعمها بالكامل.</p>
		</section>

		<section>
			<h2>لماذا بنينا هذا التطبيق؟</h2>
			<p>معظم تطبيقات التلقين المتوفرة مصممة للغة الإنجليزية ولا تدعم خصائص العربية مثل التشكيل والاتجاه من اليمين إلى اليسار والخطوط العربية المتنوعة. نؤمن بأن المحتوى العربي يستحق أدوات بنفس جودة الأدوات المتوفرة باللغات الأخرى.</p>
		</section>

		<section>
			<h2>التقنيات</h2>
			<p>بُني التطبيق بأحدث التقنيات: SvelteKit 2 مع Svelte 5 للواجهة، وTauri 2.0 مع Rust للتطبيق المكتبي. المحرر يستخدم TipTap 3 لتحرير النصوص الغنية. التطبيق يعمل بالكامل بدون إنترنت لضمان خصوصيتك.</p>
		</section>

		<section>
			<h2>الفريق</h2>
			<p>مشروع من <a href="https://alsheikhmedia.com">الشيخ ميديا</a> — شركة إنتاج محتوى رقمي مقرها الإمارات العربية المتحدة. نعمل على بناء أدوات وحلول رقمية تخدم صنّاع المحتوى العربي.</p>
		</section>

		<section>
			<h2>المساهمة</h2>
			<p>المشروع مفتوح المصدر تحت رخصة MIT. نرحب بمساهمات المجتمع — سواء كانت إصلاح أخطاء، إضافة مميزات جديدة، تحسين الترجمة، أو حتى الإبلاغ عن مشاكل. زر <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter">صفحة المشروع على GitHub</a> للبدء.</p>
		</section>
		<nav class="page-links" aria-label="صفحات ذات صلة">
			<a href="/privacy">الخصوصية</a>
			<a href="/contact">تواصل معنا</a>
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
