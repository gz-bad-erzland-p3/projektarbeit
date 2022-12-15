export default function FormContainer(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className="p-5 mt-5 rounded-none shadow-md">
            { <div className="text-3xl font-bold">{props.title}</div>}
            {children}
        </div>
    );
}