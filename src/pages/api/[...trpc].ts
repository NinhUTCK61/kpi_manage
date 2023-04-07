import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { NextApiRequest, NextApiResponse } from 'next';
import { createOpenApiNextHandler } from 'trpc-openapi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    // Handle incoming OpenAPI requests
    return createOpenApiNextHandler({
        router: appRouter,
        createContext: createTRPCContext,
    })(req, res);
};

export default handler;