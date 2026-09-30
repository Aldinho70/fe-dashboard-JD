function OperationGroups( { nameGroup, children } ) {
    return (  
        <fieldset className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-2 shadow-2xl shadow-slate-950/20 backdrop-blur-sm">
          <div className="flex justify-between items-center" >

            <span className="inline-block bg-[var(--surface-panel)] px-3 text-2xl font-bold tracking-tight text-[var(--app-text)]" >
              {nameGroup}
            </span>
            {/* <span className=" rounded-lg px-3 bg-[var(--surface-table-header)]" >0 Unidades</span> */}

          </div>
          {/* <legend className="px-3">
          </legend> */}
          <div className="flex flex-col gap-2 p-3"> {children} </div>
        </fieldset>
    );
}

export default OperationGroups;