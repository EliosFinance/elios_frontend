import React from 'react';

const Signup: React.FC = () => {
  return (
    <div
      style={{
        width: 430,
        height: 932,
        position: 'relative',
        background: 'white',
      }}
    >
      <div
        style={{
          width: 354,
          height: 421,
          left: 37,
          top: 45,
          position: 'absolute',
          background: '#D9D9D9',
          borderRadius: 13,
        }}
      />
      <img
        style={{
          width: 354,
          height: 421,
          left: 38,
          top: 45,
          position: 'absolute',
          borderRadius: 13,
        }}
        src="https://via.placeholder.com/354x421"
        alt="placeholder"
      />
      <div
        style={{
          left: 172,
          top: 510,
          position: 'absolute',
          color: 'black',
          fontSize: 36,
          fontFamily: 'Inter',
          fontStyle: 'italic',
          fontWeight: 600,
          wordWrap: 'break-word',
        }}
      >
        ELIOS
      </div>
      <div
        style={{
          width: 257,
          left: 87,
          top: 562,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
          fontFamily: 'Inter',
          fontWeight: 400,
          wordWrap: 'break-word',
        }}
      >
        Elevez votre experience financière avec Elios : Bienvenue dans le futur de l’ère bancaire.
      </div>
      <div
        style={{
          height: 60,
          paddingLeft: 24,
          paddingRight: 24,
          left: -1,
          top: 716,
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 27,
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            height: 60,
            background: '#4361EE',
            borderRadius: 44,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: 700,
              wordWrap: 'break-word',
            }}
          >
            C’EST PARTI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;