import CSS from 'csstype';
import {GridColumnProps} from './GridColumn';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import {Constraint} from 'libs/types';

interface Props<Data> {
    children: JSX.Element[]
    datas: Data[]
    onClickRow?: (event: React.MouseEvent<HTMLElement>, param: Data)=> void
    gridStyle?: CSS.Properties
}

function Grid<Data extends Constraint<string>>({children, datas, onClickRow, gridStyle}: Props<Data>){
    const columnProps: GridColumnProps[] = children.map(col => col.props);

    return (
        <div className='Grid'>
            <GridHeader columnProps={columnProps}/>
            {datas.map((data, i) => (
                <GridRow<Data> key={i} columnProps={columnProps} data={data} onClickRow={onClickRow}/>
            ))}
            <style jsx>{`
                .Grid {

                }
            `}</style>
        </div>
    );
}

export default Grid;