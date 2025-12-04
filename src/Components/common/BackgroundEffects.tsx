import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import ParticlesBackground from './ParticlesBackground';
import { useAnimations } from '@/contexts/AnimationContext';

// Animated gradient keyframes - mais lento para performance
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundEffects = () => {
  const { animationsEnabled } = useAnimations();

  React.useEffect(() => {
    console.log('🎨 Animations enabled:', animationsEnabled);
  }, [animationsEnabled]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
    >
      {/* Base gradient background - Deep space */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(to-b, #0a0e1a, #0F172A, #0a0e1a)"
      />

      {/* Animated gradient overlay - Otimizado */}
      {animationsEnabled && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          background="linear-gradient(-45deg, #0a0e1a, #0d1117, #0F172A, #0d1117)"
          backgroundSize="400% 400%"
          animation={`${gradientShift} 30s ease infinite`}
          opacity={0.08}
          willChange="background-position"
        />
      )}

      {/* Particles layer */}
      {animationsEnabled && <ParticlesBackground />}

      {/* Subtle corner gradients - Cantos suaves e responsivos */}
      {animationsEnabled && (
        <>
          <Box
            position="absolute"
            top={0}
            left={0}
            width={{ base: "150px", md: "200px", lg: "300px" }}
            height={{ base: "150px", md: "200px", lg: "300px" }}
            bgGradient="radial(circle at top left, rgba(139, 92, 246, 0.08), transparent)"
            pointerEvents="none"
          />

          <Box
            position="absolute"
            top={0}
            right={0}
            width={{ base: "150px", md: "200px", lg: "300px" }}
            height={{ base: "150px", md: "200px", lg: "300px" }}
            bgGradient="radial(circle at top right, rgba(236, 72, 153, 0.06), transparent)"
            pointerEvents="none"
          />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            width={{ base: "150px", md: "200px", lg: "300px" }}
            height={{ base: "150px", md: "200px", lg: "300px" }}
            bgGradient="radial(circle at bottom left, rgba(59, 130, 246, 0.05), transparent)"
            pointerEvents="none"
          />

          <Box
            position="absolute"
            bottom={0}
            right={0}
            width={{ base: "150px", md: "200px", lg: "300px" }}
            height={{ base: "150px", md: "200px", lg: "300px" }}
            bgGradient="radial(circle at bottom right, rgba(139, 92, 246, 0.07), transparent)"
            pointerEvents="none"
          />
        </>
      )}
    </Box>
  );
};

export default BackgroundEffects;
