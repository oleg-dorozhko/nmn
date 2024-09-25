console.log('mod mint nft solana create metadata on');
module.exports.mint_nft_solana_create_metadata = mint_nft_solana_create_metadata;


//const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");

const bs58 = require("bs58");

var fs = require('fs');
require('dotenv').config();
 


const solanaWeb3 = require('@solana/web3.js');

const solanaSplToken = require('@solana/spl-token');

const mpl = require ('@metaplex-foundation/mpl-token-metadata')
 
const { Creator } = require ('@metaplex-foundation/js')
 
function mint_nft_solana_create_metadata(im) { 

	console.log("In mint_nft_solana_create_metadata:");


	( async ()=> {

		let kp = JSON.parse( fs.readFileSync('./wallets/mpw.json'));
		console.log("kp entered...");
		
		const fromWallet = solanaWeb3.Keypair.fromSecretKey(bs58.decode(kp.pk));
	
		// Connect to cluster //get connection from mainnet
		const sol_connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"), "confirmed");
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
  fs.writeFileSync('./wallets/solana_mint.json', JSON.stringify(mint));
  fs.writeFileSync('./wallets/solana_mint_pk.json', JSON.stringify(new solanaWeb3.PublicKey(mint)));
  
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
fs.writeFileSync('./wallets/solana_fromTokenAccountAddress.json', JSON.stringify(fromTokenAccount.address));
console.log("tok account addre: "+fromTokenAccount.address);
fs.writeFileSync('./wallets/solana_fromTokenAccountAddress58.json', JSON.stringify(fromTokenAccount.address.toBase58()));
console.log("tok account addre58: "+fromTokenAccount.address.toBase58());
fs.writeFileSync('./wallets/solana_fromTokenAccountMint.json', JSON.stringify(fromTokenAccount.mint));
console.log("fromTokenAccount.mint: "+fromTokenAccount.mint);
fs.writeFileSync('./wallets/solana_fromTokenAccountMint58.json', JSON.stringify(fromTokenAccount.mint.toBase58()));
console.log("fromTokenAccount.mint58: "+fromTokenAccount.mint.toBase58());
fs.writeFileSync('./wallets/solana_fromTokenAccountOwner.json', JSON.stringify(fromTokenAccount.owner));
console.log("fromTokenAccount.owner: "+fromTokenAccount.owner);
fs.writeFileSync('./wallets/solana_fromTokenAccountOwner58.json', JSON.stringify(fromTokenAccount.owner.toBase58())); 
console.log("fromTokenAccount58.owner: "+fromTokenAccount.owner.toBase58());


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
*********/
/********* 
// and setAuthority to null
   await solanaSplToken.setAuthority(
     sol_connection,
     fromWallet,            // Payer of the transaction fees
     mint,                  // Account 
     fromWallet.publicKey,  // Current authority 
     0,                     // Authority type: "0" represents Mint Tokens 
     null                   // Setting the new Authority to null
   );

	 *******/
	 
	
	
	
	/*****************/
	
	
	const mint = new solanaWeb3.PublicKey('7ZaZdN3P1c9NXcyqKVpLvwijmui8YEj1TG7TSMiLdPxM');
	
	let sfn = 'f15d7ca5c4537441275644a5cc77f080_1660951584711'; //first nft json arweave
	const data = fs.readFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + sfn + ".json");
	let obj = JSON.parse(data);
   
	// getting json object from file 
	let name = obj.name;
	let symbol = obj.symbol;
	let description = obj.description;
  
	//addMetadataToToken (  sol_connection,  mint, fromWallet, obj );

	obj.uri = 'https://arweave.net/NIR1fnQUqo6iVAbgDN_5Fm92yENljDT_eyBSPvx2ZQ0';
	updateMetadataOfNFT( sol_connection, mint, fromWallet, obj );
	
	
 /****************
// On Solana, NFT metadata is stored in accounts which are owned by the shared contract Token Metadata Program at address metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s
 let progr_id = 	new solanaWeb3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
  const seed1 = Buffer.from('metadata', 'utf8')
  const seed2 = progr_id.toBuffer()
  const seed3 =  mint.toBuffer()
  const [metadataPDA, _bump] = solanaWeb3.PublicKey.findProgramAddressSync(
    [seed1, seed2, seed3],
    progr_id,
  )
  const accounts = {
    metadata: metadataPDA,
    mint:  mint, 
    mintAuthority: fromWallet.publicKey,
    payer: fromWallet.publicKey,
    updateAuthority: fromWallet.publicKey,
  }
  
 
	   console.log(" #n999 ");
    
  let sfn = 'f15d7ca5c4537441275644a5cc77f080_1660951584711'; //first nft json arweave
  const data = fs.readFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + sfn + ".json");
  let obj = JSON.parse(data);
   console.log(" #n101010 ");
  // getting json object from file 
  let name = obj.name;
  let symbol = obj.symbol;
  let description = obj.description;
  
  
     console.log(" #n1111111 ");
  const dataV2 = {
    name,
    symbol,
	description,
    
	uri: obj.uri,
   
    sellerFeeBasisPoints: obj.seller_fee_basis_points,
    creators:   obj.properties.creators,
    collection: obj.collection,
    uses: null,
  }
   console.log(" #n1212121212 ");
	 
  
  
   
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
	
	
	***************/
	
	
	
	
	
	
	
	
})();
 
}
/************
Transaction simulation failed: Error processing Instruction 0: custom program error: 0xa
    Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]
    Program log: Instruction: Create Metadata Accounts
    Program log: Mint authority provided does not match the authority on the mint
    Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 22108 of 200000 compute units
    Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s failed: custom program error: 0xa
	*********/
