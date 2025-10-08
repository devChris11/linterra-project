export default function BadCard() {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: '16px'
        }}
      >
        <img 
          src="/hero.jpg"
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '16px'
          }}
        />
        
        <h2 
          style={{
            color: '#999999',
            fontSize: '24px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}
        >
          Low Contrast Title
        </h2>
        
        <p 
          style={{
            color: '#666666',
            lineHeight: '1.6',
            marginBottom: '12px'
          }}
        >
          This card has multiple accessibility issues including missing alt text
          on the image and low contrast text colors that don't meet WCAG standards.
        </p>
        
        <button
          style={{
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Read More
        </button>
      </div>
    );
  }