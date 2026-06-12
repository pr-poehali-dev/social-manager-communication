import Icon from "@/components/ui/icon";
import { Tab, mockUser } from "./mockData";

interface NavItem {
  id: Tab;
  icon: string;
  label: string;
  badge?: number;
}

interface AppSidebarProps {
  activeTab: Tab;
  navItems: NavItem[];
  currentUserName: string;
  onTabChange: (tab: Tab) => void;
  onLogout: () => void;
}

export default function AppSidebar({ activeTab, navItems, currentUserName, onTabChange, onLogout }: AppSidebarProps) {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 glass border-r border-white/5 p-4 gap-1.5">
        <div className="mb-6 px-2">
          <h1 className="text-2xl font-black gradient-text font-handwrite tracking-wide">Волна</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Твоё творческое пространство</p>
        </div>

        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
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
              onClick={onLogout}
              className="ml-auto text-muted-foreground hover:text-destructive transition-colors shrink-0"
              title="Выйти"
            >
              <Icon name="LogOut" size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 flex z-50">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
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
    </>
  );
}
