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

% cd js/packages/cli/src
% ts-node cli-nft.ts mint 
--env mainnet-beta 
--keypair ~/.config/solana/[wallet_name].json 
--url https://arweave.net/[arweave_metadata_tx_id] 
--max-supply 1

******/

// https://spl.solana.com/token#example-create-a-non-fungible-token
// https://docs.metaplex.com/programs/token-metadata/changelog/v1.0

console.log('mod mint nft solana mainnet on');
const anchor = require('@project-serum/anchor');
var PNG = require('pngjs').PNG;
module.exports.mint_nft_solana = mint_nft_solana;
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


function mint_nft_solana(im0)
{
	
console.log('in function mint_nft_solana');


(async () => {
	// https://spl.solana.com/token#example-create-a-non-fungible-token
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

	
  // Connect to cluster
  const sol_connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");
    //      /******  works
   // Generate a new wallet keypair and airdrop SOL
  const fromWallet = solanaWeb3.Keypair.generate(); //here we need to change generated on our existing phantom wallet
  fs.writeFileSync('./wallets/solana_keypair.json', JSON.stringify(fromWallet));
  
	console.log("Here we generated new wallet and keypair for it:");
	console.log(fromWallet.publicKey.toBase58());
	//Here we generated new wallet and keypair for it:
	//7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p
  
  const fromAirdropSignature = await sol_connection.requestAirdrop(
    fromWallet.publicKey,
    solanaWeb3.LAMPORTS_PER_SOL
  );
  
 
console.log("Confirming airdrop...");
  // Wait for airdrop confirmation
  await sol_connection.confirmTransaction(fromAirdropSignature);

	console.log("After success requested airdrop to this wallet");
	console.log("Now we create a new SPL token");
	
  // Create a new token 
  const mint = await solanaSplToken.createMint(
    sol_connection, 
    fromWallet,            // Payer of the transaction
    fromWallet.publicKey,  // Account that will control the minting 
    null,                  // Account that will control the freezing of the token 
    0                      // Location of the decimal place 
  );
  console.log(mint);

  // Get the token account of the fromWallet Solana address. If it does not exist, create it.
  const fromTokenAccount = await solanaSplToken.getOrCreateAssociatedTokenAccount(
    sol_connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );
  
  
  
console.log("After creating tokem account for our SPL token (see below)");
//console.log(fromTokenAccount.address);
console.log(fromTokenAccount);
// fs.writeFileSync('./wallets/solana_token_keypair.json', JSON.stringify(fromTokenAccount));
// console.log(""+);
console.log("tok account addre: "+fromTokenAccount.address.toBase58());


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

//SIGNATURE of transaction of this minting:
//3vLaxuHbueeVUT85iwjKURSmjPs5hsWCpSSanZaQzqrHqduttpQ12FqZeUgGFB1aY26GYyh9zqAY7VqjfRHj77ot

//////////////////////////// here we need check this call of fnction solanaSplToken.setAuthority(
///////////////////////// it seems we need this cal obviously
/********* see this example 
 
    // This transaction is sending of the creator tokens(tokens you just created) from their minting wallet to their Phantom Wallet
    var transaction = new web3.Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        1000000, // This is transferring 1 token, not 1000000 tokens
      ),
    );
        
    var signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet],
      {commitment: 'confirmed'},
    );



******************/
let transaction = new Transaction()
  .add(createSetAuthorityInstruction(
    mint,
    wallet.publicKey,
    AuthorityType.MintTokens,
    null
  ));

await web3.sendAndConfirmTransaction(connection, transaction, [wallet]);

//may be upper best 

/*************
   await solanaSplToken.setAuthority(
     sol_connection,
     fromWallet,            // Payer of the transaction fees
     mint,                  // Account 
     fromWallet.publicKey,  // Current authority 
     0,                     // Authority type: "0" represents Mint Tokens 
     null                   // Setting the new Authority to null
   );
   
   **********/
  /********
  The only issue with that is nothing stops the “Mint Authority” to continue minting more tokens in the future.
  If they did, we’d suddenly have more than one token in circulation and, thus, more than one wallet could own them.

To prevent that, the mint authority needs to revoke its right to mint more tokens immediately after minting the first one.
https://spl.solana.com/token#example-create-a-non-fungible-token

  ***********/
  //////////////////////////////////////////////////////////////////////////////////////
//////////////////  https://lorisleiva.com/owning-digital-assets-in-solana/how-nfts-are-represented-in-solana
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// works ************/

/*************** for testing of creation nft

const accountInfo = await getAccount(connection, associatedTokenAccount.address);

console.log(accountInfo.amount);
// 1
const mintInfo = await getMint(
    connection,
    mint
  );

console.log(mintInfo);

****************************/

 let kp = JSON.parse( fs.readFileSync('./wallets/solana_keypair.json'));
//console.log(kp);
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
//const fromWallet = solanaWeb3.Keypair.fromSecretKey(secret)

// (async ()=>{
	  // let tokenmetaPubkey = await mpl.Metadata.getPDA();

  // const tokenmeta = await mpl.Metadata.load(sol_connection, tokenmetaPubkey);
  // console.log(tokenmeta);
	// })();
	

//const pathToMyKeypair = process.env.HOME + "/.config/solana/id.json";
//const keypairFile = fs.readFileSync(pathToMyKeypair);
//const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
//const myKeyPair = Keypair.fromSecretKey(secretKey);
//let tokenKeys = JSON.parse( fs.readFileSync('./wallets/solana_oken_keypair.json'));
//console.log(kp);
//const arrToken = Object.values(tokenKeys._keypair.secretKey)
//const secretToken = new Uint8Array(arrToken)
//const tokenWallet = solanaWeb3.Keypair.fromSecretKey(secretToken)

///const myKeyPair = fromWallet;
//const connection = new Connection(clusterApiUrl("devnet"));


const accounts = await sol_connection.getTokenAccountsByOwner(fromWallet.publicKey, {programId: solanaSplToken.TOKEN_PROGRAM_ID})
console.log(accounts);
  accounts.value.forEach( async (account, i) => {
  
	console.log( `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`  );
	console.log(account);
	
	/*********
	try {
   // const mint = account.pubkey; // new PublicKey(mintAddress);
	
	const metaplex = mpl.Metaplex.make(sol_connection)
  .use(keypairIdentity(mint))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));
	/*******
	 ( async () => {
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: "First NFT",
  });

  const { nft } = await metaplex.nfts().create({
    uri: uri,
  });
  console.log("NFT NFT  First NFT  :");
  console.log(nft);
  } )();
	
	
	try{
    const nft = await metaplex.nfts().findByMint(mint);
	   console.log("JUST NFT");
	console.log(nft);
	}
	catch (err2) {
   console.log("#mhvk7: "+err2);
  }
  
   // res.json(nft);
  } catch (err) {
   console.log(err);
  }
  
  *******/
	//console.log(JSON.parse(account.data));
   // console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
   // console.log(`Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`    );
  
  });
  
  
//  import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_WALLET_ADDRESS = fromWallet.publicKey;//"FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
//  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await sol_connection.getParsedProgramAccounts(
    solanaSplToken.TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );
  
 

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
  accounts.forEach(   (account, i) => {
    
	console.log(
      `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
    );
    console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
	console.log(account.account.data["parsed"]["info"]);
	 console.log(
      `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
    );
	const mint = account.account.data["parsed"]["info"]["mint"];
	const metaplex = Metaplex.make(sol_connection)
    .use(keypairIdentity(fromWallet))
    .use(bundlrStorage());
   ( async () => {
	   console.log(account);
	   try {
  const nft = await metaplex.nfts().findByMint(fromTokenAccount.mint).run();
 console.log("JUsT nft: ");
		 console.log(nft);
	   }
	   catch(e){
		//console.log(e);
	   }
	   
	   // const imageUrl = "https://arweave.net/Tapn_42Q9V48ATfuaCTmmTvpeHMFEpUseuUZ9OdDTnQ"
	   
	  // let ttt = await metaplex
    // .nfts()
    // .uploadMetadata({
        
        // name: "My Updated Metadata Name",
        // description: "My Updated Metadata Description",
		
    // })
    // .run();
	
	// console.log("ttt: "+ttt);
	/****
	   const { nft } = await metaplex
    .nfts()
    .create({
        uri: jsonUrl,//"https://arweave.net/123",
        name: "My NFT",
        sellerFeeBasisPoints: 500, // Represents 5.00%.
    })
    .run();
	*******/
	   
	   ////////////////////////////////////////////////////////////
	   //////////////////////////////////////////////////////////
	   //////////////////////////////////////////////////////////
/********	   
  import {
  createCreateMetadataAccountV2Instruction,
  PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
********/
/*********
export const addMetadataToToken = async (
  connection: Connection,
  tokenMint: PublicKey,
  tokenOwner: Keypair,
  name: string,
  symbol: string,
  arweaveLink: string
) => {
**********/	
//  console.log(mtdt);
//	console.log("let's name some tokens! "+mtdt.PROGRAM_ID);


	   ////////////////////////////////////////////////////////////
	   ///////////////////////////  here we link metadata to our nft ///////////////////////////////
	   //////////////////////////////////////////////////////////
	   
	   	   ////////////////////////////////////////////////////////////
	   //////////////////////////  here we link metadata to our nft ////////////////////////////////
	   //////////////////////////////////////////////////////////
	   
	   
	   	   ////////////////////////////////////////////////////////////
	   //////////////////////  here we link metadata to our nft ////////////////////////////////////
	   //////////////////////////////////////////////////////////

/****************************  just here ********* i commented this process 19 08 2022    02 16   in special case 
///// cause      we need to write some function for support some modularity 
////////////////////////////////////////////

 let progr_id = 	new solanaWeb3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
  const seed1 = Buffer.from('metadata', 'utf8')
  const seed2 = progr_id.toBuffer()
  const seed3 = fromTokenAccount.mint.toBuffer()
  const [metadataPDA, _bump] = PublicKey.findProgramAddressSync(
    [seed1, seed2, seed3],
    progr_id,
  )
  const accounts = {
    metadata: metadataPDA,
    mint: fromTokenAccount.mint,//tokenMint,
    mintAuthority: fromWallet.publicKey,
    payer: fromWallet.publicKey,
    updateAuthority: fromWallet.publicKey,
  }
  
  
  let name = 'bla-bla-bla NFT';
  let symbol = 'BBB_NFT';
  const dataV2 = {
    name,
    symbol,
    uri:  "https://arweave.net/Tapn_42Q9V48ATfuaCTmmTvpeHMFEpUseuUZ9OdDTnQ",//arweaveLink,
    // we don't need these
    sellerFeeBasisPoints: 500,
    creators: null,
    collection: null,
    uses: null,
  }
  const args = {
    createMetadataAccountArgsV2: {
      data: dataV2,
      isMutable: true,
    },
  }
  
  try{
  const ix = mtdt.createCreateMetadataAccountV2Instruction(accounts, args)
  const tx = new solanaWeb3.Transaction()
  tx.add(ix)
  const txid = await solanaWeb3.sendAndConfirmTransaction(sol_connection, tx, [fromWallet])
  console.log(txid)
  }
  catch(e){
	console.log(e);
  }
  
  
  **************/
  
  
////////}

  
      // console.log("let's name some tokens!");
    // const myKeypair = fromWallet; //loadWalletKey("AndXYwDqSeoZHqk95TUC1pPdp93musGfCo1KztNFNBhd.json");
    // const mint = fromTokenAccount.mint;/// = new web3.PublicKey("FUDMHraEkdj926Tu75aYHtokoHM8QgGN2Nx8TJr8eSZM");
    // const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    // const seed2 = Buffer.from(solanaSplToken.TOKEN_PROGRAM_ID.toBytes());
    // const seed3 = Buffer.from(mint.toBytes());
    // const [metadataPDA, _bump] = solanaWeb3.PublicKey.findProgramAddressSync([seed1, seed2, seed3],  solanaSplToken.TOKEN_PROGRAM_ID);
    // const accounts = {
        // metadata: metadataPDA,
        // mint,
        // mintAuthority: myKeypair.publicKey,
        // payer: myKeypair.publicKey,
        // updateAuthority: myKeypair.publicKey,
    // }
	
	// const imageUrl = "https://arweave.net/Tapn_42Q9V48ATfuaCTmmTvpeHMFEpUseuUZ9OdDTnQ"
	
    // const dataV2 = {
        
		// name: "Quantum Artist TEST NFT",
		// symbol: "QATN",
		// description: "A description about this test NFT",
		// seller_fee_basis_points: 500,
		// external_url: "http://frozen-brushlands-39280.herokuapp.com/",
		// attributes: [
		  // {
			// trait_type: "NFT type",
			// value: "Custom",
		  // },
		// ],
		// collection: {
		  // name: "Test Collection",
		  // family: "Quantum Artist NFTs",
		// },
		// properties: {
		  // files: [
			// {
			  // uri: imageUrl,
			  // type: "image/png",
			// },
		  // ],
		  // category: "image",
		  // maxSupply: 0,
		  // creators: [
			// {
			  // address: "GYc5erKBjgL45XH4UxHWwnVstenjrp8ZUX2J2rNjpG7J",
			  // share: 100,
			// },
		  // ],
		// },
		// image: imageUrl,
		
		// ///// name: "Fake USD Token",
        // ///// symbol: "FUD",
        // ///// uri: "arweave.json",
        // ///// // we don't need that
        // ///// sellerFeeBasisPoints: 0,
        // ///// creators: null,
        // ///// collection: null,
        // ///// uses: null
    // }
    // let ix;
	// const INITIALIZE = true;
	
    // if (INITIALIZE) {
        // const args =  {
            // createMetadataAccountArgsV2: {
                // data: dataV2,
                // isMutable: true
            // }
        // };
        // ix = mtdt.CreateMetadataAccountV2Instruction(accounts, args);
    // } else {
        // const args =  {
            // updateMetadataAccountArgsV2: {
                // data: dataV2,
                // isMutable: true,
                // updateAuthority: myKeypair.publicKey,
                // primarySaleHappened: true
            // }
        // };
        // ix = mtdt.createUpdateMetadataAccountV2Instruction(accounts, args)
    // }
    // const tx7 = new solanaWeb3.Transaction();
    // tx7.add(ix);
    // //const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");
    // const txid = await solanaWeb3.sendAndConfirmTransaction(sol_connection, tx7, [myKeypair]);
    // console.log(txid);

  ////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
		 /****
		    ( async () => {
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: "First NFT",
  });

  const { nft1} = await metaplex.nfts().create({
    uri: uri,
  });
  
  console.log(nft1);
  
			})();
		 
		 *****/
		 
		 
   })();
	//
		 // const metaplex = Metaplex.make(sol_connection)
  // .use(keypairIdentity(fromWallet))
  // .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));
		// const nft = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
	
   	// })();
  });
  /*
    // Output

    Found 2 token account(s) for wallet FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T: 
    -- Token Account Address 0:  H12yCcKLHFJFfohkeKiN8v3zgaLnUMwRcnJTyB4igAsy --
    Mint: CKKDsBT6KiT4GDKs3e39Ue9tDkhuGUKM3cC2a7pmV9YK
    Amount: 1
    -- Token Account Address 1:  Et3bNDxe2wP1yE5ao6mMvUByQUHg8nZTndpJNvfKLdCb --
    Mint: BUGuuhPsHpk8YZrL2GctsCtXGneL1gmT5zYb7eMHZDWf
    Amount: 3
  */



  
  
})();
  
  
 /*****
 try {
    const mint = new PublicKey(mintAddress);
    const nft = await metaplex.nfts().findByMint(mint);
    res.json(nft);
  } catch (err) {
    res.send(err);
  }
  *******/
  
 /********** 
const metaplex = Metaplex.make(sol_connection)
  .use(keypairIdentity(myKeyPair))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));
  
   ( async () => {
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: "First NFT",
  });

  const { nft } = await metaplex.nfts().create({
    uri: uri,
  });
  
  console.log(nft);
  } )();
***********/

