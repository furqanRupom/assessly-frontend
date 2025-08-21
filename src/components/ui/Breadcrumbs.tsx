import { Flex, Separator, Text } from '@radix-ui/themes';
import * as React from 'react';

interface IBreadcrumbsProps {
    breadcrumbs: string[];
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <Flex gap="2" align="center">
            {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    <Text className='text-primary-400' size="2">{crumb}</Text>
                    {index < breadcrumbs.length - 1 && <Separator orientation="vertical" />}
                </React.Fragment>
            ))}
        </Flex>
    );
};

export default Breadcrumbs;
