import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useForm } from '../../../hooks/use-form';
import { updateUser } from '../../../services/actions/user';
import { IRegisterUser } from '../../../types/authTypes';

export const UserForm = () => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const initialForm: IRegisterUser = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  };

  const initialEditingFields = {
    name: false,
    email: false,
    password: false,
  };

  const { values, handleChange, setValues } = useForm<IRegisterUser>(initialForm);

  const [editingFields, setEditingFields] = useState(initialEditingFields);

  const onIconClick = (field: 'name' | 'email' | 'password') => {
    const isEdit = editingFields[field];
    isEdit
      ? setValues({ ...values, [field]: '' })
      : setEditingFields({ ...editingFields, [field]: !isEdit });
  };

  const onCancel = () => {
    setValues(initialForm);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(values));
    setEditingFields(initialEditingFields);
  };

  const isButtonsEnable = () => {
    if (!user) {
      return false;
    }
    return user.email !== values.email || user.name !== values.name || !!values.password;
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon={!editingFields.name ? 'EditIcon' : 'CloseIcon'}
        value={values.name}
        onChange={e => handleChange(e)}
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
        value={values.email}
        onChange={e => handleChange(e)}
        onIconClick={() => onIconClick('email')}
        disabled={!editingFields.email}
        error={false}
        size="default"
        extraClass="mb-6"
      />
      <Input
        type="password"
        name="password"
        value={values.password}
        icon="EditIcon"
        placeholder="Введите новый пароль"
        onChange={e => handleChange(e)}
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