/*******/
  //console.log(nft.mint.toBase58());
//};

//uploadNFT();

///   const MY_WALLET_ADDRESS = fromWallet.publicKey;//"7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p";
 /********   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const accounts = await connection.getParsedProgramAccounts(
    solanaSplToken.TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
  
  accounts.forEach((account, i) => {
  
	console.log(
      `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
    );
    console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
    console.log(
      `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
    );
  
  });

*******/
/*******
 let mintPubkey = new PublicKey(MY_WALLET_ADDRESS);
  let tokenmetaPubkey = await mtdt.Metadata.getPDA(mintPubkey);
  console.log("tokenmetaPubkey:");
console.log(tokenmetaPubkey);
let errCode = "";
  const tokenmeta = await mtdt.Metadata.load(sol_connection, tokenmetaPubkey).then(()=>{
	  
  }).catch(e => { console.log(e.errorCode); errCode = ""+e.errorCode; });

	if((tokenmeta == undefined) && errCode=="3") {
		//here we create our metadata for our token
		console.log("Metadata not created yet");
		
		*********/
	/***********	
		 let splaccount = solanaWeb3.Keypair.generate();
		   const transaction = new solanaWeb3.Transaction();
		   try {
			   
  let programId = solanaSplToken.TOKEN_PROGRAM_ID; //fromWallet.publicKey;// solanaWeb3.Keypair.generate();
  
	   const instruction = await solanaWeb3.SystemProgram.createAccount({
			  fromPubkey: fromWallet.publicKey,
			  newAccountPubkey: splaccount.publicKey,
			  space: 165,
			  lamports: 10000,
			 programId,
		   });
		   transaction.add(instruction);
		   console.log("PDA account:");
		   console.log(splaccount);
		   var signature2 = await solanaWeb3.sendAndConfirmTransaction(
			  sol_connection, 
			  transaction, 
			  [fromWallet, splaccount]);
		   console.log(signature2);
		  
		} catch (error) {
  console.log(error);
}
	 ********/
