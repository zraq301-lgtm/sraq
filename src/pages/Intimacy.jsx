import React, { useState, useRef } from 'react';
import { 
  Heart, Flame, ShieldCheck, Sparkles, MessageCircle, 
  Settings, Send, Info, Lock, Eye, Zap, Moon, 
  Activity, BookOpen, Pray, ChevronRight, X 
} from 'lucide-react';

// --- القوائم الـ 10 الموسوعية للحميمية ---
const INTIMACY_CATEGORIES = [
  { id: 1, title: 'الود والاتصال العاطفي', icon: <Heart className="text-red-500"/>, items: ['لغة الحوار 🗣️', 'تبادل النظرات 👀', 'كلمات التقدير 💌', 'الهدايا الرمزية 🎁', 'الدعم وقت الأزمات 🤝', 'الضحك المشترك 😂', 'قضاء وقت خاص ☕', 'اللمس العفوي 🤚', 'الشعور بالأمان 🛡️', 'التسامح 🏳️', 'الإنصات العميق 🎧', 'المشاركة في الاهتمامات 🎨', 'الاحتواء النفسي 🫂', 'رسائل الشوق 📱', 'الدعم المعنوي 🌟'] },
  { id: 2, title: 'لغة الجسد والتمهيد', icon: <Sparkles className="text-yellow-500"/>, items: ['القبلات العميقة 💋', 'الأحضان الدافئة 🫂', 'الملاطفة 🌸', 'لغة العيون ✨', 'الكلمات الهمسية 👂', 'التدليك الاسترخائي 💆‍♂️', 'النظافة الشخصية 🧼', 'التأنق للطرف الآخر 👗', 'العطور المثيرة 🧴', 'المداعبة الطويلة ⏳', 'التهيئة النفسية 🧘‍♀️', 'التلامس البصري 👀', 'لغة اليدين 🤝', 'الهمس العاطفي 🗣️', 'الابتسامة الجذابة 😊'] },
  { id: 3, title: 'الصحة والتبادل الجنسي', icon: <Flame className="text-orange-600"/>, items: ['التوافق في الرغبة 🌡️', 'المبادرة المشتركة ⚡', 'استكشاف مناطق الإثارة 📍', 'التفاعل أثناء اللقاء 🔥', 'التعبير عن الاحتياجات 💬', 'الإشباع المتبادل ✅', 'طول مدة اللقاء ⏳', 'التناغم الحركي 💃', 'الجرأة المحببة 🦁', 'الاستجابة الجسدية 📈', 'التنفس المتناغم 🌬️', 'تلبية الرغبات 🎯', 'التحكم في الإيقاع 🕰️', 'التفاعل الصوتي 🔊', 'النشاط المشترك 🏃‍♂️'] },
  { id: 4, title: 'النشوة وما بعدها', icon: <Zap className="text-purple-500"/>, items: ['الوصول للنشوة 🌟', 'التزامن العاطفي 💞', 'الحضن العميق بعد اللقاء 🫂', 'كلمات الحب بعد النشوة 🗣️', 'البقاء معاً لفترة طويلة 🧘‍♂️', 'مشاعر الرضا ✨', 'العناية بالطرف الآخر 🩹', 'الاسترخاء المشترك 💤', 'الحديث الهادئ 💬', 'الامتنان للطرف الآخر 🙌', 'الشعور بالسكينة 🌊', 'تعزيز الرابطة 🔗', 'الهدوء الجسدي 🍃', 'التقارب الروحي 🕊️', 'تبادل القبلات الرقيقة 😚'] },
  { id: 5, title: 'أنواع الاستمتاع والابتكار', icon: <Moon className="text-indigo-400"/>, items: ['تغيير الأماكن 🏡', 'أوضاع جديدة مباحة 🔄', 'كسر الروتين 🔨', 'استخدام الروائح الذكية 🕯️', 'التفاعل السمعي 🔊', 'المفاجآت الجنسية 🎈', 'الإضاءة الخافتة 💡', 'الملابس التنكرية 🎭', 'الخيال المشترك 🌌', 'ألعاب زوجية مباحة 🎲', 'التغيير الزمني ⏰', 'الاستحمام المشترك 🚿', 'التدليل المتبادل 🍭', 'المغامرة العاطفية 🧭', 'تجديد العهد الحب 📜'] },
  { id: 6, title: 'المحاذير والضوابط الشرعية', icon: <ShieldCheck className="text-green-600"/>, items: ['تجنب العلاقة أثناء الحيض 🚫', 'تجنب الإتيان من الدبر 🛑', 'احترام الخصوصية 🤐', 'تجنب العنف أو الإكراه ❌', 'الالتزام بالستر 🧺', 'غض البصر عن المحرمات 👁️', 'صون أسرار الفراش 🔒', 'التطهر بعد العلاقة 🚿', 'مراعاة الصحة البدنية 💊', 'الالتزام بالحلال 💍', 'تجنب الكلمات البذيئة ❌', 'احترام رغبة الطرف الآخر 🤝', 'تجنب التصوير أو التوثيق 📵', 'الحياء المتبادل 🙈', 'تقوى الله في الخلوة 🕋'] },
  { id: 7, title: 'الصحة الجنسية والفسيولوجية', icon: <Activity className="text-red-600"/>, items: ['القدرة البدنية 💪', 'عدم وجود آلام 💊', 'توازن الهرمونات 🧬', 'ممارسة الرياضة 🏋️‍♂️', 'التغذية الداعمة 🥑', 'جودة النوم 😴', 'الابتعاد عن التدخين 🚭', 'شرب الماء الكافي 💧', 'الفحوصات الدورية 🩺', 'تجنب السمنة المفرطة ⚖️', 'الراحة النفسية 🧘‍♂️', 'النشاط اليومي 🚶‍♂️', 'الوعي بالدورة الشهرية 🩸', 'تجنب المنشطات الضارة 🚫', 'القوة الحيوية 🔋'] },
  { id: 8, title: 'العوائق والمشكلات', icon: <Info className="text-gray-500"/>, items: ['الضغوط النفسية 🌪️', 'انشغال البال بالأبناء 🧒', 'التعب الجسدي 🔋', 'الملل الزوجي 💤', 'اضطراب صورة الجسد 🪞', 'مشكلات العمل 💼', 'التدخلات العائلية 🏠', 'نقص الثقافة الجنسية 📚', 'سرعة القذف أو البرود ⌛', 'الخلافات المستمرة 🗣️', 'إدمان الشاشات 📱', 'انعدام المبادرة 😶', 'الروتين القاتل 🔄', 'الخوف من الفشل 😨', 'غياب الحوار الصريح 🤐'] },
  { id: 9, title: 'الثقافة الجنسية والوعي', icon: <BookOpen className="text-amber-600"/>, items: ['فهم سيكولوجية الرجل 🧠', 'فهم سيكولوجية المرأة 🌸', 'القراءة في كتب التنمية 📚', 'الوعي بنقاط المتعة 🎯', 'تعلم لغات الحب 💌', 'فهم التغيرات العمرية 🕰️', 'الوعي بالاحتياجات النفسية 💡', 'الثقافة الشرعية للحياة 💍', 'حضور دورات مختصة 🎓', 'الصدق في التعبير 🗣️', 'تطوير المهارات العاطفية ✨', 'فهم دور الهرمونات 🧬', 'الوعي بلغة الجسد 🕺', 'البحث عن المعلومة الصحيحة ✅', 'تصحيح المفاهيم الخاطئة ❌'] },
  { id: 10, title: 'الاطمئنان الروحي', icon: <Pray className="text-blue-500"/>, items: ['الدعاء قبل العلاقة 🤲', 'الغسل المشترك 🚿', 'شكر الله على السكن 🛐', 'نية الإعفاف والاحتساب 💎', 'الاستغفار 📿', 'قراءة القرآن في البيت 📖', 'قيام الليل معاً 🌌', 'الذكر الدائم 🕊️', 'الإحسان للطرف الآخر 🌟', 'بناء بيت مسلم 🏡', 'التوكل على الله 🎯', 'الرضا بالنصيب ✅', 'البركة في الذرية 🐣', 'حب الله ورسوله ❤️', 'الوفاء بالعهود 📜'] }
];

