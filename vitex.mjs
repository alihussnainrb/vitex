import fs from 'node:fs/promises'
import path from 'node:path'



/* eslint-disable no-undef */
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'


const newPageContent = `
import { createTypedLoader, useLoaderData } from "@/lib/loader.utils";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";



type LoaderData = {
    hello: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = createTypedLoader<LoaderData>(() => {
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
`


yargs(hideBin(process.argv))
    .command(
        'create [page]', 'create new page',
        (yargs) => {
            return yargs
                .positional('page', {
                    describe: 'Page name to create page',
                    default: "new-page"
                })
        }, (argv) => {
            console.info(`created page ${argv.page}`)
            const filepath = path.join(process.cwd(), "src/pages", `${argv.page}.tsx`)
            fs.writeFile(filepath, newPageContent, { encoding: "utf-8" })
        })
    .parse()