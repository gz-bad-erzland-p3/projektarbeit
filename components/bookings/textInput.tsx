export default function TextInput(props: any) {
    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-none border-gray-300 pl-7 pr-12 form-input"
                    placeholder={props.title}
                />
            </div>
        </div>
    )
}