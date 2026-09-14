const useCountUnitGroupHelper = {

    getCountUnitsGroupsFilter(groups = [], groups_filter = []) {

        const filters = groups_filter.map(
            group => group.trim().toLowerCase()
        );

        return groups
            .filter(Boolean)
            .filter(group =>
                filters.includes(group.name?.trim().toLowerCase())
            )
            .reduce((result, group) => {

                result[group.name] = group.units?.length ?? 0;

                return result;

            }, {});
    },

};

export default useCountUnitGroupHelper;