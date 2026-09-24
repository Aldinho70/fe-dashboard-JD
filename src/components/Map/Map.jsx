const VoidMap = () => {
    return (
        <div className=" flex  justify-center items-center w-full min-h-full bg-gray-700 rounded-3xl " >
            <div className="flex flex-col justify-center items-center gap-1" >
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3"><path d="M558-560q0-33.05-22.47-55.53Q513.05-638 480-638q-10.43 0-18.71 4-8.29 4-14.29 9l98 98q5-6 9-14.29 4-8.28 4-18.71Zm188 234-69-69q27-43 40.5-83t13.5-77.46q0-112.31-72.69-183.93Q585.63-811 480-811q-47.09 0-87.55 15Q352-781 319-753l-67-66q47-42 105.88-64.5Q416.76-906 480-906q136.49 0 241.25 95.64Q826-714.72 826-554.51q0 55.87-19.5 112.19T746-326Zm-160 41L241-630q-6 16.53-9 35.19-3 18.65-3 39.81 0 83 63 171.5T480-179q31-28 57-54.5t49-51.5ZM845-25 654.14-216Q618-177 575-137t-95 82Q307-199 221-318.5T135-555q0-41.6 7.5-79.3Q150-672 165-705L22-848l51-51L896-76l-51 51ZM413-458Zm86-115Z"/></svg>
                <span className="font-bold text-4xl text-gray-300">No se pudo encontrar la ubicacion de la unidad</span>
            </div>
        </div>        
    );
}

function Map({ latitud/* = 25.5123053*/, longitud/* = -103.4059819*/, name, location }) {
  return (
    <div className="flex justify-center items-center h-full">
        
        <div className="flex flex-col gap-2 w-full h-full " >

            <div className="flex gap-3 justify-between items-center text-gray-400" >
                <span className="font-bold text-2xl pb-1" >
                    Mostrando la unidad: <span className="py-1 px-2 bg-gray-700 rounded-xl" >{name}</span>
                </span>
                <span className="flex gap-1 items-center font-bold " >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
                    { (location) ? location : 'Ubicacion desconocida'}
                </span>
            </div>

            <div className="w-full h-full ">
                { ( !latitud && !longitud ) 
                    ? <VoidMap />
                    : <iframe
                            className="rounded-xl w-full h-full"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${latitud},${longitud}&z=19&t=k&output=embed`}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de ubicación"
                        ></iframe>
                }
                
            </div>

            <div className="flex flex-row gap-2 text-gray-400" >
                    
            </div>

        </div>


    </div>
  );
}

export default Map;
