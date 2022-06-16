import dynamic from "next/dynamic"
const App = dynamic(() => import("components/EditBanner"), { ssr: false })

const AdminEditBannerPage = () => <App />

export default AdminEditBannerPage;
