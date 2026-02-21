'use client';

import { useRef, useEffect } from 'react';
import { Download, Share2 } from 'lucide-react';

const ShareCard = ({ startupName, probability, valuation, rank, badge }) => {
  const canvasRef = useRef(null);

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, 1200, 630);

    // Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 1160, 590);

    // Logo
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('STWAR INDIA', 60, 80);

    // Startup Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.fillText(startupName, 60, 200);

    // Probability
    ctx.fillStyle = '#a0a0a5';
    ctx.font = '30px Arial';
    ctx.fillText('FUNDING PROBABILITY', 60, 280);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 100px Arial';
    ctx.fillText(`${probability}%`, 60, 380);

    // Stats Grid
    ctx.fillStyle = '#141415';
    ctx.fillRect(700, 150, 440, 350);
    ctx.strokeStyle = '#ffffff22';
    ctx.strokeRect(700, 150, 440, 350);

    ctx.fillStyle = '#a0a0a5';
    ctx.font = '24px Arial';
    ctx.fillText('EST. VALUATION', 730, 200);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(valuation, 730, 260);

    ctx.fillStyle = '#a0a0a5';
    ctx.font = '24px Arial';
    ctx.fillText('NATIONAL RANK', 730, 340);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(`#${rank}`, 730, 400);

    // Badge
    ctx.fillStyle = '#f59e0b22';
    ctx.fillRect(60, 450, 300, 60);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(badge, 90, 488);

    // CTA
    ctx.fillStyle = '#a0a0a5';
    ctx.font = '20px Arial';
    ctx.fillText('Test your idea at startupwar.in', 60, 570);
  };

  useEffect(() => {
    generateImage();
  }, [startupName, probability, valuation, rank, badge, generateImage]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${startupName}-score.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="share-card-container">
      <canvas
        ref={canvasRef}
        width="1200"
        height="630"
        className="hidden-canvas"
      ></canvas>
      <div className="share-actions">
        <button className="action-btn download" onClick={downloadImage}>
          <Download size={18} /> Download Card
        </button>
        <button className="action-btn share">
          <Share2 size={18} /> Social Share
        </button>
      </div>
      <style jsx>{`
        .hidden-canvas {
          display: none;
        }
        .share-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        .action-btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .download {
          background: var(--bg-lighter);
          color: white;
          border: 1px solid var(--border-color);
        }
        .share {
          background: var(--accent-gold);
          color: black;
        }
      `}</style>
    </div>
  );
};

export default ShareCard;
