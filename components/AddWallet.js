import React from 'react';
import styles from '../styles/AddWallet.module.css';
import Menubar from './Menubar';
import WalletForm from './WalletForm';
import Header from './Header';



function AddWallet() {
    return (
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.menubar}>
                    <Menubar />
                </div>
                <div className={styles.rightContent}>
                    <h1 className={styles.title}>
                        Add Wallet
                    </h1>
                    <div className={styles.table}>
                        Add blockchain
                        <WalletForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddWallet;
