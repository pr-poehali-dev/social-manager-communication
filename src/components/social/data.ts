export type Tab = "feed" | "search" | "chats" | "groups" | "notifications" | "profile";

export const mockUser = {
  name: "Алёна Звёздная",
  username: "@alena_star",
  avatar: "АЗ",
  bio: "Художник · Мечтатель · Создаю красоту из хаоса ✨",
  followers: 2847,
  following: 312,
  posts: 94,
};

export const mockPostsInit = [
  {
    id: 1,
    user: { name: "Макс Орбита", username: "@max_orbit", avatar: "МО", color: "from-purple-500 to-cyan-400" },
    time: "2 мин назад",
    text: "Закат над городом — каждый раз как первый раз 🌆 Мы живём в самом красивом мире, просто забываем это замечать.",
    image: true,
    likes: 234,
    comments: 18,
    liked: false,
    saved: false,
    tag: "Фото",
  },
  {
    id: 2,
    user: { name: "Вера Cosmos", username: "@vera_cosmos", avatar: "ВК", color: "from-pink-500 to-orange-400" },
    time: "15 мин назад",
    text: "Только что закончила новый трек 🎵 Три месяца работы — и вот он готов. Нажимаете на ▶️ и улетаете в другое измерение.",
    image: false,
    likes: 891,
    comments: 67,
    liked: true,
    saved: true,
    tag: "Музыка",
  },
  {
    id: 3,
    user: { name: "Дима Нейронет", username: "@dima_net", avatar: "ДН", color: "from-green-400 to-cyan-500" },
    time: "1 час назад",
    text: "Ребята из нашей группы собрались вчера на коллаборацию. Снимали, рисовали, смеялись до слёз. Это и есть настоящее творчество 💚",
    image: true,
    likes: 445,
    comments: 32,
    liked: false,
    saved: false,
    tag: "Арт",
  },
];

export const mockChats = [
  { id: 1, name: "Макс Орбита", avatar: "МО", color: "from-purple-500 to-cyan-400", last: "Отлично! Встречаемся завтра?", time: "сейчас", unread: 3, online: true },
  { id: 2, name: "Вера Cosmos", avatar: "ВК", color: "from-pink-500 to-orange-400", last: "Слушай, это просто шедевр 🔥", time: "5 мин", unread: 0, online: true },
  { id: 3, name: "Арт-студия «Волна»", avatar: "АС", color: "from-yellow-400 to-orange-500", last: "Новый конкурс в пятницу!", time: "30 мин", unread: 12, online: false, isGroup: true },
  { id: 4, name: "Лена Звезда", avatar: "ЛЗ", color: "from-green-400 to-teal-500", last: "Смотри какую я нашла картину!", time: "2 ч", unread: 0, online: false },
  { id: 5, name: "Креаторы 2024", avatar: "К2", color: "from-blue-400 to-purple-500", last: "Кто идёт на фест?", time: "вчера", unread: 7, online: false, isGroup: true },
];

export const mockGroupsInit = [
  { id: 1, name: "Арт-студия «Волна»", members: 1240, avatar: "🎨", desc: "Место для художников и мечтателей", joined: true },
  { id: 2, name: "Музыканты города", members: 3812, avatar: "🎵", desc: "Живая музыка, коллабы, концерты", joined: true },
  { id: 3, name: "Фото & Жизнь", members: 8930, avatar: "📸", desc: "Делись красотой каждого момента", joined: false },
  { id: 4, name: "Цифровое Искусство", members: 5540, avatar: "💻", desc: "NFT, AI-арт и новые медиа", joined: false },
  { id: 5, name: "Танцевальный Loft", members: 2100, avatar: "💃", desc: "Хореография и уличные батлы", joined: true },
];

export const mockNotifsInit = [
  { id: 1, type: "like", user: "Макс Орбита", avatar: "МО", color: "from-purple-500 to-cyan-400", text: "оценил вашу фотографию", time: "2 мин", read: false },
  { id: 2, type: "comment", user: "Вера Cosmos", avatar: "ВК", color: "from-pink-500 to-orange-400", text: "прокомментировал: «Невероятно красиво!»", time: "10 мин", read: false },
  { id: 3, type: "follow", user: "Дима Нейронет", avatar: "ДН", color: "from-green-400 to-cyan-500", text: "подписался на вас", time: "1 ч", read: false },
  { id: 4, type: "mention", user: "Лена Звезда", avatar: "ЛЗ", color: "from-yellow-400 to-orange-500", text: "упомянул вас в публикации", time: "3 ч", read: true },
  { id: 5, type: "group", user: "Арт-студия «Волна»", avatar: "АС", color: "from-blue-400 to-purple-500", text: "новое событие: Выставка работ", time: "вчера", read: true },
];

export const mockSearchResults = [
  { id: 1, name: "Артём Pixel", username: "@artem_px", avatar: "АП", color: "from-blue-500 to-purple-400", followers: 12300 },
  { id: 2, name: "Соня Waves", username: "@sonya_w", avatar: "СВ", color: "from-pink-400 to-red-400", followers: 4500 },
  { id: 3, name: "Игорь Контент", username: "@igor_k", avatar: "ИК", color: "from-green-400 to-emerald-500", followers: 8900 },
];

export const mockMessages = [
  { id: 1, text: "Привет! Видел твою последнюю работу — невероятно!", out: false, time: "14:22" },
  { id: 2, text: "Спасибо! Работал над ней целую неделю 😅", out: true, time: "14:23" },
  { id: 3, text: "Слушай, давай коллаборируем? У меня есть крутая идея для проекта", out: false, time: "14:25" },
  { id: 4, text: "Отлично! Встречаемся завтра?", out: false, time: "14:26" },
  { id: 5, text: "Да, давай! В 15:00 в арт-кафе?", out: true, time: "14:28" },
];

export const storyAvatars = ["МО", "ВК", "ДН", "ЛЗ", "АП"];
export const storyColors = [
  "from-purple-500 to-cyan-400",
  "from-pink-500 to-orange-400",
  "from-green-400 to-cyan-500",
  "from-yellow-400 to-orange-500",
  "from-blue-400 to-purple-500",
];
export const postEmojis = ["🌌", "🎨", "📸", "🎵", "🌿", "✨"];
export const postGridColors = [
  "from-purple-800/50 to-cyan-800/30",
  "from-pink-800/50 to-orange-800/30",
  "from-green-800/50 to-teal-800/30",
  "from-blue-800/50 to-purple-800/30",
  "from-yellow-800/50 to-red-800/30",
  "from-indigo-800/50 to-pink-800/30",
];

export function notifIcon(type: string) {
  if (type === "like") return "❤️";
  if (type === "comment") return "💬";
  if (type === "follow") return "👤";
  if (type === "mention") return "📣";
  return "👥";
}
