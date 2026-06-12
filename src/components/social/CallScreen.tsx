import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface CallScreenProps {
  type: "audio" | "video";
  chatName: string;
  chatAvatar: string;
  chatColor: string;
  onEnd: () => void;
}

export default function CallScreen({ type, chatName, chatAvatar, chatColor, onEnd }: CallScreenProps) {
  const [status, setStatus] = useState<"calling" | "connected">("calling");
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    const connectTimer = setTimeout(() => setStatus("connected"), 2000);
    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-mesh grain overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none animate-blob bg-primary/15" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none animate-blob bg-accent/10" style={{ animationDelay: "3s" }} />

      {/* Video bg (only for video call) */}
      {type === "video" && !cameraOff && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950 flex items-center justify-center">
          <div className="text-8xl opacity-20 animate-float">🎥</div>
        </div>
      )}

      {/* Top bar */}
      <div className="relative z-10 w-full flex items-center justify-between p-5 pt-10">
        <div className="glass rounded-xl px-3 py-1.5 border border-white/10 flex items-center gap-2">
          <Icon name={type === "video" ? "Video" : "Phone"} size={14} className="text-primary" />
          <span className="text-xs font-medium text-foreground">
            {type === "video" ? "Видеозвонок" : "Аудиозвонок"}
          </span>
        </div>
        {status === "connected" && (
          <div className="glass rounded-xl px-3 py-1.5 border border-green-500/30 bg-green-500/10">
            <span className="text-xs font-semibold text-green-400">{formatTime(seconds)}</span>
          </div>
        )}
      </div>

      {/* Center: Avatar + name */}
      <div className="relative z-10 flex flex-col items-center gap-4 animate-fade-slide-up">
        {/* Self video (video call only) */}
        {type === "video" && !cameraOff && (
          <div className="absolute -top-16 right-0 w-20 h-28 rounded-2xl glass border border-white/10 overflow-hidden flex items-center justify-center animate-scale-in shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-violet-900/60 to-pink-900/40 flex items-center justify-center">
              <span className="text-2xl">🤳</span>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-br ${chatColor} flex items-center justify-center text-3xl font-black text-white shadow-2xl`}
            style={{ boxShadow: status === "connected" ? "0 0 0 4px rgba(168,85,247,0.3), 0 0 40px rgba(168,85,247,0.2)" : undefined }}
          >
            {chatAvatar}
          </div>
          {status === "calling" && (
            <>
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
              <span className="absolute -inset-2 rounded-full animate-ping bg-primary/10" style={{ animationDelay: "0.3s" }} />
            </>
          )}
          {status === "connected" && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background" />
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black">{chatName}</h2>
          <p className={`text-sm mt-1 ${status === "calling" ? "text-muted-foreground animate-pulse" : "text-green-400"}`}>
            {status === "calling" ? "Вызов..." : "Соединено"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 w-full px-8 pb-14 animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
        {/* Secondary controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${muted ? "bg-destructive/20 border border-destructive/40 text-destructive" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name={muted ? "MicOff" : "Mic"} size={18} />
          </button>

          <button
            onClick={() => setSpeakerOff(!speakerOff)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${speakerOff ? "bg-destructive/20 border border-destructive/40 text-destructive" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name={speakerOff ? "VolumeX" : "Volume2"} size={18} />
          </button>

          {type === "video" && (
            <button
              onClick={() => setCameraOff(!cameraOff)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${cameraOff ? "bg-destructive/20 border border-destructive/40 text-destructive" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`}
            >
              <Icon name={cameraOff ? "VideoOff" : "Video"} size={18} />
            </button>
          )}

          {type === "video" && (
            <button className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
              <Icon name="FlipHorizontal2" size={18} />
            </button>
          )}
        </div>

        {/* End call */}
        <div className="flex justify-center">
          <button
            onClick={onEnd}
            className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-lg hover:bg-destructive/80 transition-all active:scale-95"
            style={{ boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
          >
            <Icon name="PhoneOff" size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
