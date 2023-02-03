import { useDispatch, useSelector } from 'react-redux';
import {
    popNotification,
    selectNotifications
} from '../../../store/reducers/ui-slice.js';
import AlertContainer from './AlertContainer';

const AlertList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);

    const clearNotification = (id) => {
        dispatch(popNotification(id));
    };

    return (
        <>
            {notifications.map((notification) => (
                <AlertContainer
                    key={notification.id}
                    text={notification.text}
                    category={notification.category}
                    id={notification.id}
                    clearNotification={clearNotification}
                />
            ))}
        </>
    );
};

export default AlertList;
