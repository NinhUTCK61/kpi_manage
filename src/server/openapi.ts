import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from './api/root';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'Example CRUD API',
    description: 'OpenAPI compliant REST API built using tRPC with Next.js',
    version: '1.0.0',
    baseUrl: `${process.env.NEXTAUTH_URL}`,
});