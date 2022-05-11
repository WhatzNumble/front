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
    title?: string
}

function Grid<Data extends Constraint<string | number | null | undefined>>({children, datas, onClickRow, gridStyle, title}: Props<Data>){
    const columnProps: GridColumnProps[] = children.map(col => col.props);

    return (
        <div className='Grid'>
            {title && <h2 className='title'>{title}</h2>}
            <GridHeader columnProps={columnProps}/>
            {datas.map((data, i) => (
                <GridRow<Data> key={i} columnProps={columnProps} data={data} onClickRow={onClickRow}/>
            ))}
            <style jsx>{`
                .Grid {
                    margin: 10px 0 20px 0;
                }

                .title {
                    font-size: 18px;
                    margin-bottom: 5px;
                }
            `}</style>
        </div>
    );
}

export default Grid;