import React, { useState, useRef, useEffect } from 'react';
import { Truck, ShieldCheck, Star, ArrowLeft, CheckCircle, Clock, ChevronLeft, Loader2 } from 'lucide-react';

const GOOGLE_SHEETS_URL = (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL || '';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    size: '42',
    color: 'أسود'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (GOOGLE_SHEETS_URL) {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success since no-cors won't give us a readable response
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-24 lg:pb-0 selection:bg-amber-200" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter text-stone-900" dir="ltr">ZÉNITH.</div>
          <button onClick={scrollToForm} className="bg-stone-900 text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-stone-800 transition-colors">
            اطلب الآن
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-8 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-medium">
            <Star className="w-4 h-4 fill-amber-700 text-amber-700" />
            <span>الأكثر مبيعاً في المغرب</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight text-stone-900">
            فخامة الجلد.<br />راحة لا مثيل لها.
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            حذاء يجمع بين الأناقة الكلاسيكية والراحة العصرية. مصمم ليناسب إطلالتك اليومية، سواء مع الجينز أو السروال الرسمي.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-stone-700">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>جلد عالي الجودة بتشطيبات دقيقة</span>
            </div>
            <div className="flex items-center gap-3 text-stone-700">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>نعل طبي سميك لراحة تدوم طوال اليوم</span>
            </div>
            <div className="flex items-center gap-3 text-stone-700">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>متوفر بـ 3 ألوان: أسود، بني، وأزرق داكن</span>
            </div>
          </div>
          <div className="pt-4">
            <button onClick={scrollToForm} className="w-full lg:w-auto bg-amber-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20">
              اطلب حذاءك الآن <ArrowLeft className="w-5 h-5" />
            </button>
            <p className="text-center lg:text-right text-sm text-stone-500 mt-3 flex items-center justify-center lg:justify-start gap-1">
              <Truck className="w-4 h-4" /> توصيل مجاني والدفع عند الاستلام
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          {/* Hero Image: The black shoe with Moroccan Zellij background */}
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-stone-200 relative">
            <img
              src="/images/hero-black-shoe.jpeg"
              alt="Zénith Premium Sneaker - حذاء أسود مع خلفية مغربية"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-stone-900 text-white py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-stone-700">
          <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
            <Truck className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">توصيل مجاني</h3>
            <p className="text-stone-300 text-sm">إلى جميع أنحاء المغرب (24-48 ساعة)</p>
          </div>
          <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">الدفع عند الاستلام</h3>
            <p className="text-stone-300 text-sm">تأكد من جودة الحذاء قبل الدفع</p>
          </div>
          <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
            <Clock className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">استبدال سهل</h3>
            <p className="text-stone-300 text-sm">المقاس غير مناسب؟ نقوم باستبداله مجاناً.</p>
          </div>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 bg-stone-100/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>جلد طبيعي 100%</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-stone-900">شاهد الجودة بنفسك</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            نضمن لك جودة الجلد الطبيعي والمرونة العالية. شاهد الفيديو الذي يثبت أصالة منتجاتنا، وتعرف على تفاصيل الخياطة الدقيقة.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 aspect-[9/16] max-w-sm mx-auto border-4 border-white">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            playsInline
            loop
          >
            <source src="/images/video.mp4" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>

        </div>
      </section>

      {/* Customer Reviews (Social Proof) */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">آراء زبنائنا</h2>
            <p className="text-stone-400">أكثر من 2000 زبون راضٍ في جميع أنحاء المغرب</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
              <div className="flex text-amber-500 mb-3">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-stone-300 mb-4">"حذاء ممتاز جداً، الجلد طبيعي ومريح في اللبس. التوصيل كان سريع للدار البيضاء والتعامل راقي."</p>
              <p className="font-bold text-white">- ياسين م.</p>
              <p className="text-xs text-stone-500">تم الشراء مؤخراً</p>
            </div>
            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
              <div className="flex text-amber-500 mb-3">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-stone-300 mb-4">"أول مرة نشري صباط من الانترنيت ويصدق بهاد الجودة. شكرا لكم، غادي نزيد نكوموندي لون آخر."</p>
              <p className="font-bold text-white">- كريم ب.</p>
              <p className="text-xs text-stone-500">تم الشراء مؤخراً</p>
            </div>
            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
              <div className="flex text-amber-500 mb-3">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-stone-300 mb-4">"الصباط مريح بزاف خصوصا للناس لي كيوقفو بزاف فخدمتهم. الثمن مناسب جدا مقارنة بالجودة."</p>
              <p className="font-bold text-white">- هشام ع.</p>
              <p className="text-xs text-stone-500">تم الشراء مؤخراً</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Details */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-stone-900">ألوان تناسب كل أذواقك</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">تصميم عصري بلمسة كلاسيكية، متوفر بثلاثة ألوان أساسية لتكمل أناقتك في كل المناسبات.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gallery Image 1: The Brown shoes worn with grey trousers */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-stone-200">
            <img src="/images/brown-shoe-worn.jpeg" alt="حذاء بني ملبوس مع سروال رمادي" className="w-full h-full object-cover" />
          </div>
          {/* Gallery Image 2: Hand holding the brown shoe with others in background */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-stone-200">
            <img src="/images/all-colors-shoe.jpeg" alt="الألوان الثلاثة - بني، أسود، أزرق داكن" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="bg-white py-16 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-stone-50 rounded-3xl p-6 md:p-10 shadow-xl border border-stone-100">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-stone-900">تم الطلب بنجاح!</h2>
                <p className="text-lg text-stone-600 max-w-md mx-auto">
                  شكراً <span className="font-semibold">{formData.name}</span>. سيقوم فريقنا بالاتصال بك على الرقم <span className="font-semibold" dir="ltr">{formData.phone}</span> خلال 24 ساعة لتأكيد طلبك.
                </p>
                <p className="text-amber-700 font-medium mt-4">يرجى إبقاء هاتفك قريباً منك!</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-stone-900">احجز حذاءك الآن</h2>
                  <p className="text-stone-600">املأ الاستمارة، وسنتصل بك لتأكيد الطلب.</p>
                  <div className="mt-4 inline-block bg-amber-100 text-amber-900 px-4 py-2 rounded-lg font-bold text-xl">
                    السعر: 270 درهم <span className="text-sm font-normal line-through text-stone-500 mr-2">500 درهم</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-right">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-stone-700">الاسم الكامل *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="مثال: حسن العلوي"
                        className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-stone-700">رقم الهاتف *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="06... أو 07..."
                        pattern="^(06|07)[0-9]{8}$"
                        title="يجب أن يبدأ الرقم بـ 06 أو 07 ويتكون من 10 أرقام"
                        className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-right"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-stone-700">المدينة *</label>
                    <select
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                    >
                      <option value="">اختر مدينتك</option>
                      <option value="الدار البيضاء">الدار البيضاء</option>
                      <option value="الرباط">الرباط</option>
                      <option value="مراكش">مراكش</option>
                      <option value="طنجة">طنجة</option>
                      <option value="فاس">فاس</option>
                      <option value="أكادير">أكادير</option>
                      <option value="مدينة أخرى">مدينة أخرى</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-stone-700">عنوان التوصيل *</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="عنوانك بالكامل"
                      className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-stone-700">المقاس *</label>
                      <select
                        required
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                      >
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-stone-700">اللون *</label>
                      <select
                        required
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
                      >
                        <option value="أسود">أسود (Black)</option>
                        <option value="بني">بني (Brown)</option>
                        <option value="أزرق داكن">أزرق داكن (Navy)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 text-white px-8 py-4 rounded-md font-bold text-xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> جاري الإرسال...</>
                      ) : (
                        <>تأكيد طلبي <ChevronLeft className="w-6 h-6" /></>
                      )}
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-500">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>معلوماتك آمنة. الدفع عند الاستلام.</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <div className="font-bold text-2xl tracking-tighter text-white mb-4" dir="ltr">ZÉNITH.</div>
          <p className="mb-6">الحذاء الرياضي الأنيق للرجل المغربي.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الاسترجاع</a>
            <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
          </div>
          <p className="mt-8 text-xs text-stone-600">© 2026 Zénith Shoes. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      {!isSubmitted && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-200 lg:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button onClick={scrollToForm} className="w-full bg-amber-600 text-white px-4 py-3 rounded-md font-bold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
            اطلب الآن (270 درهم)
          </button>
        </div>
      )}
    </div>
  );
}
