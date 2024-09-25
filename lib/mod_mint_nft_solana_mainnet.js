/*****
// https://medium.com/@murki/the-ultimate-dev-guide-to-manually-minting-a-brand-new-nft-in-solana-fb5af9771688
0. Install pre-requisites
1. Create local file system wallet
2. Fund the wallet with SOL
3. Create image asset
4. Upload the image asset
5. Create asset metadata
6. Upload asset metadata
7. Mint the token
8. Transfer wallet and NFT to Phantom
9. List your NFT in a Marketplace
10. ...?
11. Profit!
GYc5erKBjgL45XH4UxHWwnVstenjrp8ZUX2J2rNjpG7J
% cd js/packages/cli/src
% ts-node cli-nft.ts mint 
--env mainnet-beta 
--keypair ~/.config/solana/[wallet_name].json 
--url https://arweave.net/[arweave_metadata_tx_id] 
--max-supply 1

******/
//https://docs.metaplex.com/programs/token-metadata/changelog/v1.0
console.log('mod mint nft solana mainnet on');
const bs58 = require("bs58");
const anchor = require('@project-serum/anchor');
var PNG = require('pngjs').PNG;
module.exports.mint_nft_solana_mainnet = mint_nft_solana_mainnet;
var fs = require('fs');
require('dotenv').config();
//minting the nft and sending it

//import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from  "@solana/web3.js";
//import { createMint, getOrCreateAssociatedTokenAccount, mintTo, setAuthority, transfer } from  "@solana/spl-token";

const solanaWeb3 = require('@solana/web3.js');
//console.log(solanaWeb3);

const solanaSplToken = require('@solana/spl-token');
//import {TOKEN_PROGRAM_ID} from '@solana/spl-token' // solanaSplToken.TOKEN_PROGRAM_ID
const arweaveArweave = require("arweave");
//import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

const mtdt = require("@metaplex-foundation/mpl-token-metadata"); 

//const {
//  Metaplex, 
//  keypairIdentity,
//  bundlrStorage,
//} = require("@metaplex-foundation/js");
const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");

const mpl = require("@metaplex-foundation/js");

const {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
} = require("@solana/web3.js");

const express = require("express");

//console.log(solanaWeb3);

function inv ( a )
{
	return (255 - a);
}


