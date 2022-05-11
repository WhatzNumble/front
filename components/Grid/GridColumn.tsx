import CSS from 'csstype';

export interface GridColumnProps<Data> {
    width?: string
    field: string
    headerText?: string
    element?: JSX.Element
    cellStyle?: CSS.Properties
    labelFunction?: (rowData: Data)=> string
}

function GridColumn<Data>(props: GridColumnProps<Data>){
    return <></>;
}

export default GridColumn;