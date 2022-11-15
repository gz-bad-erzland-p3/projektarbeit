import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";

interface LoginType {
  email: string;
  password: string;
}
const LoginPage = () => {
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
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
 };
  return (
    <div className="grid justify-items-center h-screen items-center">
        <h2>Login</h2>
        <FormProvider {...methods}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                id="email"
                                className="block w-full rounded-md border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className="block w-full rounded-md border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                placeholder="Passwort"
                            />
                        </div>
                    </div>
                    <div>
                        <button id="btnLogin" className='w-full text-white px-4 py-2 text-base font-medium rounded-lg bg-green-600 hover:bg-green-500 transition'>
                            Anmelden &rarr;
                        </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    </div>
  );
};

export default LoginPage;