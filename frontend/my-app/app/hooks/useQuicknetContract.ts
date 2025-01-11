import { useContract, useAccount } from '@starknet-react/core'
import { Contract, InvokeFunctionResponse, Call } from 'starknet'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import contractAbi from '../../public/contracts/quicknet_project_contracts_FieldFactory.contract_class.json'

// Add proper type for contract response
interface ContractResponse {
  team: string | bigint;
  amount: string | bigint;
  players: (string | bigint)[];
}

interface Bet {
  team: string;
  amount: number;
  players: string[];
}

interface BetDetails {
  id: string;
  team: string;
  amount: number;
  players: string[];
  status: 'pending' | 'completed' | 'failed';
}

const CONTRACT_ADDRESS = "0x06228e3a3a8fe69244c0799535d79b207de9d46cf452092ff1c99f9c34caee3f";

export function useQuicknetContract() {
  const { address } = useAccount()
  const { contract } = useContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi
  })

  const queryClient = useQueryClient()

  const getBetDetails = async (betId: string): Promise<BetDetails> => {
    if (!contract) throw new Error('Contract not connected')
    
    try {
      const response = await contract.call('get_bet_details', [betId]) as ContractResponse
      return {
        id: betId,
        team: String(response.team),
        amount: Number(response.amount),
        players: response.players.map(String),
        status: 'completed'
      }
    } catch (error) {
      console.error('Contract error:', error)
      throw error instanceof Error ? error : new Error('Contract call failed')
    }
  }

  const placeBet = async (
    team: string,
    amount: number,
    players: string[]
  ): Promise<InvokeFunctionResponse> => {
    if (!contract || !address || amount < 10) {
      throw new Error('Invalid bet parameters')
    }

    try {
      const calls: Call[] = [{
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: 'place_bet',
        calldata: [team, amount.toString(), ...players]
      }]

      const response = await contract.execute(calls)
      return response
    } catch (error) {
      console.error('Contract error:', error)
      throw error instanceof Error ? error : new Error('Transaction failed')
    }
  }

  const { data: betDetails, error: queryError } = useQuery<BetDetails, Error>({
    queryKey: ['betDetails'],
    queryFn: async () => getBetDetails('someId'),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    enabled: !!contract && !!address,
    retry: 2
  })

  const placeBetMutation = useMutation<InvokeFunctionResponse, Error, Bet>({
    mutationFn: (bet) => placeBet(bet.team, bet.amount, bet.players),
    onMutate: async (newBet) => {
      await queryClient.cancelQueries({ queryKey: ['bets'] })
      const previousBets = queryClient.getQueryData<Bet[]>(['bets']) || []
      queryClient.setQueryData<Bet[]>(['bets'], [...previousBets, newBet])
      return { previousBets }
    },
    onError: (err: Error, newBet: Bet, context: unknown) => {
      const ctx = context as { previousBets: Bet[] } | undefined
      if (ctx?.previousBets) {
        queryClient.setQueryData(['bets'], ctx.previousBets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] })
    },
  })

  return {
    betDetails,
    placeBet: placeBetMutation.mutate,
    isPending: placeBetMutation.isPending,
    error: placeBetMutation.error || queryError,
    isError: !!placeBetMutation.error || !!queryError
  }
}