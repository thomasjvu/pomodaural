import React, { useEffect, useRef } from "react";

interface CanvasVisualizerProps {
  audioContext: AudioContext;
}

const CanvasVisualizer: React.FC<CanvasVisualizerProps> = ({
  audioContext,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationId: number | null = null;
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");

    if (!canvas || !canvasCtx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.current = audioContext.createAnalyser();
    analyser.current.fftSize = 2048;

    const bufferLength = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvas || !canvasCtx || !dataArray.current) return;

      animationId = requestAnimationFrame(draw);

      analyser.current!.getByteFrequencyData(dataArray.current);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray.current[i] / 255) * HEIGHT;

        const hue = (i / bufferLength) * 360;
        canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    const visualize = () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(draw);
      }
    };

    const stopVisualization = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    visualize();

    return () => {
      stopVisualization();
      analyser.current!.disconnect();
    };
  }, [audioContext]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={200} />
    </div>
  );
};

export default CanvasVisualizer;

