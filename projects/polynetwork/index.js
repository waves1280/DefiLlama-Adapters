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
  const chainName  = config[chain]
  module.exports[chain] = {
    tvl: async (_, _b, _cb, { api, }) => {
      const chainConfig = await getConfig('poly-network/chainInfo', 'https://explorer.poly.network/api/v1/getexplorerinfo')
      const chainId = chainConfig.chains.find(c => c.chainname === chainName).chainid
      const tokenData = await getConfig(`poly-network/${chainName}`, 'https://explorer.poly.network/api/v1/getlocktokeninfo?chainId='+chainId)
      return sumTokens({ api, tokensAndOwners: tokenData.map(t => [t.Hash, t.ItemProxy]), chain: api.chain})
    }
  }
})