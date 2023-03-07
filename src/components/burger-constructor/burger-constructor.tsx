type IProps = {
  className?: string;
};

const BurgerConstructor = (props: IProps) => {
  return <div className={props.className}></div>;
};

export default BurgerConstructor;
