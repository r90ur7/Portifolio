import { Box, BoxProps } from '@chakra-ui/react';

interface SectionDividerProps extends BoxProps {
    variant?: 'gradient' | 'dots' | 'line' | 'wave';
}

const SectionDivider = ({ variant = 'gradient', ...boxProps }: SectionDividerProps) => {
    const getDividerContent = () => {
        switch (variant) {
            case 'dots':
                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={3}
                        py={8}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Box
                                key={i}
                                position="relative"
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bgGradient="linear(to-r, #B650F2, #C86BFD)"
                                opacity={0.6}
                                boxShadow="0 0 8px rgba(182, 80, 242, 0.4)"
                            />
                        ))}
                    </Box>
                );
            case 'line':
                return (
                    <Box
                        position="relative"
                        py={8}
                        _before={{
                            content: '""',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100px',
                            height: '2px',
                            bgGradient: 'linear(to-r, transparent, #B650F2, transparent)',
                        }}
                    />
                );
            case 'wave':
                return (
                    <Box
                        position="relative"
                        py={8}
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #B650F2 50%, transparent)',
                            borderRadius: '50%',
                        }}
                    />
                );
            case 'gradient':
            default:
                return (
                    <Box
                        position="relative"
                        py={8}
                        _before={{
                            content: '""',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '150px',
                            height: '2px',
                            bgGradient: 'linear(to-r, transparent, #B650F2, #C86BFD, #B650F2, transparent)',
                            borderRadius: 'full',
                            boxShadow: '0 0 10px rgba(182, 80, 242, 0.5)',
                        }}
                    />
                );
        }
    };

    return (
        <Box
            width="100%"
            position="relative"
            {...boxProps}
        >
            {getDividerContent()}
        </Box>
    );
};

export default SectionDivider;

