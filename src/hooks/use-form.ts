import { ChangeEvent, useState } from 'react';

export function useForm<T = {}>(initValues: T) {
  const [values, setValues] = useState<T>(initValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
