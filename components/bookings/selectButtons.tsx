export default function SelectButtons(props: any) {
    return (
        <button type="button" onClick={props.onClick}>
            {props.title}
        </button>
    )
}