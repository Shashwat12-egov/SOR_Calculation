import React from "react";


const Heading=()=> {
    const HeadingCss = {
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      };
    return (
        <h1 style={HeadingCss}>SOR Calculation</h1>
    );
}

export default Heading;