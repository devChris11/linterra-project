export default function KitchenSink() {
    return (
      <div
        style={{
          backgroundColor: '#fafafa',
          padding: '32px',
          margin: '20px auto',
          maxWidth: '800px'
        }}
      >
        <header
          style={{
            backgroundColor: '#3B82F6',
            padding: '16px 24px',
            marginBottom: '24px',
            borderRadius: '8px'
          }}
        >
          <img 
            src="/logo.png"
            style={{
              width: '150px',
              marginRight: '20px'
            }}
          />
          <h1
            style={{
              color: '#ffffff',
              display: 'inline',
              fontSize: '28px'
            }}
          >
            Kitchen Sink Example
          </h1>
        </header>
        
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            marginBottom: '16px',
            borderRadius: '6px'
          }}
        >
          <img 
            src="/hero.jpg"
            style={{
              width: '100%',
              borderRadius: '4px',
              marginBottom: '12px'
            }}
          />
          <h2
            style={{
              color: '#888888',
              fontSize: '22px',
              marginBottom: '8px'
            }}
          >
            Low Contrast Heading
          </h2>
          <p
            style={{
              color: '#999999',
              lineHeight: '1.5',
              marginBottom: '16px'
            }}
          >
            This component violates every rule we check. It's a stress test.
          </p>
        </section>
        
        <form
          style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '6px'
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Name"
              style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#fff'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <select
              style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#fff'
              }}
            >
              <option>Select Option</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <textarea
              placeholder="Comments"
              style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#fff'
              }}
            />
          </div>
          
          <img 
            src="/icon.svg"
            style={{
              width: '30px',
              marginRight: '10px'
            }}
          />
          
          <button
            type="submit"
            style={{
              backgroundColor: '#EF4444',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              marginTop: '8px'
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }