function s_mint_nft_solana_create_metadata(params,callback)
{
	console.log("WARNING! Confirm, please: Are you sure you need CREATE new METADATA ???");
	alert("WARNING! Confirm, please:\nAre you sure you need  CREATE new METADATA ??? \n(Type Yes if that is correct)");
	var s = prompt("WARNING! Confirm, please (type password): ", "Are you sure you need CREATE new METADATA ??? (Remember password if that is correct)");
	if 	(s=='ys4') 	transform("canvas", '/mint_nft_solana_create_metadata',callback); 
}