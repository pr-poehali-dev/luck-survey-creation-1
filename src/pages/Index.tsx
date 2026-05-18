import { useState } from "react";

const stories = [
  {
    name: "Марина К.",
    city: "Москва",
    emoji: "🍀",
    text: "Я всегда считала себя невезучей, пока не начала замечать маленькие удачи каждый день. Однажды я нашла 500 рублей в кармане куртки — как раз когда не хватало на кофе. С тех пор я верю: удача рядом, просто нужно смотреть!",
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Дмитрий В.",
    city: "Санкт-Петербург",
    emoji: "⭐",
    text: "Опаздывал на важное собеседование, пробки были жуткие. Вдруг открылась полоса, и я приехал за 10 минут до начала. Получил работу мечты! До сих пор уверен — это была удача.",
    color: "from-pink-400 to-purple-400",
  },
  {
    name: "Анна Л.",
    city: "Казань",
    emoji: "🌈",
    text: "На конкурсе рисунков выбрала случайную тему из шляпы — «радуга». Нарисовала за ночь, думала, не успею. Заняла первое место! Теперь радуга — мой личный символ удачи.",
    color: "from-green-400 to-teal-400",
  },
  {
    name: "Сергей М.",
    city: "Екатеринбург",
    emoji: "🎰",
    text: "Купил лотерейный билет впервые в жизни, просто так, на кассе. Выиграл поездку в Турцию! Жена сначала не верила — пришлось показать билет три раза.",
    color: "from-blue-400 to-cyan-400",
  },
];

const tips = [
  { emoji: "🌅", title: "Начинайте день с благодарности", text: "Каждое утро вспоминайте 3 вещи, за которые вы благодарны. Это настраивает ум на позитивные события и притягивает удачу." },
  { emoji: "🍀", title: "Носите талисман", text: "Выберите предмет, который будет вашим личным символом удачи. Это может быть украшение, камень или даже любимая ручка." },
  { emoji: "😊", title: "Улыбайтесь незнакомцам", text: "Удача любит открытых людей. Улыбка незнакомцу может стать началом важного знакомства или просто поднять настроение." },
  { emoji: "🎯", title: "Действуйте, не ждите", text: "Удача приходит к тем, кто двигается. Купите билет, отправьте резюме, познакомьтесь — каждое действие открывает новые двери." },
  { emoji: "🌟", title: "Верьте в себя", text: "Уверенность в собственных силах — лучший магнит для удачи. Когда вы верите, что справитесь, мир начинает помогать." },
  { emoji: "🔄", title: "Меняйте маршруты", text: "Ходите новыми дорогами, пробуйте новые блюда, читайте необычные книги. Новые пути открывают новые возможности." },
];

const questions = [
  {
    id: 1,
    question: "Как часто вам везёт в повседневной жизни?",
    options: ["Почти каждый день! 🎉", "Иногда случается ✨", "Редко, но метко 🍀", "Жду своего часа ⏳"],
  },
  {
    id: 2,
    question: "Какой талисман удачи вам ближе всего?",
    options: ["Четырёхлистный клевер 🍀", "Подкова 🐴", "Монетка 🪙", "Звезда ⭐"],
  },
  {
    id: 3,
    question: "Что вы делаете, когда нужна удача?",
    options: ["Стучу по дереву 🌳", "Загадываю желание на звезду 🌠", "Полагаюсь на себя 💪", "Несу любимый талисман 🎁"],
  },
  {
    id: 4,
    question: "Где удача вас настигает чаще всего?",
    options: ["На работе / в учёбе 📚", "В личной жизни 💕", "В случайных встречах 🤝", "В финансах 💰"],
  },
  {
    id: 5,
    question: "Верите ли вы, что удачу можно притянуть?",
    options: ["Да, абсолютно! ✨", "Скорее да, чем нет 🌟", "Сомневаюсь 🤔", "Всё в руках человека 💡"],
  },
];

