export const validSteps = [
  {
    id: "welcome",
    messages: [
      'Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат',
    ],
    buttons: [
      {
        text: "Начать разговор",
        nextStepId: "start",
        type: "button",
      },
      {
        text: "Открыть Чат",
      },
    ],
  },
  {
    id: "start",
    messages: [
      "Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.",
    ],
    buttons: [
      {
        text: "Сменить профессию или трудоустроиться",
        nextStepId: "switch",
        type: "button",
      },
      {
        text: "Попробовать себя в IT",
        nextStepId: "try",
        type: "button",
      },
      {
        text: "Я разработчик, хочу углубить свои знания",
        nextStepId: "advanced",
        type: "button",
      },
    ],
  },
  {
    id: "switch",
    messages: [
      "У нас есть программы обучения новой профессии. Мы постоянно мониторим, какие компетенции востребованы на рынке, а учебные программы строим в соответствии ними. Учиться можно онлайн в удобном темпе без дедлайнов. К концу обучения у вас будет портфолио на GitHub. А к трудоустройству поможет подготовиться Карьерный трек",
    ],
    buttons: [
      {
        text: "Расскажи подробнее",
        nextStepId: "details",
        type: "button",
      },
      {
        text: "А есть что-нибудь попроще",
        nextStepId: "try",
        type: "button",
      },
      {
        text: "Вернуться в начало",
        nextStepId: "start",
        type: "button",
      },
    ],
  },
  {
    id: "try",
    messages: [
      "У нас есть подготовительные курсы, которые длятся всего 2 недели.За это время вы знакомитесь с основами программирвоания, пробуете его на практике и плавной подойдете к старту обучения в основной программе. Все это под руководством опытного программиста. Он поможет, если будут сложности. Курс стоит всего 990 рублей",
    ],
    buttons: [
      {
        text: "Интересно",
        nextStepId: "details",
        type: "button",
      },
      {
        text: "А что по поводу смены профессии?",
        nextStepId: "switch",
        type: "button",
      },
      {
        text: "Вернуться назад",
        nextStepId: "start",
        type: "button",
      },
    ],
  },

  {
    id: "details",
    messages: [
      "В Хекслете можно освоить JavaScript, Python, PHP, верстку, Java, DevOps и Ruby on Rails. Также есть программы обучения по тестированию веб-приложений и аналитике данных. https://ru.hexlet.io/courses#preparatory",
      "Только не тратьте много времени на выбор языка 😊  Вы встретитесь с одними и теми же понятиями: Литералы, Операции, Типы данных... Главное не синтаксис, а суть, которая позволяет комбинировать конструкции и получать результат.",
    ],
    buttons: [
      {
        text: "Останусь здесь, запишусь на курс",
        nextStepId: "subscribe",
        type: "button",
      },
      {
        text: "Вернуться в начало",
        nextStepId: "start",
        type: "button",
      },
    ],
  },
  {
    id: "advanced",
    messages: [
      "Отлично! Есть несколько вариантов обучения для тех, кто хочет углубить знания. Во-первых, курсы повышения квалификации. Часто их оплачивает работодатель. Если вам кажется, что такой вариант возможен, поделитесь с ним этой ссылкой: https://b2b.hexlet.io/.",
      "Во-вторых, возможно индивидуальное обучение. Вы с наставником-разработчиком составляете план и углубляетесь в темы, которые хотите изучить подробнее.",
    ],
    buttons: [
      {
        text: "Расскажи подробнее",
        nextStepId: "welcome",
        type: "button",
      },
      {
        text: "Верни меня в начало",
        nextStepId: "start",
        type: "button",
      },
    ],
  },
  {
    id: "subscribe",
    messages: [
      "Ага, дублирую ссылку https://ru.hexlet.io/courses#preparatory",
      "Был рад знакомству! Увидимся ✋",
    ],
    buttons: [
      {
        text: "Останусь здесь, запишусь на курс",
        nextStepId: "details",
        type: "button",
      },
      {
        text: "Верни меня в начало",
        nextStepId: "start",
        type: "button",
      },
    ],
  },
];
