// components/DroppableWrapper.tsx
import { Droppable } from "react-beautiful-dnd";
import React from "react";

interface DroppableWrapperProps extends React.ComponentProps<typeof Droppable> {
  children: React.ReactNode;
}

const DroppableWrapper = ({ children, ...props }: DroppableWrapperProps) => {
  return <Droppable {...props}>{children}</Droppable>;
};

export default DroppableWrapper;