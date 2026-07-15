import React, { useState, useCallback } from 'react';
import {
    UploadCloud, Settings, FileImage, X, Check,
    Layers, Sliders, Maximize, Download, ArrowRight, Trash2, Cpu, Copy, Menu
} from 'lucide-react';

export default function Homepage() {
    // Mobile Menu State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);

    const [isConverting, setIsConverting] = useState(false);
    const [conversionDone, setConversionDone] = useState(false);

    const SUPPORTED_FORMATS = ['webp', 'jpeg', 'png', 'avif', 'heic', 'tiff', 'gif', 'ico'];

    const defaultSettings = {
        format: 'webp',
        mode: 'quality', // 'quality' | 'target' | 'resize'
        quality: 80,
        targetSize: '',
        targetUnit: 'KB',
        resizeWidth: '',
        resizeHeight: ''
    };

    // Drag & Drop Handlers
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const addFiles = (fileList) => {
        const newFiles = Array.from(fileList)
            .filter(file => file.type.startsWith('image/'))
            .map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                file,
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2),
                status: 'ready',
                outputSize: null,
                settings: { ...defaultSettings }
            }));

        setFiles(prev => {
            const updatedFiles = [...prev, ...newFiles];
            if (!selectedFileId && updatedFiles.length > 0) {
                setSelectedFileId(updatedFiles[0].id);
            }
            return updatedFiles;
        });
        setConversionDone(false);
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    }, [selectedFileId]);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
        }
    };

    const removeFile = (id) => {
        setFiles(prev => {
            const filtered = prev.filter(f => f.id !== id);
            if (selectedFileId === id) {
                setSelectedFileId(filtered.length > 0 ? filtered[0].id : null);
            }
            return filtered;
        });
    };

    const clearAllFiles = () => {
        setFiles([]);
        setSelectedFileId(null);
        setConversionDone(false);
    };

    // Settings Handlers
    const updateActiveSettings = (key, value) => {
        if (!selectedFileId) return;
        setFiles(prev => prev.map(f =>
            f.id === selectedFileId
                ? { ...f, settings: { ...f.settings, [key]: value } }
                : f
        ));
    };

    const applyToAll = () => {
        if (!selectedFileId) return;
        const activeSettings = files.find(f => f.id === selectedFileId)?.settings;
        if (!activeSettings) return;

        setFiles(prev => prev.map(f => ({ ...f, settings: { ...activeSettings } })));
    };

    // Trigger Mock Conversion
    const handleProcessImages = () => {
        if (files.length === 0) return;
        setIsConverting(true);

        setFiles(prev => prev.map(f => ({ ...f, status: 'converting' })));

        setTimeout(() => {
            setIsConverting(false);
            setConversionDone(true);
            setFiles(prev => prev.map(f => {
                const multiplier = f.settings.mode === 'quality' ? (f.settings.quality / 100) : 0.3;
                return {
                    ...f,
                    status: 'success',
                    outputSize: (parseFloat(f.size) * multiplier).toFixed(2)
                };
            }));
        }, 2500);
    };

    const activeFile = files.find(f => f.id === selectedFileId);

    return (
        <div className="min-h-screen bg-black text-[#EDEDED] font-sans selection:bg-[#333] antialiased pb-20 lg:pb-0 relative">

            {/* Vercel Dark Header */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between relative">
                    <div className="flex items-center gap-2 sm:gap-3 font-semibold text-sm tracking-tight text-white">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-black flex items-center justify-center rounded-[4px]">
                            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        Image Converter
                        <span className="text-[9px] sm:text-[10px] font-mono font-medium px-1.5 py-0.5 bg-white/10 rounded-[4px] text-[#A1A1AA] border border-white/10 tracking-wider uppercase hidden xs:inline-block">
                            Open Source
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-6 text-[13px] font-medium text-[#A1A1AA]">
                        <a href="https://github.com/FIQTOR/image-converter" target="_blank" rel="noopener noreferrer" className="text-white transition-colors">GitHub</a>
                    </div>

                    {/* Mobile Nav Toggle Button */}
                    <button
                        className="md:hidden text-[#A1A1AA] hover:text-white transition-colors p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-14 left-0 w-full bg-[#0A0A0A] border-b border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200 z-40">
                        <div className="flex flex-col px-4 py-4 space-y-4">
                            <a href="#" className="text-[13px] font-medium text-[#A1A1AA] hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="text-[13px] font-medium text-[#A1A1AA] hover:text-white transition-colors">Changelog</a>
                            <a href="#" className="text-[13px] font-medium text-white transition-colors">GitHub</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Dashboard Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

                {/* Left Column: Workspace */}
                <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">

                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">Image Processing Pipeline</h1>
                        <p className="text-[13px] sm:text-[14px] text-[#A1A1AA]">Optimize, resize, and convert images locally in your browser.</p>
                    </div>

                    {/* Drag & Drop Zone */}
                    <div
                        className={`relative flex flex-col items-center justify-center py-10 sm:py-12 px-4 sm:px-6 border border-dashed rounded-lg transition-all duration-200 ${dragActive ? 'border-white bg-white/5' : 'border-white/15 bg-black hover:border-white/30 hover:bg-white/[0.02]'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleChange}
                            accept="image/*"
                            multiple
                        />

                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                            <UploadCloud className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-[13px] sm:text-[14px] font-semibold text-white mb-1">Deploy your images</h3>
                        <p className="text-[12px] sm:text-[13px] text-[#A1A1AA] mb-5 text-center">Drag and drop files here, or click to browse.</p>

                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-white text-black hover:bg-gray-200 text-[12px] sm:text-[13px] font-medium py-2 px-4 sm:px-5 rounded-md transition-all"
                        >
                            Select Files
                        </label>
                    </div>

                    {/* File Queue List */}
                    {files.length > 0 && (
                        <div className="border border-white/10 rounded-lg bg-[#0A0A0A] overflow-hidden">
                            <div className="flex justify-between items-center p-3 border-b border-white/10 bg-[#111]">
                                <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                                    <Cpu className="w-3.5 h-3.5" />
                                    <span>Queue • {files.length}</span>
                                </div>
                                <button
                                    onClick={clearAllFiles}
                                    className="text-[11px] sm:text-[12px] text-[#A1A1AA] hover:text-red-400 flex items-center gap-1 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Clear
                                </button>
                            </div>

                            {/* Mobile optimized height to prevent excessive scrolling */}
                            <div className="divide-y divide-white/5 max-h-[250px] lg:max-h-[400px] overflow-y-auto custom-scrollbar">
                                {files.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedFileId(item.id)}
                                        className={`p-3 flex items-center justify-between cursor-pointer transition-all group ${selectedFileId === item.id
                                            ? 'bg-white/10 border-l-2 border-white'
                                            : 'hover:bg-white/5 border-l-2 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0 flex-1">
                                            <FileImage className={`w-4 h-4 flex-shrink-0 hidden xs:block ${selectedFileId === item.id ? 'text-white' : 'text-[#888]'}`} />
                                            <div className="flex flex-col min-w-0">
                                                <p className={`text-[12px] sm:text-[13px] font-medium truncate ${selectedFileId === item.id ? 'text-white' : 'text-[#EDEDED]'}`}>
                                                    {item.name}
                                                </p>
                                                <p className="text-[9px] sm:text-[10px] font-mono text-[#888] mt-0.5 truncate">
                                                    FMT: {item.settings.format.toUpperCase()} • {item.settings.mode.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 sm:gap-5 pl-2 flex-shrink-0">
                                            <div className="text-[10px] sm:text-[12px] font-mono text-[#888] flex flex-col sm:flex-row items-end sm:items-center gap-0.5 sm:gap-2">
                                                <span>{item.size} MB</span>
                                                {item.outputSize && (
                                                    <div className="flex items-center gap-1">
                                                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#555] hidden sm:block" />
                                                        <span className="text-white font-semibold">{item.outputSize} MB</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-6 sm:w-12 flex justify-end items-center">
                                                {item.status === 'converting' && (
                                                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                )}
                                                {item.status === 'success' && (
                                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                                                )}
                                                {item.status === 'ready' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                                                        className="text-[#555] hover:text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Settings Panel */}
                <div className="lg:col-span-4">
                    <div className="border border-white/10 rounded-lg bg-[#0A0A0A] lg:sticky lg:top-20 flex flex-col max-h-none lg:max-h-[600px] mb-10 lg:mb-0 shadow-xl">

                        {/* Header Settings */}
                        <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#111] rounded-t-lg shrink-0">
                            <div className="flex items-center gap-2">
                                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                <h2 className="text-[12px] sm:text-[13px] font-semibold text-white">Configuration</h2>
                            </div>
                            {activeFile && (
                                <button
                                    onClick={applyToAll}
                                    className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#A1A1AA] hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-all"
                                >
                                    <Copy className="w-3 h-3" /> Apply to all
                                </button>
                            )}
                        </div>

                        {/* Scrollable Settings Body */}
                        <div className="p-4 sm:p-5 overflow-y-auto flex-1 custom-scrollbar min-h-[250px]">
                            {!activeFile ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-[#888] space-y-3 py-10">
                                    <Sliders className="w-8 h-8 opacity-20" />
                                    <p className="text-[12px] sm:text-[13px]">Select a file from the queue<br />to configure its settings.</p>
                                </div>
                            ) : (
                                <div className="space-y-6 sm:space-y-7">
                                    {/* Selected File Indicator */}
                                    <div className="bg-white/5 border border-white/10 p-2 sm:p-3 rounded-md flex flex-col gap-1">
                                        <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#888]">Editing File:</span>
                                        <span className="text-[11px] sm:text-[12px] font-medium text-white truncate">{activeFile.name}</span>
                                    </div>

                                    {/* Target Format */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="text-[11px] sm:text-[12px] font-semibold text-[#EDEDED]">Target Format</label>
                                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                                            {SUPPORTED_FORMATS.map((fmt) => (
                                                <button
                                                    key={fmt}
                                                    onClick={() => updateActiveSettings('format', fmt)}
                                                    className={`py-1.5 text-[10px] sm:text-[11px] font-mono font-medium rounded border transition-all ${activeFile.settings.format === fmt
                                                        ? 'border-white bg-white text-black'
                                                        : 'border-white/10 bg-[#111] text-[#888] hover:border-white/30 hover:text-white'
                                                        }`}
                                                >
                                                    {fmt.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-white/10" />

                                    {/* Strategy Tabs */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="text-[11px] sm:text-[12px] font-semibold text-[#EDEDED]">Strategy</label>
                                        <div className="flex p-1 border border-white/10 rounded bg-[#111]">
                                            {[
                                                { id: 'quality', label: 'Quality', icon: Sliders },
                                                { id: 'target', label: 'Max Size', icon: Layers },
                                                { id: 'resize', label: 'Resize', icon: Maximize }
                                            ].map(tab => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => updateActiveSettings('mode', tab.id)}
                                                    className={`flex-1 flex flex-col xs:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 xs:py-1.5 text-[10px] sm:text-[12px] font-medium rounded-[4px] transition-all ${activeFile.settings.mode === tab.id
                                                        ? 'bg-[#333] text-white shadow-sm'
                                                        : 'text-[#888] hover:text-white'
                                                        }`}
                                                >
                                                    <tab.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                    <span className="hidden xs:inline">{tab.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dynamic Inputs based on Strategy */}
                                    <div className="min-h-[80px]">
                                        {activeFile.settings.mode === 'quality' && (
                                            <div className="space-y-3 animate-in fade-in duration-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] sm:text-[12px] text-[#888]">Compression Level</span>
                                                    <span className="text-[11px] sm:text-[12px] font-mono text-white">{activeFile.settings.quality}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="100"
                                                    value={activeFile.settings.quality}
                                                    onChange={(e) => updateActiveSettings('quality', e.target.value)}
                                                    className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-white"
                                                />
                                            </div>
                                        )}

                                        {activeFile.settings.mode === 'target' && (
                                            <div className="space-y-2 animate-in fade-in duration-200">
                                                <span className="text-[11px] sm:text-[12px] text-[#888] block">Strict File Size Limit</span>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 500"
                                                        value={activeFile.settings.targetSize}
                                                        onChange={(e) => updateActiveSettings('targetSize', e.target.value)}
                                                        className="flex-1 w-full bg-black border border-white/10 rounded py-1.5 px-3 text-[12px] sm:text-[13px] text-white focus:outline-none focus:border-white transition-colors placeholder:text-[#555]"
                                                    />
                                                    <select
                                                        value={activeFile.settings.targetUnit}
                                                        onChange={(e) => updateActiveSettings('targetUnit', e.target.value)}
                                                        className="bg-[#111] border border-white/10 rounded text-[12px] sm:text-[13px] text-white px-2 focus:outline-none focus:border-white"
                                                    >
                                                        <option value="KB">KB</option>
                                                        <option value="MB">MB</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        {activeFile.settings.mode === 'resize' && (
                                            <div className="space-y-2 animate-in fade-in duration-200">
                                                <span className="text-[11px] sm:text-[12px] text-[#888] block">Dimensions (px)</span>
                                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                                    <div>
                                                        <input
                                                            type="number"
                                                            placeholder="Width"
                                                            value={activeFile.settings.resizeWidth}
                                                            onChange={(e) => updateActiveSettings('resizeWidth', e.target.value)}
                                                            className="w-full bg-black border border-white/10 rounded py-1.5 px-3 text-[12px] sm:text-[13px] text-white focus:outline-none focus:border-white placeholder:text-[#555]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="number"
                                                            placeholder="Height"
                                                            value={activeFile.settings.resizeHeight}
                                                            onChange={(e) => updateActiveSettings('resizeHeight', e.target.value)}
                                                            className="w-full bg-black border border-white/10 rounded py-1.5 px-3 text-[12px] sm:text-[13px] text-white focus:outline-none focus:border-white placeholder:text-[#555]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Execution Button */}
                        <div className="p-3 sm:p-4 border-t border-white/10 bg-[#111] rounded-b-lg shrink-0">
                            {conversionDone ? (
                                <button
                                    onClick={() => alert('Downloading output.zip')}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-[12px] sm:text-[13px] font-medium bg-white text-black hover:bg-gray-200 transition-all"
                                >
                                    <Download className="w-4 h-4" /> Download ZIP
                                </button>
                            ) : (
                                <button
                                    onClick={handleProcessImages}
                                    disabled={files.length === 0 || isConverting}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-[12px] sm:text-[13px] font-medium transition-all ${files.length === 0
                                        ? 'bg-white/5 text-[#555] cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-gray-200'
                                        }`}
                                >
                                    {isConverting ? (
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Deploy Optimization <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}