function mint_nft_solana_mainnet(im0)
{
	
console.log('in function mint_nft_solana mainnet');


(async () => {
	
	console.log('connection...');
	
	////////////// raz knopka //////////////
	//get connection from mainnet
	
	//create wallet from secret key

	//create mint
	//////////////////////////////////////
	
	////////// dva knopka //////////////
	// upload to arweave OR ipfs
	//////////////////////////////////

	//////////// tri knopka /////////////////
	//save metadata of mint  
	////////////////////////////////////////

	
  // Connect to cluster //get connection from mainnet
  const sol_connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"), "confirmed");
 
//const bytes = ;
//console.log(JSON.stringify(Array.from(bytes)));

//create wallet from secret key
let kp = JSON.parse( fs.readFileSync('./wallets/mpw.json'));
console.log("kp entered...");
//const arr = Object.values(kp.pk)
//console.log("arr:");
//console.log(arr);
//const secret = new Uint8Array(arr)
//console.log("secret:");
//console.log(secret);
const fromWallet = solanaWeb3.Keypair.fromSecretKey(bs58.decode(kp.pk));
//const fromWallet = solanaWeb3.Keypair.fromSecretKey(secret)
console.log("fromWallet info loaded and wallet created");

/************

	console.log("Now we create a new SPL token"); //description of type
  // Create a new token 
  const mint = await solanaSplToken.createMint(
    sol_connection, 
    fromWallet,            // Payer of the transaction
    fromWallet.publicKey,  // Account that will control the minting 
    null,                  // Account that will control the freezing of the token 
    0                      // Location of the decimal place 
  );
  console.log("mint: ");
  console.log(mint);
  
  // empty cell of type created above
  // Get the token account of the fromWallet Solana address. If it does not exist, create it.
  const fromTokenAccount = await solanaSplToken.getOrCreateAssociatedTokenAccount(
    sol_connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );
  
  
  
console.log("After creating token account for our SPL token (see below)");
console.log(fromTokenAccount.address);
console.log(fromTokenAccount);
// fs.writeFileSync('./wallets/solana_token_keypair_mainnet.json', JSON.stringify(fromTokenAccount));
 
console.log("tok account addre: "+fromTokenAccount.address.toBase58());

	// add new one exemplar to empty cell of type 
    // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
  let signature = await solanaSplToken.mintTo(
    sol_connection,
    fromWallet,               // Payer of the transaction fees 
    mint,                     // Mint for the account 
    fromTokenAccount.address, // Address of the account to mint to 
    fromWallet.publicKey,     // Minting authority
    1                         // Amount to mint 
  );

console.log("SIGNATURE of transaction of this minting: ");
console.log(signature);

 
// and setAuthority to null
   await solanaSplToken.setAuthority(
     sol_connection,
     fromWallet,            // Payer of the transaction fees
     mint,                  // Account 
     fromWallet.publicKey,  // Current authority 
     0,                     // Authority type: "0" represents Mint Tokens 
     null                   // Setting the new Authority to null
   );

***********/

const accounts = await sol_connection.getTokenAccountsByOwner(fromWallet.publicKey, {programId: solanaSplToken.TOKEN_PROGRAM_ID})
console.log(accounts);
  accounts.value.forEach( async (account, i) => {
  
	console.log( `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`  );
	console.log(account);
	

  
  });
  
  

  
    
 })();
 
 
 /*************** output ********************************
 
 
 
 in function mint_nft_solana mainnet
connection...

fromWallet:

Now we create a new SPL token
mint_nft_solana_mainnet
mint:
PublicKey {
  _bn: <BN: b41e55a0e4c5791fdf48c587ec2542c26d97bdfd9fb83cb7fbbe8711c8dce780>
}
After creating token account for our SPL token (see below)
PublicKey {
  _bn: <BN: f7afb9b92eaffbf2aba6220ae38f590136ce5dc666bd056e133b9546028598d3>
}
{
  address: PublicKey {
    _bn: <BN: f7afb9b92eaffbf2aba6220ae38f590136ce5dc666bd056e133b9546028598d3>
  },
  mint: PublicKey {
    _bn: <BN: b41e55a0e4c5791fdf48c587ec2542c26d97bdfd9fb83cb7fbbe8711c8dce780>
  },
  owner: PublicKey {
    _bn: <BN: e6f7f96c053ce66ba4570fbf77520930a80891173110fc12446b4d0444dfb661>
  },
  amount: 0n,
  delegate: null,
  delegatedAmount: 0n,
  isInitialized: true,
  isFrozen: false,
  isNative: false,
  rentExemptReserve: null,
  closeAuthority: null
}
 
 
 
 
 
 
 
 
 
 
 //////////////////////////////////////////////////////////
  /*********
    const dataV2 = {
        
		name: "Quantum Artist TEST NFT",
		symbol: "QATN",
		description: "A description about this test NFT",
		seller_fee_basis_points: 500,
		external_url: "http://frozen-brushlands-39280.herokuapp.com/",
		attributes: [
		  {
			trait_type: "NFT type",
			value: "Custom",
		  },
		],
		collection: {
		  name: "Test Collection",
		  family: "Quantum Artist NFTs",
		},
		properties: {
		  files: [
			{
			  uri: imageUrl,
			  type: "image/png",
			},
		  ],
		  category: "image",
		  maxSupply: 0,
		  creators: [
			{
			  address: "GYc5erKBjgL45XH4UxHWwnVstenjrp8ZUX2J2rNjpG7J",
			  share: 100,
			},
		  ],
		},
		image: imageUrl,
		
		///// name: "Fake USD Token",
        ///// symbol: "FUD",
        ///// uri: "arweave.json",
        ///// // we don't need that
        ///// sellerFeeBasisPoints: 0,
        ///// creators: null,
        ///// collection: null,
        ///// uses: null
    }
 
  // works!!!
  ***************/
  //or
  /***************
  
  
  {
    "name": "THE NAME OF THIS NFT e.g. Dragon #01",
    "symbol": "",
    "description": "The description",
    "seller_fee_basis_points": 500,
    "external_url": "https://example.com",
    "attributes": [
        {
            "trait_type": "Name of trait",
            "value": "Value of trait"
        }
    ],
    "collection": {
        "name": "Collection Name",
        "family": "Collection family Name"
    },
    "properties": {
        "files": [
            {
                "uri": "image.png",
                "type": "image/png"
            }
        ],
        "category": "image",
        "maxSupply": 1,
        "creators": [
            {
                "address": "solana address for a creator",
                "share": 100
            }
        ]
    },
    "image": "image.png"
}
*****/

/*********

// works!!!
  
  const metadataRequest = JSON.stringify(metadata);

  const metadataTransaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  metadataTransaction.addTag("Content-Type", "application/json");

  await arweave.transactions.sign(metadataTransaction, wt);

  console.log("metadata txid", metadataTransaction.id);

  console.log(await arweave.transactions.post(metadataTransaction));
  
  ***************/
  //or
 /********** 
  In your metadata-generator.js file add this code:

const fs = require('fs');
const imageDir = fs.readdirSync("./assets");
imageDir.forEach(img => {
  const metadata = {
    name: `Image ${img.split(".")[0]}`,
    description: "An image in the NFT collection",
    symbol: "YOUR NFT COLLECTION SHORT SYMBOL",
    image: img,
    seller_fee_basis_points: ROYALTIES_PERCENTAGE_BASIS_POINTS,
    properties: {
      files: [{ uri: img, "type": "image/png" }],
      category: "image",
      creators: [{
        address: "YOUR_SOL_WALLET_ADDRESS",
        share: 100
      }]
    }
  }
  fs.writeFileSync(`./assets/${img.split(".")[0].json}`, JSON.stringify(metadata))
});



  
  
  ***/
  
 





	var w = im0.width;
	var h = im0.height;
	
	
	var im = new PNG ( {
			
				width: w,
				height: h,
				filterType: 4
		} );
		
				
	
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   inv ( im0.data[idx] );
					im.data[new_idx+1] =  inv ( im0.data[idx+1] );
					im.data[new_idx+2] =  inv ( im0.data[idx+2] );
					im.data[new_idx+3] =  255;
					
					
					
					
				}
			}

