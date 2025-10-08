export default function BadLayout() {
    return (
      <div
        style={{
          display: 'flex',
          gap: '24px',
          padding: '32px',
          margin: '16px auto',
          maxWidth: '1200px'
        }}
      >
        <aside
          style={{
            width: '250px',
            marginRight: '20px',
            padding: '16px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>
            Sidebar
          </h3>
          <nav>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '8px', paddingLeft: '4px' }}>Home</li>
              <li style={{ marginBottom: '8px', paddingLeft: '4px' }}>About</li>
              <li style={{ marginBottom: '8px', paddingLeft: '4px' }}>Contact</li>
            </ul>
          </nav>
        </aside>
        
        <main
          style={{
            flex: '1',
            paddingLeft: '24px'
          }}
        >
          <h1 style={{ marginBottom: '16px', fontSize: '32px' }}>
            Main Content
          </h1>
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            This layout uses hardcoded spacing values throughout.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginTop: '24px'
            }}
          >
            <div style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
              Card 1
            </div>
            <div style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
              Card 2
            </div>
          </div>
        </main>
      </div>
    );
  }