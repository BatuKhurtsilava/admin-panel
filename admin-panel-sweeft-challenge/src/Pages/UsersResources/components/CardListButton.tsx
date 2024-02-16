import React, { MouseEventHandler, ReactElement, Dispatch, SetStateAction } from 'react';
import { IconType } from "react-icons";
import { ImTable } from "react-icons/im";

interface IconButtonProps {
  onClick: () => void;
  icon: IconType;
  label: string;
}

export const CardListButton: React.FC<IconButtonProps> = ({ onClick, icon: Icon, label }): ReactElement => {
  return (
    <button onClick={onClick}>
      <Icon /> {label}
    </button>
  );
};
