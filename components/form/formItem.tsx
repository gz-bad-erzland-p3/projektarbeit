import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isTemplateExpression } from "typescript";

export default function FormItem(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className={"flex-auto w-" + props.width}>
            {props.icon || props.title ? <div className="flex space-x-1 items-center pb-2">
                {props.icon ? <FontAwesomeIcon icon={props.icon} className="h-4 w-4 mr-1" /> : ""}
                {props.title ? <p className="text-base font-bold">{props.title}</p> : ""}
            </div> : "" }
            {children}
        </div>
    )

}