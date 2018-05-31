$(document).ready(function () {
    const derivationPath = "m/44'/60'/0'/0/";	
	
	const IPFS = window.IpfsApi('localhost', '5001');
	const Buffer = IPFS.Buffer;
	
    const provider = ethers.providers.getDefaultProvider('ropsten');

	let votingContractAddress = "0x597b86754ca7c5d72f625d1a4f41a6c1459daacb";
	
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getDocument",
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
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "getShareholder",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
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
	//let privateKey = "0x42979c8c11049bc77721fab28ae0467bed43d3ffe3f6b435888a1118f9b5c31c";
	var privateKey = "0xbe8cad6b7dc050c26baf9f4bc2fc7e505e0c3b00e01c761d0b482ca7905e2922";
	//const votingContract = new ethers.Contract(
	let votingContract = new ethers.Contract(
        votingContractAddress, votingContractABI, new ethers.Wallet(privateKey, provider));
	
    let wallets = {};

    showView("linkHome");

    $('#linkHomeMenu').click(function () {
        showView("linkHome");
    });    
    
	$('#linkSetupMenu').click(function () {
        showView("viewSetup");
    });
	
    $('#linkShowInfoMenu').click(function () {
        showView("viewShowInfo");
    });
    $('#linkVoteMenu').click(function () {
        showView("viewVote");
    });
	
	$('#buttonContractAddress').click(setContractAddress);
    $('#buttonStockDistribution').click(function() {
	});//setContractAddress);//generateNewWallet);
    $('#buttonStockDelegation').click(function() {
	});//openWalletFromMnemonic);
	$('#buttonRegisterAgenda').click(registerAgenda); 
    $('#buttonUploadFile').click(function() {
	});//openWalletFromFile);
   
	$('#buttonShowAgenda').click(getAgendaContents);
	$('#buttonShowAgendaVote').click(showAgenda);
	$('#buttonShowDelegation').click(function() {
		 
	});	
    $('#buttonShowVotingResult').click(showVotingResult);
    $('#buttonShowMinutes').click(showMinutes);
    $('#buttonVote').click(voting);

	$('#documentUploadButton').click(uploadDocument);

	function showVotingResult() {
		try {   
		    let optionNo = $('#optionNo').val();
			optionNo *= 1;
            votingContract.getAgendaVotingVotes(optionNo).then(res => {
				$('#textareaVotingResult').empty();
				$('#textareaVotingResult').val(res);
				showInfo("successful : " + optionNo);
			});		
		}
        catch (err) {
            showError(err);
        }
	}
	function showMinutes() {
		try {            
           //debugger;
			votingContract.getDocument(0).then(res => {
				$('#textareaMinutes').val(res);
				showInfo("successful !!!");
			});
		}
        catch (err) {
            showError(err);
        }
	}
	function voting() {
		let number = $('#number').val();
		let shares = $('#shares').val();
		number *= 1;
		shares *= 1;
		try {
			votingContract.vote(number, shares).then(res => {
				showInfo("successful !!!");
			});				
		} catch (err) {
            showError(err);
        }	
	}
	function showAgenda() { // for voting
		try {            
            let contents = votingContract.getAgendaContents().then(res => {
				$('#textareaGetAgenda').val(res);
				showInfo("successful !!!");
			});
			
		}
        catch (err) {
            showError(err);
        }
	}
	function registerAgenda() {		
        let agenda = $('#agendaSubject').val();
		let duration = $('#agendaDuration').val();
		let options = $('#agendaOptions').val();
		duration *= 1;
		options *= 1;
		try {
            votingContract.registerAgenda(agenda, duration, options).then(res => {
				showInfo("successful !!!");
			});
			
		}
        catch (err) {
            showError(err);
        }
    }
	function setContractAddress() {
		let addr = $('#contractAddress').val();
		let abi = $('#contractABI').val();
		let key = $('#privateKey').val();
		privateKey = key;
		votingContractAddress = addr;		
		votingContractABI = abi;
		votingContract = new ethers.Contract(
        votingContractAddress, votingContractABI, new ethers.Wallet(privateKey, provider));	
		showInfo("successful !!!");
	}
	function getAgendaContents() {
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
	function uploadDocument() {		
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
					showInfo("HASH successful :" +  ipfsHash);
					votingContract.saveDocument(ipfsHash).then()(res => {
						showInfo("Saving successful !!!");
					});			
				}
			});
		};
		
		fileReader.readAsArrayBuffer($('#documentForUpload')[0].files[0]);
	}
});
