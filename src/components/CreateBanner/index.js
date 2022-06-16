import React from 'react'
import {
    Create, SimpleForm, TextInput, ImageInput, ImageField, useGetIdentity, useRedirect,
    BooleanInput, SelectArrayInput, TopToolbar, ListButton, SaveButton, useNotify,
} from 'react-admin'
import { Card, Box, CardContent, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { bannerResources } from "consts/bannerResources";
import { validateBannerCreation } from 'utils/validationForm';


const Aside = () => {
    return (
        <Box sx={{width: '300px', marginLeft: '20px'}}>
            <Card>
                <CardContent>
                    <Typography gutterBottom>
                        Загальна інформація
                    </Typography>
                    <Typography variant="body2">
                        {'Для публікації банеру вкажіть всі обов\'язкові поля та додайте зображення.'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

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

const BannerCreateToolbar = () => (
    <TopToolbar sx={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '16px',
    }}>
        <SaveButton type="button" label="Створити банер" />
    </TopToolbar>
);


export const CreateBanner = (props) => {
    const { identity: { fullName } = {} } = useGetIdentity();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Банер успішно створено`);
        redirect('list');
    };

    return (
        <Create
            {...props}
            redirect="list"
            title='Створити банер'
            aside={<Aside/>}
            actions={<ListActions/>}
            mutationOptions={{ onSuccess }}
            record={{
                author: fullName,
            }}
        >
                <SimpleForm
                    validate={validateBannerCreation}
                    toolbar={<BannerCreateToolbar />}
                >
                    <Typography variant='h5' gutterBottom>
                        Додати новий банер
                    </Typography>
                    <TextInput
                        disabled
                        source='author'
                        sx={{ display: 'none' }}
                    />
                    <TextInput
                        required
                        label="Назва (внутрішня)"
                        source='name'
                        fullWidth
                    />
                    <TextInput
                        multiline
                        resettable
                        label="Опис (внутрішній)"
                        source='description'
                        fullWidth
                    />
                    <TextInput
                        required
                        multiline
                        resettable
                        type='url'
                        label="Посилання"
                        source='link'
                        fullWidth
                    />
                    <TextInput
                        required
                        multiline
                        resettable
                        label="Alt (альтернативний опис)"
                        source='alt'
                        fullWidth
                    />
                    <SelectArrayInput
                        required
                        label='Ресурс в якому буде опубліковано банер'
                        source='resource'
                        choices={bannerResources}
                        fullWidth
                    />
                    <BooleanInput
                        label="Ввімкнено"
                        source="active"
                    />
                    <ImageInput
                        source="newBanner"
                        label="Додати банер"
                        accept="image/*,.png’"
                        placeholder={<p>Додати банер</p>}
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
                </SimpleForm>
        </Create>
    )
}
