import { useRef, useState } from "react";
import { Camera, ImageUp, ShieldCheck } from "lucide-react";
import { errorPlaceGuide, identifyPlace, ScanRequestError, type PlaceGuide } from "@/lib/scanLearnService";

interface ScanViewfinderProps {
  onResult: (guide: PlaceGuide | null) => void;
}

export default function ScanViewfinder({ onResult }: ScanViewfinderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [placeSubtitle, setPlaceSubtitle] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPlaceName(null);
    onResult(null);
    setIsIdentifying(true);

    let guide: PlaceGuide;
    try {
      guide = await identifyPlace(file);
    } catch (err) {
      guide = errorPlaceGuide(
        err instanceof ScanRequestError ? err.message : "Something went wrong while scanning. Please try again.",
      );
    } finally {
      setIsIdentifying(false);
    }

    setPlaceName(guide.placeName);
    setPlaceSubtitle(guide.placeSubtitle);
    onResult(guide);
  }

  function handleRetake() {
    setPreviewUrl(null);
    setPlaceName(null);
    onResult(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-foreground shadow-md select-none">
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Scanned public place" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/40 pointer-events-none" />

            {isIdentifying && (
              <>
                <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-background/80 rounded-tl-sm" />
                    <div className="w-6 h-6 border-t-2 border-r-2 border-background/80 rounded-tr-sm" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-background/80 rounded-bl-sm" />
                    <div className="w-6 h-6 border-b-2 border-r-2 border-background/80 rounded-br-sm" />
                  </div>
                </div>
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 animate-pulse pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/95 backdrop-blur-sm text-foreground shadow-sm text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Identifying place...
                  </span>
                </div>
              </>
            )}

            {!isIdentifying && placeName && (
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-background/95 backdrop-blur-md shadow-md text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-primary shrink-0" />
                  <div className="flex flex-col min-w-0">
                    {placeSubtitle && <span className="text-[11px] text-muted-foreground truncate">{placeSubtitle}</span>}
                    <span className="text-sm font-semibold text-foreground truncate">{placeName}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-background/70 px-6 text-center">
            <Camera size={32} />
            <p className="text-sm">Take a photo or upload one of a public place to get started.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => (previewUrl ? handleRetake() : cameraInputRef.current?.click())}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-accent transition-colors shadow-sm"
        >
          <Camera size={18} className="text-primary" />
          {previewUrl ? "Retake Photo" : "Take Photo"}
        </button>
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-accent transition-colors shadow-sm"
        >
          <ImageUp size={18} className="text-primary" />
          Gallery Upload
        </button>
      </div>

      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent/40 text-muted-foreground text-xs">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-primary" />
          Image processed through the backend server
        </span>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