//	}
//	else {
//		console.log(tokenmeta);  
//	}  
  

  
    
 })();
  
  
  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
/************
Here we generated new wallet and keypair for it:
474ypdbNfriUBFu75Hwd83vM9uwSJjwUyGEeCBcWvTnM
mint_nft_solana
Confirming airdrop...
After success requested airdrop to this wallet
Now we create a new SPL token
PublicKey {
  _bn: <BN: e0667eb44cf6929031c451d2b0b9cdde2f2b593fb23228e3662d6f725ebc7c14>
}
After creating tokem account for our SPL token (see below)
{
  address: PublicKey {
    _bn: <BN: 8e78a7a3d85c6ca4701b099849b4dec7b9702ccbc4701fac474f82ac18c8f25b>
  },
  mint: PublicKey {
    _bn: <BN: e0667eb44cf6929031c451d2b0b9cdde2f2b593fb23228e3662d6f725ebc7c14>
  },
  owner: PublicKey {
    _bn: <BN: 2e210ba3c6ee880ae4abf7d9fbf7d008f100b9333180dac60d1e6010d9cb2ee6>
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
tok account addre: Ab9brDdaPfsRiKnruNsVRHm6UdicfjJnCFxCVGhxTnWv
SIGNATURE of transaction of this minting:
42rE4Ldy9ubdQioUXF8eRTsty1UZW5mLhoaHDMmVaLQBXWZdoNt2vBBC9BrSEYHkXuAYAbXHhXoSjeeyMDgJGPAd
{
  context: { apiVersion: '1.10.29', slot: 148575530 },
  value: [ { account: [Object], pubkey: [PublicKey] } ]
}
-- Token Account Address 1: Ab9brDdaPfsRiKnruNsVRHm6UdicfjJnCFxCVGhxTnWv --
{
  account: {
    data: <Buffer e0 66 7e b4 4c f6 92 90 31 c4 51 d2 b0 b9 cd de 2f 2b 59 3f b2 32 28 e3 66 2d 6f 72 5e bc 7c 14 2e 21 0b a3 c6 ee 88 0a e4 ab f7 d9 fb f7 d0 08 f1 00 ... 115 more bytes>,
    executable: false,
    lamports: 2039280,
    owner: PublicKey {
      _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    },
    rentEpoch: 343
  },
  pubkey: PublicKey {
    _bn: <BN: 8e78a7a3d85c6ca4701b099849b4dec7b9702ccbc4701fac474f82ac18c8f25b>
  }
}
********/
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
  
