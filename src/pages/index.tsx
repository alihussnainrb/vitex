import { createDataLoader, useLoaderData } from "@/lib/loader.utils";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";




// eslint-disable-next-line react-refresh/only-export-components
export const loader = createDataLoader(async () => {
    return {
        hello: "World"
    }
})


export default function Page() {
    const data = useLoaderData<typeof loader>()
    // Data returned from loader
    console.log(data)
    return (
        <div>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}


export function ErrorBoundary() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = useRouteError();
    return isRouteErrorResponse(error) ? (
        <h1>
            {error.status} {error.statusText}
        </h1>
    ) : (
        <h1>{error.message || error}</h1>
    );
}
ErrorBoundary.displayName = "ErrorBoundary"