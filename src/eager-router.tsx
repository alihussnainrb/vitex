import { ReactNode } from "react";
import { LoaderFunction, createBrowserRouter } from "react-router-dom";




export type PageRoute = {
  path: string;
  PageContent: () => ReactNode;
  ErrorBoundary?: () => JSX.Element;
  loader?: LoaderFunction;
}



const pages = import.meta.glob(
  "./pages/**/*.{tsx,jsx}",
  { eager: true }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as Record<string, any>



const routes: PageRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: pages[path].path ?? (fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`),
    PageContent: pages[path].default,
    loader: pages[path]?.loader,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ PageContent, path, loader, ErrorBoundary }) => ({
    path: path,
    loader: loader,
    element: <PageContent />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);


export default router;