//import { Connection, PublicKey } from "@solana/web3.js";
//import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

// NFT is a mint. just like SRM, USDC ..., the only different is that NFT's supply is 1
//
// if we want to get NFT's metadata, first we need to know what is the mint address.
// here I take a random DAPE as an example
// https://explorer.solana.com/address/9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A
//
// tokenmeta is a PDA a which derived by mint address
// the formula is ['metadata', metadata_program_id, mint_id]
// is it totally fine to forget it because sdk already wrapped it for us

//const connection = new Connection("https://api.mainnet-beta.solana.com");
/***************
  let splaccount = solanaWeb3.Keypair.generate();
   const transaction = new solanaWeb3.Transaction();
   const instruction = solanaWeb3.SystemProgram.createAccount({
      fromPubkey: fromWallet.publicKey,
      newAccountPubkey: splaccount.publicKey,
      space: 165,
      lamports: 1000,
      programId,
   });
   transaction.add(instruction);
   console.log("PDA account:");
   console.log(splaccount);
   var signature2 = await solanaWeb3.sendAndConfirmTransaction(
      connection, 
      transaction, 
      [fromWallet, splaccount]);
   console.log(signature2);

 let mintPubkey = new PublicKey(MY_WALLET_ADDRESS);
  let tokenmetaPubkey = await mtdt.Metadata.getPDA(mintPubkey);
console.log(tokenmetaPubkey);
let errCode = "";
  const tokenmeta = await mtdt.Metadata.load(connection, tokenmetaPubkey).then(()=>{
	  
  }).catch(e => { console.log(e.errorCode); errCode = ""+e.errorCode; });

	if((tokenmeta == undefined) && errCode=="3") {
		//here we create our metadata for our token
		console.log("Metadata not created yet");
		
	}
	else {
		console.log(tokenmeta);  
	}
  
})();
  
  **************/
  
  
