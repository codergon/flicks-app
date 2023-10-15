const nftCollections = [
  {
    address: "9P1pVkfGErLKY8bEC5smKytBoAFujpoUdCo8LnQGeg3M",
    name: "t00bs",
    image: "https://metadata.y00ts.com/t/t00b.jpg",
    description:
      "Each t00b can be burned to redeem a y00t. Are you going to keep the t00b or get the y00t?",
    network: "mainnet-beta",
  },
  {
    address: "LouoPer39a8x9KZ4nWXmeSFetgorr82pEErhU9EmxZW",
    name: "Cets",
    image:
      "https://nftstorage.link/ipfs/bafkreigaxusrunshnb5omd3kxd67fazl43p4lorvx7ujuo2qmh54tasy2q",
    description:
      "It’s just a bunch of crecked cets, who’re upto a whole of rat shit that are livin’, and chillin’ and vibin’ together. They’re picking bullshit catfights, posting their own mugshots, cat calling the cops and stirring whatever they can to keep the high going.",
    network: "mainnet-beta",
  },
  {
    address: "BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac",
    name: "Famous Fox Federation",
    image: "https://arweave.net/mgvMZbiis8AE_Kkj1Om5clxpseOiZB-2Q4QFUVavD10",
    description:
      "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.",
    network: "mainnet-beta",
  },
  {
    address: "A7VxD9jwFEvcsVXGdFnTP3qC8ayb8tD9YdjgKbYcpheX",
    name: "Vandals",
    image:
      "https://nftstorage.link/ipfs/bafybeic4qrw3zhovlztg4u3ythxlrd7fdljlvvjtiidy5izt4z2xa3mw3m",
    description:
      "A collection of 10,000 Bandits, Outcasts, & Misfits of the Metaverse. Vandal City is the epicenter of Web3 innovation, fostering top tier utilities and art.",
    network: "mainnet-beta",
  },
  {
    address: "DSwfRF1jhhu6HpSuzaig1G19kzP73PfLZBPLofkw6fLD",
    name: "Degenerate Ape Academy",
    image: "https://arweave.net/F4q5hB2bkAhqZvLfJVqcncxTGWUSG8toaS78s4QDx_Y",
    description:
      "Deep in the heart of Dingus Forest echoes the sleepless cries of a troop of 10,000 apes. These aren’t just regular apes, however. These are degenerate apes.",
    network: "mainnet-beta",
  },
  {
    address: "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W",
    name: "SMB Gen2",
    image: "https://arweave.net/lZ5FdIVagNoNvI4QFoHhB6Xyn4oVGLV9xOTW32WBC20",
    description:
      "SMB is a collection of 5000 randomly generated 24x24 pixels NFTs on the Solana Blockchain. Each SolanaMonkey is unique and comes with different type and attributes varying in rarity.",
    network: "mainnet-beta",
  },
  {
    address: "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
    name: "Mad Lads",
    image:
      "https://madlads-collection.s3.us-west-2.amazonaws.com/_collection.png",
    description: "Fock it.",
    network: "mainnet-beta",
  },
  {
    address: "A4UhNttmEDdxQ2i1fjFxn8UHMeEzqWySq6qqYo69RNX5",
    name: "Clear Collectibles",
    image:
      "https://bafkreifnc2tuc7na5xnape6ibjnixn7a6nkfqbeicpt6rhd2t7knbdhuwq.ipfs.nftstorage.link/",
    description:
      "Clear Collectibles is a digital collectibles art and design project founded on Solana. Our motto is simple: design cool shit that people love.",
    network: "mainnet-beta",
  },
  {
    address: "71tyVbvaxjuQze8wXG7Gxsc8HRPnehX349VcGFzKskZA",
    name: "Jelly Rascals",
    image: "https://arweave.net/hrzxVR0TgZL1mTMlw9Ggvi9XpPYkBvw4xN3-kkNvk3c",
    description: "6,666 Rascals causing mayhem in the Solana space",
    network: "mainnet-beta",
  },
  {
    address: "3ktuBWGFByqhefaNMFnKmNMa3cSCiA9R4nuSXVio3MtX",
    name: "Froots",
    image: "",
    description: "A collection of Froots, vibing on Solana.",
    network: "mainnet-beta",
  },
  {
    address: "6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK",
    name: "Claynosaurz",
    image:
      "https://nftstorage.link/ipfs/bafybeiese3bgyfewt2r3dxvgups2blc3rwh2utvidirxgxq527mhcv3ydy",
    description: "Claynosaurz is a collection of 10,000 3D animated NFTs.",
    network: "mainnet-beta",
  },
  {
    address: "6P9DSB6ifwTfSjAY6CpEvnHYfk6Sc2iYWSoM2qM4u31f",
    name: "Reavers",
    image: "https://arweave.net/FQFm7onme_W77Zw_MQ-7XN2vZ64hK00aCcfELmDnqmQ",
    description: "Plunder, raid, navigate.",
    network: "mainnet-beta",
  },
  {
    address: "HQiETPq2jqTuunc65NMa1oW4JWqCDKFijbo2mbcUcXB7",
    name: "Taiyo Pilots",
    image:
      "https://nftstorage.link/ipfs/bafybeibsfmvtiv3457vgsnv4vatbftqqzatpzmv5mptrromk4aqwy55d7e/0.png",
    description: "",
    network: "mainnet-beta",
  },
  {
    address: "EZZprTuZ7boLgj4ffQgtoqD4ozspJD21JrT2K6NY8Yos",
    name: "Trippin' Ape Tribe",
    image:
      "https://shdw-drive.genesysgo.net/7ffMHjqqfzB5uFLcbifKu1N6niZAY6mYHP7VqFH2T47P/TAT.png",
    description:
      "10,000 Apes have fallen under the trance of a mysterious yet charismatic leader, Chorles, but don't worry… it's definitely not a cult.",
    network: "mainnet-beta",
  },
  {
    address: "AAG6dgqaSdSToaCTyH8W6GBk6sZdu9jC3TUDfy7eLEmz",
    name: "Primates",
    image:
      "https://nftstorage.link/ipfs/bafybeic2s5bhczzq4esin6cn23cgsyfkrswwnajqwqsmqd6rsjwpnfrt2u",
    description:
      "Collection of 10,000 Primates facilitating a seamless adoption of the web3 space through community fueled ventures and collaborations.",
    network: "mainnet-beta",
  },
  {
    address: "2rpqVdK2si3KEosQTSepyuL55j5hhHTDtY2bEK8Q6fqk",
    name: "DowngrLads",
    image: "https://nftstorage.link/ipfs/undefined/0",
    description: "Creating the best pixel art in the universe. Pixel by Pixel.",
    network: "mainnet-beta",
  },
  {
    address: "9jnJWH9F9t1xAgw5RGwswVKY4GvY2RXhzLSJgpBAhoaR",
    name: "Ovols",
    image:
      "https://s52lhdnekgzezod5ob2xlfpzhicodm6esmbkvlbzoe4xskamvvnq.arweave.net/l3SzjaRRsky4fXB1dZX5OgThs8STAqqsOXE5eSgMrVs",
    description:
      "Battle-tested citizens ready to protect and serve the City of Elixir. Ovols are the center of the Elixir ecosystem. Built on 3 pillars - Transparency, Community & Value.",
    network: "mainnet-beta",
  },
  {
    address: "5f2PvbmKd9pRLjKdMr8nrK8fNisLi7irjB6X5gopnKpB",
    name: "sharx by sharky.fi",
    image: "https://arweave.net/2UgbTs6EZCngJmFbrVqBVhi4JKQR-9MngZWf-80DGsY",
    description:
      "Sharx is the official NFT collection of Sharky, the #1 NFT lending platform on Solana. They are your newest frens ready to take over the NFT world. Feed $FISHY → grow into whale sharx. Earn, trade, celebrate! ❤ https://sharky.fi",
    network: "mainnet-beta",
  },
  {
    address: "b7oAeuCi3gWBTPNUzKr8KN73y6oNrZDFja3MyJsuMiA",
    name: "Just Ape",
    image:
      "https://nftstorage.link/ipfs/bafybeiemsg34dajougkcnqa7bgqwizl77vnwbs5v2x3eiiyg6v6bkrl5ce",
    description:
      "Just ape. A collection of 10,000 Apes that take us back to basics. None of the fluff, all of the value.",
    network: "mainnet-beta",
  },
  {
    address: "BwgeH2xLmeYHkaUTV1riMjy7EDJsokHNGmjFbT9eBu5Q",
    name: "Immortals",
    image:
      "https://shdw-drive.genesysgo.net/EcDjyv8xKYGcDN1f8sAsSCnn5a4zhtw9kPMywzuseLhT/immortals.png",
    description: "Immortals, 3333 pixel nightmares taking over Solana",
    network: "mainnet-beta",
  },
  {
    address: "ES2iF5ctjqvtopPn4n6K7c9fdHjYg41rYXL2XzJK37jF",
    name: "ABC",
    image: "https://arweave.net/9ArH1i9AZfRDl6TXVMHX3pPfJZ9o8kVRbhzV1e47N0E",
    description:
      "ABC - Abracadabra\n\nA collection of 10K immutable NFTs, 0% royalties.\n\nMade to remind you of how fun things were when we were kids, before growing up - let’s never stop having fun!",
    network: "mainnet-beta",
  },
  {
    address: "ATDB6H3M3pzS7iTNiBeqxGbxmwx9nJZWLsvHjC8J7QrX",
    name: "LILY",
    image:
      "https://nftstorage.link/ipfs/bafkreihuu6vunyw2cihqpylhsnv5t52pi7sl6bjnbwjl4bl7saizmkojf4",
    description:
      "LILY aims to become the landing page of the new web pushing the boundaries through innovative technology, art and informed community.",
    network: "mainnet-beta",
  },
  {
    address: "J6RJFQfLgBTcoAt3KoZFiTFW9AbufsztBNDgZ7Znrp1Q",
    name: "Galactic Geckos",
    image: "https://arweave.net/NFC1-rgJ9tE1BkfJjirVlQ1_-cNbj6Mwm_BGmQryaYk",
    description:
      "In the far distant future, war is over, and conflicts are decided by hiring gecko mercenaries to participate in brutal galactic races. Join one of four factions of gecko racers, fighting for the fate of the cosmos. Visit GalacticGeckos.com to enter the Geckoverse.",
    network: "mainnet-beta",
  },
  {
    address: "3saAedkM9o5g1u5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3",
    name: "Okay Bears",
    image: "https://arweave.net/7QhZL8C-lAWmCFbQ9saAh3ythEhBFhv0YCzKpwFRR6c",
    description:
      "Okay Bears is a culture shift. A clean collection of 10,000 diverse bears building a virtuous community that will transcend the internet into the real world.",
    network: "mainnet-beta",
  },
  {
    address: "HbPtffcEzzSzZ1VJaTjaAJqTUQpfNeMkPqNG81dWE2Bi",
    name: "Transdimensional Fox Federation",
    image: "https://arweave.net/bcnDnWMnegkNWpj3p-25_NPCPOX3YYe7M_G06H1dE3k",
    description:
      "A series of wormholes have ripped a hole in the spacetime continuum, and thousands of pixelated Foxes from a parallel universe have made their way through.",
    network: "mainnet-beta",
  },
  {
    address: "EevBcawX2EoF8eaWfyjPfGvJv9q2tvtpLMpLDqJKt22M",
    name: "Shadowy Super Coder #9505",
    image:
      "https://shdw-drive.genesysgo.net/8yHTE5Cz3hwcTdghynB2jgLuvKyRgKEz2n5XvSiXQabG/9505.png",
    description:
      '"Instead of leaving our financial system at the whims of giant banks, crypto puts the system at the whims of some shadowy, faceless group of super-coders and miners, which doesn’t sound better to me." - Elizabeth Warren, 2021\n\nTo this group of randomly generated Shadowy Super Coders... that sounds a lot better.',
    network: "mainnet-beta",
  },
];

export default nftCollections;
