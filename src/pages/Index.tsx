import { useState, useEffect, useRef } from "react";

function useTickingCounter(start: number) {
  const [count, setCount] = useState(start);
  const ref = useRef(start);
  useEffect(() => {
    const tick = () => {
      const delay = 4000 + Math.random() * 8000;
      setTimeout(() => {
        ref.current += 1;
        setCount(ref.current);
        tick();
      }, delay);
    };
    tick();
  }, []);
  return count;
}

type Lang = "ru" | "kz" | "pl";

function useGeoLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("ru");
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data.country_code === "KZ") setLang("kz");
        else if (data.country_code === "PL") setLang("pl");
      })
      .catch(() => {});
  }, []);
  return [lang, setLang];
}

const content = {
  ru: {
    brand: "Удача это ты!",
    nav: ["Главная", "Истории", "Советы", "Опросник"],
    hero: {
      title: "Удача —\nэто ты!",
      subtitle: "Пройди наш опросник об удаче, узнай свой тип везения, прочитай вдохновляющие истории и получи советы по привлечению позитива в жизнь!",
      counterText: "уже проверили свою удачу",
      guaranteed: "Гарантировано",
      everyParticipant: "каждому участнику",
      prizeText: "Пройди опрос и получи",
      prizeHighlight: "гарантированный приз!",
      prizeBtn: "🎁 Получи свой приз!",
      quizBtn: "🎲 Пройти опросник",
      storiesBtn: "📖 Читать истории",
    },
    cards: [
      { emoji: "📖", title: "Реальные истории", desc: "Вдохновляющие случаи удачи от обычных людей со всей России" },
      { emoji: "💡", title: "Советы экспертов", desc: "6 проверенных способов привлечь удачу в свою жизнь прямо сейчас" },
      { emoji: "🎲", title: "Твой тип удачи", desc: "5 вопросов — и ты узнаешь, какой ты везунчик!" },
    ],
    imageCta: "Удача любит тех, кто верит!",
    stories: {
      title: "Истории удачи",
      subtitle: "Реальные случаи везения от людей со всей страны",
      items: [
        { name: "Марина К.", city: "Москва", emoji: "🍀", text: "Я всегда считала себя невезучей, пока не начала замечать маленькие удачи каждый день. Однажды я нашла 500 рублей в кармане куртки — как раз когда не хватало на кофе. С тех пор я верю: удача рядом, просто нужно смотреть!", color: "from-yellow-400 to-orange-400" },
        { name: "Дмитрий В.", city: "Санкт-Петербург", emoji: "⭐", text: "Опаздывал на важное собеседование, пробки были жуткие. Вдруг открылась полоса, и я приехал за 10 минут до начала. Получил работу мечты! До сих пор уверен — это была удача.", color: "from-pink-400 to-purple-400" },
        { name: "Анна Л.", city: "Казань", emoji: "🌈", text: "На конкурсе рисунков выбрала случайную тему из шляпы — «радуга». Нарисовала за ночь, думала, не успею. Заняла первое место! Теперь радуга — мой личный символ удачи.", color: "from-green-400 to-teal-400" },
        { name: "Сергей М.", city: "Екатеринбург", emoji: "🎰", text: "Купил лотерейный билет впервые в жизни, просто так, на кассе. Выиграл поездку в Турцию! Жена сначала не верила — пришлось показать билет три раза.", color: "from-blue-400 to-cyan-400" },
      ],
    },
    tips: {
      title: "Как привлечь удачу",
      subtitle: "6 работающих советов для притяжения позитива",
      items: [
        { emoji: "🌅", title: "Начинайте день с благодарности", text: "Каждое утро вспоминайте 3 вещи, за которые вы благодарны. Это настраивает ум на позитивные события и притягивает удачу." },
        { emoji: "🍀", title: "Носите талисман", text: "Выберите предмет, который будет вашим личным символом удачи. Это может быть украшение, камень или даже любимая ручка." },
        { emoji: "😊", title: "Улыбайтесь незнакомцам", text: "Удача любит открытых людей. Улыбка незнакомцу может стать началом важного знакомства или просто поднять настроение." },
        { emoji: "🎯", title: "Действуйте, не ждите", text: "Удача приходит к тем, кто двигается. Купите билет, отправьте резюме, познакомьтесь — каждое действие открывает новые двери." },
        { emoji: "🌟", title: "Верьте в себя", text: "Уверенность в собственных силах — лучший магнит для удачи. Когда вы верите, что справитесь, мир начинает помогать." },
        { emoji: "🔄", title: "Меняйте маршруты", text: "Ходите новыми дорогами, пробуйте новые блюда, читайте необычные книги. Новые пути открывают новые возможности." },
      ],
      ctaTitle: "Готов проверить свою удачу?",
      ctaDesc: "Пройди наш опросник и узнай свой тип везения!",
      ctaBtn: "🎲 Пройти опросник",
    },
    quiz: {
      title: "Опросник удачи",
      questionOf: (cur: number, total: number) => `Вопрос ${cur} из ${total}`,
      resultTitle: "Твой результат",
      counterText: (n: string) => `Вместе с тобой приз получили ${n} человек 🎁`,
      prizeBtn: "🎁 Получи свой приз!",
      retryBtn: "🔄 Пройти ещё раз",
      questions: [
        { id: 1, question: "Как часто вам везёт в повседневной жизни?", options: ["Почти каждый день! 🎉", "Иногда случается ✨", "Редко, но метко 🍀", "Жду своего часа ⏳"] },
        { id: 2, question: "Какой талисман удачи вам ближе всего?", options: ["Четырёхлистный клевер 🍀", "Подкова 🐴", "Монетка 🪙", "Звезда ⭐"] },
        { id: 3, question: "Что вы делаете, когда нужна удача?", options: ["Стучу по дереву 🌳", "Загадываю желание на звезду 🌠", "Полагаюсь на себя 💪", "Несу любимый талисман 🎁"] },
        { id: 4, question: "Где удача вас настигает чаще всего?", options: ["На работе / в учёбе 📚", "В личной жизни 💕", "В случайных встречах 🤝", "В финансах 💰"] },
        { id: 5, question: "Верите ли вы, что удачу можно притянуть?", options: ["Да, абсолютно! ✨", "Скорее да, чем нет 🌟", "Сомневаюсь 🤔", "Всё в руках человека 💡"] },
      ],
      results: [
        { range: [0, 6], title: "Скрытая звезда ⭐", desc: "Удача уже рядом с вами — вы просто пока её не замечаете! Начните вести дневник маленьких побед и увидите, как жизнь полна удачных моментов.", color: "from-yellow-400 via-orange-400 to-red-400" },
        { range: [7, 12], title: "Искатель удачи 🌈", desc: "Вы на правильном пути! Удача посещает вас регулярно, и вы умеете её ценить. Продолжайте двигаться вперёд с позитивом!", color: "from-green-400 via-teal-400 to-blue-400" },
        { range: [13, 20], title: "Баловень судьбы 🍀", desc: "Удача — ваша постоянная спутница! Вы излучаете позитивную энергию, притягиваете нужных людей и оказываетесь в нужном месте в нужное время.", color: "from-pink-400 via-purple-400 to-indigo-400" },
      ],
    },
    footer: "🍀 УдачаТест — притягивай позитив каждый день ✨",
  },
  kz: {
    brand: "Сәттілік — бұл сен!",
    nav: ["Басты бет", "Оқиғалар", "Кеңестер", "Тест"],
    hero: {
      title: "Сәттілік —\nбұл сен!",
      subtitle: "Сәттілік тестінен өт, өзіңнің бақыт түріңді біл, шабыттандыратын оқиғаларды оқы және өміріңе позитив тарту кеңестерін ал!",
      counterText: "адам сәттілігін тексерді",
      guaranteed: "Кепілдік берілген",
      everyParticipant: "әр қатысушыға",
      prizeText: "Сауалнамадан өт және",
      prizeHighlight: "кепілдікті сыйлық ал!",
      prizeBtn: "🎁 Сыйлығыңды ал!",
      quizBtn: "🎲 Тестті тапсыру",
      storiesBtn: "📖 Оқиғаларды оқу",
    },
    cards: [
      { emoji: "📖", title: "Нақты оқиғалар", desc: "Қарапайым адамдардың шабыттандыратын сәттілік жағдайлары" },
      { emoji: "💡", title: "Сарапшы кеңестері", desc: "Өміріңе сәттілікті тартудың 6 тексерілген жолы" },
      { emoji: "🎲", title: "Сенің сәттілік түрің", desc: "5 сұрақ — және қандай бақытты адам екеніңді білесің!" },
    ],
    imageCta: "Сәттілік сенетіндерді жақсы көреді!",
    stories: {
      title: "Сәттілік оқиғалары",
      subtitle: "Бүкіл елдегі адамдардың нақты бақыт жағдайлары",
      items: [
        { name: "Айгүл Б.", city: "Алматы", emoji: "🍀", text: "Мен өзімді бақытсыз деп санайтынмын, күнде кішкентай сәттіліктерді байқамайынша. Бір күні куртка қалтасынан 2000 теңге таптым — кофеге жетпей тұрғанда. Содан бері сенемін: сәттілік жанымда, тек қарау керек!", color: "from-yellow-400 to-orange-400" },
        { name: "Нұрлан Қ.", city: "Астана", emoji: "⭐", text: "Маңызды сұхбатқа кешігіп бара жаттым, кептеліс ұзақ еді. Кенет жол ашылды, мен басталуға 10 минут қалғанда жеттім. Арман жұмысқа тұрдым! Бұл сәттілік болғанына сенемін.", color: "from-pink-400 to-purple-400" },
        { name: "Дина Т.", city: "Шымкент", emoji: "🌈", text: "Сурет байқауында қалпақтан кездейсоқ тақырып алдым — «кемпірқосақ». Түні бойы салдым, үлгермеймін деп ойладым. Бірінші орын алдым! Енді кемпірқосақ — менің жеке сәттілік белгім.", color: "from-green-400 to-teal-400" },
        { name: "Серік М.", city: "Қарағанды", emoji: "🎰", text: "Өмірімде бірінші рет лотерея билеті сатып алдым, жай ғана кассада. Түркияға саяхат ұттым! Әйелім алдымен сенбеді — билетті үш рет көрсетуге тура келді.", color: "from-blue-400 to-cyan-400" },
      ],
    },
    tips: {
      title: "Сәттілікті қалай тарту керек",
      subtitle: "Позитивті тартудың 6 тиімді кеңесі",
      items: [
        { emoji: "🌅", title: "Күніңді алғыспен бастаңыз", text: "Әр таңда ризашылығыңды білдіретін 3 нәрсені есіңе түсір. Бұл ойды позитивке баптайды және сәттілікті тартады." },
        { emoji: "🍀", title: "Талисман тасыңыз", text: "Сенің жеке сәттілік белгің болатын нәрсені таңда. Бұл зергерлік бұйым, тас немесе тіпті сүйікті қалам болуы мүмкін." },
        { emoji: "😊", title: "Бейтаныстарға күліңіз", text: "Сәттілік ашық адамдарды жақсы көреді. Бейтанысқа күлімдеу маңызды танысудың басы немесе жай ғана көңіл-күйді көтеру болуы мүмкін." },
        { emoji: "🎯", title: "Күтпеңіз — әрекет жасаңыз", text: "Сәттілік жылжығандарға келеді. Билет сатып ал, түйіндемені жібер, танысып қал — әр әрекет жаңа есіктер ашады." },
        { emoji: "🌟", title: "Өзіңізге сеніңіз", text: "Өз күшіне деген сенімділік — сәттіліктің ең жақсы магниті. Сен сенсең, әлем көмектесе бастайды." },
        { emoji: "🔄", title: "Бағыттарыңызды өзгертіңіз", text: "Жаңа жолдармен жүріңіз, жаңа тамақтарды тастаңыз, әдеттен тыс кітаптарды оқыңыз. Жаңа жолдар жаңа мүмкіндіктер ашады." },
      ],
      ctaTitle: "Сәттіліктерін тексеруге дайынсың ба?",
      ctaDesc: "Тестті тапсыр және сенің бақыт түріңді біл!",
      ctaBtn: "🎲 Тестті тапсыру",
    },
    quiz: {
      title: "Сәттілік тесті",
      questionOf: (cur: number, total: number) => `${cur} сұрақ / ${total}`,
      resultTitle: "Сенің нәтижең",
      counterText: (n: string) => `Сенімен бірге ${n} адам сыйлық алды 🎁`,
      prizeBtn: "🎁 Сыйлығыңды ал!",
      retryBtn: "🔄 Қайта тапсыру",
      questions: [
        { id: 1, question: "Күнделікті өмірде сізге қаншалықты жиі сәт жүреді?", options: ["Күн сайын дерлік! 🎉", "Кейде болады ✨", "Сирек, бірақ дәл 🍀", "Сәтімді күтемін ⏳"] },
        { id: 2, question: "Қандай сәттілік талисманы сізге жақынырақ?", options: ["Төрт жапырақты жоңышқа 🍀", "Тағаны 🐴", "Монета 🪙", "Жұлдыз ⭐"] },
        { id: 3, question: "Сәттілік қажет болғанда не жасайсыз?", options: ["Ағашқа тоқылдатам 🌳", "Жұлдызға тілек тілеймін 🌠", "Өзіме сүйенемін 💪", "Сүйікті талисманымды аламын 🎁"] },
        { id: 4, question: "Сізге сәттілік қай жерде жиі кездеседі?", options: ["Жұмыста / оқуда 📚", "Жеке өмірде 💕", "Кездейсоқ кездесулерде 🤝", "Қаржыда 💰"] },
        { id: 5, question: "Сәттілікті тартуға болады деп сенесіз бе?", options: ["Иә, толығымен! ✨", "Иәге жақынырақ 🌟", "Күмәнданамын 🤔", "Бәрі адамның қолында 💡"] },
      ],
      results: [
        { range: [0, 6], title: "Жасырын жұлдыз ⭐", desc: "Сәттілік сіздің жаныңызда — тек байқамай жүрсіз! Кішкентай жеңістер күнделігін жаза бастаңыз, өмір сәтті сәттерге толы екенін көресіз.", color: "from-yellow-400 via-orange-400 to-red-400" },
        { range: [7, 12], title: "Сәттілік іздеуші 🌈", desc: "Сіз дұрыс жолдасыз! Сәттілік сізді үнемі кездестіреді, оны бағалай білесіз. Позитивпен алға жүруді жалғастырыңыз!", color: "from-green-400 via-teal-400 to-blue-400" },
        { range: [13, 20], title: "Тағдыр сүйіктісі 🍀", desc: "Сәттілік — сіздің тұрақты серіктесіңіз! Сіз позитив энергия шашырататасыз, керек адамдарды тартасыз және дұрыс уақытта дұрыс жерде боласыз.", color: "from-pink-400 via-purple-400 to-indigo-400" },
      ],
    },
    footer: "🍀 СәттілікТест — күн сайын позитив тарт ✨",
  },
  pl: {
    brand: "Szczęście to Ty!",
    nav: ["Główna", "Historie", "Porady", "Quiz"],
    hero: {
      title: "Szczęście —\nto Ty!",
      subtitle: "Weź udział w naszym quizie o szczęściu, poznaj swój typ fortuny, przeczytaj inspirujące historie i uzyskaj porady, jak przyciągnąć pozytyw do życia!",
      counterText: "osób już sprawdziło swoje szczęście",
      guaranteed: "Gwarantowane",
      everyParticipant: "dla każdego uczestnika",
      prizeText: "Weź udział w ankiecie i zdobądź",
      prizeHighlight: "gwarantowaną nagrodę!",
      prizeBtn: "🎁 Odbierz swoją nagrodę!",
      quizBtn: "🎲 Przejdź quiz",
      storiesBtn: "📖 Czytaj historie",
    },
    cards: [
      { emoji: "📖", title: "Prawdziwe historie", desc: "Inspirujące przypadki szczęścia od zwykłych ludzi z całego kraju" },
      { emoji: "💡", title: "Porady ekspertów", desc: "6 sprawdzonych sposobów na przyciągnięcie szczęścia do swojego życia" },
      { emoji: "🎲", title: "Twój typ szczęścia", desc: "5 pytań — i dowiesz się, jakim szczęściarzem jesteś!" },
    ],
    imageCta: "Szczęście kocha tych, którzy wierzą!",
    stories: {
      title: "Historie szczęścia",
      subtitle: "Prawdziwe przypadki fortuny od ludzi z całego kraju",
      items: [
        { name: "Marta K.", city: "Warszawa", emoji: "🍀", text: "Zawsze uważałam się za pechowca, dopóki nie zaczęłam dostrzegać małych szczęść każdego dnia. Pewnego razu znalazłam 50 zł w kieszeni kurtki — akurat kiedy brakowało mi na kawę. Od tamtej pory wierzę: szczęście jest blisko, trzeba tylko patrzeć!", color: "from-yellow-400 to-orange-400" },
        { name: "Tomasz W.", city: "Kraków", emoji: "⭐", text: "Spóźniałem się na ważną rozmowę kwalifikacyjną, korki były straszne. Nagle otworzyła się ścieżka i dotarłem 10 minut przed rozpoczęciem. Dostałem wymarzoną pracę! Do dziś jestem przekonany — to było szczęście.", color: "from-pink-400 to-purple-400" },
        { name: "Anna L.", city: "Wrocław", emoji: "🌈", text: "Na konkursie plastycznym wylosowałam z kapelusza przypadkowy temat — «tęcza». Malowałam całą noc, myślałam że nie zdążę. Zajęłam pierwsze miejsce! Teraz tęcza to mój osobisty symbol szczęścia.", color: "from-green-400 to-teal-400" },
        { name: "Marek S.", city: "Poznań", emoji: "🎰", text: "Kupiłem los na loterię po raz pierwszy w życiu, tak po prostu, przy kasie. Wygrałem wycieczkę do Włoch! Żona z początku nie wierzyła — musiałem pokazać los trzy razy.", color: "from-blue-400 to-cyan-400" },
      ],
    },
    tips: {
      title: "Jak przyciągnąć szczęście",
      subtitle: "6 działających porad na przyciągnięcie pozytywu",
      items: [
        { emoji: "🌅", title: "Zacznij dzień od wdzięczności", text: "Każdego ranka przypomnij sobie 3 rzeczy, za które jesteś wdzięczny. To nastraja umysł na pozytywne zdarzenia i przyciąga szczęście." },
        { emoji: "🍀", title: "Noś talizman", text: "Wybierz przedmiot, który będzie Twoim osobistym symbolem szczęścia. Może to być biżuteria, kamień, a nawet ulubiony długopis." },
        { emoji: "😊", title: "Uśmiechaj się do nieznajomych", text: "Szczęście kocha otwartych ludzi. Uśmiech do nieznajomego może stać się początkiem ważnej znajomości lub po prostu poprawić humor." },
        { emoji: "🎯", title: "Działaj, nie czekaj", text: "Szczęście przychodzi do tych, którzy się poruszają. Kup bilet, wyślij CV, poznaj kogoś — każde działanie otwiera nowe drzwi." },
        { emoji: "🌟", title: "Wierz w siebie", text: "Pewność siebie to najlepszy magnes na szczęście. Kiedy wierzysz, że dasz radę, świat zaczyna pomagać." },
        { emoji: "🔄", title: "Zmieniaj trasy", text: "Chodź nowymi drogami, próbuj nowych potraw, czytaj niezwykłe książki. Nowe ścieżki otwierają nowe możliwości." },
      ],
      ctaTitle: "Gotowy sprawdzić swoje szczęście?",
      ctaDesc: "Przejdź nasz quiz i poznaj swój typ fortuny!",
      ctaBtn: "🎲 Przejdź quiz",
    },
    quiz: {
      title: "Quiz szczęścia",
      questionOf: (cur: number, total: number) => `Pytanie ${cur} z ${total}`,
      resultTitle: "Twój wynik",
      counterText: (n: string) => `Razem z Tobą nagrodę otrzymało ${n} osób 🎁`,
      prizeBtn: "🎁 Odbierz swoją nagrodę!",
      retryBtn: "🔄 Spróbuj jeszcze raz",
      questions: [
        { id: 1, question: "Jak często masz szczęście w codziennym życiu?", options: ["Prawie każdego dnia! 🎉", "Czasem się zdarza ✨", "Rzadko, ale celnie 🍀", "Czekam na swoją kolej ⏳"] },
        { id: 2, question: "Który talizman szczęścia jest Ci najbliższy?", options: ["Czterolistna koniczyna 🍀", "Podkowa 🐴", "Moneta 🪙", "Gwiazda ⭐"] },
        { id: 3, question: "Co robisz, gdy potrzebujesz szczęścia?", options: ["Pukam w drewno 🌳", "Życzę sobie przy gwieździe 🌠", "Polegam na sobie 💪", "Noszę ulubiony talizman 🎁"] },
        { id: 4, question: "Gdzie szczęście najczęściej Cię dotyczy?", options: ["W pracy / nauce 📚", "W życiu osobistym 💕", "W przypadkowych spotkaniach 🤝", "W finansach 💰"] },
        { id: 5, question: "Czy wierzysz, że można przyciągnąć szczęście?", options: ["Tak, absolutnie! ✨", "Raczej tak 🌟", "Wątpię 🤔", "Wszystko w rękach człowieka 💡"] },
      ],
      results: [
        { range: [0, 6], title: "Ukryta gwiazda ⭐", desc: "Szczęście jest już blisko Ciebie — po prostu jeszcze go nie zauważasz! Zacznij prowadzić dziennik małych zwycięstw i zobaczysz, jak życie jest pełne szczęśliwych chwil.", color: "from-yellow-400 via-orange-400 to-red-400" },
        { range: [7, 12], title: "Poszukiwacz szczęścia 🌈", desc: "Jesteś na właściwej drodze! Szczęście odwiedza Cię regularnie i potrafisz je docenić. Kontynuuj marsz naprzód z pozytywem!", color: "from-green-400 via-teal-400 to-blue-400" },
        { range: [13, 20], title: "Ulubieniec losu 🍀", desc: "Szczęście to Twój stały towarzysz! Promieniujesz pozytywną energią, przyciągasz właściwych ludzi i jesteś we właściwym miejscu o właściwym czasie.", color: "from-pink-400 via-purple-400 to-indigo-400" },
      ],
    },
    footer: "🍀 SzczęścieTест — przyciągaj pozytyw każdego dnia ✨",
  },
};

