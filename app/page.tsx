import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900">
        <h1 className="text-xl font-bold text-blue-500">IqamaGuard Pro</h1>
        <div className="flex gap-2">
          <Link href="/login" className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white border border-slate-700">
            تسجيل الدخول
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition">
            تجربة مجانية
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-24 px-4">
        <span className="bg-blue-500/10 text-blue-400 text-xs px-4 py-1.5 rounded-full border border-blue-500/20">
          النظام الأول الذكي لإدارة الإقامات في الخليج
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight text-white">
          تجنب غرامات تأخير تجديد الإقامات بنسبة 100%
        </h2>
        <p className="text-slate-400 text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
          نظام أتمتة ذكي لمسؤولي HR لإدارة إقامات العمال وإرسال تنبيهات تلقائية عبر الواتساب قبل الانتهاء بـ 30 يومًا.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/signup" className="px-8 py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">
            ابدأ تجربتك المجانية الآن
          </Link>
        </div>
      </section>
    </div>
  );
}
