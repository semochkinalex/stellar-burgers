import React from 'react';

import styles from './digit-display.module.css';

type TDigitDisplay = {
    title: string;
    number: number;
}

export const DigitDisplay: React.FC<TDigitDisplay> = ({number, title}) => {
    return (
        <div className={styles.container}>
            <p className={`text text_type_main-default`}>{title}</p>
            <p className={`text text_type_digits-large ${styles.shadow}`}>{number}</p>
        </div>
    );
}
