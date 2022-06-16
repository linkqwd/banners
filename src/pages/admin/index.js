import dynamic from "next/dynamic"


const App = dynamic(() => import("components/AdminPanel"), { ssr: false })

const AdminPage = () => <App />

export default AdminPage
