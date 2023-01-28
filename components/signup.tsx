import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import Autocomplete from "react-google-autocomplete";
import dynamic from 'next/dynamic';
import { toast } from "react-toastify";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
const ReactPasswordChecklist = dynamic(() => import('react-password-checklist'), {
    ssr: false,
});

interface SignupType {
    email: string;
    name: string;
    prename: string;
    birthday: string;
    password: string;
    password_confirm: string;

}
const SignupPage = (props: any) => {
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [formatted_address, setFormattedAddress] = useState("")
    const [place_id, setPlaceId] = useState("")
    const [addressError, setAddressError] = useState(false)
    const [placeObj, setPlaceObj] = useState(Object)
    const [birthdayNotValid, setBirthdayNotValid] = useState(false)

    const methods = useForm<SignupType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = methods;
    const { signUp } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: SignupType) => {
        try {
            if (placeObj.address_components[0].types[0] == "street_number") {
                setAddressError(false)
                try {
                    await signUp(data.email, data.password, data.name, data.prename, data.birthday, formatted_address, place_id);
                    toast.success("Erfolgreich registriert");
                    if (props.site) {
                        router.push("/")
                    }
                } catch (error: any) {
                    console.log(error.message);
                    toast.error("Fehler bei der Registrierung");
                }
            } else {
                setAddressError(true)
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setAddressError(true)
            }
            console.log(error)
        }
    };

    function validateBirthday(value:any) {
        const selectedDate = new Date(value)
        const today = new Date()
        const diff = today.getTime() - selectedDate.getTime()
        console.log(diff)
        if(diff <= 568080000000 || diff >= 3124440000000){
            setBirthdayNotValid(true)
        }else{
            setBirthdayNotValid(false)
        }
    }

    return (
        <div className="grid justify-items-center items-center">
            <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="text"
                                    {...register("name", { required: "Ihr Nachname wird zur Registrierung benötigt." })}
                                    id="name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Name"
                                />
                                {errors.name && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {errors.name && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.name.message}</p>}

                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="text"
                                    {...register("prename", { required: "Ihr Vorname wird zur Registrierung benötigt." })}
                                    id="prename"
                                    autoComplete="given-name"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Vorname"
                                />
                                {errors.prename && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {errors.prename && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.prename.message}</p>}                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="date"
                                    {...register("birthday", { required: "Ihr Geburtsdatum wird zur Registrierung benötigt." })}
                                    id="birthday"
                                    //min="2022-01-01" 
                                    //max="2023-02-01"
                                    autoComplete="bday"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Geburtsdatum"
                                    onChange={(e) => validateBirthday(e.target.value)}
                                />
                                {birthdayNotValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                                {errors.birthday && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {errors.birthday && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.birthday.message}</p>}
                            {birthdayNotValid && <p className="mt-2 text-sm text-red-600" id="email-error">Ihr Alter muss zwischen 18 und 99 Jahren liegen</p>}                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="email"
                                    {...register("email", { required: "Ihre Email-Adresse wird zur Registrierung benötigt. An diese wird nach erfolgreicher Buchung eine Bestätigungsmail gesendet." })}
                                    id="email"
                                    autoComplete="email"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Email"
                                />
                                {errors.email && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email.message}</p>}                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="password"
                                    {...register("password", { required: "Ihr Passwort wird zur Registrierung benötigt." })}
                                    id="password1"
                                    autoComplete="new-password"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Passwort"
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <input
                                    type="password"
                                    {...register("password_confirm", { required: "Verify your password", })}
                                    id="password2"
                                    autoComplete="new-password"
                                    className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Passwort"
                                    onChange={e => setPasswordAgain(e.target.value)}
                                />
                            </div>
                        </div>
                        <ReactPasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            value={password}
                            className="text-start"
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { }}
                            messages={{
                                minLength: "Das Passwort muss mindestens 8 Zeichen lang sein.",
                                specialChar: "Das Passwort muss mindestens ein Sonderzeichen enthalten.",
                                number: "Das Passwort muss mindestenes eine Zahl enthalten.",
                                capital: "Das Passwort muss mindestens einen Großbuchstaben enthalten.",
                                match: "Die Passwörter müssen übereinstimmen.",
                            }}
                        />

                        <div>
                            <div className="relative mt-1 rounded-none shadow-sm">
                                <Autocomplete apiKey={"AIzaSyCY17WLFDKPuYBIl3tzEQ0AWnQ9QFmEZwU"}
                                    id="address"
                                    onPlaceSelected={(place) => {
                                        if (place.address_components[0].types[0] == "street_number") {
                                            setPlaceObj(place)
                                            setFormattedAddress(place.formatted_address)
                                            setPlaceId(place.place_id)
                                            setAddressError(false)
                                        } else {
                                            setAddressError(true)
                                        }
                                    }}
                                    options={{
                                        types: ['address'],//oder "street_address" weil ist bis jetzt ohne nr siehe https://developers.google.com/maps/documentation/places/web-service/autocomplete
                                        componentRestrictions: { country: "de" },
                                    }}
                                    className="block w-full ring-1 ring-gray-300 h-9 rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
                                    placeholder="Beispielstraße 12, Bonn, Deutschland"
                                />
                                {addressError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {addressError && <p className="mt-2 text-sm text-red-600" id="email-error">Bitte geben Sie eine valide Adresse an</p>}                        </div>
                    </div>
                    <div className="mt-2">
                        <button id="btnLogin" type="submit" className='w-full text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                            Registrieren &rarr;
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SignupPage;