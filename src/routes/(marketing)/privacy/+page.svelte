<svelte:head>
	<title>سياسة الخصوصية — التلقين العربي | Privacy Policy</title>
	<meta name="description" content="سياسة الخصوصية لتطبيق التلقين العربي — لا نجمع أي بيانات شخصية." />
	<link rel="canonical" href="https://arabicteleprompter.alsheikhmedia.com/privacy" />
</svelte:head>

<main class="page" dir="rtl">
	<div class="container">
		<a href="/" class="back-link">العودة للرئيسية</a>
		<h1>سياسة الخصوصية</h1>
		<p class="updated">آخر تحديث: يناير 2025</p>

		<section>
			<h2>ملخص</h2>
			<p>تطبيق التلقين العربي لا يجمع أي بيانات شخصية. نحن نحترم خصوصيتك بالكامل.</p>
		</section>

		<section>
			<h2>البيانات التي نجمعها</h2>
			<p>لا شيء. التطبيق يعمل بالكامل على جهازك المحلي ولا يرسل أي بيانات إلى خوادم خارجية. جميع النصوص والإعدادات تُحفظ في متصفحك (localStorage) ولا تغادر جهازك أبداً.</p>
		</section>

		<section>
			<h2>ملفات تعريف الارتباط (Cookies)</h2>
			<p>لا نستخدم ملفات تعريف الارتباط. لا نستخدم أدوات تتبع. لا نستخدم خدمات تحليلات مثل Google Analytics أو غيرها.</p>
		</section>

		<section>
			<h2>مشاركة البيانات</h2>
			<p>بما أننا لا نجمع أي بيانات، فلا يوجد ما نشاركه مع أي طرف ثالث.</p>
		</section>

		<section>
			<h2>النسخة المكتبية (Tauri)</h2>
			<p>تطبيق سطح المكتب مبني بتقنية Tauri ويعمل بدون اتصال بالإنترنت. لا يتصل بأي خادم ولا يرسل أي بيانات. جميع الملفات المستوردة تُعالج محلياً على جهازك.</p>
		</section>

		<section>
			<h2>المصدر المفتوح</h2>
			<p>التطبيق مفتوح المصدر تحت رخصة MIT. يمكنك مراجعة الكود بالكامل على <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter">GitHub</a> للتحقق من هذه الادعاءات بنفسك.</p>
		</section>

		<section>
			<h2>تواصل معنا</h2>
			<p>لأي استفسار حول الخصوصية، تواصل معنا عبر <a href="https://github.com/AlsheikhMedia/ArabicTeleprompter/issues">صفحة المشروع في GitHub</a> أو عبر <a href="https://alsheikhmedia.com">موقع الشيخ ميديا</a>.</p>
		</section>
		<nav class="page-links" aria-label="صفحات ذات صلة">
			<a href="/about">عن المشروع</a>
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
		margin-bottom: 8px;
	}
	.updated {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-bottom: 48px;
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
