import * as React from "react";
import { Admin, Resource, defaultTheme } from 'react-admin';

import { CustomDataProvider } from "utils/customDataProvider";
import { authProvider } from "auth";

import { PortalList } from 'components/PortalList';
import { CreateBanner } from "components/CreateBanner";
import { EditBanner } from "components/EditBanner";


const theme = {
    ...defaultTheme,
    sidebar: {
        width: 150, // The default value is 240
        closedWidth: 0, // The default value is 55
    },
};

const AdminPanel = () => (
    <Admin
        requireAuth
        theme={theme}
        basename='/admin'
        authProvider={authProvider}
        dataProvider={CustomDataProvider}
    >
        <Resource
            name='bannerPanel'
            options={{label: 'Банери', isMenuParent: true }}
            list={PortalList}
            create={CreateBanner}
            edit={EditBanner}
        />
    </Admin>
);

export default AdminPanel
