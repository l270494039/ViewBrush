function formatStartedAt(startedAt: string) {
  const date = new Date(startedAt);

  if (Number.isNaN(date.getTime())) {
    return startedAt;
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function DevServerBadge() {
  if (!import.meta.env.DEV || import.meta.env.VITE_SHOW_DEV_BADGE !== 'true') {
    return null;
  }

  const meta = window.__PIKTURA_DEV_SERVER__;

  if (!meta) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-3 z-[120] rounded-[10px] border border-[#d7c8b3] bg-white/90 px-3 py-2 text-[11px] leading-4 text-[#4b3e31] shadow-[0_10px_24px_rgba(43,31,21,0.12)] backdrop-blur">
      <div className="font-semibold text-[#241c16]">{meta.workspaceName}</div>
      <div>
        {meta.host}:{meta.port} · pid {meta.pid}
      </div>
      <div>started {formatStartedAt(meta.startedAt)}</div>
    </div>
  );
}
