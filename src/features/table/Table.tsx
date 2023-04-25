import React, { useEffect } from 'react';
import { TableItem } from './tableItem/TableItem';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTable1,
    selectTable2,
    setTables,
    setDraggedItemInfo,
    selectDraggedItemInfo,
    setDragOverItemInfo,
    selectDragOverItemInfo,
    setTable1Items,
    setTable2Items
} from './tableSlice';

import './Table.css';


export function Table() {
    const table1 = useAppSelector(selectTable1);
    const table2 = useAppSelector(selectTable2);
    const draggedItemInfo = useAppSelector(selectDraggedItemInfo);
    const dragOverItemInfo = useAppSelector(selectDragOverItemInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/list/all').then((response) => {
            const breedsObject = response.data.message;
            const keys = Object.keys(breedsObject);
            const initialBreedNumbers = [];
    
            // Choose  20 numbers between 0 to 97
            const min = 0;
            const max = 98; // exclusive
            
            while(initialBreedNumbers.length < 20){
                let randomBreedNum = Math.floor(Math.floor(Math.random() * (max - min) + min));
                if(initialBreedNumbers.indexOf(randomBreedNum) === -1) initialBreedNumbers.push(randomBreedNum);
            }
    
            const initialTableValues = []

            for (let i = 0; i < 20; i++) {
                initialTableValues.push(keys[initialBreedNumbers[i]]);
            }

            dispatch(setTables(initialTableValues))
        })
    }, [])

    const handleSort = () => {
        if (draggedItemInfo.index !== null && dragOverItemInfo.index !== null) {
            // Items are from different tables
            if (draggedItemInfo.table !== null && draggedItemInfo.table !== dragOverItemInfo.table) {
                if (draggedItemInfo.table === 1 && dragOverItemInfo.table === 2 && table1.length > 1) {
                    let table1Items = [... table1];
                    let table2Items = [... table2];

                    const draggedItemContent = table1Items.splice(draggedItemInfo.index, 1)[0]

                    table2Items.splice(dragOverItemInfo.index, 0, draggedItemContent);

                    const sortedTable1Items = table1Items.map((item, index) => (
                        {rank: index+1, breed: item.breed}
                    ));

                    const sortedTable2Items = table2Items.map((item, index) => (
                        {rank: index+1, breed: item.breed}
                    ));

                    dispatch(setTable1Items(sortedTable1Items));
                    dispatch(setTable2Items(sortedTable2Items));
                } else if (draggedItemInfo.table === 2 && dragOverItemInfo.table === 1 && table2.length > 1) { 
                    let table1Items = [... table1];
                    let table2Items = [... table2];

                    const draggedItemContent = table2Items.splice(draggedItemInfo.index, 1)[0]

                    table1Items.splice(dragOverItemInfo.index, 0, draggedItemContent);

                    const sortedTable1Items = table1Items.map((item, index) => (
                        {rank: index+1, breed: item.breed}
                    ));

                    const sortedTable2Items = table2Items.map((item, index) => (
                        {rank: index+1, breed: item.breed}
                    ));

                    dispatch(setTable1Items(sortedTable1Items));
                    dispatch(setTable2Items(sortedTable2Items));
                } else { // Table being dragged from only has 1 item
                    alert("Woof Invalid Action Woof");
                }
            } else if (draggedItemInfo.table === 1) { // Items both from table 1
                let tableItems = [... table1];
                const draggedItemContent = tableItems.splice(draggedItemInfo.index, 1)[0]
                tableItems.splice(dragOverItemInfo.index, 0, draggedItemContent);

                const sortedTableItems = tableItems.map((item, index) => (
                    {rank: index+1, breed: item.breed}
                ));
        
                dispatch(setTable1Items(sortedTableItems));
            } else if (draggedItemInfo.table === 2) { // Items both from table 2
                let tableItems = [... table2];
                const draggedItemContent = tableItems.splice(draggedItemInfo.index, 1)[0]
                tableItems.splice(dragOverItemInfo.index, 0, draggedItemContent);

                const sortedTableItems = tableItems.map((item, index) => (
                    {rank: index+1, breed: item.breed}
                ));
        
                dispatch(setTable2Items(sortedTableItems));
            }
        }
        
        dispatch(setDraggedItemInfo({table: null, index: null}));
        dispatch(setDragOverItemInfo({table: null, index: null}));
    }

    function dropTest(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    const handleDragEnter = (table: number, index: number, event: React.DragEvent<HTMLDivElement>) => {
        dispatch(setDragOverItemInfo({table: table, index: index}))
        const dragTarget = event.target as HTMLDivElement;
        if (dragTarget.classList[0] !== "table1" && dragTarget.classList[0] !== "table2") {
            dragTarget.classList.add('drag-over');
        }
        
    }
    
    const handleDragStart = (table: number, index: number, event: React.DragEvent<HTMLDivElement>) => {
        dispatch(setDraggedItemInfo({table: table, index: index}))
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        const dragLeaveTarget = event.target as HTMLDivElement;
        if (dragLeaveTarget.classList[0] !== "table1" && dragLeaveTarget.classList[0] !== "table2") {
            dragLeaveTarget.classList.remove('drag-over');
        }
    }

    return (
        <div className="tableContainer">
            <div className="table1">
                <div className='table-header'>
                    <div className='table-rank'>Rank</div>
                    <div className='table-breed'>Breed</div>
                </div>
                {table1.length > 0 ? 
                table1.map((item, index) => (
                    <TableItem 
                        key={index}
                        rank={index} 
                        breed={item.breed}
                        onDragStart={(e) => handleDragStart(1, index, e)}
                        onDragEnter={(e) => handleDragEnter(1, index, e)}
                        onDragOver={(e) => {e.preventDefault()}}
                        onDragLeave={(e) => handleDragLeave(e)}
                        onDragEnd={(e) => handleSort()}
                        onDrop={(event) => handleDragLeave(event)}
                    />
                )) :
                <Spinner animation="border" variant="info" />
                }
            </div>
            <div className='table-legend'>
                <div className='table-legend-content'>
                    <div className='table-rank'>Rank</div>
                    <div className='table-breed'>Breed</div>
                </div>
                <div className='table-legend-content'>
                    <div className='table-rank'>Rank</div>
                    <div className='table-breed'>Breed</div>
                </div>
            </div>
            <div className="table2" onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropTest(event)}>
                <div className='table-header'>
                    <div className='table-rank'>Rank</div>
                    <div className='table-breed'>Breed</div>
                </div>
                {table2.length > 0 ? 
                table2.map((item, index) => (
                    <TableItem 
                        key={index}
                        rank={index} 
                        breed={item.breed}
                        onDragStart={(event) => handleDragStart(2, index, event)}
                        onDragEnter={(event) => handleDragEnter(2, index, event)}
                        onDragOver={(e) => {e.preventDefault()}}
                        onDragLeave={(event) => handleDragLeave(event)}
                        onDragEnd={(event) => handleSort()}
                        onDrop={(event) => handleDragLeave(event)}
                    />
                )) :
                <Spinner animation="border" variant="info" />
                }
            </div>
        </div>
    );
}
  