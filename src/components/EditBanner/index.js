import React from 'react'
import {
    Edit, SimpleForm, TextInput, SelectArrayInput, ImageInput, ImageField, BooleanInput, TopToolbar,
    ListButton, SaveButton, DeleteButton, TextField, useRedirect, useNotify,
} from 'react-admin'
import { Card, Box, CardContent, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { bannerResources } from 'consts/bannerResources';
import { validateBannerCreation } from 'utils/validationForm';


const Aside = () => (
    <Box sx={{width: '300px', marginLeft: '20px'}}>
        <Card>
            <CardContent>
                <Typography variant='h6' gutterBottom>
                    Загальна інформація
                </Typography>
                <Stack spacing={2}>
                    <div>
                        <Typography variant="body2">
                            Автор
                        </Typography>
                        <TextField source="author"/>
                    </div>
                    <div>
                        <Typography variant="body2">
                            Внутрішній ID банера
                        </Typography>
                        <TextField
                            label="id"
                            source='id'
                        />
                    </div>
                    <div>
                        <Typography variant="body2">
                            Дата створення
                        </Typography>
                        <TextField source="publicationDate"/>
                    </div>
                    <div>
                        <Typography variant="body2">
                            Остання дата редагування
                        </Typography>
                        <TextField source="lastUpdateDate"/>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    </Box>
);

const BannerEditToolbar = () => (
    <TopToolbar sx={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '16px',
    }}>
        <SaveButton type="button" label="Відредагувати банер" />
        <DeleteButton type="button" label="Видалити банер" />
    </TopToolbar>
);

const ListActions = () => (
    <TopToolbar sx={{
        width: '100% !important',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '8px',
    }}>
        <ListButton
            basepath="/admin"
            icon={<ChevronLeftIcon />}
            label="Повернутись до списку"
        />
    </TopToolbar>
);


export const EditBanner = (props) => {
    return (
        <Edit
            {...props}
            redirect="show"
            title='Відреагувати банер'
            aside={<Aside/>}
            actions={<ListActions/>}
            mutationMode="pessimistic"
        >
            <SimpleForm
                validate={validateBannerCreation}
                toolbar={<BannerEditToolbar />}
            >
                <Typography variant='h5' gutterBottom>
                    Відредагувати банер
                </Typography>
                <TextInput
                    required
                    label="Назва (внутрішня)"
                    source='name'
                    sx={{
                        'width': '100%',
                    }}
                />
                <TextInput
                    multiline
                    resettable
                    label="Опис (внутрішній)"
                    source='description'
                    sx={{
                        'width': '100%',
                    }}
                />
                <TextInput
                    required
                    multiline
                    resettable
                    label="Посилання"
                    source='link'
                    sx={{
                        'width': '100%',
                    }}
                />
                <TextInput
                    required
                    multiline
                    resettable
                    label="Alt (альтернативний опис)"
                    source='alt'
                    sx={{
                        'width': '100%',
                    }}
                />
                <SelectArrayInput
                    required
                    label='Ресурс в якому буде опубліковано банер'
                    source='resource'
                    choices={bannerResources}
                    sx={{
                        'width': '100%',
                    }}
                />
                <BooleanInput
                    label="Ввімкнено"
                    source="active"
                />
                <ImageInput
                    source="newBanner"
                    label="Замінити банер"
                    accept="image/*,.png’"
                    placeholder={<p>Замінити банер</p>}
                >
                    <ImageField
                        source="newBanner"
                        title="title"
                        sx={{
                            'maxHeight': '100%',
                            'maxWidth': '1200px',
                        }}
                    />
                </ImageInput>
                <strong>
                    Завантажений банер
                </strong>
                <br/>
                <ImageField
                    source="fileLink"
                    title="title"
                    sx={{
                        'maxHeight': '100%',
                        'maxWidth': '1200px',
                    }}
                />
            </SimpleForm>
        </Edit>
    )
}
