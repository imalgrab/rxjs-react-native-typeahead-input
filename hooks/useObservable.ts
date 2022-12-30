import { useState } from 'react';
import { Observable } from 'rxjs';
import { useSubscription } from './useSubscription';

export function useObservable<T>(source$: Observable<T>, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useSubscription(source$, (val) => setValue(val));

  return value;
}