/****************
  // Generate a new wallet keypair and airdrop SOL
  const fromWallet = solanaWeb3.Keypair.generate();
  
	console.log("Here we generated new wallet and keypair for it:");
	console.log(fromWallet.publicKey.toBase58());
	//Here we generated new wallet and keypair for it:
	//7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p
  
  const fromAirdropSignature = await sol_connection.requestAirdrop(
    fromWallet.publicKey,
    solanaWeb3.LAMPORTS_PER_SOL
  );
  
 
console.log("Confirming airdrop...");
  // Wait for airdrop confirmation
  await sol_connection.confirmTransaction(fromAirdropSignature);

	console.log("After success requested airdrop to this wallet");
	console.log("Now we create a new SPL token");
  // Create a new token 
  const mint = await solanaSplToken.createMint(
    sol_connection, 
    fromWallet,            // Payer of the transaction
    fromWallet.publicKey,  // Account that will control the minting 
    null,                  // Account that will control the freezing of the token 
    0                      // Location of the decimal place 
  );
  console.log(mint);

  // Get the token account of the fromWallet Solana address. If it does not exist, create it.
  const fromTokenAccount = await solanaSplToken.getOrCreateAssociatedTokenAccount(
    sol_connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );
  
  
  
console.log("After creating tokem account for our SPL token (see below)");
//console.log(fromTokenAccount.address);
//console.log(fromTokenAccount);

console.log("tok account addre: "+fromTokenAccount.address.toBase58());
// JE6Cx8gMS2bpSXsfFHjZ5sX4w3Lo9SRwGj1CR5XkuhwM

/**********
// when i look for explorer solana for "JE6Cx8gMS2bpSXsfFHjZ5sX4w3Lo9SRwGj1CR5XkuhwM" i got this information:
Token Account
Address	JE6Cx8gMS2bpSXsfFHjZ5sX4w3Lo9SRwGj1CR5XkuhwM
Mint	GzjgGacCHHznb5oBSq2Kr2piLGZiyNETjasQN5KhVrq3
Owner	7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p
Token balance (tokens)

ALL OUTPUT for wallet "7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p" //when i generated it

Here we generated new wallet and keypair for it:
7VKwHpVkt1GCxuDxr776ug834vhAkLB1CrHj1tbZEJ5p
mint_nft_solana
Confirming airdrop...
After success requested airdrop to this wallet
Now we create a new SPL token
PublicKey {
  _bn: <BN: eda9aa44127f7836221537c4d2f23da79bfab0b2c97012bec7b4818d7b9b4f66>
}
After creating tokem account for our SPL token (see below)
PublicKey {
  _bn: <BN: fff11d60d54fc1c008b5e7170f9ab1e74925d2e56f9d8df71d90d2f21f88a480>
}
{
  address: PublicKey {
    _bn: <BN: fff11d60d54fc1c008b5e7170f9ab1e74925d2e56f9d8df71d90d2f21f88a480>
  },
  mint: PublicKey {
    _bn: <BN: eda9aa44127f7836221537c4d2f23da79bfab0b2c97012bec7b4818d7b9b4f66>
  },
  owner: PublicKey {
    _bn: <BN: 6067cb95c90a7a78c26122f88c2cbd5414c7b779d78a18f882d4d83689429a83>
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
tok account addre: JE6Cx8gMS2bpSXsfFHjZ5sX4w3Lo9SRwGj1CR5XkuhwM
SIGNATURE of transaction of this minting:
32krnNyuvCwjP81Lv8wJyq92WcbVxqFTKEH6XsfcYNJRm6wgVt7S8AK8QQkXMQDswM2L3b6ChxhjeU1rn8gijMBt


*******/

  /************
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

//SIGNATURE of transaction of this minting:
//3vLaxuHbueeVUT85iwjKURSmjPs5hsWCpSSanZaQzqrHqduttpQ12FqZeUgGFB1aY26GYyh9zqAY7VqjfRHj77ot

  await solanaSplToken.setAuthority(
    sol_connection,
    fromWallet,            // Payer of the transaction fees
    mint,                  // Account 
    fromWallet.publicKey,  // Current authority 
    0,                     // Authority type: "0" represents Mint Tokens 
    null                   // Setting the new Authority to null
  );
  
 *********/

