function IconMaterial( { name, size = 24, fill = 0, weight = 400, className = "" } ) {
    return (  
        <span
            className={`material-symbols-outlined inline-flex shrink-0 select-none items-center justify-center align-middle ${className}`}
            style={{
                fontSize: size,
                fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${Math.min(Math.max(size, 20), 48)}`,
            }}
        >
            {name}
        </span> 
    );
}

export default IconMaterial;