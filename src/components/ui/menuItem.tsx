import "./menuItem.css";

interface MenuItemProps {
  text: string,
  onClickHandler: () => {},
};

const MenuItem = ({text, onClickHandler}: MenuItemProps) => {
  return (
    <li className="menu-item"><a href="#" onClick={onClickHandler}>{text}</a></li>
  );
};

export default MenuItem;