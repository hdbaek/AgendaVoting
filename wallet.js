/*
* C:\Progra~2\Google\Chrome\Application\chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
*/
$(document).ready(function () {
    const derivationPath = "m/44'/60'/0'/0/";		
	const IPFS = window.IpfsApi('localhost', '5001');
	const Buffer = IPFS.Buffer;	
    const provider = ethers.providers.getDefaultProvider('ropsten');

	let votingContractAddress =  "0x8B095d4518c06F71901B06f363e36ecBaA304449";
    let votingContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "shares",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "TransferVotingShares",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "yesNo",
				"type": "bool"
			}
		],
		"name": "approve",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyShares",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_price",
				"type": "uint32"
			}
		],
		"name": "changePriceOfShare",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_agendaContents",
				"type": "string"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "_noOfOptions",
				"type": "uint8"
			}
		],
		"name": "registerAgenda",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "votingTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "sharesToVote",
				"type": "uint256"
			}
		],
		"name": "AgendaVote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "agenda",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "endTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "noOfOptions",
				"type": "uint256"
			}
		],
		"name": "AgendaSetup",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "hash",
				"type": "string"
			}
		],
		"name": "saveDocument",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "transferShares",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "transferVotingShares",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "supply",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint8"
			},
			{
				"name": "sharesToVote",
				"type": "uint32"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getActualVoter",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAgendaContents",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint8"
			}
		],
		"name": "getAgendaVotingVotes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getDocuments",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDocumentsCount",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEndTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getShareByAddress",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getShareholder",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSharePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getStartTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
	
	contracts = {};
	setupEthers();
	
    showView("viewSetup");
	
	$('#linkSetupMenu').click(function () { showView("viewSetup");  });	
    $('#linkShowInfoMenu').click(function () { showView("viewShowInfo");  });
    $('#linkVoteMenu').click(function () { showView("viewVote");   });	 
	
    $('#buttonRegisterAgenda').click(registerAgenda); 
	$('#buttonShowAgenda').click(getAgendaContents);
	$('#buttonShowAgendaVote').click(showAgenda);		
    $('#buttonShowVotingResult').click(showVotingResult);
    $('#buttonVote').click(voting);
	$('#documentUploadButton').click(uploadDocument);
	$('#buttonStockDistribution').click(stockDistribution);
    $('#buttonStockDelegation').click(stockDelegation);	

	$('#buttonShowIno').click( function() {
			option = $('#contractInfo').val()
			if (option == 'v1') showVotingResult();
			else if (option == 'v2') showMinutes();
			else if (option == 'v3') showDelegation();
			else if (option == 'v4') showShareByShareholder();
			else if (option == 'v5') showShareholder();
			else if (option == 'v6') showPricePerStock();
	});
	$('#buttonTransfer').click( function() {
			option = $('#transfer').val()
			if (option == 'v1') stockDistribution();
			else if (option == 'v2') stockDelegation();
			else if (option == 'v3') buyStocks();
	});
	function stockDistribution() {
		votingContract = contracts[$('#senderAddress').val()];
		let to = $('#recipientAddress').val();
		let shares = $('#amount').val();
		shares *= 1;
		try {
			votingContract.transferShares(to, shares).then(res => {
				showInfo("Successful !!!");
			});
		} catch (err) {
            showError(err);
        }	
	}
	function stockDelegation() {
		votingContract = contracts[$('#senderAddress').val()];
		let to = $('#recipientAddress').val();
		let shares = $('#amount').val();
		shares *= 1;
		try {
			votingContract.transferVotingShares(to, shares).then(res => {
				showInfo("Successful !!!");
			});
		} catch (err) {
            showError(err);
        }	
	}
	function buyStocks() {
		votingContract = contracts[$('#senderAddress').val()];
		let shares = $('#amount').val();
		try {            
			votingContract.getSharePrice().then(pricePerShare => {
				value = shares*pricePerShare;  
				try {
					votingContract.buyShares(shares*1, {'value':value}).then(res => {
					showInfo("Successful !!!");
					});
				} catch (err) {
					showError(err);
				}
			});
		} catch (err) {
            showError(err);
        }		
			
	}
	function voting() {
		votingContract = contracts[$('#senderAddress').val()];
		let number = $('#numbers').val();
		let shares = $('#shares').val();
		number *= 1;
		shares *= 1;
		try {
			votingContract.vote(number, shares).then(res => {
				showInfo("success !!!");
			});				
		} catch (err) {
            showError(err);
        }	
	}
	function registerAgenda() {		
		votingContract = contracts[$('#senderAddress').val()];
        let agenda = $('#agendaSubject').val();
		let duration = $('#agendaDuration').val();
		let options = $('#agendaOptions').val();
		duration *= 1;
		options *= 1;
		try {
            votingContract.registerAgenda(agenda, duration, options).then(res => {
				showInfo("success !!!");
			});			
		}
        catch (err) {
            showError(err);
        }
    }
	function getAgendaContents() {
		votingContract = contracts[$('#senderAddress').val()];
		try {            
			debugger;
            let contents = votingContract.getAgendaContents().then(res => {
				 $('#textareaGetAgendaResult').val(res);
			});
			
		}
        catch (err) {
            showError(err);
        }
	}	
    
	/*
	* FUNCTIONS FOR READING DATA
	*/	
	function uploadDocument() {		
		votingContract = contracts[$('#senderAddress').val()];
		if($('#documentForUpload')[0].files.length == 0) {
			return showError("Please select a file to upload");
		}

		let fileReader = new FileReader();
		fileReader.onload = function() {
			let fileBuffer = Buffer.from(fileReader.result);
			IPFS.files.add(fileBuffer, (err, result) => {
				if (err)
					return showError(err);
				if (result) {
					let ipfsHash = result[0].hash;
					showInfo("HASH success :" +  ipfsHash);
					votingContract.saveDocument(ipfsHash).then()(res => {
						showInfo("Saving success !!!");
					});			
				}
			});
		};		
		fileReader.readAsArrayBuffer($('#documentForUpload')[0].files[0]);
	}
	function showAgenda() { 
		votingContract = contracts[$('#senderAddress').val()];
		try {            
            votingContract.getAgendaContents().then(res => {
				$('#textareaGetAgenda').val(res);
				showInfo("success !!!");
			});
			
		}
        catch (err) {
            showError(err);
        }
	}
	function showVotingResult() {
		votingContract = contracts[$('#senderAddress').val()];
		try {   
		    let index = $('#optionNo').val();			
            votingContract.getAgendaVotingVotes(index*1).then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});		
		}
        catch (err) {
            showError(err);
        }
	}
	function showMinutes() { // document return
		votingContract = contracts[$('#senderAddress').val()];
		$('#textareaShowInfo').val("");
		try {            
		    let index = $('#optionNo').val();
			index *= 1;
			votingContract.getDocuments(index).then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	function showDelegation() {
		votingContract = contracts[$('#senderAddress').val()];
		try {            
		    let index = $('#optionNo').val();
			index *= 1;
			votingContract.getActualVoter(index).then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	function showShareByShareholder() {
		votingContract = contracts[$('#senderAddress').val()];
		try {            
		    let address = $('#optionNo').val();
			votingContract.getShareByAddress(address).then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	function showShareholder() {
		votingContract = contracts[$('#senderAddress').val()];
		try {            
		    let index = $('#optionNo').val();
			votingContract.getShareholder(index*1).then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	function showPricePerStock() {
		votingContract = contracts[$('#senderAddress').val()];
		try {            
			votingContract.getSharePrice().then(res => {
				$('#textareaShowInfo').val(res);
				showInfo("success !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	/*
	* Setup an address for the wallet
	* 
	*/
	function setupEthers() {
		let privateKey = [ "0xbe8cad6b7dc050c26baf9f4bc2fc7e505e0c3b00e01c761d0b482ca7905e2922",
							"0xb555bed06f4c30951f940b5f755350572f51f91d318d429f82928b8074e36402",
							"0x78139d0777ba8ddd229a775986f555cbc9e8b1d9cf9f8bda80646dfe70e30fcc",
							"0xdfe8cf1a22364200b803842d784b018ac48e6b775d6246d6159ba767ace14a85" 
		];
		for (i = 0; i < privateKey.length; i++) {
			wallet = new ethers.Wallet(privateKey[i]);
			votingContract = new ethers.Contract(votingContractAddress, votingContractABI, new ethers.Wallet(privateKey[i], provider));
			contracts[wallet.address] = votingContract;
		}
	}
	function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }
    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        })
    }
    function showError(errorMsg) {
        $('#errorBox>p').html('Error: ' + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        })
    }
    function showLoadingProgress(percent) {
        $('#loadingBox').html("Loading... " + parseInt(percent * 100) + "% complete");
        $('#loadingBox').show();
        $('#loadingBox>header').click(function () {
            $('#errorBox').hide();
        })
    }
    function hideLoadingBar() {
        $('#loadingBox').hide();
    }
    function showLoggedInButtons() {
        $('#linkCreateNewWallet').hide();
        $('#linkImportWalletFromMnemonic').hide();
        $('#linkImportWalletFromFile').hide();
        $('#linkShowMnemonic').show();
        $('#linkShowAddressesAndBalances').show();
        $('#linkSendTransaction').show();
        $('#linkDelete').show();
    }	
});