import { useConnect, useAccount } from '@starknet-react/core'

function MyComponent() {
  const { address } = useAccount()
  const { connect, connectors } = useConnect()

  const handleConnect = (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId)
    if (connector) {
      connect({ connector })
    }
  }

  return (
    <div>
      {address ? (
        <p>Connected: {address}</p>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector.id)}
            >
              Connect with {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}