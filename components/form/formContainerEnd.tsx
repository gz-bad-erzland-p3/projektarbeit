export default function FormContainerEnd(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className="flex justify-end">
            {children}
        </div>
    );
}