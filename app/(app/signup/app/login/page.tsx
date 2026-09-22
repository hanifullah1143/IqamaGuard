'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('خطأ في بيانات الدخول: ' + error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4" dir="rtl">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">تسجيل الدخول</h1>
        <p className="text-slate-500 text-sm mb-6">مرحبًا بك مجددًا في IqamaGuard Pro</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">البريد الإلكتروني</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">كلمة المرور</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-slate-400"
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          ليس لديك حساب؟{' '}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            أنشئ حسابك الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
