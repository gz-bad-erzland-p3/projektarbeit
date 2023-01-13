import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import Autocomplete from "react-google-autocomplete";

interface SignupType {
    email: string;
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
            await signUp(data.email, data.password);
            router.push("/dashboard");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="grid justify-items-center h-screen items-center">
            <h2>Registrieren</h2>
            <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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

                        <Autocomplete apiKey={"AIzaSyCY17WLFDKPuYBIl3tzEQ0AWnQ9QFmEZwU"}
                            style={{ width: "90%" }}
                            onPlaceSelected={(place) => {
                              console.log(place);
                            }}
                            options={{
                              types: ["(regions)"],
                              componentRestrictions: { country: "de" },
                            }}
                            className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition" />              <div>
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