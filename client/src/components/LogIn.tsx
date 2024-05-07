import { ChangeEvent, useState } from "react";

type LogInParams = {
    email: string;
    password: string;
}

const initialState = {
    email: '',
    password: ''
}

export default function LogIn() {

    const [params, setParams] = useState<LogInParams>(initialState);

    const hadnleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setParams({
            ...params,
            [e.target.id]: e.target.value
        });
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="email">Correo: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo..."
                        required
                        value={params.email}
                        onChange={hadnleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Contraseña..."
                        value={params.password}
                        onChange={hadnleChange}
                    />
                </div>
            </form>
        </div>
    )
}
