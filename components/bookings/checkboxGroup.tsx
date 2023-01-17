import Checkbox from "./checkbox";

export default function CheckboxGroup(props: any) {
    const items: string[] = props.items;

    return (
        <fieldset className="space-y-3">
            {items.map((item, index) => (
                <Checkbox key={index} id={index} title={item} FirebaseKey={props.FirebaseKey} />
            ))}
        </fieldset>
    )
}