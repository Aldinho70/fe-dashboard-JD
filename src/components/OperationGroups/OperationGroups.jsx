function OperationGroups( { nameGroup, children } ) {
    return (  
        <fieldset className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-2 shadow-2xl shadow-slate-950/20 backdrop-blur-sm">
          <legend className="px-3">
            <span className="inline-block rounded-xl border border-[var(--accent)]/20 bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]" >
              {nameGroup}
            </span>
          </legend>
          <div className="flex flex-col gap-3 p-3"> {children} </div>
        </fieldset>
    );
}

export default OperationGroups;