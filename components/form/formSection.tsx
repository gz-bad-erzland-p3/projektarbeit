export default function FormSection(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div>
            { props.title ? <div className="text-xl font-bold">{props.title}</div> : ""}
            <div className="flex space-x-4">
                {children}
            </div>
        </div>
    );
}