const results = [
  { range: [0, 6], title: "Скрытая звезда ⭐", desc: "Удача уже рядом с вами — вы просто пока её не замечаете! Начните вести дневник маленьких побед и увидите, как жизнь полна удачных моментов.", color: "from-yellow-400 via-orange-400 to-red-400" },
  { range: [7, 12], title: "Искатель удачи 🌈", desc: "Вы на правильном пути! Удача посещает вас регулярно, и вы умеете её ценить. Продолжайте двигаться вперёд с позитивом!", color: "from-green-400 via-teal-400 to-blue-400" },
  { range: [13, 20], title: "Баловень судьбы 🍀", desc: "Удача — ваша постоянная спутница! Вы излучаете позитивную энергию, притягиваете нужных людей и оказываетесь в нужном месте в нужное время.", color: "from-pink-400 via-purple-400 to-indigo-400" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navItems = [
    { id: "home", label: "Главная", emoji: "🏠" },
    { id: "stories", label: "Истории", emoji: "📖" },
    { id: "tips", label: "Советы", emoji: "💡" },
    { id: "quiz", label: "Опросник", emoji: "🎲" },
  ];

  const handleAnswer = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((q) => q + 1), 400);
    } else {
      setTimeout(() => setShowResult(true), 400);
    }
  };

  const getResult = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    return results.find((r) => total >= r.range[0] && total <= r.range[1]) || results[1];
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestion(0);
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen font-golos bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {["⭐", "🍀", "✨", "🌟", "💫", "🎊", "🌈", "⭐", "✨", "🍀"].map((em, i) => (
          <span
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + i * 9}%`,
              top: `${5 + (i % 4) * 22}%`,
              animation: `floatUp ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
              opacity: 0.12,
            }}
          >
            {em}
          </span>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍀</span>
            <span className="font-pacifico text-xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Удача это ты!
            </span>
          </div>
          <div className="flex gap-1 md:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); if (item.id === "quiz") resetQuiz(); }}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-white shadow-md scale-105 bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                }`}
              >
                <span className="md:hidden">{item.emoji}</span>
                <span className="hidden md:inline">{item.emoji} {item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-20">

        {/* HOME SECTION */}
        {activeSection === "home" && (
          <div className="min-h-screen">
            <section className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto">
              <div className="mb-6 inline-block" style={{ animation: "bounceSlow 3s ease-in-out infinite" }}>
                <span className="text-8xl md:text-9xl">🍀</span>
              </div>
              <h1 className="font-pacifico text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Удача —<br />это ты!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Пройди наш опросник об удаче, узнай свой тип везения, прочитай вдохновляющие истории и получи советы по привлечению позитива в жизнь!
              </p>

              {/* Prize Banner */}
              <div
                className="relative mx-auto max-w-xl mb-10 rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => { setActiveSection("quiz"); resetQuiz(); }}
                style={{ animation: "prizePulse 2.5s ease-in-out infinite" }}
              >
                <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 p-[3px] rounded-3xl">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-[22px] px-6 py-5 flex items-center gap-4">
                    <div className="text-5xl flex-shrink-0" style={{ animation: "bounceSlow 2s ease-in-out infinite" }}>🎁</div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Гарантировано</span>
                        <span className="text-xs text-amber-600 font-semibold">каждому участнику</span>
                      </div>
                      <p className="font-bold text-gray-800 text-lg leading-snug">Пройди опрос и получи<br /><span className="text-orange-500">гарантированный приз!</span></p>
                    </div>
                    <div className="ml-auto flex-shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-md whitespace-nowrap">
                      Получить →
                    </div>
                  </div>
                </div>
                {/* Sparkles */}
                <span className="absolute top-1 right-8 text-xl" style={{ animation: "floatUp 2s ease-in-out infinite" }}>✨</span>
                <span className="absolute bottom-1 left-8 text-lg" style={{ animation: "floatUp 2.5s ease-in-out infinite", animationDelay: "0.5s" }}>⭐</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setActiveSection("quiz"); resetQuiz(); }}
                  className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                  🎲 Пройти опросник
                </button>
                <button
                  onClick={() => setActiveSection("stories")}
                  className="px-8 py-4 rounded-full font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
                >
                  📖 Читать истории
                </button>
              </div>
            </section>

            <section className="px-4 pb-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { emoji: "📖", title: "Реальные истории", desc: "Вдохновляющие случаи удачи от обычных людей со всей России", bg: "from-yellow-50 to-orange-50", border: "border-yellow-200", section: "stories" },
                  { emoji: "💡", title: "Советы экспертов", desc: "6 проверенных способов привлечь удачу в свою жизнь прямо сейчас", bg: "from-pink-50 to-purple-50", border: "border-pink-200", section: "tips" },
                  { emoji: "🎲", title: "Твой тип удачи", desc: "5 вопросов — и ты узнаешь, какой ты везунчик!", bg: "from-green-50 to-teal-50", border: "border-green-200", section: "quiz" },
                ].map((card) => (
                  <div
                    key={card.section}
                    className={`bg-gradient-to-br ${card.bg} rounded-3xl p-6 border-2 ${card.border} hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer`}
                    onClick={() => { setActiveSection(card.section); if (card.section === "quiz") resetQuiz(); }}
                  >
                    <div className="text-5xl mb-4">{card.emoji}</div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-4 pb-20 max-w-4xl mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="https://cdn.poehali.dev/projects/c90f9b06-2b32-4119-a1f5-ce5b886cb5bc/files/7f990bf4-8777-4862-a0f0-62bcac9624b7.jpg"
                  alt="Счастливые люди"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <p className="font-pacifico text-white text-2xl md:text-4xl text-center px-4 drop-shadow-lg">Удача любит тех, кто верит!</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* STORIES SECTION */}
        {activeSection === "stories" && (
          <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-6xl mb-4 block">📖</span>
              <h2 className="font-pacifico text-4xl md:text-5xl mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Истории удачи
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">Реальные случаи везения от людей со всей страны</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story, i) => (
                <div key={i} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className={`bg-gradient-to-r ${story.color} p-4 flex items-center gap-3`}>
                    <span className="text-4xl">{story.emoji}</span>
                    <div>
                      <div className="font-bold text-white text-lg">{story.name}</div>
                      <div className="text-white/80 text-sm">{story.city}</div>
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <p className="text-gray-700 leading-relaxed italic">"{story.text}"</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <img
                src="https://cdn.poehali.dev/projects/c90f9b06-2b32-4119-a1f5-ce5b886cb5bc/files/2ca8c4da-972d-4771-b497-1414ad9cc96e.jpg"
                alt="Символы удачи"
                className="w-full max-w-xl mx-auto rounded-3xl shadow-xl"
              />
            </div>
          </div>
        )}

        {/* TIPS SECTION */}
        {activeSection === "tips" && (
          <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-6xl mb-4 block">💡</span>
              <h2 className="font-pacifico text-4xl md:text-5xl mb-4 bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                Как привлечь удачу
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">6 работающих советов для притяжения позитива</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2"
                  style={{ borderColor: `hsl(${i * 50}, 70%, 75%)` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                    style={{ background: `hsl(${i * 50}, 80%, 95%)` }}
                  >
                    {tip.emoji}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-3">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-8 text-center text-white shadow-xl">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="font-pacifico text-2xl md:text-3xl mb-3">Готов проверить свою удачу?</h3>
              <p className="mb-6 text-white/90">Пройди наш опросник и узнай свой тип везения!</p>
              <button
                onClick={() => { setActiveSection("quiz"); resetQuiz(); }}
                className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                🎲 Пройти опросник
              </button>
            </div>
          </div>
        )}

        {/* QUIZ SECTION */}
        {activeSection === "quiz" && (
          <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
            {!showResult ? (
              <>
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">🎲</span>
                  <h2 className="font-pacifico text-3xl md:text-4xl mb-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                    Опросник удачи
                  </h2>
                  <p className="text-gray-500">Вопрос {currentQuestion + 1} из {questions.length}</p>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-yellow-100">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-6 text-center">
                    {questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(questions[currentQuestion].id, idx)}
                        className={`w-full text-left px-6 py-4 rounded-2xl font-medium text-gray-700 border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                          answers[questions[currentQuestion].id] === idx
                            ? "border-yellow-400 bg-yellow-50 text-yellow-800"
                            : "border-gray-100 bg-gray-50 hover:border-yellow-300 hover:bg-yellow-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        background: i < currentQuestion ? "#F59E0B" : i === currentQuestion ? "#FCD34D" : "#E5E7EB",
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center" style={{ animation: "fadeIn 0.5s ease-out" }}>
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="font-pacifico text-3xl md:text-4xl mb-6 text-gray-800">Твой результат</h2>
                <div className={`bg-gradient-to-br ${getResult().color} rounded-3xl p-8 text-white shadow-2xl mb-8`}>
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="font-pacifico text-2xl md:text-3xl mb-4">{getResult().title}</h3>
                  <p className="text-white/95 text-lg leading-relaxed">{getResult().desc}</p>
                </div>
                <div className="space-y-4">
                  <a
                    href="https://t.me/+JAvuU_3gtJ9mNTJi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 rounded-full text-white font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)", animation: "prizePulse 2s ease-in-out infinite" }}
                  >
                    🎁 Получи свой приз!
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-4 rounded-full font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
                  >
                    🔄 Пройти ещё раз
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="text-center py-8 text-gray-400 text-sm">
          <span>🍀 УдачаТест — притягивай позитив каждый день ✨</span>
        </footer>
      </div>
    </div>
  );
}