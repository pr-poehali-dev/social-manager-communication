import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthScreenProps {
  onAuth: (name: string) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (mode === "register") {
      if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
        setError("Заполните все поля");
        return;
      }
      if (password.length < 6) {
        setError("Пароль должен быть не менее 6 символов");
        return;
      }
      onAuth(name);
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Введите email и пароль");
        return;
      }
      onAuth("Алёна Звёздная");
    }
  };

  return (
    <div className="min-h-screen bg-mesh grain flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none animate-blob" />
      <div className="fixed bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none animate-blob" style={{ animationDelay: "3s" }} />

      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-white/10 mb-4 animate-float">
            <span className="text-3xl">🌊</span>
          </div>
          <h1 className="text-4xl font-black gradient-text font-handwrite tracking-wide">Волна</h1>
          <p className="text-sm text-muted-foreground mt-1">Твоё творческое пространство</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-6 border border-white/10 animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-secondary/50 mb-6">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "login" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              Войти
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "register" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              Регистрация
            </button>
          </div>

          <div className="space-y-3">
            {mode === "register" && (
              <>
                <div className="relative animate-fade-slide-up">
                  <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm transition-all"
                  />
                </div>
                <div className="relative animate-fade-slide-up" style={{ animationDelay: "0.05s" }}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <input
                    value={username}
                    onChange={e => setUsername(e.target.value.replace(/\s/g, ""))}
                    placeholder="username"
                    className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-sm transition-all"
                  />
                </div>
              </>
            )}

            <div className="relative animate-fade-slide-up" style={{ animationDelay: mode === "register" ? "0.1s" : "0s" }}>
              <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm transition-all"
              />
            </div>

            <div className="relative animate-fade-slide-up" style={{ animationDelay: mode === "register" ? "0.15s" : "0.05s" }}>
              <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Пароль"
                type={showPass ? "text" : "password"}
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm transition-all"
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-destructive mt-3 flex items-center gap-1.5 animate-fade-slide-up">
              <Icon name="AlertCircle" size={13} />
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity animate-pulse-neon"
          >
            {mode === "login" ? "Войти в Волну" : "Создать аккаунт"}
          </button>

          {mode === "login" && (
            <button className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              Забыли пароль?
            </button>
          )}
        </div>

        {/* Social auth */}
        <div className="mt-4 animate-fade-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">или войти через</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-all">
              <span>🌐</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-all">
              <span>✈️</span> Telegram
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 animate-fade-slide-up" style={{ animationDelay: "0.25s" }}>
          Продолжая, вы соглашаетесь с{" "}
          <button className="text-primary hover:underline">условиями использования</button>
        </p>
      </div>
    </div>
  );
}
