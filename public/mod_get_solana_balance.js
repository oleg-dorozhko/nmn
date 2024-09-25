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

//arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент


function get_solana_balance() {
	
	
	
		//let pr =  document.createElement('progress');
		//pr.id = "geeks";
		//pr.style = "width:400px;background-color: red";
		//document.body.append(pr);
		//let div = document.createElement('div');
			
		var s = prompt("enter public key","GYc5erKBjgL45XH4UxHWwnVstenjrp8ZUX2J2rNjpG7J");
		if 	(s==null) return null;
		var obj = {};
		obj.publicKey = s;
		var params = JSON.stringify(obj);		
		
		
		//div.innerHtml = "<div>Progress Bar: <progress id=\"geeks\" style=\"width:400px;\"></progress></div>";
				
			//	<script>
				
			//	var progressBar = document.getElementById("geeks"),
				
                xhr = new XMLHttpRequest();
                xhr.responseType = "text";
	 			xhr.open('POST', '/get_solana_balance', true);
				
				xhr.onload = function(amount) {
					
					console.log("Balance is: "+amount);
					console.log("Balance is: "+xhr.responseText);
					
				}
				
				xhr.onloadend = function(amount) {
					
					console.log("Balance is: "+amount);
					console.log("Balance is: "+xhr.responseText);
				}
				
				
				// xhr.onprogress = function(pe) {
					
					// if (pe.lengthComputable) {
						// progressBar.max = pe.total;
						// progressBar.value = pe.loaded;
					// }
				// }
				
				// xhr.onloadend = function(pe) {
					// progressBar.value = pe.loaded;
					
					// console.log(xhr.response)
					
				// }
				
				xhr.send( params );
				
			//	</script>
			
			
	
	//";
	
	
		
		
		
		
		
		
		
		
		
		
		
		// //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		// xhr.onload = function(msg) {  
			
				// if (xhr.readyState != 4) return;
				
				// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

	
				
			
			

	// //			alert(msg);
				
				
					
				// //transform("canvas",'/min_colors');
				
		// }

		// xhr.send(params);
	
}

// module.exports.getBallanceFromMyWallet = getBallanceFromMyWallet;

// const solanaWeb3 = require('@solana/web3.js');

// function getBallanceFromMyWallet( sPublicKey ) {

	// const public_key = new solanaWeb3.PublicKey( sPublicKey );

	// ( async () => {
		
            // const connection = new solanaWeb3.Connection(
                // solanaWeb3.clusterApiUrl('mainnet'), 'confirmed',
            // );

            
            // const balance = await connection.getBalance(public_key);
            // console.log(balance)
			
			// return balance;
            
			
	// })();

// }