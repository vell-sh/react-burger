import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { updateUser } from '../../../services/actions/user';

interface IForm {
  name: string;
  email: string;
  password: string;
}
export const UserForm = () => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const initialForm: IForm = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  };

  const [editingFields, setEditingFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [form, setForm] = useState(initialForm);

  const onIconClick = (field: 'name' | 'email' | 'password') => {
    const isEdit = editingFields[field];
    isEdit
      ? setForm({ ...form, [field]: '' })
      : setEditingFields({ ...editingFields, [field]: !isEdit });
  };

  const onCancel = () => {
    setForm(initialForm);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const isButtonsEnable = () => {
    if (!user) {
      return false;
    }
    return user.email !== form.email || user.name !== form.name || !!form.password;
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon={!editingFields.name ? 'EditIcon' : 'CloseIcon'}
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
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
        icon={!editingFields.email ? 'EditIcon' : 'CloseIcon'}
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
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
        onIconClick={() => onIconClick('password')}
        disabled={!editingFields.password}
        error={false}
        size="default"
        extraClass="mb-6"
      />
      {isButtonsEnable() && (
        <div className="d-flex">
          <Button htmlType="submit" type="primary" size="medium" extraClass="mr-4">
            Сохранить
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            onClick={onCancel}
            size="medium"
            extraClass="mr-4">
            Отменить
          </Button>
        </div>
      )}
    </form>
  );
};
