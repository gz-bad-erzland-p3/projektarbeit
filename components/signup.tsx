import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import Autocomplete from "react-google-autocomplete";

interface SignupType {
    email: string;
    name: string;
    prename: string;
    address: string;
    birthday: string;
    password: string;
    password_confirm: string;
}
const SignupPage = () => {
    const methods = useForm<SignupType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
    const { signUp } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: SignupType) => {
        try {
            await signUp(data.email, data.password, data.name, data.prename, data.birthday);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="grid justify-items-center items-center">
            <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    id="name"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="text"
                                    {...register("prename", { required: "Vorname is required" })}
                                    id="prename"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Vorname"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="date"
                                    {...register("birthday", { required: "Geburtsdatum is required" })}
                                    id="birthday"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Geburtsdatum"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    id="email"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    id="password1"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Passwort"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="password"
                                    {...register("password_confirm", { required: "Verify your password", })}
                                    id="password2"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Passwort"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <Autocomplete apiKey={"AIzaSyCY17WLFDKPuYBIl3tzEQ0AWnQ9QFmEZwU"}
                                    id="address"
                                    onPlaceSelected={(place) => {
                                        console.log(place);
                                    }}
                                    options={{
                                        types: ['address'],//oder "street_address" weil ist bis jetzt ohne nr siehe https://developers.google.com/maps/documentation/places/web-service/autocomplete
                                        componentRestrictions: { country: "de" },
                                    }}
                                    {...register("address", { required: "Adresse is required" })}
                                    className="block w-full ring-1 ring-gray-300 h-9 rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Adresse"
                                />
                            </div>
                        </div>
                        <div>
                            <button id="btnLogin" className='w-full text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                                Registrieren &rarr;
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SignupPage;