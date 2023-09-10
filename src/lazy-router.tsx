import { ReactNode } from "react";
import { LoaderFunction, createBrowserRouter } from "react-router-dom";





export type PageRoute = {
  path: string;
  LoadPageContent: () => Promise<{
    default: () => ReactNode;
    ErrorBoundary?: () => ReactNode;
    loader?: LoaderFunction;
  }>;
}


const pages = import.meta.glob(
  "./pages/**/*.{tsx,jsx}",
  { eager: false }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as Record<string, () => any>



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
    path: (fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`),
    LoadPageContent: pages[path],
  });
}



const router = createBrowserRouter(
  routes.map(({ path, LoadPageContent }) => ({
    path: path,
    lazy: async () => {
      const { default: PageContent, ErrorBoundary, loader } = (await LoadPageContent())
      return {
        element: <PageContent />,
        ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
        loader,
      }
    }
  }))
);

export default router;
