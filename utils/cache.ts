const STORE = {};

// 60 secs * 60 minutes -> ms to s
const HOUR = 60 * 60 * 1000;

export function get<TData>(key: string): TData {
  const cached = STORE?.[key] ?? {};

  if (cached.expiry > Date.now()) {
    return cached.data;
  }

  return null;
}

export function set<TData>(key: string, value: TData): void {
  STORE[key] = {
    expiry: Date.now() + HOUR,
    data: value,
  };
}
