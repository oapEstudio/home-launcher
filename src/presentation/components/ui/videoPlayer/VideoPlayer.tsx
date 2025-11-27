import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  file: File | Blob;
  height?: number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
};

const inferMime = (f: File | Blob): string => {
  
  const t = (f as File).type?.trim();
  
  if (t) return t;
  
  const name = (f as File).name || '';
  const ext = name.split('.').pop()?.toLowerCase();
  
  if (ext === 'webm') return 'video/webm';
  if (ext === 'ogv' || ext === 'ogg') return 'video/ogg';
  
  return 'video/mp4';

};

export function VideoPlayer({
  file,
  height,
  controls = true,
  autoPlay = true,
  muted = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  
  const normalized = useMemo(() => {
  
    const type = (file as File).type;
    
    if (type && type.length > 0) return file;
    
    const mime = inferMime(file);

    return new Blob([file], { type: mime }) as Blob;

  }, [file]);

  const [url, setUrl] = useState<string | null>(null);
  const mime = useMemo(() => inferMime(normalized), [normalized]);

  useEffect(() => {
    const u = URL.createObjectURL(normalized);
    setUrl(u);
    return () => {
      URL.revokeObjectURL(u);
    };
  }, [normalized]);

  
  useEffect(() => {
    if (!autoPlay) return;
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = async () => {
      try {
        await v.play();
      } catch {
        
      }
    };
    v.addEventListener('canplay', onCanPlay);
    return () => v.removeEventListener('canplay', onCanPlay);
  }, [autoPlay]);

  const [err, setErr] = useState<string | null>(null);

  const mapMediaError = (code?: number) => {
    switch (code) {
      case 1: return 'ABORTED (descarga abortada)';
      case 2: return 'NETWORK (error de red)';
      case 3: return 'DECODE (códec no soportado o archivo corrupto)';
      case 4: return 'SRC_NOT_SUPPORTED (tipo/códec no soportado)';
      default: return 'desconocido';
    }
  };

  return (
    <div>
      <video
        key={url ?? 'no-src'}      
        ref={videoRef}
        src={url ?? undefined}     
        width="100%"
        height={height && height > 0 ? height : 50}
        controls={controls}
        muted={muted}
        playsInline
        preload="metadata"
        onCanPlay={() => setErr(null)}
        onError={() => {
          const v = videoRef.current;
          const mediaErr = v?.error;
          setErr(`Error reproduciendo el video. ${mapMediaError(mediaErr?.code)}. MIME: ${mime}`);
        }}
      />
      {err && (
        <small style={{ color: 'crimson', display: 'block', marginTop: 6 }}>
          {err}
        </small>
      )}
    </div>
  );
}