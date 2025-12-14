import React, { useState, useRef, useEffect } from 'react';
import { ModelVariants } from '../types';

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
    const modelViewerRef = useRef<HTMLElement>(null);

    // Determine which model to display
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

            // Apply varied colors to materials
            try {
                const model = (modelViewer as any).model;

                if (model && model.materials) {
                    // CPK color palette - varied colors for visual appeal
                    const colorPalette = [
                        [1.0, 0.05, 0.05, 1],   // Red (Oxygen-like)
                        [0.19, 0.31, 0.97, 1],  // Blue (Nitrogen-like)
                        [0.56, 0.56, 0.56, 1],  // Gray (Carbon-like)
                        [1.0, 1.0, 0.19, 1],    // Yellow (Sulfur-like)
                        [1.0, 0.5, 0.0, 1],     // Orange (Phosphorus-like)
                        [0.12, 0.94, 0.12, 1],  // Green (Chlorine-like)
                        [0.56, 0.88, 0.31, 1],  // Light Green (Fluorine-like)
                        [1.0, 1.0, 1.0, 1],     // White (Hydrogen-like)
                    ];

                    // Apply colors to all materials
                    model.materials.forEach((material: any, index: number) => {
                        if (material && material.pbrMetallicRoughness) {
                            // Use palette colors in sequence
                            const color = colorPalette[index % colorPalette.length];

                            // Set the base color
                            material.pbrMetallicRoughness.setBaseColorFactor(color);

                            // Set metallic and roughness for better appearance
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
            if (event.detail.totalProgress === 1) {
                setIsLoading(false);
            }
        };

        // Reset loading when model changes
        setIsLoading(true);

        modelViewer.addEventListener('load', handleLoad);
        modelViewer.addEventListener('progress', handleProgress);

        return () => {
            modelViewer.removeEventListener('load', handleLoad);
            modelViewer.removeEventListener('progress', handleProgress);
        };
    }, [currentModelPath]);

    return (
        <div className="w-full h-full relative">
            {/* Model Variant Selector */}
            {modelVariants && (
                <div className="absolute top-4 left-4 z-10 bg-slate-800/90 backdrop-blur rounded-lg p-2 flex gap-2">
                    {(Object.keys(modelVariants) as ModelVariantType[]).map((variant) => (
                        <button
                            key={variant}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${selectedVariant === variant
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            {variantLabels[variant]}
                        </button>
                    ))}
                </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-xl z-20">
                    <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-3"></div>
                        <p className="text-sm">Carregando modelo 3D...</p>
                    </div>
                </div>
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
