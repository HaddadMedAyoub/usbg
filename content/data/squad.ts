export type Player = {
  number: number | null;
  name: string;
  nameAr: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  age: number | null;
  goals: number;
  assists: number;
  apps: number;
  minutes: number;
  yellowCards: number;
  redCards: number;
  nationality: string;
  photo?: string;
  slug: string;
  photos?: string[];
  bio?: string;
};

export const coach = {
  name: "Khiari Nidhal",
  nameAr: "كريم دلهوم",
  nationality: "🇹🇳",
};

export const squad: Player[] = [
  // ══ حراس المرمى ══
  {
    number: 31, name: "Hammami Lassad", nameAr: "لسعد الهمامي", position: "GK", age: 34,
    apps: 11, minutes: 990, goals: 0, assists: 0, yellowCards: 5, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/hammami-lassad.jpg", slug: "hammami-lassad",
    photos: [
      "/images/players/hammemi/1.jpg",
      "/images/players/hammemi/2.jpg",
      "/images/players/hammemi/3.jpg",
    ],
  },
  {
    number: 16, name: "Gazzeh Raed", nameAr: "رائد القزاح", position: "GK", age: 22,
    apps: 6, minutes: 540, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/gazzeh-raed.jpg", slug: "gazzeh-raed",
  },
  {
    number: 16, name: "Karkouba Mohamed", nameAr: "محمد كركوبة", position: "GK", age: 22,
    apps: 4, minutes: 360, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/karkouba-mohamed.jpg", slug: "karkouba-mohamed",
  },
  {
    number: 1, name: "Zemzem Bacem", nameAr: "باسم زمزم", position: "GK", age: 24,
    apps: 1, minutes: 90, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/bacem.jpg", slug: "zemzem-bacem",
  },

  // ══ المدافعون ══
  {
    number: 33, name: "Abderrazzak Ghazi", nameAr: "غازي عبدالرزاق", position: "DEF", age: 39,
    apps: 19, minutes: 1638, goals: 0, assists: 0, yellowCards: 3, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/abderrazag.jpg", slug: "abderrazzak-ghazi",
  },
  {
    number: 14, name: "Yeken Mohamed Habib", nameAr: "محمد الحبيب يكن", position: "DEF", age: 31,
    apps: 16, minutes: 1336, goals: 0, assists: 0, yellowCards: 2, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/yeken-mohamed-habib.jpg", slug: "yeken-mohamed-habib",
  },
  {
    number: 26, name: "Touis Iyed", nameAr: "إياد التويس", position: "DEF", age: 20,
    apps: 16, minutes: 1082, goals: 0, assists: 0, yellowCards: 4, redCards: 1,
    nationality: "🇹🇳", photo: "/images/players/touis/1.jpeg", slug: "touis-iyed",
    photos: [
      "/images/players/touis/1.jpeg",
      "/images/players/touis/2.jpeg",
      "/images/players/touis/3.jpeg",
    ],
    bio: "حارس مرمى تجمع فيه الخبرة والثبات، ركيزة أساسية في المنظومة الدفاعية للفريق.",
  },
  {
    number: 25, name: "Harrabi Salah", nameAr: "صالح الحرابي", position: "DEF", age: 27,
    apps: 15, minutes: 1073, goals: 0, assists: 0, yellowCards: 2, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/harrabi-salah.jpg", slug: "harrabi-salah",
  },
  {
    number: 28, name: "Chaibi Rayane", nameAr: "ريان الشايبي", position: "DEF", age: 21,
    apps: 8, minutes: 209, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/chaibi-rayane.jpg", slug: "chaibi-rayane",
  },
  {
    number: 33, name: "Amri Oussema", nameAr: "أسامة العمري", position: "DEF", age: 20,
    apps: 5, minutes: 334, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/amri-oussema.jpg", slug: "amri-oussema",
  },
  {
    number: 21, name: "Akrout Mohamed Ataa", nameAr: "محمد عطاء العكروت", position: "DEF", age: 20,
    apps: 1, minutes: 1, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/ataaakrout.jpeg", slug: "ataa-akrout",
  },
  {
    number: 23, name: "Idris Al-Muhairssi", nameAr: "إدريس المحيرصي", position: "DEF", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/idris-muhairssi.jpg", slug: "idris-muhairssi",
  },
  {
    number: null, name: "Fadi Al-Falehi", nameAr: "فادي الفالحي", position: "DEF", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/fadi-falehi.jpg", slug: "fadi-falehi",
  },

  // ══ الوسط ══
  {
    number: 6, name: "Bida Junior", nameAr: "جونيور بيدا", position: "MID", age: 22,
    apps: 20, minutes: 1797, goals: 0, assists: 0, yellowCards: 2, redCards: 0,
    nationality: "🇸🇳", photo: "/images/players/bida-junior.jpg", slug: "bida-junior",
  },
  {
    number: 20, name: "Abcha Jassem", nameAr: "جاسم عبشة", position: "MID", age: 24,
    apps: 6, minutes: 496, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/jassemabcha.jpeg", slug: "abcha-jassem",
  },
  {
    number: 17, name: "Abdi Wael", nameAr: "وائل العبدي", position: "MID", age: 22,
    apps: 5, minutes: 266, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/abdi-wael.jpg", slug: "abdi-wael",
  },
  {
    number: 5, name: "Maaouani Khemais", nameAr: "خميس المعواني", position: "MID", age: 31,
    apps: 16, minutes: 1379, goals: 0, assists: 0, yellowCards: 4, redCards: 1,
    nationality: "🇹🇳", photo: "/images/players/maaouani-khemais.jpg", slug: "maaouani-khemais",
  },
  {
    number: 10, name: "Ben Mcharek Ayoub", nameAr: "أيوب بن مشارك", position: "MID", age: 28,
    apps: 13, minutes: 937, goals: 1, assists: 0, yellowCards: 2, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/ben-mcharek-ayoub.jpg", slug: "ben-mcharek-ayoub",
  },
  {
    number: null, name: "Amri Abdallah", nameAr: "عبدالله العمري", position: "MID", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/amri-abdallah.jpg", slug: "amri-abdallah",
  },
  {
    number: 27, name: "Wael Al-Salehi", nameAr: "وائل الصالحي", position: "MID", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/wael-salehi.jpg", slug: "wael-salehi",
  },
  {
    number: null, name: "Qais Fadil", nameAr: "قيس فضيل", position: "MID", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/qais-fadil.jpg", slug: "qais-fadil",
  },
  {
    number: null, name: "Mustapha", nameAr: "مصطفى ", position: "MID", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇸🇳", photo: "/images/players/mustapha-samp.jpg", slug: "mustapha-samp",
  },  {
    number: 11, name: "lamine", nameAr: "لامين", position: "FWD", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "NG", photo: "/images/players/lamine.jpg", slug: "lamine-touray",
  },

  // ══ المهاجمون ══
  {
    number: 11, name: "Hakimi Borhane", nameAr: "برهان الحكيمي", position: "FWD", age: 31,
    apps: 11, minutes: 398, goals: 2, assists: 0, yellowCards: 2, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/hakimi-borhane.jpg", slug: "hakimi-borhane",
  },
  {
    number: 9, name: "Chachia Nassim", nameAr: "نسيم شاشية", position: "FWD", age: 29,
    apps: 3, minutes: 241, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/chachia-nassim.jpg", slug: "chachia-nassim",
  },
  {
    number: 11, name: "Kada Zinedine", nameAr: "زين الدين قادة", position: "FWD", age: 20,
    apps: 3, minutes: 121, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/kada-zinedine.jpg", slug: "kada-zinedine",
  },
  {
    number: 8, name: "Mimouni Farouk", nameAr: "فاروق الميموني", position: "FWD", age: 24,
    apps: 11, minutes: 334, goals: 0, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/mimouni-farouk.jpg", slug: "mimouni-farouk",
  },
  {
    number: 7, name: "M'Ghezzi Bakhouche Abdelouahab", nameAr: "عبد الوهاب مغزي بخوش", position: "FWD", age: 21,
    apps: 9, minutes: 388, goals: 1, assists: 0, yellowCards: 1, redCards: 0,
    nationality: "🇩🇿", photo: "/images/players/mghezzi-bakhouche-abdelouahab.jpg", slug: "mghezzi-bakhouche-abdelouahab",
  },
  {
    number: 18, name: "Souii Ahmed", nameAr: "أحمد الصويعي", position: "FWD", age: null,
    apps: 1, minutes: 12, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/souii-ahmed.jpg", slug: "souii-ahmed",
  },
  {
    number: null, name: "Bouhti Anas", nameAr: "انس بوعطي", position: "FWD", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/bouhti-anas.jpg", slug: "bouhti-anas",
  },
  {
    number: null, name: "Aboubacar Sidiki Leno", nameAr: "أبوبكر سيديكي لينو", position: "FWD", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇬🇳", photo: "/images/players/aboubacar-sidiki-leno.jpg", slug: "aboubacar-sidiki-leno",
  },
  {
    number: null, name: "Iskandar Abu Aisha", nameAr: "إسكندر أبو عائشة", position: "FWD", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/iskandar-abu-aisha.jpg", slug: "iskandar-abu-aisha",
  },  {
    number: 12, name: "daniel Oboh", nameAr: "دانييل أوبوه", position: "FWD", age: null,
    apps: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0,
    nationality: "🇹🇳", photo: "/images/players/daniel-oboh.jpg", slug: "daniel-oboh",
  },
];
