import React from 'react';
import { Button as NButton, IButtonProps, Heading, useTheme } from 'native-base';

type ButtonProps = IButtonProps & {
    title: string
}

export function Button({ title, ...rest }: ButtonProps) {
    const { colors, fontSizes } = useTheme()
    return (
        <NButton
            bg={colors.green[700]}
            h={14}
            fontSize={fontSizes.sm}
            rounded={fontSizes.sm}
            _pressed={{ bg: colors.green[500] }}
            mt={8}
            {...rest}
        >
            <Heading color={colors.white} fontSize={fontSizes.lg}
            >
                {title}
            </Heading>
        </NButton>
    );
}