import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TableState {
    table1: Array<{rank: number, breed: string}>;
    table2: Array<{rank: number, breed: string}>;
    draggedItemInfo: {table: number | null, index: number | null};
    dragOverItemInfo: {table: number | null, index: number | null};
}


function getInitialState() {
    

    return {
        table1: [
        ],
        table2: [
        ],
        draggedItemInfo: {table: null, index: null},
        dragOverItemInfo: {table: null, index: null}
    };

    
}

const initialState: TableState = getInitialState();

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTables: (state, action: PayloadAction<Array<string>>) => {
            state.table1 = [
                {rank: 1, breed: action.payload[0]},
                {rank: 2, breed: action.payload[1]},
                {rank: 3, breed: action.payload[2]},
                {rank: 4, breed: action.payload[3]},
                {rank: 5, breed: action.payload[4]},
                {rank: 6, breed: action.payload[5]},
                {rank: 7, breed: action.payload[6]},
                {rank: 8, breed: action.payload[7]},
                {rank: 9, breed: action.payload[8]},
                {rank: 10, breed: action.payload[9]}
            ]
            state.table2 = [
                {rank: 1, breed: action.payload[10]},
                {rank: 2, breed: action.payload[11]},
                {rank: 3, breed: action.payload[12]},
                {rank: 4, breed: action.payload[13]},
                {rank: 5, breed: action.payload[14]},
                {rank: 6, breed: action.payload[15]},
                {rank: 7, breed: action.payload[16]},
                {rank: 8, breed: action.payload[17]},
                {rank: 9, breed: action.payload[18]},
                {rank: 10, breed: action.payload[19]}
            ]
        },
        setDraggedItemInfo: (state, action: PayloadAction<{table: number | null, index: number | null}>) => {
            state.draggedItemInfo = action.payload;
        },
        setDragOverItemInfo: (state, action: PayloadAction<{table: number | null, index: number | null}>) => {
            state.dragOverItemInfo = action.payload;
        },
        setTable1Items: (state, action: PayloadAction<Array<{rank: number, breed: string}>>) => {
            state.table1 = action.payload;
        },
        setTable2Items: (state, action: PayloadAction<Array<{rank: number, breed: string}>>) => {
            state.table2 = action.payload;
        }
    },
});

export const { setTables, setDraggedItemInfo, setDragOverItemInfo, setTable1Items, setTable2Items } = tableSlice.actions;

export const selectTable1 = (state: RootState) => state.table.table1;
export const selectTable2 = (state: RootState) => state.table.table2;
export const selectDraggedItemInfo = (state: RootState) => state.table.draggedItemInfo;
export const selectDragOverItemInfo = (state: RootState) => state.table.dragOverItemInfo;

export default tableSlice.reducer;
