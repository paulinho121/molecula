import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModelVariants } from '../types';
import { cn } from '../lib/utils';

interface MoleculeViewer3DProps {
    modelPath: string;
    moleculeName: string;
    formula: string;
    alt?: string;
    modelVariants?: ModelVariants;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                alt?: string;
                ar?: boolean;
                'ar-modes'?: string;
                'camera-controls'?: boolean;
                'touch-action'?: string;
                'auto-rotate'?: boolean;
                'shadow-intensity'?: string;
                'environment-image'?: string;
                'exposure'?: string;
                'shadow-softness'?: string;
                style?: React.CSSProperties;
            };
        }
    }
}

type ModelVariantType = 'cpk' | 'bas' | 'sticks';

const MoleculeViewer3D: React.FC<MoleculeViewer3DProps> = ({
    modelPath,
    moleculeName,
    formula,
    alt,
    modelVariants
}) => {
    const [selectedVariant, setSelectedVariant] = useState<ModelVariantType>('cpk');
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const modelViewerRef = useRef<HTMLElement>(null);

    const currentModelPath = modelVariants && modelVariants[selectedVariant]
        ? modelVariants[selectedVariant]
        : modelPath;

    const variantLabels: Record<ModelVariantType, string> = {
        cpk: 'CPK (Cores)',
        bas: 'Bola-Bastão',
        sticks: 'Bastões'
    };

    useEffect(() => {
        const modelViewer = modelViewerRef.current;
        if (!modelViewer) return;

        const handleLoad = () => {
            setIsLoading(false);
            try {
                const model = (modelViewer as any).model;
                if (model && model.materials) {
                    const colorPalette = [
                        [1.0, 0.05, 0.05, 1],
                        [0.19, 0.31, 0.97, 1],
                        [0.56, 0.56, 0.56, 1],
                        [1.0, 1.0, 0.19, 1],
                        [1.0, 0.5, 0.0, 1],
                        [0.12, 0.94, 0.12, 1],
                        [0.56, 0.88, 0.31, 1],
                        [1.0, 1.0, 1.0, 1],
                    ];

                    model.materials.forEach((material: any, index: number) => {
                        if (material && material.pbrMetallicRoughness) {
                            const color = colorPalette[index % colorPalette.length];
                            material.pbrMetallicRoughness.setBaseColorFactor(color);
                            material.pbrMetallicRoughness.setMetallicFactor(0.0);
                            material.pbrMetallicRoughness.setRoughnessFactor(0.8);
                        }
                    });
                }
            } catch (error) {
                console.error('Error applying colors to materials:', error);
            }
        };

        const handleProgress = (event: any) => {
            const percent = event.detail.progress;
            setProgress(Math.round(percent * 100));
            if (event.detail.totalProgress === 1) {
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        setProgress(0);

        modelViewer.addEventListener('load', handleLoad);
        modelViewer.addEventListener('progress', handleProgress);

        return () => {
            modelViewer.removeEventListener('load', handleLoad);
            modelViewer.removeEventListener('progress', handleProgress);
        };
    }, [currentModelPath]);

    return (
        <div className="w-full h-full relative rounded-xl overflow-hidden">
            {/* Model Variant Selector */}
            {modelVariants && (
                <motion.div 
                    className="absolute top-4 left-4 z-10 bg-slate-800/90 backdrop-blur rounded-lg p-2 flex gap-2 shadow-lg"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {(Object.keys(modelVariants) as ModelVariantType[]).map((variant) => (
                        <button
                            key={variant}
                            onClick={() => setSelectedVariant(variant)}
                            className={cn(
                                "px-3 py-1.5 rounded text-sm font-medium transition-all",
                                selectedVariant === variant
                                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:scale-105'
                            )}
                        >
                            {variantLabels[variant]}
                        </button>
                    ))}
                </motion.div>
            )}

            {/* Loading Overlay with Progress */}
            {isLoading && (
                <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-xl z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="relative w-20 h-20 mb-4">
                        <svg className="animate-spin w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-slate-700"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="text-blue-500"
                                strokeWidth="8"
                                strokeDasharray={264}
                                strokeDashoffset={264 - (264 * progress) / 100}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                            {progress}%
                        </span>
                    </div>
                    <p className="text-sm text-slate-300 animate-pulse">Carregando modelo 3D...</p>
                </motion.div>
            )}

            <model-viewer
                ref={modelViewerRef as any}
                src={currentModelPath}
                alt={alt || `Modelo 3D de ${moleculeName} (${formula})`}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                touch-action="pan-y"
                auto-rotate
                shadow-intensity="1"
                environment-image="neutral"
                exposure="1.5"
                shadow-softness="1"
                style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                }}
                className="rounded-xl"
            >
            </model-viewer>
        </div>
    );
};

export default MoleculeViewer3D;
