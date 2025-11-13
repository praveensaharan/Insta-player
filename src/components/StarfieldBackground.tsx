import React from 'react';

export const StarfieldBackground: React.FC = () => {
  return (
    <div className="starfield">
      <style>{`
        .starfield {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background: linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #262626 100%);
          overflow: hidden;
          pointer-events: none;
        }

        .starfield::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300%;
          background-image: 
            radial-gradient(#ffffff 0.5px, transparent 1%),
            radial-gradient(#ffffff 1px, transparent 1%),
            radial-gradient(#ffffff 1.5px, transparent 1%);
          background-size: 150px 200px, 180px 250px, 220px 300px;
          background-position: 23px 47px, 89px 134px, 156px 203px;
          animation: animStar1 35s linear infinite;
        }

        .starfield::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300%;
          background-image: 
            radial-gradient(#ffffff 0.8px, transparent 1%),
            radial-gradient(#ffffff 2px, transparent 1%);
          background-size: 190px 280px, 240px 350px;
          background-position: 67px 112px, 145px 267px;
          animation: animStar2 45s linear infinite, animStarRotate 120s linear infinite;
          opacity: 0.7;
        }

        @keyframes animStar1 {
          from {
            transform: translateY(0) translateX(0);
          }
          to {
            transform: translateY(-200vh) translateX(-20px);
          }
        }

        @keyframes animStar2 {
          from {
            transform: translateY(0) translateX(0);
          }
          to {
            transform: translateY(-200vh) translateX(15px);
          }
        }

        @keyframes animStarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};