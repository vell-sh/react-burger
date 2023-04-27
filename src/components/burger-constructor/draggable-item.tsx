import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { REMOVE_INGREDIENT } from '../../services/reducers/burger-constructor';

import styles from './style.module.css';

interface IProps {
  id: string;
  index: number;
  text: string;
  price: number;
  thumbnail: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DraggableItem = ({
  id,
  text,
  index,
  price,
  moveItem,
  thumbnail,
  ...props
}: IProps) => {
  const dispatch = useAppDispatch();

  // --- DnD --- //
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'sortItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sortItem',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // --- DnD --- //

  const onDelete = () => {
    dispatch(REMOVE_INGREDIENT(id));
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      key={id}
      className={styles.availableConstructorItem}>
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => onDelete()}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
};
