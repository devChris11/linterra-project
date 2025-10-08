export default function BadButton() {
    return (
      <div className="p-8">
        <button
          style={{
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Click Me
        </button>
        
        <button
          style={{
            backgroundColor: '#10B981',
            color: '#fff',
            padding: '8px 16px',
            marginLeft: '12px',
            borderRadius: '6px',
            border: 'none'
          }}
        >
          Secondary Action
        </button>
      </div>
    );
  }