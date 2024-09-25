// // curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d 
// // '   {"jsonrpc":"2.0", "id":1, "method":"getBalance", "params":["83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri"]}  '

// let params = {
  
  // jsonrpc: "2.0",
  // id: 1, 
  // method: "getBalance", 
  // //params: [ "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri" ]
  // params: [ "GYc5erKBjgL45XH4UxHWwnVstenjrp8ZUX2J2rNjpG7J" ]
  
// };

// let response = await fetch('/article/fetch/post/user', {
  // method: 'POST',
  // headers: {
    // 'Content-Type': 'application/json;charset=utf-8'
  // },
  // body: JSON.stringify(user)
// }); 

// let result = await response.json();
// alert(result.message);

module.exports.getBallanceFromMyWallet = getBallanceFromMyWallet;

const solanaWeb3 = require('@solana/web3.js');

function getBallanceFromMyWallet( sPublicKey, callback ) {

	const public_key = new solanaWeb3.PublicKey( sPublicKey );

	( async () => {
		
            const connection = new solanaWeb3.Connection(
                solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed',
            );

            
            const balance = await connection.getBalance(public_key);
            console.log(balance)
			
			callback(balance);
            
			
	})();

}