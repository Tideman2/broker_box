'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import ContentWrapper from '@/layout/components/ContentWrapper';

const circles = [
    { size: 260, top: '10%', left: '15%', speed: 18 },
    { size: 320, top: '60%', left: '70%', speed: 25 },
    { size: 200, top: '75%', left: '25%', speed: 15 },
    { size: 280, top: '30%', left: '80%', speed: 22 },
];

export default function FinalCTASection() {
    return (
        <ContentWrapper>
            <Box
                sx={{
                    position: 'relative',
                    py: 14,
                    px: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "400px"
                }}
            >
                {/* Animated Circles */}
                {circles.map((circle, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: circle.top,
                            left: circle.left,
                            width: circle.size,
                            height: circle.size,
                            borderRadius: '50%',
                            animation: `orbit${index} ${circle.speed}s linear infinite`,
                        }}
                    >
                        {/* Inner spinning sticks */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                animation: `spin ${circle.speed / 2}s linear infinite`,
                            }}
                        >
                            {[...Array(20)].map((_, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: 3,
                                        height: 36,
                                        bgcolor: 'primary.main',
                                        opacity: 0.5,
                                        transformOrigin: `center -${circle.size / 2.5}px`,
                                        transform: `rotate(${i * 18}deg)`,
                                        borderRadius: 2,
                                        boxShadow: '0 0 12px rgba(0,214,255,0.6)',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                ))}

                {/* Content */}
                <Stack
                    spacing={4}
                    alignItems="center"
                    textAlign="center"
                    sx={{ position: 'relative', zIndex: 2 }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textShadow: '0 0 25px rgba(0,214,255,0.25)',
                        }}
                    >
                        Join a new generation of investors
                    </Typography>

                    <Button
                        size="large"
                        variant="contained"
                        sx={{
                            px: 5,
                            py: 1.6,
                        }}
                    >
                        Get Started
                    </Button>
                </Stack>

                {/* Animations */}
                <style>
                    {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes orbit0 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(40px, -30px); }
              100% { transform: translate(0, 0); }
            }

            @keyframes orbit1 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(-50px, 40px); }
              100% { transform: translate(0, 0); }
            }

            @keyframes orbit2 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(30px, 50px); }
              100% { transform: translate(0, 0); }
            }

            @keyframes orbit3 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(-40px, -40px); }
              100% { transform: translate(0, 0); }
            }
          `}
                </style>
            </Box>
        </ContentWrapper>
    );
}