export default function FormSection(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className="py-5">
            {props.title ?
                <div className="relative py-5">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-lg font-medium text-gray-900">{props.title}</span>
                    </div>
                </div>
                : ""}
            <div className="flex space-x-4">
                {children}
            </div>
        </div>
    );
}