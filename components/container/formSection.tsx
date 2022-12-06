export default function FormSection(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div>
            { props.title ? <div className="py-2 text-xl font-bold">{props.title}</div> : ""}
            <div className="flex py-2 space-x-4">
                {children}
            </div>
        </div>
    );
}