export default function Index() {
  const [lang, setLang] = useGeoLang();
  const t = content[lang as keyof typeof content];

  const [activeSection, setActiveSection] = useState("home");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const counter = useTickingCounter(1247 + Math.floor(Math.random() * 30));

  const navSections = ["home", "stories", "tips", "quiz"];

  const handleAnswer = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    if (currentQuestion < t.quiz.questions.length - 1) {
      setTimeout(() => setCurrentQuestion((q) => q + 1), 400);
    } else {
      setTimeout(() => setShowResult(true), 400);
    }
  };

  const getResult = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    return t.quiz.results.find((r) => total >= r.range[0] && total <= r.range[1]) || t.quiz.results[1];
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestion(0);
  };

  const progress = (currentQuestion / t.quiz.questions.length) * 100;

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
              {t.brand}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {(["ru", "kz", "pl"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-full text-xs font-bold border-2 transition-all duration-200 ${
                  lang === l
                    ? "border-yellow-400 bg-yellow-400 text-white"
                    : "border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                }`}
              >
                {l === "ru" ? "🇷🇺" : l === "kz" ? "🇰🇿" : "🇵🇱"}
              </button>
            ))}
            {navSections.map((id, idx) => (
              <button
                key={id}
                onClick={() => { setActiveSection(id); if (id === "quiz") resetQuiz(); }}
                className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === id
                    ? "text-white shadow-md scale-105 bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                }`}
              >
                <span className="md:hidden">{"🏠📖💡🎲".split("")[idx * 2]}{"🏠📖💡🎲".split("")[idx * 2 + 1]}</span>
                <span className="hidden md:inline">
                  {["🏠", "📖", "💡", "🎲"][idx]} {t.nav[idx]}
                </span>
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
              <h1 className="font-pacifico text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent whitespace-pre-line">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Social proof counter */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {["🧑", "👩", "👨", "🧕", "👦"].map((em, i) => (
                    <span key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 border-2 border-white flex items-center justify-center text-sm shadow">{em}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-orange-500">{counter.toLocaleString("ru-RU")}</span> {t.hero.counterText}
                </p>
              </div>

              {/* Prize banner */}
              <div className="relative mb-8 max-w-md mx-auto">
                <div
                  className="rounded-3xl p-5 shadow-2xl border-2 border-orange-200"
                  style={{ background: "linear-gradient(135deg, #fff7ed, #fef3c7, #fce7f3)", animation: "prizePulse 2.5s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl flex-shrink-0" style={{ animation: "bounceSlow 2s ease-in-out infinite" }}>🎁</div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{t.hero.guaranteed}</span>
                        <span className="text-xs text-amber-600 font-semibold">{t.hero.everyParticipant}</span>
                      </div>
                      <p className="font-bold text-gray-800 text-lg leading-snug">{t.hero.prizeText}<br /><span className="text-orange-500">{t.hero.prizeHighlight}</span></p>
                    </div>
                  </div>
                  <a
                    href="https://t.me/+JAvuU_3gtJ9mNTJi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl text-white font-bold text-base text-center hover:scale-105 transition-all duration-300 shadow-lg block"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)" }}
                  >
                    {t.hero.prizeBtn}
                  </a>
                </div>
                <span className="absolute top-1 right-8 text-xl" style={{ animation: "floatUp 2s ease-in-out infinite" }}>✨</span>
                <span className="absolute bottom-1 left-8 text-lg" style={{ animation: "floatUp 2.5s ease-in-out infinite", animationDelay: "0.5s" }}>⭐</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setActiveSection("quiz"); resetQuiz(); }}
                  className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                  {t.hero.quizBtn}
                </button>
                <button
                  onClick={() => setActiveSection("stories")}
                  className="px-8 py-4 rounded-full font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
                >
                  {t.hero.storiesBtn}
                </button>
              </div>
            </section>

            <section className="px-4 pb-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.cards.map((card, idx) => {
                  const sections = ["stories", "tips", "quiz"];
                  const bgs = ["from-yellow-50 to-orange-50", "from-pink-50 to-purple-50", "from-green-50 to-teal-50"];
                  const borders = ["border-yellow-200", "border-pink-200", "border-green-200"];
                  return (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br ${bgs[idx]} rounded-3xl p-6 border-2 ${borders[idx]} hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      onClick={() => { setActiveSection(sections[idx]); if (sections[idx] === "quiz") resetQuiz(); }}
                    >
                      <div className="text-5xl mb-4">{card.emoji}</div>
                      <h3 className="font-bold text-xl text-gray-800 mb-2">{card.title}</h3>
                      <p className="text-gray-600">{card.desc}</p>
                    </div>
                  );
                })}
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
                  <p className="font-pacifico text-white text-2xl md:text-4xl text-center px-4 drop-shadow-lg">{t.imageCta}</p>
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
                {t.stories.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">{t.stories.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.stories.items.map((story, i) => (
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
                {t.tips.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">{t.tips.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.tips.items.map((tip, i) => (
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
              <h3 className="font-pacifico text-2xl md:text-3xl mb-3">{t.tips.ctaTitle}</h3>
              <p className="mb-6 text-white/90">{t.tips.ctaDesc}</p>
              <button
                onClick={() => { setActiveSection("quiz"); resetQuiz(); }}
                className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t.tips.ctaBtn}
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
                    {t.quiz.title}
                  </h2>
                  <p className="text-gray-500">{t.quiz.questionOf(currentQuestion + 1, t.quiz.questions.length)}</p>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-yellow-100">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-6 text-center">
                    {t.quiz.questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {t.quiz.questions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(t.quiz.questions[currentQuestion].id, idx)}
                        className={`w-full text-left px-6 py-4 rounded-2xl font-medium text-gray-700 border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                          answers[t.quiz.questions[currentQuestion].id] === idx
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
                  {t.quiz.questions.map((_, i) => (
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
                <h2 className="font-pacifico text-3xl md:text-4xl mb-4 text-gray-800">{t.quiz.resultTitle}</h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex -space-x-2">
                    {["🧑", "👩", "👨", "🧕", "👦"].map((em, i) => (
                      <span key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 border-2 border-white flex items-center justify-center text-xs shadow">{em}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {t.quiz.counterText(counter.toLocaleString("ru-RU"))}
                  </p>
                </div>
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
                    {t.quiz.prizeBtn}
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-4 rounded-full font-bold text-lg border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
                  >
                    {t.quiz.retryBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="text-center py-8 text-gray-400 text-sm">
          <span>{t.footer}</span>
        </footer>
      </div>
    </div>
  );
}