/***********
	
	import fs from "fs";
import Arweave from "arweave";

(async () => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  // Upload image to Arweave
  const data = fs.readFileSync("./code/nfts/arweave-upload/lowres-dog.png");

  const transaction = await arweave.createTransaction({
    data: data,
  });

  transaction.addTag("Content-Type", "image/png");
//we need to have wallet.json file from arwaev
  const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
  
  await arweave.transactions.sign(transaction, wallet);

  const response = await arweave.transactions.post(transaction);
  console.log(response);

  const id = transaction.id;
  const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log("imageUrl", imageUrl);

  // Upload metadata to Arweave
//oxI-d73TcoMoxrc8RNKChrJ9UcV3UBYCOsL7-eja2IU
  const metadata = {
    name: "Custom NFT #1",
    symbol: "CNFT",
    description: "A description about my custom NFT #1",
    seller_fee_basis_points: 500,
    external_url: "https://www.customnft.com/",
    attributes: [
      {
        trait_type: "NFT type",
        value: "Custom",
      },
    ],
    collection: {
      name: "Test Collection",
      family: "Custom NFTs",
    },
    properties: {
      files: [
        {
          uri: imageUrl,
          type: "image/png",
        },
      ],
      category: "image",
      maxSupply: 0,
      creators: [
        {
          address: "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
          share: 100,
        },
      ],
    },
    image: imageUrl,
  };

  const metadataRequest = JSON.stringify(metadata);

  const metadataTransaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  metadataTransaction.addTag("Content-Type", "application/json");

  await arweave.transactions.sign(metadataTransaction, wallet);

  console.log("metadata txid", metadataTransaction.id);

  console.log(await arweave.transactions.post(metadataTransaction));
})();
	
	****************/
	

			return im;

}
/****

import { Wallet } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import {createUpdateMetadataAccountV2Instruction,DataV2,UpdateMetadataAccountV2InstructionArgs,UpdateMetadataAccountV2InstructionAccounts} from "@metaplex-foundation/mpl-token-metadata"
const fs = require("fs");

(async() => {
    // This is the Update Authority Secret Key
    const secretKey = fs.readFileSync(
        "/Users/pratiksaria/.config/solana/id.json",
        "utf8"
      );
      const keypair = anchor.web3.Keypair.fromSecretKey(
        Buffer.from(JSON.parse(secretKey))
      );
      const endpoint = "https://metaplex.devnet.rpcpool.com/";
  const connection = new anchor.web3.Connection(endpoint);

  const wallet = new Wallet(keypair);
  console.log("Connected Wallet", wallet.publicKey.toString());

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  // You have to enter your NFT Mint address Over Here
  const mintKey = new anchor.web3.PublicKey("5iSxT33FyHWsnb8NYSytY17TTXfkFn62FiCyFVFxYhqY");

  const [metadatakey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintKey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  // BTW DeGods is my FAV collection although i cant afford one 🥲
  const updated_data: DataV2 = {
    name: "DeGods",
    symbol: "DG",
    uri: "https://metadata.degods.com/g/4924.json",
    sellerFeeBasisPoints: 1000,
    creators: [
      {
        address: new anchor.web3.PublicKey(
          "CsEYyFxVtXxezfLTUWYwpj4ia5oCAsBKznJBWiNKLyxK"
        ),
        verified: false,
        share: 0,
      },
      {
        address: wallet.publicKey,
        verified: false,
        share: 100,
      },
    ],
    collection: null,
    uses: null,
  };

  const accounts:UpdateMetadataAccountV2InstructionAccounts = {
    metadata: metadatakey,
    updateAuthority: wallet.publicKey,
  }

  const args:UpdateMetadataAccountV2InstructionArgs = {
    updateMetadataAccountArgsV2: {
      data: updated_data,
      updateAuthority: wallet.publicKey,
      primarySaleHappened: true,
      isMutable: true,
    }
  }

  const updateMetadataAccount = createUpdateMetadataAccountV2Instruction(
  accounts,
  args
  );

  const transaction = new anchor.web3.Transaction()
  transaction.add(updateMetadataAccount);
  const {blockhash} = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;
  const signedTx = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signedTx.serialize());

  console.log("Transaction ID --",txid);

})()

********/