//const pathToMyKeypair = process.env.SKP;
//const keypairFile = fs.readFileSync(pathToMyKeypair);
//const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
//const keypair = Keypair.fromSecretKey(secretKey);

/******
const keypair = fromWallet;
const app = express();

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));
  
  
  
  
  
  
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
    let ix;
	const INITIALIZE = true;
	
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

  
  
  
  /**********
  
  
  
  

app.get("/getNFT", async (req, res) => {
  let mintAddress = req.query.mint;

  if (!mintAddress) {
    res.status(400).json({
      err: "Mint Address Not Provided",
    });
  }

  try {
    const mint = new PublicKey(mintAddress);
    const nft = await metaplex.nfts().findByMint(mint);
	////////////////////
	///call this update here
	
	
	// update
	// The update method accepts an Nft object and a set of parameters to update on the NFT. 
	// It then returns a new Nft object representing the updated NFT.

    // For instance, here is how you would change the on-chain name of an NFT.

    const { nft: updatedNft } = await metaplex
    .nfts()
    .update(nft, { name: "My Updated Name jhggvjh77" })
    .run();
	
    // Anything that you don’t provide in the parameters will stay unchanged.
    // If you’d like to change the JSON metadata of the NFT, 
	// you’d first need to upload a new metadata object using the uploadMetadata method 
	// and then use the provided URI to update the NFT.

    const { uri: newUri } = await metaplex
    .nfts()
    .uploadMetadata({
        ...nft.json,
        name: "My Updated Metadata fdshsd4hgckjh Name",
        description: "My Updated Metadata tff77 Description",
    })
    .run();

    const { nft: updatedNft2 } = await metaplex
    .nfts()
    .update(nft, { uri: newUri })
    .run();
	
	
	/////////////////////
    res.json(nft);
  } catch (err) {
    res.send(err);
  }
});

**************/
/********
  
   	console.log(process.env.AWK);
    const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
    console.log(wt);
	
	  const arweave = arweaveArweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });
  
   //const arweaveWalletBallance = await arweave.wallets.getBalance(wt);
   
   arweave.wallets.getBalance('oxI-d73TcoMoxrc8RNKChrJ9UcV3UBYCOsL7-eja2IU').then((balance) => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);

    console.log("winston: "+winston);
    //125213858712

    console.log("AR: "+ar);
    //0.125213858712
});

   //console.log("BALANCE: "+arweaveWalletBallance);
   
/*****
//         !!! works
  // Upload image to Arweave
  const data = fs.readFileSync(process.env.PATH_TO_PATTERN_PNG);

  const transaction = await arweave.createTransaction({
    data: data,
  });

  transaction.addTag("Content-Type", "image/png");
//we need to have wallet.json file from arwaev
//  const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
  
  await arweave.transactions.sign(transaction, wt);

  const response = await arweave.transactions.post(transaction);
  console.log(response);

  const id = transaction.id;
  const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log("imageUrl", imageUrl);
****/

