$(document).ready(function () {
    const derivationPath = "m/44'/60'/0'/0/";
    const provider = ethers.providers.getDefaultProvider('ropsten');
// <bhd>
	//const ethereumProvider = ethers.providers.getDefaultProvider('ropsten');
    //const votingContractAddress = "0x121241C506ebb1d04A4d8d355D37aC9fd06361de";
	const votingContractAddress = "0xcaa7be51f65ebff3f24f9e1593dc5f2f52eb5aa9";
    const votingContractABI = [
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
		"inputs": [],
		"name": "withdraw",
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
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
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
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint32"
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
	}
];
	//let privateKey = "0x42979c8c11049bc77721fab28ae0467bed43d3ffe3f6b435888a1118f9b5c31c";
	let privateKey = "0xbe8cad6b7dc050c26baf9f4bc2fc7e505e0c3b00e01c761d0b482ca7905e2922";
	const votingContract = new ethers.Contract(
        votingContractAddress, votingContractABI, new ethers.Wallet(privateKey, provider));
	
	
	
	
// </bhd>	
    let wallets = {};

    showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkCreateNewWallet').click(function () {
        $('#passwordCreateWallet').val('');
        $('#textareaCreateWalletResult').val('');
        showView("viewCreateNewWallet");
    });

    $('#linkSetup').click(function () {
        //$('#textareaOpenWallet').val('');
        //$('#passwordOpenWallet').val('');
        //$('#textareaOpenWalletResult').val('');
        //$('#textareaOpenWallet').val('toddler online monitor oblige solid enrich cycle animal mad prevent hockey motor');
        showView("viewSetup");
    });

    $('#linkShowInfo').click(function () {
        //$('#walletForUpload').val('');
        //$('#passwordUploadWallet').val('');
        showView("viewShowInfo");
    });

    $('#linkVote').click(function () {
        //$('#passwordShowMnemonic').val('');
        showView("viewVote");
    });

    $('#linkOpenWallet').click(function () {
        //$('#passwordShowAddresses').val('');
        //$('#divAddressesAndBalances').empty();
        showView("viewOpenWallet");
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
	
    $('#buttonShowVotingResult').click(function() {
		try {    
		/*
			let size = 3;
            let contents;
			let text[];
			for (var i = 0; i < size; i++ ) {
				text[i] = await votingContract.getAgendaVotingVotes(i+1);
			}
			$('#textareaVotingResult').val(contents);
			//showInfo(contents);
			*/
		}
        catch (err) {
            showError(err);
        }
	});
	
    $('#buttonShowMinutes').click(function() {
		try {            
            //let a, b;
			//a, b = await votingContract.getDocument();
			//$('#textareaMinutes').val(contents);
			//showInfo(contents);
		}
        catch (err) {
            showError(err);
        }
	});
	
    $('#buttonVote').click(function() {
	});
    $('#buttonPrivateKey').click(function() {
	});
	async function showAgenda() { // for voting
		try {            
            let contents = await votingContract.getAgendaContents();
			$('#textareaGetAgenda').val(contents);
		}
        catch (err) {
            showError(err);
        }
	}
	async function registerAgenda() {
        let subject = $('#agendaSubject').val();
		let options = $('#agendaOptions').val();
		let agendaContents = subject + "#" + options;
		
		try {
			//debugger;
            await votingContract.registerAgenda(agendaContents, 24, 3);
			//,{gasLimit: 2250000,gasPrice: 119000000000}).then(console.log);
		}
        catch (err) {
            showError(err);
        }
    }
	function setContractAddress() {
		
	}
	async function getAgendaContents() {
		try {            
            let contents = await votingContract.getAgendaContents();
			 $('#textareaGetAgendaResult').val(contents);
			//showInfo(contents);
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

    function encryptAndSaveJSON(wallet, password) {
		return wallet.encrypt(password, {}, showLoadingProgress)
			.then(json => {
				localStorage['JSON'] = json;
				showLoggedInButtons();
			})
			.catch(showError)
			.finally(hideLoadingBar);
    }

    function decryptWallet(json, password) {
		return ethers.Wallet.fromEncryptedWallet(json, password, showLoadingProgress);
        // TODO:
    }

    function generateNewWallet() {
		let password = $('#passwordCreateWallet').val();
		let wallet = ethers.Wallet.createRandom();
		
		encryptAndSaveJSON(wallet, password)
			.then(() => {
				showInfo("PLEASE SAVE YOUR MNEMONIC: " + wallet.mnemonic);
				$('#textareaCreateWalletResult').val(localStorage.JSON);
			});
        // TODO;
    }

    function unlockWalletAndDeriveAddresses() {
        let password = $('#passwordShowMnemonic').val();
		let json = localStorage.JSON;
		
		decryptWallet(json, password)
			.then(wallet => {
				showInfo("Wallet successfully unlocked!");
				
				renderAddresses(wallet);
				$('#divSignAndSendTransaction').show();
			})
			.catch(showError)
			.finally(() => {
				$('#passwordSendTransaction').val('');
				hideLoadingBar();
			});
			
		function renderAddresses(wallet) {
			$('#senderAddress').empty();
		
			let masterNode = ethers.HDNode.fromMnemonic(wallet.mnemonic);
			for (let i = 0; i < 5; i++) {
				let wallet = new ethers.Wallet(masterNode.derivePath(derivationPath + i).privateKey, provider);
				let address = wallet.address;
			
				wallets[address] = wallet;
				let option = $(`<option id=${wallet.address}>`).text(address);
				$('#senderAddress').append(option);
			}
		}
    }
	
});