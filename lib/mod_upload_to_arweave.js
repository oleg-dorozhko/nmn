var md5 = require('js-md5');
var PNG = require('pngjs').PNG;
const arweaveArweave = require("arweave");
var fs = require('fs');
require('dotenv').config();
module.exports.upload_image_to_arweave = upload_image_to_arweave;
module.exports.upload_json_to_arweave = upload_json_to_arweave ;
module.exports.get_json_prepared_for_arweave = get_json_prepared_for_arweave;
/*********************
1. upload image to arweave
2. receive link on image
3. construct json with link on png
4. upload json to arweave
5. receive link on json
6. make non fungidible token on solana
7. create metadata with link on arweave json
8. PROFIT!!!
1017260
1. стосовно першого - аплоад туди дає лінк
його можно повернути користувачеві - хай любується - також можна зберігти у файл сессії користувача. номер сесії звісно автогенерований
він же файлнейм на сервері
*скрипт аплоада цього вже є
3,4,5 теж саме тількі із json
*скрипт цього аплоада теж є
6,7,8 на тестовому працює, залишилося перевірити на мєйннет.
*************************/
/***************
first image for nft uploaded
AWK= ./wallets/oxI-d73TcoMoxrc8RNKChrJ9UcV3UBYCOsL7-eja2IU.json
WAS in WaLet:
winston: 794578018984
AR: 0.794578018984
{ status: 200, statusText: 'OK', data: {} }
imageUrl= https://arweave.net/Smu6jWZHH9sTGNpeWydNRCA2YoLFWBeYZqV54JlMHSs
************/
/**********
first json prepared on server with short file name f15d7ca5c4537441275644a5cc77f080_1660951584711
August 00 31   20  08  2022
****/
/********
well, when we have json file for arweave with sfn=f15d7ca5c4537441275644a5cc77f080_1660951584711
we can to upload this json to arweave (find function upload_json_to_arweave(json_object))
********/
function getArweaveBalance( callback ) {
	
	console.log("AWK=",process.env.AWK);
    
	const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
    //console.log(wt);
	
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
		// 125213858712
		// winston:  794578018984
		//	AR:       0.794578018984
	console.log("AR: "+ar);
	
	callback();
	
	});
		
		
}

// for upload we need to check arweave wallet 
// and clear dir process.env.PATH_TO_ARWEAVE_PNGS_DIR
// then paste image for nft to localhost:5000 and press buttom upload image t arweave (do not forget password)

function upload_image_to_arweave(im0, callback) {
	
	return;
	
	getArweaveBalance( function ( ) { 
		
		    let hash = md5(im0.data);
			let tm = Date.now();
			let fn  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm) + ".png";
			let ffn = "" + hash + "_" + (tm); 
		
			//var data = fs.readFileSync('in.png');
			//var png = PNG.sync.read(data);
			var buffer = PNG.sync.write(im0);
			fs.writeFileSync(fn, buffer);
			
			var data2 = fs.readFileSync(fn);
			var png2 = PNG.sync.read(data2);
			var buffer2 = PNG.sync.write(png2);
			
			let tm2 = Date.now();
			let fn2  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm2) + ".png";
			let ffn2 = "" + hash + "_" + (tm2); 
			
			fs.writeFileSync(fn2, buffer2);
			
			const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
			//console.log(wt);
			
			const arweave = arweaveArweave.init({
				host: "arweave.net",
				port: 443,
				protocol: "https",
				timeout: 20000,
				logging: false,
			});
		  
		    ( async () => {
			
				const transaction = await arweave.createTransaction({
					data: data2,
				});
				
				transaction.addTag("Content-Type", "image/png");
				
				await arweave.transactions.sign(transaction, wt);

				const response = await arweave.transactions.post(transaction);
				console.log(response);

				const id = transaction.id;
				const imageUrl = id ? `https://arweave.net/${id}` : undefined;
				
				console.log("imageUrl=", imageUrl);
				
				//createFileArweaveLinkOnImage('https://arweave.net/Smu6jWZHH9sTGNpeWydNRCA2YoLFWBeYZqV54JlMHSs');
				let fileOnLink = createFileArweaveLinkOnImage(imageUrl);
				
			
			
			//im0.pack().pipe(fs.createWriteStream(fn)).on('end', function() {
				
				console.log("in upload image to arweave: hash=["+hash+"]");
				callback ("ffn="+ffn+", ffn2="+ffn2+", imageUrl="+imageUrl+", fileOnLink="+fileOnLink);
			
			})();
			
		//})
		
		//.on('end', function() {	});
		
	});
	// here we need save im0 as png file
	/////////////////////////////////////////
	////
	
	/**********
	
	
	
	
		

		
		
		//var hash = get_md5_hex(im0.data);
		
		//fs.writeFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + md5 + ".png", base64Data, 'base64', function(err) {
		  
		  
		 // logger_console_log(err);
		  
		  
		  
		  
		//});
		
		//res.writeHead( 200, { 'Content-Type':'text/plain' } );
		//res.end(md5);
		
	///////////////////////////////////////
   	console.log("AWK=",process.env.AWK);
    const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
    //console.log(wt);
	
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
		// 125213858712
		// winston:  794578018984
		//	AR:       0.794578018984
		console.log("AR: "+ar);
		
		  //console.log("BALANCE: "+arweaveWalletBallance);
   
   const data = fs.readFileSync(fn);
   ///////////////// for test //////////////////////////
   let tm2 = Date.now();
	let fn2  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm2) + ".png";
	let ffn2 = "" + hash + "_" + (tm2); 
	
	var pn = new PNG({filterType: 4});
	fs.createReadStream(fn).pipe(pn).on('parsed', function() {
	
		pn.pack().pipe(fs.createWriteStream(fn2));
		
			callback(ffn);
		
	});
		
		
		
		//0.125213858712
	});

 
	
	
		});
////////////////////////////////
   /*********
    const transaction = await arweave.createTransaction({
		data: data,
	});
	
	transaction.addTag("Content-Type", "image/png");
	
	await arweave.transactions.sign(transaction, wt);

    const response = await arweave.transactions.post(transaction);
    console.log(response);

    const id = transaction.id;
    const imageUrl = id ? `https://arweave.net/${id}` : undefined;
    
	console.log("imageUrl=", imageUrl);
	
*********/

  //         !!! works
  // Upload image to Arweave
  // const data = fs.readFileSync(process.env.PATH_TO_PATTERN_PNG);
  
