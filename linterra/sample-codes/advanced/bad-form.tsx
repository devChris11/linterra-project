export default function BadForm() {
    return (
      <form
        style={{
          backgroundColor: '#f8f8f8',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '20px auto'
        }}
      >
        <h2
          style={{
            color: '#333',
            marginBottom: '16px',
            fontSize: '24px'
          }}
        >
          Contact Form
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Your Name"
            style={{
              width: '100%',
              border: '1px solid #ddd',
              padding: '12px',
              fontSize: '14px',
              backgroundColor: '#fff',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            placeholder="Email Address"
            style={{
              width: '100%',
              border: '1px solid #ddd',
              padding: '12px',
              backgroundColor: '#fff',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <textarea
            placeholder="Your Message"
            rows={4}
            style={{
              width: '100%',
              border: '1px solid #ddd',
              padding: '12px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <img 
            src="/captcha.png"
            style={{
              width: '200px',
              marginBottom: '8px'
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Submit Form
        </button>
      </form>
    );
  }