const InstanceViewer = ({instance, value, valueBlock,vertical}) => {
    return (<>
        <div className={`flex ${vertical && 'flex-col'} items-center gap-2`}>
            <span className="font-bold ">{instance}:</span>
            {valueBlock ? valueBlock : <span className="block">{value}</span>}

        </div>
    </>)

}
export default InstanceViewer
