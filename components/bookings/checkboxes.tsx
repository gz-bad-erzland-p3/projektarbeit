export default function CheckBoxes(props: any) {
    const items: string[] = props.items;

    return (
        <fieldset className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="text-gray-900 relative flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            className="outline-none focus:ring-0 focus:ring-white h-5 w-5 text-green-600 border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <span id="comments-description" className="text-gray-500">
                            <span>{item}</span>
                        </span>
                    </div>
                </div>
            ))}
        </fieldset>
    )
}