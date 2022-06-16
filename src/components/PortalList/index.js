import React from 'react'
import {
    List, Datagrid, TextField, EditButton, DeleteButton, BooleanField, FunctionField, CreateButton, ExportButton,
    TopToolbar,
} from 'react-admin'
import { Pagination } from 'react-admin';

import { Box, Card, CardContent } from '@mui/material';

import { bannerResourcesNameMap } from 'consts/bannerResources';

import { ResourceFilter } from 'components/FilterList';


const BannerPagination = () => <Pagination rowsPerPageOptions={[25, 50]} />;

const FilterSidebar = () => (
    <Box
        sx={{
            order: -1, // display on the left rather than on the right of the list
            maxWidth: '270px',
            minWidth: '270px',
            marginRight: '24px',
            marginTop: '24px',
        }}
    >
        <Card>
            <CardContent>
                <ResourceFilter />
            </CardContent>
        </Card>
    </Box>
);

const ListActions = () => (
    <TopToolbar sx={{ width: '100% !important', justifyContent: 'flex-start', alignItems: 'center' }}>
        <CreateButton label='Додати банер' />
        <ExportButton label='Експорт' />
    </TopToolbar>
);


export const PortalList = (props) => {
    return (
        <List
            {...props}
            aside={<FilterSidebar />}
            pagination={<BannerPagination />}
            actions={<ListActions/>}
            perPage={25}
        >
            <Datagrid>
                <TextField source='name' label='Назва' />
                <FunctionField label='Ресурс' render={({ resource }) => {
                    if (resource?.length > 0) {
                        return resource.map((chosenResource, index) => {
                            return (
                                <Box key={index} sx={{ marginBottom: '8px' }}>
                                    {bannerResourcesNameMap.get(chosenResource)}
                                </Box>
                            )
                        })
                    }
                    return 'Ресурс для відображення не обрано'
                }} />
                <BooleanField source='active' label='Ввімкнено' />
                <EditButton basepath='/admin/portal' label='Редагувати'/>
                <DeleteButton basepath='/admin/portal' label='Видалити' />
            </Datagrid>
        </List>
    )
}
