import { useState } from "react";
import Icon from "@/components/ui/icon";
import AuthScreen from "@/components/social/AuthScreen";
import CallScreen from "@/components/social/CallScreen";

type Tab = "feed" | "search" | "chats" | "groups" | "notifications" | "profile";

const mockUser = {
  name: "Алёна Звёздная",
  username: "@alena_star",
  avatar: "АЗ",
  bio: "Художник · Мечтатель · Создаю красоту из хаоса ✨",
  followers: 2847,
  following: 312,
  posts: 94,
};

const mockPostsInit = [
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

const mockChats = [
  { id: 1, name: "Макс Орбита", avatar: "МО", color: "from-purple-500 to-cyan-400", last: "Отлично! Встречаемся завтра?", time: "сейчас", unread: 3, online: true },
  { id: 2, name: "Вера Cosmos", avatar: "ВК", color: "from-pink-500 to-orange-400", last: "Слушай, это просто шедевр 🔥", time: "5 мин", unread: 0, online: true },
  { id: 3, name: "Арт-студия «Волна»", avatar: "АС", color: "from-yellow-400 to-orange-500", last: "Новый конкурс в пятницу!", time: "30 мин", unread: 12, online: false, isGroup: true },
  { id: 4, name: "Лена Звезда", avatar: "ЛЗ", color: "from-green-400 to-teal-500", last: "Смотри какую я нашла картину!", time: "2 ч", unread: 0, online: false },
  { id: 5, name: "Креаторы 2024", avatar: "К2", color: "from-blue-400 to-purple-500", last: "Кто идёт на фест?", time: "вчера", unread: 7, online: false, isGroup: true },
];

const mockGroupsInit = [
  { id: 1, name: "Арт-студия «Волна»", members: 1240, avatar: "🎨", desc: "Место для художников и мечтателей", joined: true },
  { id: 2, name: "Музыканты города", members: 3812, avatar: "🎵", desc: "Живая музыка, коллабы, концерты", joined: true },
  { id: 3, name: "Фото & Жизнь", members: 8930, avatar: "📸", desc: "Делись красотой каждого момента", joined: false },
  { id: 4, name: "Цифровое Искусство", members: 5540, avatar: "💻", desc: "NFT, AI-арт и новые медиа", joined: false },
  { id: 5, name: "Танцевальный Loft", members: 2100, avatar: "💃", desc: "Хореография и уличные батлы", joined: true },
];

const mockNotifsInit = [
  { id: 1, type: "like", user: "Макс Орбита", avatar: "МО", color: "from-purple-500 to-cyan-400", text: "оценил вашу фотографию", time: "2 мин", read: false },
  { id: 2, type: "comment", user: "Вера Cosmos", avatar: "ВК", color: "from-pink-500 to-orange-400", text: "прокомментировал: «Невероятно красиво!»", time: "10 мин", read: false },
  { id: 3, type: "follow", user: "Дима Нейронет", avatar: "ДН", color: "from-green-400 to-cyan-500", text: "подписался на вас", time: "1 ч", read: false },
  { id: 4, type: "mention", user: "Лена Звезда", avatar: "ЛЗ", color: "from-yellow-400 to-orange-500", text: "упомянул вас в публикации", time: "3 ч", read: true },
  { id: 5, type: "group", user: "Арт-студия «Волна»", avatar: "АС", color: "from-blue-400 to-purple-500", text: "новое событие: Выставка работ", time: "вчера", read: true },
];

const mockSearchResults = [
  { id: 1, name: "Артём Pixel", username: "@artem_px", avatar: "АП", color: "from-blue-500 to-purple-400", followers: 12300 },
  { id: 2, name: "Соня Waves", username: "@sonya_w", avatar: "СВ", color: "from-pink-400 to-red-400", followers: 4500 },
  { id: 3, name: "Игорь Контент", username: "@igor_k", avatar: "ИК", color: "from-green-400 to-emerald-500", followers: 8900 },
];

const mockMessages = [
  { id: 1, text: "Привет! Видел твою последнюю работу — невероятно!", out: false, time: "14:22" },
  { id: 2, text: "Спасибо! Работал над ней целую неделю 😅", out: true, time: "14:23" },
  { id: 3, text: "Слушай, давай коллаборируем? У меня есть крутая идея для проекта", out: false, time: "14:25" },
  { id: 4, text: "Отлично! Встречаемся завтра?", out: false, time: "14:26" },
  { id: 5, text: "Да, давай! В 15:00 в арт-кафе?", out: true, time: "14:28" },
];

const storyAvatars = ["МО", "ВК", "ДН", "ЛЗ", "АП"];
const storyColors = [
  "from-purple-500 to-cyan-400",
  "from-pink-500 to-orange-400",
  "from-green-400 to-cyan-500",
  "from-yellow-400 to-orange-500",
  "from-blue-400 to-purple-500",
];
const postEmojis = ["🌌", "🎨", "📸", "🎵", "🌿", "✨"];
const postGridColors = [
  "from-purple-800/50 to-cyan-800/30",
  "from-pink-800/50 to-orange-800/30",
  "from-green-800/50 to-teal-800/30",
  "from-blue-800/50 to-purple-800/30",
  "from-yellow-800/50 to-red-800/30",
  "from-indigo-800/50 to-pink-800/30",
];

function notifIcon(type: string) {
  if (type === "like") return "❤️";
  if (type === "comment") return "💬";
  if (type === "follow") return "👤";
  if (type === "mention") return "📣";
  return "👥";
}

export default function Index() {
  // Auth
  const [authed, setAuthed] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(mockUser.name);

  // Call
  const [activeCall, setActiveCall] = useState<{ type: "audio" | "video"; chatId: number } | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [posts, setPosts] = useState(mockPostsInit);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState(mockGroupsInit);
  const [notifications, setNotifications] = useState(mockNotifsInit);
  const [modModal, setModModal] = useState<{ postId: number } | null>(null);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadChats = mockChats.reduce((a, c) => a + c.unread, 0);

  const handleAuth = (name: string) => {
    setCurrentUserName(name);
    setAuthed(true);
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const toggleSave = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  const handleRemovePost = () => {
    if (modModal) {
      setPosts(posts.filter(p => p.id !== modModal.postId));
      setModModal(null);
    }
  };

  const handleNewPost = () => {
    if (!newPostText.trim()) return;
    setPosts([{
      id: Date.now(),
      user: { name: currentUserName, username: mockUser.username, avatar: currentUserName.slice(0, 2).toUpperCase(), color: "from-violet-500 to-pink-400" },
      time: "только что",
      text: newPostText,
      image: false,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      tag: "Пост",
    }, ...posts]);
    setNewPostText("");
    setShowNewPost(false);
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    setGroups([{ id: Date.now(), name: groupName, members: 1, avatar: "🌟", desc: "Новая группа", joined: true }, ...groups]);
    setGroupName("");
    setShowCreateGroup(false);
  };

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "feed", icon: "Home", label: "Главная" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "chats", icon: "MessageCircle", label: "Чаты", badge: unreadChats },
    { id: "groups", icon: "Users", label: "Группы" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: unreadNotifs },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!authed) return <AuthScreen onAuth={handleAuth} />;

  // ── Active call overlay ────────────────────────────────────────────────────
  if (activeCall) {
    const chat = mockChats.find(c => c.id === activeCall.chatId)!;
    return (
      <CallScreen
        type={activeCall.type}
        chatName={chat.name}
        chatAvatar={chat.avatar}
        chatColor={chat.color}
        onEnd={() => setActiveCall(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-mesh grain flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 glass border-r border-white/5 p-4 gap-1.5">
        <div className="mb-6 px-2">
          <h1 className="text-2xl font-black gradient-text font-handwrite tracking-wide">Волна</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Твоё творческое пространство</p>
        </div>

        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setActiveChat(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative animate-fade-slide-up
              ${activeTab === item.id ? "nav-active text-white" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <Icon name={item.icon} size={18} />
            <span className="font-medium text-sm">{item.label}</span>
            {item.badge ? (
              <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {item.badge > 9 ? "9+" : item.badge}
              </span>
            ) : null}
          </button>
        ))}

        <div className="mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl glass border border-white/5">
            <div className="avatar-ring w-8 h-8 shrink-0">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center text-xs font-bold text-white">
                {currentUserName.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{currentUserName}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.username}</p>
            </div>
            <button
              onClick={() => setAuthed(false)}
              className="ml-auto text-muted-foreground hover:text-destructive transition-colors shrink-0"
              title="Выйти"
            >
              <Icon name="LogOut" size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen pb-20 md:pb-0 overflow-y-auto">

        {/* === FEED === */}
        {activeTab === "feed" && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6 animate-fade-slide-up">
              <h2 className="text-xl font-black gradient-text">Лента</h2>
              <button
                onClick={() => setShowNewPost(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Icon name="Plus" size={16} />
                Создать
              </button>
            </div>

            {/* Stories */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 animate-fade-slide-up" style={{ animationDelay: "0.05s" }}>
              {storyAvatars.map((av, i) => (
                <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
                  <div className="story-ring w-14 h-14">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${storyColors[i]} flex items-center justify-center text-sm font-bold text-white border-2 border-background group-hover:scale-105 transition-transform`}>
                      {av}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">История</span>
                </div>
              ))}
            </div>

            {/* Posts */}
            {posts.map((post, i) => (
              <div
                key={post.id}
                className="glass rounded-2xl p-4 mb-4 card-hover border border-white/5 animate-fade-slide-up"
                style={{ animationDelay: `${(i + 2) * 0.07}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar-ring w-10 h-10 shrink-0">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${post.user.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {post.user.avatar}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{post.user.name}</p>
                      <p className="text-xs text-muted-foreground">{post.user.username} · {post.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">{post.tag}</span>
                    <button
                      onClick={() => setModModal({ postId: post.id })}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-destructive/10"
                      title="Пожаловаться / модерация"
                    >
                      <Icon name="Flag" size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-3">{post.text}</p>

                {post.image && (
                  <div className="relative rounded-xl h-48 mb-3 bg-gradient-to-br from-purple-900/40 via-cyan-900/20 to-pink-900/30 border border-white/5 flex items-center justify-center overflow-hidden">
                    <div className="animate-blob w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full absolute" />
                    <span className="text-5xl relative z-10">🌌</span>
                  </div>
                )}

                <div className="flex items-center gap-1 pt-2 border-t border-white/5">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-200 ${post.liked ? "text-pink-400 bg-pink-500/10" : "text-muted-foreground hover:text-pink-400 hover:bg-pink-500/10"}`}
                  >
                    <Icon name="Heart" size={15} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                    <Icon name="MessageCircle" size={15} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-muted-foreground hover:text-green-400 hover:bg-green-500/10 transition-all">
                    <Icon name="Share2" size={15} />
                  </button>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all ${post.saved ? "text-yellow-400 bg-yellow-500/10" : "text-muted-foreground hover:text-yellow-400 hover:bg-yellow-500/10"}`}
                  >
                    <Icon name="Bookmark" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* === SEARCH === */}
        {activeTab === "search" && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <h2 className="text-xl font-black gradient-text mb-6 animate-fade-slide-up">Поиск</h2>
            <div className="relative mb-6 animate-fade-slide-up" style={{ animationDelay: "0.05s" }}>
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Найти людей, группы, контент..."
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm transition-all"
              />
            </div>

            {!searchQuery && (
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider px-1">Рекомендации</p>
            )}

            <div className="space-y-3">
              {mockSearchResults
                .filter(u => !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((user, i) => (
                  <div
                    key={user.id}
                    className="glass rounded-2xl p-4 flex items-center justify-between card-hover border border-white/5 animate-fade-slide-up"
                    style={{ animationDelay: `${(i + 1) * 0.07}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar-ring w-12 h-12">
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-sm font-bold text-white`}>
                          {user.avatar}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.username} · {user.followers.toLocaleString()} подписчиков</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">
                      + Добавить
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* === CHATS LIST === */}
        {activeTab === "chats" && !activeChat && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <h2 className="text-xl font-black gradient-text mb-6 animate-fade-slide-up">Чаты</h2>
            <div className="space-y-2">
              {mockChats.map((chat, i) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className="w-full glass rounded-2xl p-4 flex items-center gap-3 card-hover border border-white/5 text-left animate-fade-slide-up transition-all"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="relative shrink-0">
                    <div className="avatar-ring w-12 h-12">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-sm font-bold text-white`}>
                        {chat.avatar}
                      </div>
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm flex items-center gap-1">
                        {chat.name}
                        {chat.isGroup && <Icon name="Users" size={12} className="text-muted-foreground" />}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.last}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="shrink-0 min-w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold px-1">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === ACTIVE CHAT === */}
        {activeTab === "chats" && activeChat && (() => {
          const chat = mockChats.find(c => c.id === activeChat)!;
          return (
            <div className="flex flex-col h-screen max-w-xl mx-auto">
              <div className="flex items-center gap-3 p-4 glass border-b border-white/5 animate-fade-slide-up shrink-0">
                <button onClick={() => setActiveChat(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <div className="avatar-ring w-9 h-9">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {chat.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{chat.name}</p>
                  <p className={`text-xs ${chat.online ? "text-green-400" : "text-muted-foreground"}`}>
                    {chat.online ? "онлайн" : "был(а) недавно"}
                  </p>
                </div>
                {/* Call buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveCall({ type: "audio", chatId: chat.id })}
                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    title="Аудиозвонок"
                  >
                    <Icon name="Phone" size={16} />
                  </button>
                  <button
                    onClick={() => setActiveCall({ type: "video", chatId: chat.id })}
                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    title="Видеозвонок"
                  >
                    <Icon name="Video" size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockMessages.map((msg, i) => (
                  <div key={msg.id} className="flex" style={{ justifyContent: msg.out ? "flex-end" : "flex-start" }}>
                    <div
                      className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm animate-fade-slide-up ${msg.out ? "bubble-out rounded-br-sm" : "bubble-in rounded-bl-sm"}`}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 glass border-t border-white/5 shrink-0">
                <div className="flex gap-2">
                  <input
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className="flex-1 bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm transition-all"
                    onKeyDown={e => { if (e.key === "Enter") setMessageText(""); }}
                  />
                  <button
                    onClick={() => setMessageText("")}
                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
                  >
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* === GROUPS === */}
        {activeTab === "groups" && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6 animate-fade-slide-up">
              <h2 className="text-xl font-black gradient-text">Группы</h2>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Icon name="Plus" size={16} />
                Создать
              </button>
            </div>
            <div className="space-y-3">
              {groups.map((group, i) => (
                <div
                  key={group.id}
                  className="glass rounded-2xl p-4 flex items-center justify-between card-hover border border-white/5 animate-fade-slide-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-2xl border border-white/10 shrink-0">
                      {group.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} участников</p>
                      <p className="text-xs text-muted-foreground">{group.desc}</p>
                    </div>
                  </div>
                  <button
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors shrink-0 ml-2 ${
                      group.joined
                        ? "bg-secondary text-muted-foreground hover:bg-destructive/20 hover:text-destructive border border-white/5"
                        : "bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30"
                    }`}
                    onClick={() => setGroups(groups.map(g => g.id === group.id ? { ...g, joined: !g.joined } : g))}
                  >
                    {group.joined ? "Выйти" : "Вступить"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === NOTIFICATIONS === */}
        {activeTab === "notifications" && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6 animate-fade-slide-up">
              <h2 className="text-xl font-black gradient-text">Уведомления</h2>
              {unreadNotifs > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                  Прочитать все
                </button>
              )}
            </div>
            <div className="space-y-2">
              {notifications.map((notif, i) => (
                <div
                  key={notif.id}
                  className={`glass rounded-2xl p-4 flex items-center gap-3 border card-hover animate-fade-slide-up transition-all ${notif.read ? "border-white/5 opacity-70" : "border-primary/20 bg-primary/5"}`}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="relative shrink-0">
                    <div className="avatar-ring w-10 h-10">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${notif.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {notif.avatar}
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-sm">{notifIcon(notif.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{notif.user}</span>
                      {" "}<span className="text-muted-foreground">{notif.text}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.time}</p>
                  </div>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === PROFILE === */}
        {activeTab === "profile" && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <h2 className="text-xl font-black gradient-text mb-6 animate-fade-slide-up">Профиль</h2>

            <div className="glass rounded-3xl p-6 mb-4 border border-white/5 animate-fade-slide-up" style={{ animationDelay: "0.05s" }}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="avatar-ring w-20 h-20">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center text-xl font-black text-white animate-float">
                      {currentUserName.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-background hover:scale-110 transition-transform">
                    <Icon name="Camera" size={12} className="text-primary-foreground" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black">{currentUserName}</h3>
                  <p className="text-sm text-muted-foreground">{mockUser.username}</p>
                  <p className="text-sm mt-2 text-foreground/80 leading-relaxed">{mockUser.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
                {[
                  { label: "Публикаций", value: mockUser.posts },
                  { label: "Подписчиков", value: mockUser.followers.toLocaleString() },
                  { label: "Подписок", value: mockUser.following },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xl font-black gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                  Редактировать
                </button>
                <button
                  onClick={() => setAuthed(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                >
                  <Icon name="LogOut" size={15} />
                  Выйти
                </button>
              </div>
            </div>

            <div className="glass rounded-3xl p-4 border border-white/5 animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider px-1">Мои публикации</p>
              <div className="grid grid-cols-3 gap-2">
                {postEmojis.map((emoji, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${postGridColors[i]} border border-white/5 flex items-center justify-center text-2xl cursor-pointer hover:scale-95 transition-transform`}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 flex z-50">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setActiveChat(null); }}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 relative transition-colors ${activeTab === item.id ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-[9px] font-medium">{item.label}</span>
            {item.badge ? (
              <span className="absolute top-1.5 right-1/4 text-[9px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {item.badge > 9 ? "9+" : item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      {/* Modal: New Post */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg gradient-text">Новая публикация</h3>
              <button onClick={() => setShowNewPost(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <textarea
              value={newPostText}
              onChange={e => setNewPostText(e.target.value)}
              placeholder="Поделитесь чем-то особенным..."
              rows={4}
              className="w-full bg-secondary/50 border border-white/10 rounded-xl p-3 text-sm resize-none transition-all"
            />
            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Image" size={16} />
                Фото
              </button>
              <button
                onClick={handleNewPost}
                className="ml-auto px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Group */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg gradient-text">Создать группу</h3>
              <button onClick={() => setShowCreateGroup(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            <input
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Название группы..."
              className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 transition-all"
            />
            <textarea
              placeholder="Описание группы..."
              rows={2}
              className="w-full bg-secondary/50 border border-white/10 rounded-xl p-3 text-sm resize-none mb-3 transition-all"
            />
            <button
              onClick={handleCreateGroup}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Создать группу
            </button>
          </div>
        </div>
      )}

      {/* Modal: Moderation */}
      {modModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass rounded-3xl p-6 w-full max-w-sm border border-destructive/20 animate-scale-in">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center shrink-0">
                <Icon name="AlertTriangle" size={18} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-black text-base">Модерация контента</h3>
                <p className="text-xs text-muted-foreground">Что вы хотите сделать с публикацией?</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <button
                onClick={handleRemovePost}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm hover:bg-destructive/20 transition-colors"
              >
                <Icon name="Trash2" size={16} />
                Удалить публикацию
              </button>
              <button
                onClick={() => setModModal(null)}
                className="w-full flex items-center gap-3 p-3 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="Flag" size={16} />
                Только пожаловаться
              </button>
            </div>
            <button onClick={() => setModModal(null)} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
