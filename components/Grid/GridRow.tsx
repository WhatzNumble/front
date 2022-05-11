import {GridColumnProps} from './GridColumn';
import CSS from 'csstype';
import {Constraint} from 'libs/types';
import React from 'react';

interface Props<Data> {
    columnProps: GridColumnProps[]
    data: Data
    onClickRow?: (event: React.MouseEvent<HTMLElement>, param: Data)=>void
}

function GridRow<Data extends Constraint<string | number | null | undefined>>({columnProps, data, onClickRow}: Props<Data>){
    const onClick = (e: React.MouseEvent<HTMLElement>)=>{
        if(onClickRow){
            onClickRow(e, data);
        }
    }

    const mergeStyle = (style: CSS.Properties | undefined, width: string)=> {
        const inlineStyle = {
            ...style, 
            width
        }
        return inlineStyle;
    }

    return (
        <div className='GridRow' onClick={onClick}>
            {columnProps.map((prop, i) => {
                const {cellStyle, width='100px', element} = prop;
                let value = element || data[prop.field];

                return <div key={i} className='col' style={mergeStyle(cellStyle, width)}>{value}</div>
            })}
            <style jsx>{`
                .GridRow {
                    display: flex;
                    background-color: #f0f0f0;
                    transition: .2s;
                    &:not(:last-child) {
                        border-bottom: 1px solid rgb(199, 199, 199); 
                    }
                    &:hover {
                        background-color: #e2e2e2;
                    }
                    .col {
                        width: 160px;
                        padding: 10px; 
                        &:not(:last-of-type) {
                            border-right: 1px solid white;
                        }
                    }
                }
            `}</style>
        </div>
    );
}

export default GridRow;