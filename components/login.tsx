import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import { toast } from 'react-toastify';


interface LoginType {
    email: string;
    password: string;
}

const Login = () => {
    const methods = useForm<LoginType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { logIn } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: LoginType) => {
        try {
            await logIn(data.email, data.password);
            toast.success("Erfolgreich eingeloggt");
        } catch (error: any) {
            console.log(error.message);
            toast.error("Fehler beim Login");
        }
    };
    return (
        <div className="flex w-full justify-center">
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
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Passwort"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button type="submit" id="btnLogin" className='w-full text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                                Anmelden &rarr;
                            </button>
                            <button type="button" id="btnLogin" className='px-4 py-2 text-base bg-gray-100 hover:bg-gray-200 font-medium rounded-none transition '>
                                Registrieren
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default Login;