import { useEffect, useRef, useState } from 'react';

interface FrameBudget {
  avgFrameTime: number;
  shouldReduceQuality: boolean;
  qualityLevel: number; // 0..1, where 1 is full quality
}

/**
 * Monitors frame performance and suggests quality reduction
 * @param targetMs - Target frame time in milliseconds (default: 16.67ms for 60fps)
 * @returns Frame budget information
 */
export function useFrameBudget(targetMs: number = 16.67): FrameBudget {
  const [budget, setBudget] = useState<FrameBudget>({
    avgFrameTime: 0,
    shouldReduceQuality: false,
    qualityLevel: 1.0,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    let rafId: number;

    const measureFrame = (timestamp: number) => {
      if (lastFrameTimeRef.current > 0) {
        const frameTime = timestamp - lastFrameTimeRef.current;
        frameTimesRef.current.push(frameTime);

        // Keep only last 60 frames
        if (frameTimesRef.current.length > 60) {
          frameTimesRef.current.shift();
        }

        // Calculate average every 30 frames
        if (frameTimesRef.current.length >= 30 && frameTimesRef.current.length % 30 === 0) {
          const avg = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
          const shouldReduce = avg > 20; // If avg frame time > 20ms

          let qualityLevel = 1.0;
          if (avg > 30) {
            qualityLevel = 0.5; // Severe reduction
          } else if (avg > 20) {
            qualityLevel = 0.7; // Moderate reduction
          }

          setBudget({
            avgFrameTime: avg,
            shouldReduceQuality: shouldReduce,
            qualityLevel,
          });
        }
      }

      lastFrameTimeRef.current = timestamp;
      rafId = requestAnimationFrame(measureFrame);
    };

    rafId = requestAnimationFrame(measureFrame);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [targetMs]);

  return budget;
}