/*****
  //         !!! works
  // Upload image to Arweave
  const data = fs.readFileSync(process.env.PATH_TO_PATTERN_PNG);

  const transaction = await arweave.createTransaction({
    data: data,
  });

  transaction.addTag("Content-Type", "image/png");

/////// we need to have wallet.json file from arwaev
/////// const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
  
  await arweave.transactions.sign(transaction, wt);

  const response = await arweave.transactions.post(transaction);
  console.log(response);

  const id = transaction.id;
  const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log("imageUrl", imageUrl);
  5333 0001 0121 7490
****/
	
	

}


function upload_image_to_arweave_old(im0, callback) {
	
	let hash = md5(im0.data);
	console.log("in upload image to arweave: hash=["+hash+"]");
	// here we need save im0 as png file
	/////////////////////////////////////////
	////
	let tm = Date.now();
	let fn  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm) + ".png";
	let ffn = "" + hash + "_" + (tm); 
	
		im0.pack().pipe(fs.createWriteStream(fn)).on('parsed', function() {

				
				
				//var hash = get_md5_hex(im0.data);
				
				//fs.writeFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + md5 + ".png", base64Data, 'base64', function(err) {
				  
				  
				 // logger_console_log(err);
				  
				  
				  
				  
				//});
				
				//res.writeHead( 200, { 'Content-Type':'text/plain' } );
				//res.end(md5);
				
			///////////////////////////////////////
			console.log("AWK=",process.env.AWK);
			const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
			//console.log(wt);
			
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
				// 125213858712
				// winston:  794578018984
				//	AR:       0.794578018984
				console.log("AR: "+ar);
				
				  //console.log("BALANCE: "+arweaveWalletBallance);
			   
			   const data = fs.readFileSync(fn);
			   ///////////////// for test //////////////////////////
			   let tm2 = Date.now();
				let fn2  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm2) + ".png";
				let ffn2 = "" + hash + "_" + (tm2); 
				
				var pn = new PNG({filterType: 4});
				fs.createReadStream(fn).pipe(pn).on('parsed', function() {
				
					pn.pack().pipe(fs.createWriteStream(fn2));
					
					callback(ffn);
					
				});
				
				
				
				//0.125213858712
			});

 
	
	
		});
////////////////////////////////
   /*********
    const transaction = await arweave.createTransaction({
		data: data,
	});
	
	transaction.addTag("Content-Type", "image/png");
	
	await arweave.transactions.sign(transaction, wt);

    const response = await arweave.transactions.post(transaction);
    console.log(response);

    const id = transaction.id;
    const imageUrl = id ? `https://arweave.net/${id}` : undefined;
    
	console.log("imageUrl=", imageUrl);
	
*********/

  //         !!! works
  // Upload image to Arweave
  // const data = fs.readFileSync(process.env.PATH_TO_PATTERN_PNG);
  
