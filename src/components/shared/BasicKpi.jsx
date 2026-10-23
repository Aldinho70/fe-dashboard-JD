function BasicKpi( { name, value, color = "default" } ) {

    const typeColor = {
        green: {
           bg :`bg-emerald-400`,
           text :`text-emerald-400`
        },
        red: {
           bg :`bg-red-400`,
           text :`text-red-400`
        },
        yellow: {
           bg :`bg-amber-400`,
           text :`text-amber-400`
        },
        default: {
           bg :`bg-orange-400`,
           text :`text-orange-400`
        },
    }

    return (  
        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-3">
            <span className={`h-1.5 w-1.5 rounded-full ${typeColor[color].bg}`}  aria-hidden="true" />
            <span className="text-xs font-medium text-[var(--muted-text)]">{name}</span>
            <span className={`text-sm font-bold leading-none ${typeColor[color].text}`} >{value}</span>
        </div>
    );
}

export default BasicKpi;