const useDataHRHHelper = {
    getGroupsFilter(groups = [], groups_filter = []) {

        const filters = groups_filter.map(
            group => group.trim().toLowerCase()
        );

        return groups
            .filter(Boolean)
            .filter(group =>
                filters.includes(group.name?.trim().toLowerCase())
            )
            .reduce((result, group) => {

                result[group.name] = group;

                return result;

            }, {});
    },
}

export default useDataHRHHelper;