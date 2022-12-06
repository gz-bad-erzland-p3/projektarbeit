export default function FormContainer(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className="pt-16">
            { <div className="text-3xl font-bold">{props.title}</div>}
            {children}
        </div>
    );
}