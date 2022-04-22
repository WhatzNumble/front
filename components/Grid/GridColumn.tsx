import CSS from 'csstype';

export interface GridColumnProps {
    width?: string
    field: string
    headerText?: string
    element?: JSX.Element
    cellStyle?: CSS.Properties
}

function GridColumn(props: GridColumnProps){
    return <></>;
}

export default GridColumn;