/*************** WORKS!!!!

// works works!!!

  // Upload metadata to Arweave
//oxI-d73TcoMoxrc8RNKChrJ9UcV3UBYCOsL7-eja2IU  and test image uri https://arweave.net/Tapn_42Q9V48ATfuaCTmmTvpeHMFEpUseuUZ9OdDTnQ
  
  const imageUrl = "https://arweave.net/Tapn_42Q9V48ATfuaCTmmTvpeHMFEpUseuUZ9OdDTnQ"
  
  
  const metadata = {
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
  };
  
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
  
  
  
  
  
  
  
 /*** ***/
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
//})();






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




	//	for png image // upload https://solanacookbook.com/references/nfts.html#upload-to-arweave or
	
	/**************
	https://zkhalapyan.medium.com/programmatically-uploading-nft-pngs-to-arweave-through-js-apis-2a1a053d73b2
	
	If you have an NFT project that’s dynamically generating a PNG during mint time, you need a way to upload the new image 
	to Arweave. Usually, files are uploaded via the Arkb CLI tool, but in our case, 
	we would need to go through Arweave JS library to be able to do so programmatically.

As I was following the code examples, I realized that there aren’t any public tutorials or documentation describing the process,
 so thought I would write down some of my findings 🙂

To start off, our goal is simple: programmatically upload our NFT PNGs to Arweave ✅ let’s see how we can go about it!

Should it be a backend API i.e. https://…/api/upload-png?
The quick answer is yes! Since uploading to Arweave requires a payment and we don’t want the user to go through the pain 
of installing an Arweave compatible wallet, we probably are better off paying it 
by ourselves through using our private keys. Since we don’t want to ship our private keys, 
this leads us to using a simple backend API that takes in a PNG and returns back an Arweave URL. 
Pretty simple, right?

Where should we store our keys?
Because we don’t want to manually sign every single Arweave upload transaction, 
we want to be able store our private keys somewhere. If you’re using React or Next.js, .env files work out great.
Just make sure you’re not using REACT_APP or NEXT_PUBLIC to make sure the keys are private.

$cat .env
ARWEAVE_KEY={"kty":"RSA","n":"........", }
The JSON key value is huge, but works out just fine! 
Now we can read in the variable through process.env.ARWEAVE_KEY as follows:

const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY!) as JWKInterface
JWKInterace is just a simple object interface provided by Arweave requiring the loaded key
to conform the JSON Web Key standard, so nothing to worry about.
The alternative would be use to the file system and then read in through something like readFileSync(..)
 but using the fs library is always a PITA.

So how do we do it?
I will be using Next.js API Routes, but the code should be simple enough to be ported to any backend wrapper 
that you might be using. Good idea to start with reading arweave-js’s documentation;
 honestly, the only parts that were missing for me was how to handle PNGs, 
 so will try to cover most of that below. Read the code and I will explain each section right after.


	
	
	
	
	
	
	
	
import type { NextApiRequest, NextApiResponse } from 'next'
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

type Data = {
  uri: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // #1 Get the data from the POST request; encoded as base64 string. 
  const b64string = req.body.b64string
  const buf = Buffer.from(b64string, 'base64');

  // #2 Make a connection to Arweave server; following standard example. 
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });
  
  // #3 Load our key from the .env file
  const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY!) as JWKInterface

  // #4 Check out wallet balance. We should probably fail if too low? 
  const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
  const arweaveWalletBallance = await arweave.wallets.getBalance(arweaveWallet);

  // #5 Core flow: create a transaction, upload and wait for the status! 
  let transaction = await arweave.createTransaction({data: buf}, arweaveKey);
  transaction.addTag('Content-Type', 'image/png');
  await arweave.transactions.sign(transaction, arweaveKey);
  const response = await arweave.transactions.post(transaction);
  const status = await arweave.transactions.getStatus(transaction.id)
  console.log(`Completed transaction ${transaction.id} with status code ${status}!`)

  // #6 This is the tricky part, use the format below to get to the PNG url! 
  res.status(200).json({ 
    uri: `https://www.arweave.net/${transaction.id}?ext=png` 
  })
}




So here is what’s going on:

Get our PNG image. The idea here is that the client on the browser passes the backend the PNG to upload to Arweave;
I decided to base64 encode my PNG, but you can pass in data as a binary blob if you wish.
Connect to Arweave. Just following the example in their documentation.
Load our private key. As described above, I am storing them in .env; 
this helps me both read it in quickly and avoid uploading it to my git repo by adding .env to my .gitignore.
Check our ballance. Production version would probably log some error we can detect and handle quickly. Right now, just have fun knowing that Arweave tokens are counted in Winstons 😛
Create a transaction, upload the PNG and check status. Ok, this is the important part. You need to set the tag Content-Type to image/png or it won’t work! Because arweaveKey has our private key, we don’t actually need to sign through the browser, which is pretty nifty! You can either upload through chunking or use the post() function to do all at once; for smaller files, this way works better. The documentation has more to say. When we get the response from the post function, it’s just for posting the transaction, not that it has succeeded — to do that, we need to fetch the status separately. If it’s 200, we’re good to go!
Construct the URL with the transaction ID. It’s a bit annoying, but you gotta go digging in the documentation to figure out the right format. It’s https://www.arweave.net/${TRANSACTION_ID}?ext=png. You can also use wagmify’s to type in ar TRANSACTION_ID in your URL bar to test it out!
How to call the API?
We make a POST request to our API, pass in the data, and get the URI in return. Pretty simple 🙂 I really like using the fetch(..) function, see below:






	
	or
	
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







///})();

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


//const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
//const fs = require("fs");

/******

//have resolved my issue. The 'programId' needs to be the solana token program id.

import * as web3 from '@solana/web3.js';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token'  // !!!

//Each account contains a different token type. 
//NFT's will have only one token in account (I believe)
const accounts = await connection.getTokenAccountsByOwner(pk, {programId: TOKEN_PROGRAM_ID})
 try {
    const mint = new PublicKey(mintAddress);
    const nft = await metaplex.nfts().findByMint(mint);
    res.json(nft);
  } catch (err) {
    res.send(err);
  }
***********/
/**********
import { Keypair, Transaction, SystemProgram, Connection, PublicKey } from "@solana/web3.js";

import {
  ACCOUNT_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeAccountInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as bs58 from "bs58";

// connection
const connection = new Connection("https://api.devnet.solana.com");

// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
const feePayer = Keypair.fromSecretKey(
  bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
);

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
const alice = Keypair.fromSecretKey(
  bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
);

const mintPubkey = new PublicKey("AjMpnWhqrbFPJTQps4wEPNnGuQPMKUcfqHUqAeEf1WM4");

// create token account

// you will need a token account to recieve token in Solana
// in the other words, if you want to receive USDC, you will need a USDC token account
// if you want to receive RAY, you will need a RAY token account
// and these account's address are different (because they are not the same account)

// There are two ways to create token account

// 1. Random
// the main concept is to create a random keypair and init it as a token account
// but I don't recommend you to use this way, it will let user to store many different account
// make managing token account hard.

// 2. Associated Token Address (ATA)
// the recommend one
// this way will derive your token address by your SOL address + mint address
// and anytime you get the same result, if you pass the same SOL address and mint address
// it make managing token account easy, because I can know all of your token address just by your SOL address
/*******
(async () => {
  // 1. Random
  {
    let tokenAccount = Keypair.generate();
    console.log(`ramdom token address: ${tokenAccount.publicKey.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      // create account
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: ACCOUNT_SIZE,
        lamports: await getMinimumBalanceForRentExemptAccount(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      // init token account
      createInitializeAccountInstruction(tokenAccount.publicKey, mintPubkey, alice.publicKey)
    );

    console.log(
      `create random token account txhash: ${await connection.sendTransaction(tx, [feePayer, tokenAccount])}`
    );
  }

  // 2. ATA
  {
    let ata = await getAssociatedTokenAddress(
      mintPubkey, // mint
      alice.publicKey, // owner
      false // allow owner off curve
    );
    console.log(`ata: ${ata.toBase58()}`);

    let tx = new Transaction();
    tx.add(
      createAssociatedTokenAccountInstruction(
        feePayer.publicKey, // payer
        ata, // ata
        alice.publicKey, // owner
        mintPubkey // mint
      )
    );

    console.log(`create ata txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
  }
})();

*********/

