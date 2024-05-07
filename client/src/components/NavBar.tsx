import { UserIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    return (
        <div className="flex flex-row items-center justify-evenly w-full h-20">
            <button className="flex items-center space-x-2">
                <img src="ConectorTecLogo.png" className="w-24 h-24" />
                <h1 className="block text-2xl font-black text-[#e6f2f2]">Conectortec</h1>
            </button>

            {/* Barra de Búsqueda */}
            <div className="flex-grow max-w-4xl mx-4 my-0">
                <div className="flex w-full items-center border-2 border-[#2f4f4f] rounded-xl overflow-hidden relative">
                    <input
                        type="text"
                        className="pl-4 pr-10 py-2 w-full focus:outline-none"
                        placeholder="Buscar..."
                    />
                    <button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <MagnifyingGlassIcon className="w-6 h-6 text-[#0c2127]" />
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4 justify-end md:w-auto">
                <button className="block">
                    <UserIcon className="w-8 h-8 text-[#e6f2f2]" />
                </button>
                <button>
                    <ShoppingCartIcon className="w-8 h-8 text-[#e6f2f2]" />
                </button>
            </div>
        </div>
    );
}
