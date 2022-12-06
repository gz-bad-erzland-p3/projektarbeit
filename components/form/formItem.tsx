
export default function FormItem(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className={"flex-auto w-" + props.width}>
            <div className="flex space-x-1 items-center pb-2">
                {props.icon ? <props.icon className="h-5 w-5" /> : ""}
                {props.title ? <p className="text-base font-bold">{props.title}</p> : <div className="py-3"></div>}
            </div>
            {children}
        </div>
    )

}