/*****
  //         !!! works
  // Upload image to Arweave
  const data = fs.readFileSync(process.env.PATH_TO_PATTERN_PNG);

  const transaction = await arweave.createTransaction({
    data: data,
  });

  transaction.addTag("Content-Type", "image/png");

/////// we need to have wallet.json file from arwaev
/////// const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"))
  
  await arweave.transactions.sign(transaction, wt);

  const response = await arweave.transactions.post(transaction);
  console.log(response);

  const id = transaction.id;
  const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log("imageUrl", imageUrl);
  5333 0001 0121 7490
****/
	
	

}

function createFileArweaveLinkOnImage(url_on_image) {
	
	let tm2 = Date.now();
		
	let hash = md5(url_on_image);
		 
	let fn2  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm2) + ".arweave_link_on_image";
	
	let ffn2 = "" + hash + "_" + (tm2); 
	
	fs.writeFileSync(fn2, url_on_image);
	
	return fn2;
	
}

function createJSONFileArweave(url_on_image) {
	
	let tm2 = Date.now();
		
	let hash = md5(url_on_image);
		 
	let fn2  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm2) + ".json";
	
	//let ffn2 = "" + hash + "_" + (tm2); 
	
	fs.writeFileSync(fn2, url_on_image);
	
	return fn2;
	
}
/********
well, when we have json file for arweave with sfn=f15d7ca5c4537441275644a5cc77f080_1660951584711
we can to upload this json to arweave
********/
function upload_json_to_arweave( sfn, callback ) {
	
	console.log("In lib/mod_upload...");
	let data = fs.readFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + sfn + ".json"); 
	const metadata = JSON.parse(data);
	console.log(metadata);
	const metadataRequest = JSON.stringify(metadata);

	//console.log("AWK=",process.env.AWK);
    
	const wt = JSON.parse(fs.readFileSync( process.env.AWK, "utf-8") )
    //console.log(wt);
	
	const arweave = arweaveArweave.init({
		host: "arweave.net",
		port: 443,
		protocol: "https",
		timeout: 20000,
		logging: false,
	});
    
	( async () => {  
	
	  const metadataTransaction = await arweave.createTransaction({
		data: metadataRequest,
	  });

		metadataTransaction.addTag("Content-Type", "application/json");

		const result = await arweave.transactions.sign(metadataTransaction, wt);

		console.log(result);
		
		
		console.log("metadata txid", metadataTransaction.id);
		
		const response = await arweave.transactions.post(metadataTransaction)
		
		console.log(response);
		
		

				const id = metadataTransaction.id;
				const jsonUrl = id ? `https://arweave.net/${id}` : undefined;
				
				console.log("jsonUrl=", jsonUrl);
	
				let hash = md5(metadataRequest);
				let tm = Date.now();
				let fn  = process.env.PATH_TO_ARWEAVE_PNGS_DIR + hash + "_" + (tm) + ".arweave_link_on_json";
				let sfn = "" + hash + "_" + (tm); 
			
				fs.writeFileSync(fn, jsonUrl);
				
				 
				//let fileOnLink = createFileArweaveLinkOnImage(jsonUrl);
				
			
			
			//im0.pack().pipe(fs.createWriteStream(fn)).on('end', function() {
				
			//	console.log("in upload json to arweave: hash=["+hash+"]");
				callback ("sfn="+sfn+", jsonUrl="+jsonUrl+", fileOnLink="+fn);
				
				/****
				first_output: https://arweave.net/NIR1fnQUqo6iVAbgDN_5Fm92yENljDT_eyBSPvx2ZQ0
				****/
	})();
  
  
	
	//return createFileArweaveLinkOnImage('https://arweave.net/Smu6jWZHH9sTGNpeWydNRCA2YoLFWBeYZqV54JlMHSs');
	
	//return createJSONFileArweave(JSON.stringify(json_object));
	
	
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
	  //Regarding why I’ve set Max supply to 0 here. 
	  //In Metaplex, if the token is meant to be one of a kind, 
	  //then you have to set its max supply to zero since total supply — supply claimed (1–1) equals 0
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
        "maxSupply": 1, <--- ERROR!!!
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

	 

}

function get_json_prepared_for_arweave(sfn) {
	 
	const data = fs.readFileSync(process.env.PATH_TO_ARWEAVE_PNGS_DIR + sfn + ".json");
	return data;
}