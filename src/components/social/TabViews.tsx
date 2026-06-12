import Icon from "@/components/ui/icon";
import {
  Tab,
  mockUser,
  mockChats,
  mockSearchResults,
  mockMessages,
  storyAvatars,
  storyColors,
  postEmojis,
  postGridColors,
  notifIcon,
} from "./mockData";

type Post = {
  id: number;
  user: { name: string; username: string; avatar: string; color: string };
  time: string;
  text: string;
  image: boolean;
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  tag: string;
};

type Group = {
  id: number;
  name: string;
  members: number;
  avatar: string;
  desc: string;
  joined: boolean;
};

type Notif = {
  id: number;
  type: string;
  user: string;
  avatar: string;
  color: string;
  text: string;
  time: string;
  read: boolean;
};

interface TabViewsProps {
  activeTab: Tab;
  currentUserName: string;
  // feed
  posts: Post[];
  onShowNewPost: () => void;
  onToggleLike: (id: number) => void;
  onToggleSave: (id: number) => void;
  onOpenModModal: (postId: number) => void;
  // search
  searchQuery: string;
  onSearchChange: (v: string) => void;
  // chats
  activeChat: number | null;
  onOpenChat: (id: number) => void;
  onCloseChat: () => void;
  messageText: string;
  onMessageChange: (v: string) => void;
  onSendMessage: () => void;
  onStartCall: (type: "audio" | "video", chatId: number) => void;
  // groups
  groups: Group[];
  onToggleGroup: (id: number) => void;
  onShowCreateGroup: () => void;
  // notifications
  notifications: Notif[];
  unreadNotifs: number;
  onMarkAllRead: () => void;
  // profile
  onLogout: () => void;
}

export default function TabViews({
  activeTab,
  currentUserName,
  posts,
  onShowNewPost,
  onToggleLike,
  onToggleSave,
  onOpenModModal,
  searchQuery,
  onSearchChange,
  activeChat,
  onOpenChat,
  onCloseChat,
  messageText,
  onMessageChange,
  onSendMessage,
  onStartCall,
  groups,
  onToggleGroup,
  onShowCreateGroup,
  notifications,
  unreadNotifs,
  onMarkAllRead,
  onLogout,
}: TabViewsProps) {
  return (
    <>
      {/* === FEED === */}
      {activeTab === "feed" && (
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 animate-fade-slide-up">
            <h2 className="text-xl font-black gradient-text">Лента</h2>
            <button
              onClick={onShowNewPost}
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
                    onClick={() => onOpenModModal(post.id)}
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
                  onClick={() => onToggleLike(post.id)}
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
                  onClick={() => onToggleSave(post.id)}
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
              onChange={e => onSearchChange(e.target.value)}
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
                onClick={() => onOpenChat(chat.id)}
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
              <button onClick={onCloseChat} className="text-muted-foreground hover:text-foreground transition-colors">
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
                  onClick={() => onStartCall("audio", chat.id)}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  title="Аудиозвонок"
                >
                  <Icon name="Phone" size={16} />
                </button>
                <button
                  onClick={() => onStartCall("video", chat.id)}
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
                  onChange={e => onMessageChange(e.target.value)}
                  placeholder="Напишите сообщение..."
                  className="flex-1 bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm transition-all"
                  onKeyDown={e => { if (e.key === "Enter") onSendMessage(); }}
                />
                <button
                  onClick={onSendMessage}
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
              onClick={onShowCreateGroup}
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
                  onClick={() => onToggleGroup(group.id)}
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
              <button onClick={onMarkAllRead} className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
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
                onClick={onLogout}
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
    </>
  );
}
