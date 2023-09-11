import fs from 'node:fs'
import path from 'node:path'



/* eslint-disable no-undef */
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'


const newStaticPageContent = `
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
            let filepath = path.join(process.cwd(), "src/pages", `${argv.page}.tsx`)
            if (fs.existsSync(filepath)) {
                return console.error("Could not create, a page already exist at path", argv.page)
            }
            if (argv.page.split("/").length > 1) {
                const filedir = filepath.substring(0, filepath.lastIndexOf('/'))
                if (!fs.existsSync(filedir)) {
                    fs.mkdirSync(filedir, { recursive: true })
                }
            }
            fs.writeFileSync(filepath, newStaticPageContent, { encoding: "utf-8" })
            console.log("New page created", argv.page)
        })
    .parse()