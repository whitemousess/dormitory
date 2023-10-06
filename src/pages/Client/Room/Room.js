import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Card } from 'bootstrap-4-react';

import styles from './Room.module.scss';
import * as roomService from '~/services/roomService';
import * as contractService from '~/services/contractService';

const cx = classNames.bind(styles);

function Room() {
    const [dataRoom, setDataRoom] = useState([]);
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        contractService.getContractStudent().then((contractStudent) => setRoomId(contractStudent.room_id._id));
    }, []);

    useEffect(() => {
        roomService.getStudentInRoom({ room_id: roomId }).then((dataRoom) => setDataRoom(dataRoom));
    }, [roomId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {dataRoom && dataRoom.length > 0
                    ? dataRoom.map((data) => (
                          <Card display="inline-block" align="top" mr="3" key={data._id} className={cx('card')}>
                              <Card.Image src={data.masv.avatarUrl} top />
                              <Card.Body>
                                  <Card.Text>{data.masv.fullName}</Card.Text>
                              </Card.Body>
                          </Card>
                      ))
                    : null}
            </div>
        </div>
    );
}

export default Room;
