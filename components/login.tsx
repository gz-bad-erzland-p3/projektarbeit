import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import SignupPage from "./signup";


interface LoginType {
    email: string;
    password: string;
}

const Login = (props: any) => {
    const methods = useForm<LoginType>({ mode: "onBlur" });

    const [login, setLogin] = useState(true)
    const updateSignUp = () => {
        setLogin(!login);
    }

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
            if (props.site) {
                router.push("/")
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error("Fehler beim Login. Die eingegebene E-Mail oder das Passwort ist nicht korrekt.");
        }
    };
    return (
        <div className="flex w-full justify-center">
            {login ?
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
                                        placeholder="E-Mail"
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
                                <button type="submit" id="btnLogin" className='button-primary'>
                                    Anmelden &rarr;
                                </button>
                                {props.notShowRegister ?
                                    <div></div>
                                    :
                                    <div>
                                        <button type="button" id="btnSignup" onClick={updateSignUp} className='button-secondary'>
                                            Registrieren &rarr;
                                        </button>
                                        <br /><br />
                                        <button type="button" id="btnReset" className='link-main text-xs' onClick={() => router.push("/forgotpassword")}>
                                            Passwort vergessen
                                        </button>
                                    </div>

                                }

                            </div>
                        </div>
                    </form>
                </FormProvider>

                :

                <div className="flex flex-col space-y-2">
                    <SignupPage site={props.site} />
                    {login ? "" : <button className="button-secondary w-full" onClick={updateSignUp}>Login &rarr;</button>}
                </div>}
        </div>
    );
};

export default Login;