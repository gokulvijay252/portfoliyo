import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchFn();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Something went wrong';
          setState({ data: null, loading: false, error: message });
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [fetchFn]);

  return state;
}
