import { logger } from 'common-ts-layer';
// This package will be available once we're in aws because it is installed within the common layer. 
//Make sure to install npm package if we're in development as a dev dependency.
//npm i --save-dev common-ts-layer@npm:@ynpact/common-ts-layer

export const handler = async () => {

    const data = { id: 1, name: 'Test Data' };
    logger.info('Data fetched successfully', data );
    logger.debug('Data fetched successfully', data );
    logger.warn('Data fetched successfully', data );
    logger.error('Data fetched successfully', data );

    return {
        'statusCode': 200,
        'body': "Hello world!"
    }
};