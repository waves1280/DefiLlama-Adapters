const { sumTokens } = require('../helper/sumTokens')
const { getConfig } = require('../helper/cache')

const config = {
  ethereum: 'Ethereum',
  bsc: 'BNB Chain',
  // ontology: 'Ontology',
  // Neo: 'Neo',
  // : 'Curve',
  // : 'Ripple',
  // : 'CloudTx',
  // :"XinFin",
  // neo3: 'Neo3',
  heco: 'Heco',
  okexchain: 'OKC',
  polygon: 'Polygon',
  // carbon: 'Carbon',
  // palette: 'Palette',
  arbitrum: 'Arbitrum',
  xdai: 'Gnosis Chain',
  // zilliqa: 'Zilliqa',
  avax: 'Avalanche',
  fantom: 'Fantom',
  optimism: 'Optimism',
  metis: 'Andromeda',
  boba: 'Boba',
  // oasis: 'Oasis',
  // harmony: 'Harmony',
  // hoo: 'HSC',
  // bytomsidechain: 'Bytom Sidechain',
  // kcc: 'KCC',
  // starcoin: 'Starcoin',
  kava: 'Kava',
  cube: 'Cube',
  celo: 'Celo',
  // clv: 'CLV P-Chain',
  // conflux: 'Conflux eSpace',
  astar: 'Astar',
  // aptos: 'Aptos',
  // bitgert: 'Bitgert',
  // dexit: 'Dexit',  
  // era: 'zkSync',
}

Object.keys(config).forEach(chain => {
  const chainName = config[chain]
  module.exports[chain] = {
    tvl: async (_, _b, _cb, { api, }) => {
      const chainConfig = await getConfig('poly-network/chainInfo', 'https://explorer.poly.network/api/v1/getexplorerinfo')
      const chainId = chainConfig.chains.find(c => c.chainname === chainName).chainid
      const tokenData = await getConfig(`poly-network/${chainName}`, 'https://explorer.poly.network/api/v1/getlocktokeninfo?chainId=' + chainId)
      const tokensAndOwners = tokenData.map(t => [t.Hash, t.ItemProxy])
      /* if (api.chain === 'ethereum')
        tokensAndOwners.push(
          ['0x030ba81f1c18d280636f32af80b9aad02cf0854e', '0xf554e20a695Ea338A126A3A7B5870F1f67253B01'],
          ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0xf554e20a695Ea338A126A3A7B5870F1f67253B01'],
          ['0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656', '0x1d0c2555a0002a54de13749af384223691bcb4d6'],
          ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', '0x1d0c2555a0002a54de13749af384223691bcb4d6'],
          ['0x3ed3b47dd13ec9a98b44e6204a523e766b225811', '0xb8d6471cA573C92c7096Ab8600347F6a9Fe268a5'],
          ['0xdac17f958d2ee523a2206206994597c13d831ec7', '0xb8d6471cA573C92c7096Ab8600347F6a9Fe268a5'],
        ) */
      return sumTokens({ api, tokensAndOwners, chain: api.chain })
    }
  }
})