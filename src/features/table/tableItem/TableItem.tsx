import { ReactElement } from "react"

import './TableItem.css';

interface TableItemProps {
    rank: number;
    breed: string;
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const TableItem = ({rank, breed, onDragStart, onDragEnter, onDragOver, onDragLeave, onDragEnd, onDrop}: TableItemProps) : ReactElement => {

    return (
        <div
            draggable
            onDragStart={(event) => onDragStart(event)}
            onDragEnter={(event) => onDragEnter(event)}
            onDragOver={(event) => onDragOver(event)}
            onDragLeave={(event) => onDragLeave(event)}
            onDragEnd={(event) => onDragEnd(event)}
            onDrop={(event) => onDrop(event)}
            className="table-item-container"
        >
            <span className="rank-container">{rank+1}</span>
            <span className="breed-container">{breed}</span>
        </div>
      );
}