const RaqqaHarmonyApp = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState("");
  const [note, setNote] = useState("");

  // --- دالة الربط مع API الحفظ والذكاء ---
  const handleAnalyze = async () => {
    if (selectedItems.length === 0) return alert("يرجى اختيار بعض المدخلات للتحليل");
    
    setLoading(true);
    setAiReport("رقة تقوم بتحليل التناغم الزوجي وتقديم التوصيات...");

    try {
      // 1. الحفظ في Neon DB
      await fetch('/api/save-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: "user_harmony_99",
          category: "تحليل حميمية وتناغم",
          value: selectedItems.length.toString(),
          note: `المدخلات: ${selectedItems.join(', ')}. ملاحظات إضافية: ${note}`
        })
      });

      // 2. التحليل عبر AI المتخصص
      const aiRes = await fetch('/api/raqqa-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `أنتِ مستشارة علاقات زوجية خبيرة بلمسة إيمانية. 
          بناءً على هذه المدخلات في العلاقة الحميمية: (${selectedItems.join(', ')}). 
          والملاحظات الإضافية: ${note}.
          حللي العلاقة وقدمي تقريراً احترافياً يتضمن:
          1. نقاط القوة في علاقتهما.
          2. الفجوات التي تحتاج اهتماماً.
          3. توصيات عملية وحيوية للمتعة والسعادة والابتكار.
          4. نصيحة إيمانية تعزز المودة والرحمة.
          اجعلي الرد دافئاً، طبياً، ونفسياً بأسلوب رقة.`
        })
      });
      const data = await aiRes.json();
      setAiReport(data.reply);
    } catch (error) {
      setAiReport("عذراً رفيقتي، حدث خطأ في تحليل البيانات.");
    } finally {
      setLoading(false);
      setActiveCategory(null);
    }
  };

  const toggleItem = (item) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2] text-right font-['Tajawal']" dir="rtl">
      
      {/* Sidebar للخصوصية */}
      <nav className="fixed right-0 top-0 h-full w-16 bg-[#4a0e0e] flex flex-col items-center py-8 space-y-8 z-50 shadow-2xl">
        <div className="text-gold-400 p-2"><Lock size={24} className="text-amber-400"/></div>
        <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center text-white cursor-pointer"><Heart size={20}/></div>
        <div className="mt-auto p-4 text-white/30"><Settings size={20}/></div>
      </nav>

      <main className="mr-16 p-6 lg:p-12">
        {/* Header بتصميم راقٍ */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/40 p-8 rounded-[40px] border border-white/60 shadow-xl backdrop-blur-md">
          <div>
            <h1 className="text-4xl font-black text-[#4a0e0e] mb-2 font-['Amiri']">مستشار الحميمية <span className="text-red-600 font-light italic">والتناغم الزوجي</span></h1>
            <p className="text-gray-600">خصوصية تامة لتحليل وتطوير العلاقة المقدسة بين الزوجين ✨</p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-[#4a0e0e] text-white rounded-full font-bold flex items-center gap-2 shadow-lg">
              <Eye size={18} className="text-amber-400"/> بيانات مشفرة
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* قوائم الإدخال الـ 10 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTIMACY_CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className="p-6 bg-white/80 backdrop-blur-sm border border-white rounded-[35px] shadow-sm hover:shadow-xl hover:translate-y-[-5px] transition-all text-right flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 rounded-2xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <span className="text-lg font-bold text-gray-800">{cat.title}</span>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-red-400 transition-colors"/>
                </button>
              ))}
            </div>

            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-white/60 border border-white p-6 rounded-[35px] shadow-inner outline-none focus:ring-2 ring-red-100 min-h-[120px]"
              placeholder="هل تودين إضافة ملاحظات خاصة لرقة عن تحديات تواجهكما؟ (اختياري)"
            />

            <button 
              onClick={handleAnalyze}
              className="w-full py-6 bg-gradient-to-r from-[#4a0e0e] to-red-800 text-white rounded-[35px] font-black text-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "رقة تحلل بياناتكما..." : <><Flame fill="currentColor" size={24}/> ابدأي التحليل الاحترافي</>}
            </button>
          </div>

          {/* لوحة نتائج الذكاء الاصطناعي */}
          <div className="lg:col-span-5">
            <div className="bg-[#4a0e0e] text-white rounded-[50px] p-8 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full"></div>
              
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <Sparkles className="text-amber-400" size={24}/>
                <h3 className="text-xl font-bold font-['Amiri']">تقرير التناغم والوعي</h3>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {aiReport ? (
                  <div className="space-y-6 animate-fade-in leading-relaxed text-lg font-['Amiri']">
                    {aiReport.split('\n').map((line, i) => (
                      <p key={i} className="text-gray-200">{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
                    <MessageCircle size={60}/>
                    <p className="text-lg italic">اختاري من القوائم الجانبية ما يعبر عن واقع علاقتكما لتبدأ رقة في تقديم البصيرة..</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* نافذة اختيار المدخلات (Modal) */}
        {activeCategory && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[45px] w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20 animate-scale-up">
              <div className="bg-[#4a0e0e] p-8 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl">{activeCategory.icon}</div>
                  <h2 className="text-2xl font-bold">{activeCategory.title}</h2>
                </div>
                <button onClick={() => setActiveCategory(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X/></button>
              </div>

              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                {activeCategory.items.map(item => (
                  <button 
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`p-4 rounded-2xl text-sm font-bold transition-all text-center border ${
                      selectedItems.includes(item) 
                        ? 'bg-red-500 text-white border-red-400 shadow-lg' 
                        : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-red-50 hover:text-red-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="p-8 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-500 font-bold">تم اختيار: {selectedItems.filter(i => activeCategory.items.includes(i)).length} من 15</span>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="px-8 py-3 bg-[#4a0e0e] text-white rounded-full font-bold shadow-lg"
                >
                  حفظ والاختيار من قائمة أخرى
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RaqqaHarmonyApp;
