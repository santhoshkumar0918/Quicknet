'use client'
import { useAccount, useConnectors } from '@starknet-react/core'

export default function WalletConnector() {
  const { address } = useAccount()
  const { connect, disconnect, connectors } = useConnectors()

  return address ? (
    <div className="flex gap-4 items-center">
      <span className="text-sm">{address.slice(0, 6)}...{address.slice(-4)}</span>
      <button 
        onClick={disconnect}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Disconnect
      </button>
    </div>
  ) : (
    <div className="flex gap-4">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect(connector)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  )
}