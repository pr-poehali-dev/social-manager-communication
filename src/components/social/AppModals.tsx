import Icon from "@/components/ui/icon";

interface NewPostModalProps {
  newPostText: string;
  onTextChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function NewPostModal({ newPostText, onTextChange, onSubmit, onClose }: NewPostModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-lg gradient-text">Новая публикация</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <textarea
          value={newPostText}
          onChange={e => onTextChange(e.target.value)}
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
            onClick={onSubmit}
            className="ml-auto px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
}

interface CreateGroupModalProps {
  groupName: string;
  onNameChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function CreateGroupModal({ groupName, onNameChange, onSubmit, onClose }: CreateGroupModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-lg gradient-text">Создать группу</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <input
          value={groupName}
          onChange={e => onNameChange(e.target.value)}
          placeholder="Название группы..."
          className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 transition-all"
        />
        <textarea
          placeholder="Описание группы..."
          rows={2}
          className="w-full bg-secondary/50 border border-white/10 rounded-xl p-3 text-sm resize-none mb-3 transition-all"
        />
        <button
          onClick={onSubmit}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Создать группу
        </button>
      </div>
    </div>
  );
}

interface ModerationModalProps {
  onRemove: () => void;
  onReport: () => void;
  onClose: () => void;
}

export function ModerationModal({ onRemove, onReport, onClose }: ModerationModalProps) {
  return (
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
            onClick={onRemove}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm hover:bg-destructive/20 transition-colors"
          >
            <Icon name="Trash2" size={16} />
            Удалить публикацию
          </button>
          <button
            onClick={onReport}
            className="w-full flex items-center gap-3 p-3 rounded-xl glass border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="Flag" size={16} />
            Только пожаловаться
          </button>
        </div>
        <button onClick={onClose} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Отмена
        </button>
      </div>
    </div>
  );
}
