import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { toast } from 'react-toastify';


interface EmailType {
    email: string;
}

const ForgotPassword = (props: any) => {
    const methods = useForm<EmailType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { forgotPassword } = useAuth();

    const onSubmit = async (data: EmailType) => {
        try {
            await forgotPassword(data.email);
            toast.success("Sie haben eine Email mit Link zum zurücksetzen Ihres Passwortes erhalten");
        } catch (error: any) {
            console.log(error.message);
            toast.error("Fehler beim Zurücksetzen");
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
                                    autoComplete="username"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="E-Mail"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button type="submit" id="btnLogin" className='button-primary'>
                                Zurücksetzen &rarr;
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ForgotPassword;