/***********



app.listen(3000, () => console.log("Server is running over PORT 3000"));

***********************/

/************
// here all what we neeed ////
// as used in https://www.youtube.com/watch?v=DQbt0-riooo

import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';

export function loadWalletKey(keypairFile:string): web3.Keypair {
    const fs = require("fs");
    const loaded = web3.Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
  }

const INITIALIZE = false;

async function main(){
    console.log("let's name some tokens!");
    const myKeypair = loadWalletKey("AndXYwDqSeoZHqk95TUC1pPdp93musGfCo1KztNFNBhd.json");
    const mint = new web3.PublicKey("FUDMHraEkdj926Tu75aYHtokoHM8QgGN2Nx8TJr8eSZM");
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());
    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);
    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }
    const dataV2 = {
        name: "Fake USD Token",
        symbol: "FUD",
        uri: "https://shdw-drive.genesysgo.net/ArP7jjhVZsp7vkzteU7mpKA1fyHRhv4ZBz6gR7MJ1JTC/metadata.json",
        // we don't need that
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }
    let ix;
    if (INITIALIZE) {
        const args =  {
            createMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true
            }
        };
        ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
    } else {
        const args =  {
            updateMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: myKeypair.publicKey,
                primarySaleHappened: true
            }
        };
        ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
    }
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);

}

main();


*************/

