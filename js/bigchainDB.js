const API_PATH = 'http://localhost:9984/api/v1/';
const myKeypair = new BigchainDB.Ed25519Keypair();
console.log('My Keypair:')
console.log(myKeypair)

// Construct a transaction payload
const tx = BigchainDB.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    // (in Celsius) for the city of Berlin.
    { url: 'news.ycombinator.com', datetime: new Date().toString() },

    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    { index: 1 },

    // A transaction needs an output
    [ BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(myKeypair.publicKey))
    ],
    myKeypair.publicKey
)

// Sign the transaction with private keys
const txSigned = BigchainDB.Transaction.signTransaction(tx, myKeypair.privateKey);
console.log('Signed Tx:')
console.log(txSigned)


// Send the transaction off to BigchainDB
let conn = new BigchainDB.Connection(API_PATH)

conn.postTransaction(txSigned)
    .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(res => {
        const elem = document.getElementById('lastTransaction')
        elem.href = API_PATH + 'transactions/' + txSigned.id
        elem.innerText = txSigned.id
        console.log('Transaction', txSigned.id, 'accepted')
    })

