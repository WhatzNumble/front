import {GridColumnProps} from './GridColumn';

interface Props {
    columnProps: GridColumnProps[]
    onClickHeader?: ()=>void
}

function GridHeader({columnProps, onClickHeader}: Props){
    const onClick = ()=>{
        if(onClickHeader) onClickHeader();
    }

    return (
        <div className='GridHeader' onClick={onClick}>
            {columnProps.map((prop, i) => {
                const {width='100px'} = prop;
                return <div key={i} className='col' style={{width}}>{prop.headerText}</div>
            })}
            <style jsx>{`
                .GridHeader {
                    display: flex;
                    font-weight: bold;
                    color: white;
                    background-color: #868686 ;
                    transition: .2s;

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

export default GridHeader;