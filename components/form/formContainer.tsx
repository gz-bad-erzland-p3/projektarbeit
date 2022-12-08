export default function FormContainer(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className="py-4">
            { <div className="text-3xl font-bold">{props.title}</div>}
            {children}
        </div>
    );
}