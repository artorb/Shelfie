interface Props {
    onClick: () => void,
    color: string,
}

const Colortag = ({color, onClick}: Props) => {

    return (
        <>
            <button aria-label={`sortBy-${color}-button`} onClick={onClick}
                    className={`bg-${color}-400 inline-block my-4 px-4 py-4 mx-4 rounded-full`}></button>
        </>
    )
}

export default Colortag;