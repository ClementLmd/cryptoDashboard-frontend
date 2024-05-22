import React, { useState } from 'react';
import styles from '../styles/WalletForm.module.css';
import { useSelector } from 'react-redux';


function WalletForm() {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [newWallet, setNewWallet] = useState([]);
    // const [newAddressIndex, setNewAddressIndex] = useState(0);
    const user = useSelector((state) => state.user.value)
    // console.log("user:", user.data)

    const handleCryptoChange = (event) => {
        setSelectedCrypto(event.target.value);
        if (event.target.value !== '') {
            setNewWallet([{ address: '', nameWallet: '', user: user.data.token }]);
        } else {
            setNewWallet([]);
        }
    };

    const handleAddAddressClick = (event) => {
        event.preventDefault();
        setNewWallet([...newWallet, { address: '', nameWallet: '', user: user.data.token }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Adresses soumises:", newWallet);
        newWallet.forEach(wallet => {
            const { nameWallet, address, user } = wallet
            fetch('http://localhost:3000/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameWallet, address, blockchain:selectedCrypto, user }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        console.log("fetch add wallet :", data)
                        // data.result && dispatch(login({ data: data.data }));
                    } else {
                        console.log("erreur add wallet")
                    }
                });
        })
    };


    return (
        <form className={styles.form}>
            {/* <label htmlFor="crypto-choice">Choisissez votre crypto-monnaie :</label> */}
            <select id="crypto-choice" name="crypto-choice" value={selectedCrypto} onChange={handleCryptoChange}>
                <option value="">Add Blockchain</option>
                <option value="Solana">Solana</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Ethereum">Ethereum</option>
            </select>

            {newWallet.map((wallet, index) => (
                <div key={index} className={styles.newWalletContainer}>
                    <input
                        type="text"
                        placeholder="Wallet address"
                        value={wallet.address}
                        onChange={(e) => {
                            const newAddresses = [...newWallet];
                            newAddresses[index].address = e.target.value;
                            setNewWallet(newAddresses);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Wallet name (optional)"
                        value={wallet.walletName}
                        onChange={(e) => {
                            const newAddresses = [...newWallet];
                            newAddresses[index].nameWallet = e.target.value;
                            setNewWallet(newAddresses);
                        }}
                    />
                    <button onClick={handleAddAddressClick} className={styles.addButton}>+</button>
                </div>
            ))}
            <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>Soumettre</button>
        </form>
    );
}

export default WalletForm;
