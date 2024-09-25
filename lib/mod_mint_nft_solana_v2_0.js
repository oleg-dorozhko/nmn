console.log('mod mint nft solana v2.0 on');
var PNG = require('pngjs').PNG;
module.exports.mint_nft_solana = mint_nft_solana;
var fs = require('fs');
require('dotenv').config();

//import { Keypair, Transaction, SystemProgram, Connection } from "@solana/web3.js";
const solanaWeb3 = require("@solana/web3.js");

//import {  createInitializeMintInstruction,   getMinimumBalanceForRentExemptMint,   MINT_SIZE,   TOKEN_PROGRAM_ID, } from "@solana/spl-token";
const solanaSplToken = require("@solana/spl-token");

//import * as bs58 from "bs58";



// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
//const feePayer = Keypair.fromSecretKey(
//bs58.decode("588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2")
//);

const fromWallet = solanaWeb3.Keypair.generate(); //here we need to change generated on our existing phantom wallet
fs.writeFileSync('./wallets/solana_keypair.json', JSON.stringify(fromWallet));

let kp = JSON.parse( fs.readFileSync('./wallets/solana_keypair.json'));
//console.log(kp);
//const arr = Object.values(kp._keypair.secretKey)
//const secret = new Uint8Array(arr)
//const fromWallet = solanaWeb3.Keypair.fromSecretKey(secret)

const feePayer = fromWallet;
 
const fromAliceWallet = solanaWeb3.Keypair.generate(); //here we need to change generated on our existing phantom wallet
fs.writeFileSync('./wallets/solana_alice_keypair.json', JSON.stringify(fromAliceWallet));


//let kp2 = JSON.parse( fs.readFileSync('./wallets/solana_alice_keypair.json'));
//console.log(kp);
//const arr2 = Object.values(kp2._keypair.secretKey)
//const secret2 = new Uint8Array(arr2)
//const fromAliceWallet = solanaWeb3.Keypair.fromSecretKey(secret2)

const alice = fromAliceWallet;

// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
//const alice = Keypair.fromSecretKey(
//bs58.decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp")
//);

// create mint (create your own token)

// you can treat a mint as a ERC-20's token address in Ethereum
// SRM, RAY, USDC... all of them are mints
function inv ( a )
{
	return (255 - a);
}


function mint_nft_solana(im0)
{
	
console.log('in function mint_nft_solana');

(async () => {
	
	// connection
const connection = new solanaWeb3.Connection("https://api.devnet.solana.com");

  // create a mint account
  let mint = solanaWeb3.Keypair.generate();
  console.log(`mint: ${mint.publicKey.toBase58()}`);

  let tx = new solanaWeb3.Transaction();
   // create account
  let account =  solanaWeb3.SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: solanaSplToken.MINT_SIZE,
      lamports: await solanaSplToken.getMinimumBalanceForRentExemptMint(connection),
      programId: solanaSplToken.TOKEN_PROGRAM_ID,
    });
	console.log("account:");
	console.log(account);
	   // init mint
	let tmint =  solanaSplToken.createInitializeMintInstruction(
      mint.publicKey, // mint pubkey
      0, // decimals
      alice.publicKey, // mint authority (an auth to mint token)
      null, // freeze authority (we use null first, the auth can let you freeze user's token account)
	   solanaSplToken.TOKEN_PROGRAM_ID,
    );
	console.log("mint:");
	console.log(tmint);
	
  tx.add(   account, tmint  );
  
  let txhash = await connection.sendTransaction(tx, [feePayer, mint]);
  console.log(`txhash: ${txhash}`);
  
	(	async () => {
		// 1e9 lamports = 10^9 lamports = 1 SOL
		let txhash2 = await connection.requestAirdrop(feePayer.publicKey, 1e9);
		console.log(`txhash2: ${txhash2}`);
		
		
		(async () => {
		  // create a mint account
		  let mint = solanaWeb3.Keypair.generate();
		  console.log(`mint: ${mint.publicKey.toBase58()}`);

		  let tx4 = new solanaWeb3.Transaction();
		  tx4.add(
			// create account
			solanaWeb3.SystemProgram.createAccount({
			  fromPubkey: feePayer.publicKey,
			  newAccountPubkey: mint.publicKey,
			  space: solanaSplToken.MINT_SIZE,
			  lamports: await solanaSplToken.getMinimumBalanceForRentExemptMint(connection),
			  programId: solanaSplToken.TOKEN_PROGRAM_ID,
			}),
			// init mint
			solanaSplToken.createInitializeMintInstruction(
			  mint.publicKey, // mint pubkey
			  0, // decimals
			  alice.publicKey, // mint authority (an auth to mint token)
			  null // freeze authority (we use null first, the auth can let you freeze user's token account)
			)
		  );
	      let txhash4 = await connection.sendTransaction(tx4, [feePayer, mint]);
		  
		  console.log(`txhash: ${txhash4}`);
		  
		   let ata = await solanaSplToken.getAssociatedTokenAddress(
      mint.publicKey, // mint
      alice.publicKey, // owner
      false // allow owner off curve
    );
    console.log(`ata: ${ata.toBase58()}`);

    let tx8 = new solanaWeb3.Transaction();
    tx8.add(
      solanaSplToken.createAssociatedTokenAccountInstruction(
        feePayer.publicKey, // payer
        ata, // ata
        alice.publicKey, // owner
        mint.publicKey // mint
      )
    );
	let txhash8 = await connection.sendTransaction(tx8, [feePayer])
    console.log(`create ata txhash: ${txhash8}`);
		  
		  
		})();
		
		
		
	})();

  
})();







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



		return im;




}