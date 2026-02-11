import React, { useState, useRef } from 'react';
import { 
  BookOpen, Sparkles, Send, Mic, Camera, Sun, Moon, 
  Cloud, Anchor, Shield, Star, Feather, Wind, 
  MessageCircle, Database, ChevronRight, X, Heart, 
  CheckCircle, Coffee, Clock, PenTool, Gift
} from 'lucide-react';

// --- القوائم الـ 15 لـ "فقه المرأة الوعي والجمال" ---
const FIQH_CATEGORIES = [
  { id: 1, title: 'فقه الطهارة والنظافة', icon: <Droplets className="text-blue-400"/>, items: ['سنن الفطرة ✨', 'صفة الغسل 🚿', 'الوضوء الجمالي 💧', 'طهارة الثوب 👗', 'طيب الرائحة 🌸', 'أحكام المسح 👟'] },
  { id: 2, title: 'فقه الصلاة والخشوع', icon: <Anchor className="text-purple-500"/>, items: ['أوقات الصلاة 🕌', 'السنن الرواتب 🌱', 'سجدة الشكر 🤲', 'لباس الصلاة الأنيق 🧕', 'صلاة الوتر 🌌'] },
  { id: 3, title: 'فقه الصيام والارتقاء', icon: <Moon className="text-yellow-600"/>, items: ['صيام الاثنين والخميس 🌙', 'قضاء ما فات 📅', 'سحور البركة 🥣', 'كف اللسان عن اللغو 🤐'] },
  { id: 4, title: 'فقه القرآن والورد', icon: <BookOpen className="text-green-600"/>, items: ['تلاوة يومية 📖', 'تدبر آية 💡', 'حفظ سورة جديدة 💎', 'الاستماع بإنصات 🎧'] },
  { id: 5, title: 'التسبيح والذكر الذكي', icon: <Sparkles className="text-orange-400"/>, items: ['أذكار الصباح ☀️', 'أذكار المساء 🌙', 'الاستغفار بالأسحار ⏳', 'الصلاة على النبي 🕊️'] },
  { id: 6, title: 'فقه العفة والحجاب', icon: <Shield className="text-pink-500"/>, items: ['حجاب القلب قبل الجسد 💎', 'غض البصر 👁️', 'الحياء في القول 🎀', 'سمو الفكر 🧠'] },
  { id: 7, title: 'فقه المعاملات والبيوت', icon: <Heart className="text-red-400"/>, items: ['بر الوالدين بوعي 🌳', 'مودة الزوج ❤️', 'رحمة الأبناء 🐣', 'صلة الرحم 🔗'] },
  { id: 8, title: 'تجنب المحرمات', icon: <X className="text-red-600"/>, items: ['محاربة الغيبة 🚫', 'ترك النميمة 🤐', 'تجنب المحتوى الإباحي 🛡️', 'الصدق في الحديث ✅'] },
  { id: 9, title: 'الهدوء النفسي والبصيرة', icon: <Wind className="text-blue-300"/>, items: ['تفريغ الانفعالات بذكر الله 🌬️', 'الرضا بالقدر ⚖️', 'حسن الظن بالله 🌈'] },
  { id: 10, title: 'الأعمال الصالحة المتنوعة', icon: <Gift className="text-yellow-500"/>, items: ['صدقة خفية 💰', 'إماطة الأذى 🌿', 'إفشاء السلام 🕊️', 'نفع الناس 🤝'] },
  { id: 11, title: 'فقه الوقت والإنجاز', icon: <Clock className="text-indigo-500"/>, items: ['البكور 🌅', 'تنظيم المهام 📅', 'ترك ما لا يعني ⏳'] },
  { id: 12, title: 'الوعي والفكر الفقهي', icon: <Feather className="text-gray-600"/>, items: ['فهم مقاصد الشريعة 🧠', 'قراءة في السيرة 📚', 'تعلم فقه الواقع 🌍'] },
  { id: 13, title: 'الرعاية الذاتية بالفطرة', icon: <Coffee className="text-green-400"/>, items: ['النوم على طهارة 💤', 'الرياضة بنية القوة 💪', 'الأكل الطيب 🍏'] },
  { id: 14, title: 'فقه العطاء والزكاة', icon: <Sun className="text-yellow-400"/>, items: ['زكاة المال 💰', 'زكاة العلم 💡', 'زكاة الجمال (بالتستر) 💎'] },
  { id: 15, title: 'الاستعداد للقاء الله', icon: <Star className="text-blue-500"/>, items: ['تجديد التوبة ✨', 'كتابة الوصية 📝', 'ذكر هادم اللذات بيقين ⌛'] }
];

const RaqqaFiqhApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const videoRef = useRef(null);

  // --- الربط مع الـ APIs المرفوعة (Neon DB & AI) ---
  const handleAction = async (categoryTitle, itemValue) => {
    setLoading(true);
    setAiResponse("رقة تحلل بياناتكِ الفقهية والروحية الآن...");
    
    try {
      // 1. الحفظ في Neon DB
      await fetch('/api/save-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: "raqqa_user_99",
          category: `فقه: ${categoryTitle}`,
          value: itemValue,
          note: userInput
        })
      });

      // 2. تحليل AI موسع عبر Groq/Mixedbread
      const aiRes = await fetch('/api/raqqa-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `رقيقتي، لقد أتممتِ بنجاح بند "${itemValue}" في "${categoryTitle}". 
          ملاحظاتي: ${userInput}. قدمي لي تحليلاً لنمو روحي وتوجيهاً فقهياً دافئاً مع آية أو حديث.`
        })
      });
      const aiData = await aiRes.json();
      setAiResponse(aiData.reply);
      setSelectedCategory(null);
    } catch (error) {
      setAiResponse("عذراً رفيقتي، حدث خطأ في الشبكة، لكن الله يرى سعيكِ.");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) { alert("الكاميرا غير متاحة"); }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f7] text-right font-['Tajawal']" dir="rtl">
      
      {/* Sidebar الأنيق */}
      <nav className="fixed right-0 top-0 h-full w-20 bg-white/40 backdrop-blur-xl border-l border-white shadow-2xl flex flex-col items-center py-8 space-y-8 z-50">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <BookOpen size={24} />
        </div>
        <button className="p-3 rounded-xl bg-green-50 text-green-600 shadow-inner">
          <CheckCircle size={24} />
        </button>
        <button className="text-gray-400 mt-auto hover:text-green-500 transition-colors">
          <Database size={24}/>
        </button>
      </nav>

      <main className="mr-20 p-6 lg:p-12">
        {/* Header */}
        <header className="mb-12 flex justify-between items-end bg-white/30 p-8 rounded-[40px] border border-white shadow-sm">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2 font-['Amiri']">رقة: <span className="text-green-600">فقه المرأة الوعي والجمال</span></h1>
            <p className="text-gray-500 font-medium">رحلتكِ اليومية نحو الانضباط الشرعي والجمال النفسي ✨</p>
          </div>
          <div className="flex gap-4">
             <button onClick={startCamera} className="p-4 bg-white/60 backdrop-blur-md shadow-md rounded-2xl text-gray-600 hover:text-green-500 transition-all"><Camera size={22}/></button>
             <button className="p-4 bg-white/60 backdrop-blur-md shadow-md rounded-2xl text-gray-600 hover:text-green-500 transition-all"><Mic size={22}/></button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* قوائم الفقه الـ 15 */}
          <div className="lg:col-span-8">
            <video ref={videoRef} autoPlay className="w-full h-32 object-cover rounded-[30px] border-4 border-white shadow-lg bg-gray-100 mb-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FIQH_CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="group bg-white/70 backdrop-blur-lg p-6 rounded-[35px] border border-white shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="p-4 bg-green-50 rounded-2xl inline-block mb-4 group-hover:bg-green-100 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
                  <p className="text-gray-400 text-xs mt-2 italic font-['Amiri']">خطوة نحو الارتقاء..</p>
                  <ChevronRight className="mt-4 text-green-200 group-hover:translate-x-[-8px] transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* لوحة تحليل رقة الذكي */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-3xl rounded-[45px] p-8 border border-green-100 shadow-2xl h-[calc(100vh-12rem)] sticky top-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <Sparkles className="text-green-500 animate-pulse" size={24} />
                <h3 className="text-xl font-bold text-gray-700 font-['Amiri']">تحليل رقة للنمو الروحي</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar leading-loose">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <p className="text-gray-400">رقة تتأمل في عملكِ الصالح...</p>
                  </div>
                ) : aiResponse ? (
                  <div className="bg-green-50/50 p-6 rounded-[30px] border border-green-100 animate-fade-in">
                    <p className="text-gray-800 text-lg font-['Amiri'] whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-300 mt-20">
                    <PenTool size={60} className="mx-auto opacity-10 mb-4" />
                    <p className="italic font-['Amiri'] underline decoration-green-100 underline-offset-8">شاركي رقة إنجازاتكِ الفقهية اليومية لتبدأ بالتحليل..</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button (اسألي الأزهر) */}
        <a 
          href="https://www.azhar.eg/fatwacenter" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-10 left-10 bg-white/90 backdrop-blur-md p-4 px-6 rounded-full border border-green-200 shadow-2xl flex items-center gap-3 hover:scale-110 transition-transform z-[200]"
        >
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">🕌</div>
          <div className="text-right">
            <span className="block text-xs text-gray-500 font-bold">اسألي الأزهر</span>
            <span className="text-[10px] text-green-700">مركز الفتوى الإلكترونية</span>
          </div>
        </a>

        {/* نافذة الإدخال (Modal) */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/5 backdrop-blur-md z-[300] flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-3xl w-full max-w-2xl rounded-[50px] border border-white shadow-2xl p-10 relative">
              <button onClick={() => setSelectedCategory(null)} className="absolute top-8 left-8 p-2 text-gray-400 hover:text-red-500 transition-colors"><X/></button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-green-50 rounded-2xl">{selectedCategory.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedCategory.title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8 max-h-48 overflow-y-auto p-2">
                {selectedCategory.items.map(item => (
                  <button 
                    key={item}
                    onClick={() => handleAction(selectedCategory.title, item)}
                    className="p-4 bg-white border border-gray-100 rounded-[20px] text-sm hover:border-green-300 hover:bg-green-50 transition-all font-bold shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 mr-2">ملاحظاتكِ لرفيقتكِ رقة (اختياري):</label>
                <textarea 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full bg-white border-none rounded-[30px] p-6 focus:ring-2 ring-green-100 outline-none shadow-inner"
                  placeholder="كيف كان شعوركِ وأنتِ تؤدين هذه الطاعة؟"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RaqqaFiqhApp;