/******** all outputs console.log from 05 37  18 07 2022 ************

in function mint_nft_solana
connection...
Here we generated new wallet and keypair for it:
9CEUPmGSManRDqNGPAbEWcSWjDZpsxWoZtzKiqYZfvxd
mint_nft_solana
Confirming airdrop...
After success requested airdrop to this wallet
Now we create a new SPL token
PublicKey {
  _bn: <BN: ea967848ec6e95ac5800bae8aead6ffed29db7590ebf3bbc922d8358217a1bd5>
}
After creating tokem account for our SPL token (see below)
{
  address: PublicKey {
    _bn: <BN: 35f66c7ec7741af444141e334d2e33409352e0ced50b4de94d8c79cc1f43e2f2>
  },
  mint: PublicKey {
    _bn: <BN: ea967848ec6e95ac5800bae8aead6ffed29db7590ebf3bbc922d8358217a1bd5>
  },
  owner: PublicKey {
    _bn: <BN: 79be1e128ed41620ccb82061b3c4bc3033f4df588a73bbedf2f9701f575069de>
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
tok account addre: 4deYhFVzD2i3N3qJNcpmBraGK3JPrjS6iZW7KQcnNFdT
SIGNATURE of transaction of this minting:
5sAoEKWPP4aNmUj5eYY7aGcB3MaeqwRSkHa9489hhwEuwgtKFinUABzc3tXzj9Esndpr4UHLncZuKgZPm66uH8Xf
{
  context: { apiVersion: '1.10.29', slot: 148721593 },
  value: [ { account: [Object], pubkey: [PublicKey] } ]
}
-- Token Account Address 1: 4deYhFVzD2i3N3qJNcpmBraGK3JPrjS6iZW7KQcnNFdT --
{
  account: {
    data: <Buffer ea 96 78 48 ec 6e 95 ac 58 00 ba e8 ae ad 6f fe d2 9d b7 59 0e bf 3b bc 92 2d 83 58 21 7a 1b d5 79 be 1e 12 8e d4 16 20 cc b8 20 61 b3 c4 bc 30 33 f4 ... 115 more bytes>,
    executable: false,
    lamports: 2039280,
    owner: PublicKey {
      _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    },
    rentEpoch: 344
  },
  pubkey: PublicKey {
    _bn: <BN: 35f66c7ec7741af444141e334d2e33409352e0ced50b4de94d8c79cc1f43e2f2>
  }
}
Found 1 token account(s) for wallet 9CEUPmGSManRDqNGPAbEWcSWjDZpsxWoZtzKiqYZfvxd:
-- Token Account Address 1: 4deYhFVzD2i3N3qJNcpmBraGK3JPrjS6iZW7KQcnNFdT --
Mint: GnjUhbfaCWg2SL4mzyzu6strtp5jgYv8h36gbekvfaNG
{
  isNative: false,
  mint: 'GnjUhbfaCWg2SL4mzyzu6strtp5jgYv8h36gbekvfaNG',
  owner: '9CEUPmGSManRDqNGPAbEWcSWjDZpsxWoZtzKiqYZfvxd',
  state: 'initialized',
  tokenAmount: { amount: '1', decimals: 0, uiAmount: 1, uiAmountString: '1' }
}
Amount: 1
{
  account: {
    data: { parsed: [Object], program: 'spl-token', space: 165 },
    executable: false,
    lamports: 2039280,
    owner: PublicKey {
      _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
    },
    rentEpoch: 344
  },
  pubkey: PublicKey {
    _bn: <BN: 35f66c7ec7741af444141e334d2e33409352e0ced50b4de94d8c79cc1f43e2f2>
  }
}
5GgJoS6Jzz3QjMhXCA6tpEavGn6VPk1Koa9cyF8LZnyWmQFfQybw5D7n4TAe9fGbhB29v2tGcgxwrpgYRVoBNs2Y

//last wallets and values on 18_07_2022 05_32

*******************/