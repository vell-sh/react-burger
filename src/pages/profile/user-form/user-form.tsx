import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { UPDATE_USER } from '../../../services/reducers/user';

export const UserForm = () => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [editingFields, setEditingFields] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const onIconClick = (field: 'name' | 'email' | 'password') => {
    const isEdit = editingFields[field];
    setEditingFields({ ...editingFields, [field]: !isEdit });
  };

  const onSubmit = (e: React.KeyboardEvent, field: 'name' | 'email' | 'password') => {
    if (e.key !== 'Enter') {
      return;
    }
    if (user) {
      const value = form[field];
      dispatch(UPDATE_USER({ ...user, [field]: value }));
    }
  };

  return (
    <form>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        onKeyDown={e => onSubmit(e, 'name')}
        onIconClick={() => onIconClick('name')}
        disabled={!editingFields.name}
        error={false}
        size="default"
        extraClass="mb-6"
      />
      <Input
        type="email"
        name="email"
        placeholder="Логин"
        icon="EditIcon"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        onKeyDown={e => onSubmit(e, 'email')}
        onIconClick={() => onIconClick('email')}
        disabled={!editingFields.email}
        error={false}
        size="default"
        extraClass="mb-6"
      />
      <Input
        type="password"
        name="password"
        value={form.password}
        icon="EditIcon"
        placeholder="Введите новый пароль"
        onChange={e => setForm({ ...form, password: e.target.value })}
        onKeyDown={e => onSubmit(e, 'password')}
        onIconClick={() => onIconClick('password')}
        disabled={!editingFields.password}
        error={false}
        size="default"
        extraClass="mb-6"
      />
    </form>
  );
};
