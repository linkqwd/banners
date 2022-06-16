import { FilterList, FilterListItem } from 'react-admin';

import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';

import { bannerResources } from 'consts/bannerResources';


export const ResourceFilter = () => (
    <FilterList
        label="Ресурс"
        icon={<DvrOutlinedIcon />}
    >
        {bannerResources.map(({ name, id}, index) => {
            return (
                <FilterListItem
                    key={index}
                    label={name}
                    value={{
                        resource: id,
                    }}
                />
            )
        })}
    </FilterList>
);
