import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import {Route, Routes} from "react-router-dom";
import {
    AppBridgeProvider,
    QueryProvider,
    PolarisProvider,
} from "./components";
import HeaderLayout from "./pages/HeaderLayout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Editflow from "./pages/editflow.jsx";

export default function App() {
    // Any .tsx or .jsx files in /pages will become a route
    // See documentation for <Routes /> for more info
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
    const {t} = useTranslation();

    return (
        <PolarisProvider>
            <BrowserRouter>
                <AppBridgeProvider>
                    <QueryProvider>
                        <NavigationMenu
                            navigationLinks={[
                                {
                                    label: t("Dashboard"),
                                    destination: "/dashboard",
                                },
                                {
                                    label: t("Edit Flow"),
                                    destination: "/editflow",
                                },
                            ]}
                        />
                        <Routes>
                            <Route key={"editflow"} path={"editflow/:idTemplate?"} element={<Editflow/>}/>
                            <Route element={<HeaderLayout/>}>
                                <Route key={"dashboard"} path={"/dashboard"} element={<Dashboard/>}/>

                            </Route>
                        </Routes>
                    </QueryProvider>
                </AppBridgeProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
