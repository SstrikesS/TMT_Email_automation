import { BrowserRouter,Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import {Route, Routes} from "react-router-dom";
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import HeaderLayout from "./pages/HeaderLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import PageName from "./pages/pagename.jsx";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info

  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: t("NavigationMenu.pageName"),
                  destination: "/pagename",
                },
                {
                  label: 'headerLayout',
                  destination: "/HeaderLayout",
                },
              ]}
            />
              <Routes >
                  <Route key={"*"} path={"*"} element={<NotFound/>}/>
                  <Route element={<HeaderLayout/>}>
                      <Route key={"pagename"} path={"/pagename"} element={<PageName/>}/>
                  </Route>
              </Routes>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
