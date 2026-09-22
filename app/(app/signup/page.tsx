'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Supabase Auth میں صارف بنانا
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData.user) throw authError;

      // 2. 'companies' ٹیبل میں نئی کمپنی بنانا
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([{ company_name: companyName }])
        .select()
        .single();

      if (companyError) throw companyError;

      // 3. 'users' ٹیبل میں HR مینیجر کی پروفائل بنانا
      const { error: userError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          company_id: companyData.id,
          full_name: fullName,
          role: 'admin',
        },
      ]);

      if (userError) throw userError;

      alert('تم إنشاء الحساب والشركة بنجاح!');
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4" dir="rtl">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">تسجيل شركة جديدة</h1>
        <p className="text-slate-500 text-sm mb-6">أنشئ حسابك لإدارة إقامات العمال وتفادي الغرامات</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">اسم الشركة</label>
            <input
              type="text"
              required
              placeholder="مثال: شركة الخليج للمقاولات"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-900"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">اسم مسؤول HR</label>
            <input
              type="text"
              required
              placeholder="الاسم الثلاثي"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-slate-900"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">البريد الإلكتروني (للتواصل)</label>
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
              minLength={6}
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
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب جديد (تجربة مجانية)'}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
