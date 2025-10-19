'use client';

/**
 * SkeletonLoader — Loading state with neon shimmer effect
 */

import { colors } from '@/lib/tokens';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'circle' | 'button';
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonLoader({
  variant = 'card',
  width,
  height,
  className = '',
}: SkeletonLoaderProps) {
  const getSize = () => {
    switch (variant) {
      case 'card':
        return { width: width || '100%', height: height || '200px' };
      case 'text':
        return { width: width || '100%', height: height || '20px' };
      case 'circle':
        return { width: width || '40px', height: height || '40px' };
      case 'button':
        return { width: width || '120px', height: height || '40px' };
      default:
        return { width: width || '100%', height: height || '100px' };
    }
  };

  const size = getSize();
  const isCircle = variant === 'circle';

  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: `${colors.gunmetal}40`,
        borderRadius: isCircle ? '50%' : '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="skeleton-shimmer-effect"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            90deg,
            transparent 0%,
            ${colors.electricBlue}20 50%,
            transparent 100%
          )`,
          animation: 'shimmer 2s infinite',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

// Service Card Skeleton
export function ServiceCardSkeleton() {
  return (
    <div
      className="p-4 md:p-6 rounded-lg border-2"
      style={{
        backgroundColor: `${colors.gunmetal}60`,
        borderColor: `${colors.slateLight}20`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
        <SkeletonLoader variant="text" width="60%" height="24px" />
        <SkeletonLoader variant="button" width="80px" height="24px" />
      </div>

      <SkeletonLoader variant="text" width="100%" height="16px" className="mb-2" />
      <SkeletonLoader variant="text" width="80%" height="16px" className="mb-4" />

      <div className="flex flex-wrap gap-2 mb-4">
        <SkeletonLoader variant="button" width="60px" height="24px" />
        <SkeletonLoader variant="button" width="70px" height="24px" />
        <SkeletonLoader variant="button" width="80px" height="24px" />
      </div>

      <SkeletonLoader variant="text" width="40%" height="12px" />
    </div>
  );
}
