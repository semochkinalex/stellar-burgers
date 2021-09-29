import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './feed.module.css';
import { addSocketConnection, WS_CONNECTION_START } from '../../services/actions/socket';

const url = 'wss://norma.nomoreparties.space/api/orders';

const Feed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addSocketConnection(url));
    }, []);

    return (
        <section className={styles.container}>

        </section>
    );
}

export default Feed;