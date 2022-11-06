const STORE = {};

// 60 secs * 60 minutes -> ms to s
const HOUR = 60 * 60 * 1000;

export function get(key) {
  const cached = STORE?.[key] ?? {};

  if (cached.expiry > Date.now()) {
    return cached.data;
  }

  return null;
}

export function set(key, value) {
  STORE[key] = {
    expiry: Date.now() + HOUR,
    data: value,
  };
}