async function addMetadataToToken (  connection,  tokenMint, tokenOwner, obj )
{
	let programId = new solanaWeb3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
  const seed1 = Buffer.from('metadata', 'utf8')
  const seed2 = programId.toBuffer()
  const seed3 = tokenMint.toBuffer()
  const [metadataPDA, _bump] = solanaWeb3.PublicKey.findProgramAddressSync(
    [seed1, seed2, seed3],
    programId
  )
  const accounts = {
    metadata: metadataPDA,
    mint: tokenMint,
    mintAuthority: tokenOwner.publicKey,
    payer: tokenOwner.publicKey,
    updateAuthority: tokenOwner.publicKey,
  }
  
   const dataV2 =    {
    name: obj.name,
    symbol: obj.symbol,
	uri: obj.properties.files[0].uri,
    sellerFeeBasisPoints: Number(obj.seller_fee_basis_points),
    creators:  null,// [ obj.properties.creators[0] ],
    collection: null, //{ name: "Colored patterns", family: "Colored patterns" },
    uses: null
	
  } 
  
  const args = {
    createMetadataAccountArgsV2: {
      data: dataV2,
      isMutable: true,
	  //collectionDetails: null
    },
  }
  const ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args)
  const tx = new solanaWeb3.Transaction()
  tx.add(ix)
  const txid = await solanaWeb3.sendAndConfirmTransaction(connection, tx, [tokenOwner])
  console.log(txid)
}
	
	
	
	async function updateMetadataOfNFT( connection, tokenMint, tokenOwner, obj ) {
	
//import { Wallet } from "@project-serum/anchor";
//import * as anchor from "@project-serum/anchor";
//import {createUpdateMetadataAccountV2Instruction,DataV2,UpdateMetadataAccountV2InstructionArgs,UpdateMetadataAccountV2InstructionAccounts} from "@metaplex-foundation/mpl-token-metadata"
//const fs = require("fs");


    // This is the Update Authority Secret Key
//    const secretKey = fs.readFileSync(
 //       "/Users/pratiksaria/.config/solana/id.json",
 //       "utf8"
 //     );
 //     const keypair = anchor.web3.Keypair.fromSecretKey(
 //       Buffer.from(JSON.parse(secretKey))
 //     );
 
 
 //     const endpoint = "https://metaplex.devnet.rpcpool.com/";
 // const connection = new anchor.web3.Connection(endpoint);

 // const wallet = new Wallet(keypair);
 // console.log("Connected Wallet", wallet.publicKey.toString());

  //const TOKEN_METADATA_PROGRAM_ID = new solanaWeb3.PublicKey( "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"  );

  // You have to enter your NFT Mint address Over Here
  ///const mintKey = new anchor.web3.PublicKey("5iSxT33FyHWsnb8NYSytY17TTXfkFn62FiCyFVFxYhqY");
/////////////////////////////////

	let programId = new solanaWeb3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

  const seed1 = Buffer.from('metadata', 'utf8')
  const seed2 = programId.toBuffer()
  const seed3 = tokenMint.toBuffer()
  const [metadatakey] = await solanaWeb3.PublicKey.findProgramAddress(
    [
     seed1,
     seed2,
     seed3,// mintKey.toBuffer(),
    ],
    programId
  );

let creators = [
        
        {
            address: tokenOwner.publicKey, 
            share: 100,
            verified: false,
        },
       
    ];
  // BTW DeGods is my FAV collection although i cant afford one 🥲
  const updated_data =  {
    name: obj.name,
    symbol: obj.symbol,
    uri: obj.uri,
	sellerFeeBasisPoints: Number(obj.seller_fee_basis_points),
    creators: creators,// obj.properties.creators,
	collection: null,//obj.collection,
	uses: null
  };

  const accounts  = {
    metadata: metadatakey,
    updateAuthority: tokenOwner.publicKey,
	 
    mint: tokenMint,
    mintAuthority: tokenOwner.publicKey,
    payer: tokenOwner.publicKey,
     
  }

  const args  = {
    updateMetadataAccountArgsV2: {
      data: updated_data,
      updateAuthority: tokenOwner.publicKey,
     primarySaleHappened: false,
      isMutable: true,
    }
  }

  const updateMetadataAccount = mpl.createUpdateMetadataAccountV2Instruction(  accounts,  args  );
  
   const tx = new solanaWeb3.Transaction()
  tx.add(updateMetadataAccount)
  const txid = await solanaWeb3.sendAndConfirmTransaction(connection, tx, [tokenOwner])
  console.log(txid)
  
  
  
/************
  const transaction = new anchor.web3.Transaction()
  transaction.add(updateMetadataAccount);
  const {blockhash} = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;
  const signedTx = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signedTx.serialize());
*********/
  //console.log("Transaction ID --",txid);

 
	
	}
	
	/**********
	let creators = [
        
        new Creator({
            address: updateKeypair.publicKey.toBase58(), //keypair of the update authority
            share: 100,
            verified: false,
        }),
       
    ];

    let data = new Data({
        name: imgMetadata.name,
        symbol: 'FOO',
        uri: "https://bar.com",
        creators: creators,
        sellerFeeBasisPoints: 500,
    });

    let instructions: any[] = [];

    let res = await updateMetadata(
        data,
        updateKeypair.publicKey.toBase58(),
        true,
        'mintAddress',
        updateKeypair.publicKey.toBase58(),
        instructions,
    );

    await sendTransactionWithRetryWithKeypair(
        connection,
        updateKeypair,
        instructions,
        [],
    );
	
	*****************/