/******************** output from (LAST) 23 07 2022  10 30 

in function mint_nft_solana mainnet
connection...
kp entered...
fromWallet info loaded and wallet created
Now we create a new SPL token
mint_nft_solana_mainnet
mint:
PublicKey {
  _bn: <BN: c42c8d01a3aa39ff846fcfa21e5a8174887385fc6e2a0b7420ad0a3aff14590a>
}
After creating token account for our SPL token (see below)
PublicKey {
  _bn: <BN: 3011e872ee5a7be685eccccd7a8dcfd13a9b6ceb1425fd2b7295dc8e2dabb241>
}
{
  address: PublicKey {
    _bn: <BN: 3011e872ee5a7be685eccccd7a8dcfd13a9b6ceb1425fd2b7295dc8e2dabb241>
  },
  mint: PublicKey {
    _bn: <BN: c42c8d01a3aa39ff846fcfa21e5a8174887385fc6e2a0b7420ad0a3aff14590a>
  },
  owner: PublicKey {
    _bn: <BN: e6f7f96c053ce66ba4570fbf77520930a80891173110fc12446b4d0444dfb661>
  },
  amount: 0n,
  delegate: null,
  delegatedAmount: 0n,
  isInitialized: true,
  isFrozen: false,
  isNative: false,
  rentExemptReserve: null,
  closeAuthority: null
}
tok account addre: 4EeQdZtCYVd3iDMuszU6bcEqite7bq5XabDiT1uKMzeU
SIGNATURE of transaction of this minting:
2Jg9g8GUgnPRdzmi4ETraAjHLTwgFZ6fuYqPQcHD2mL2LBL2niseLkxUSf6vZRR9k35dCURrxrwufWNqLjnMmsSU
{
  context: { apiVersion: '1.10.29', slot: 142775780 },
  value: [
    { account: [Object], pubkey: [PublicKey] },
    { account: [Object], pubkey: [PublicKey] }
  ]
}
-- Token Account Address 1: 4EeQdZtCYVd3iDMuszU6bcEqite7bq5XabDiT1uKMzeU --
{
  account: {
    data: <Buffer c4 2c 8d 01 a3 aa 39 ff 84 6f cf a2 1e 5a 81 74 88 73 85 fc 6e 2a 0b 74 20 ad 0a 3a ff 14 59 0a e6 f7 f9 6c 05 3c e6 6b a4 57 0f bf 77 52 09 30 a8 08 ... 115 more bytes>,
    executable: false,
    lamports: 2039280,
    owner: PublicKey {
      _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    },
    rentEpoch: 330
  },
  pubkey: PublicKey {
    _bn: <BN: 3011e872ee5a7be685eccccd7a8dcfd13a9b6ceb1425fd2b7295dc8e2dabb241>
  }
}
-- Token Account Address 2: Hfs7c1Hsjm4DkzRs6tUk9GxpJf1WA69BiqVuSKygaT3Y --
{
  account: {
    data: <Buffer b4 1e 55 a0 e4 c5 79 1f df 48 c5 87 ec 25 42 c2 6d 97 bd fd 9f b8 3c b7 fb be 87 11 c8 dc e7 80 e6 f7 f9 6c 05 3c e6 6b a4 57 0f bf 77 52 09 30 a8 08 ... 115 more bytes>,
    executable: false,
    lamports: 2039280,
    owner: PublicKey {
      _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    },
    rentEpoch: 330
  },
  pubkey: PublicKey {
    _bn: <BN: f7afb9b92eaffbf2aba6220ae38f590136ce5dc666bd056e133b9546028598d3>
  }
}

***************************** 10 31 ***********/
