'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Worker {
  id: string;
  worker_name: string;
  iqama_number: string;
  phone_number: string;
  iqama_expiry_date: string;
  status: string;
}

export default function DashboardPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [iqama, setIqama] = useState('');
  const [phone, setPhone] = useState('');
  const [expiry, setExpiry] = useState('');
  const router = useRouter();

  const fetchWorkers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('workers').select('*');
    if (!error && data) {
      setWorkers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // چیک کریں کہ صارف لاگ ان ہے یا نہیں
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        fetchWorkers();
      }
    };
    checkUser();
  }, [router]);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // صارف کی کمپنی آئی ڈی حاصل کریں
    const { data: userData } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', user.id)
      .single();

    if (!userData) return;

    const { error } = await supabase.from('workers').insert([
      {
        worker_name: name,
        iqama_number: iqama,
        phone_number: phone,
        iqama_expiry_date: expiry,
        company_id: userData.company_id
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setName('');
      setIqama('');
      setPhone('');
      setExpiry('');
      fetchWorkers();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h1 className="text-xl font-bold text-slate-800">نظام إدارة الإقامات (IqamaGuard Pro)</h1>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
            className="text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200"
          >
            تسجيل الخروج
          </button>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">إضافة عامل جديد</h2>
          <form onSubmit={handleAddWorker} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="اسم العامل"
              required
              className="p-2.5 border rounded-lg text-sm text-slate-900 focus:border-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="رقم الإقامة"
              required
              className="p-2.5 border rounded-lg text-sm text-slate-900 focus:border-blue-500 outline-none"
              value={iqama}
              onChange={(e) => setIqama(e.target.value)}
            />
            <input
              type="text"
              placeholder="رقم الجوال"
              required
              className="p-2.5 border rounded-lg text-sm text-slate-900 focus:border-blue-500 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="date"
              required
              className="p-2.5 border rounded-lg text-sm text-slate-900 focus:border-blue-500 outline-none"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <button type="submit" className="md:col-span-4 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 text-sm">
              حفظ البيانات
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">قائمة العمال والانتهاء</h2>
          {loading ? (
            <p className="text-sm text-slate-500">جاري التحميل...</p>
          ) : workers.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">لا يوجد عمال مسجلين حالياً.</p>
          ) : (
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b text-slate-600 text-sm">
                  <th className="pb-3 px-2">الاسم</th>
                  <th className="pb-3 px-2">رقم الإقامة</th>
                  <th className="pb-3 px-2">الجوال</th>
                  <th className="pb-3 px-2">تاريخ الانتهاء</th>
                  <th className="pb-3 px-2">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700 text-sm">
                {workers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-slate-50">
                    <td className="py-3 px-2">{worker.worker_name}</td>
                    <td className="py-3 px-2">{worker.iqama_number}</td>
                    <td className="py-3 px-2">{worker.phone_number}</td>
                    <td className="py-3 px-2">{worker.iqama_expiry_date}</td>
                    <td className="py-3 px-2">
                      <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full font-medium">
                        {worker.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
